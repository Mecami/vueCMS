<template>
    <div>
         <div class="item-list">

            
            <div class="mui-card" v-for="(item,i) in goodsList" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<div class="item">
                            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                            <img :src="item.thumb_path" alt="">
                            <div class="info">
                                <h2>{{ item.title }}</h2>
                                <p>
                                    <span class="price">￥{{ item.sell_price }}</span>
                                    <carNumbox style="height:25px" :initCount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></carNumbox>
                                    <a href="#" @click="remove(i,item.id)">删除</a>
                                </p>
                            </div>
                        </div>
					</div>
				</div>
			</div>
            

            <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner total" >
						 <div class="left">
                             <p>
                                 总计（不含运费）
                             </p>
                             <p>
                                 已勾选商品&nbsp;<span class="red">{{$store.getters.getAllCount}}</span>&nbsp;件，
                                 总价&nbsp;<span class="red">￥{{$store.getters.getTotalPrice}}</span>
                             </p>
                         </div>
                         <mt-button type="danger">去结算</mt-button>
					</div>
				</div>
			</div>
         </div>
    </div>
</template>

<script>
//导入数字按钮
import carNumbox from '../subcomponents/Car_numBox.vue';
export default {
    data(){
        return {
            goodsList:[]
           
        }
    },
    methods:{
        getGoodsList(){
            //用于存放购物车中商品的id
            var carId=[];
            this.$store.state.car.forEach(item => {
                carId.push(item.id);
            });
            if(carId.length<=0){
                return;
            }
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+carId.join(','))
                .then(result=>{
                    if(result.body.status===0){
                        this.goodsList=result.body.message;
                    }
                })
        },
        remove(index,id){
            //这里的index用于删除goodsList的对象，id是用来删除store中的car的对象
            this.goodsList.splice(index,1);
            this.$store.commit('removeGoods',id);
        },
        selectedChange(id,bol){
            console.log(id+'-----'+bol);
            this.$store.commit('updateGoodsSelected',{id,selected:bol});
        }
    },
    created(){
        this.getGoodsList();
    },
    components:{
        carNumbox
    }
}
</script>

<style lang="less" scoped>
    .item-list{
        background-color: #eee;
        overflow: hidden;
        .item{
            display: flex;
            align-items: center;
            img{
                width: 60px;
                height: 60px;
               
            }
            .info{
                margin-left: 10px;
                h2{
                    font-size: 13px;
                    
                }
                p{
                     
                    .price{
                        color:red;
                        font-weight: 700;
                    }
                }
                
            }
        }
        .total{
            display: flex;
            justify-content: space-between;
            align-items: center;
            .red{
                color: red;
                font-weight: 700;

            }
        }
    }
</style>
