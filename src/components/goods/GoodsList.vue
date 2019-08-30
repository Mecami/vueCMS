<template>
    <div class="goods-list">

        <!-- 每一个商品 -->
        <!-- 路由跳转第一种方法 -->
       <!-- <router-link tag="div" class="goods-item" v-for="item in goodsList" :key="item.id" :to="'/home/goodsinfo/'+item.id">
           <img :src="item.img_url" alt="">
           <h3 class="title">{{item.title}}</h3>
           <div class="info">
               <p class="goods-price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{item.stock_quantity}}件</span>
               </p>
           </div>
       </router-link> -->

          <div class="goods-item" v-for="item in goodsList" :key="item.id" @click="toGoodsInfo(item.id)">
           <img :src="item.img_url" alt="">
           <h3 class="title">{{item.title}}</h3>
           <div class="info">
               <p class="goods-price">
                   <span class="now">￥{{item.sell_price}}</span>
                   <span class="old">￥{{item.market_price}}</span>
               </p>
               <p class="sell">
                   <span>热卖中</span>
                   <span>剩{{item.stock_quantity}}件</span>
               </p>
           </div>
       </div>

      
        <!-- 获取更多按钮 -->
        <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            
            pageIndex:1,
            goodsList:[]
        }
    },
    methods:{
        getGoodsList(){
            this.$http.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageIndex)
                .then(result=>{
                    if(result.body.status===0){
                        this.goodsList=this.goodsList.concat(result.body.message);
                        
                    }else{
                        Toast('加载商品列表失败');
                    }
                })
        },
        getMore(){
            this.pageIndex++;
            this.getGoodsList();
        },
        toGoodsInfo(id){
            //第一种方法，直接拼接字符串
            // this.$router.push('/home/goodsinfo/'+id);

            //第二种，传递对象，和第一种很像
            this.$router.push({path:'/home/goodsinfo/'+id});

            //第三种，有name属性
            this.$router.push({name:'goodsinfo',params:{id}})


        }
    },
    created(){
        this.getGoodsList();
    }
}
</script>

<style lang="scss" scoped>
    .goods-list{
        display: flex;
        flex-wrap: wrap;
        padding:6px;
        justify-content: space-between;
        .goods-item{
            width: 49%;  //注意这里用width比较好，不要用flex!!!
            margin-bottom: 10px;
            border: 1px solid #ccc;
            box-shadow: 0 2px 3px #ccc;
            padding:2px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            border-radius: 6px;
            img{
                width: 100%;
                height: 172px;
            }
            .title{
                font-size: 14px;
                margin-left: 10px;
            }
            .info{
                background-color: #eee;
                padding:6px;
                .goods-price{
                    .now{
                        color:red;
                        font-weight: 700;
                        font-size: 16px;
                    }
                    .old{
                        font-size: 14px;
                        margin-left: 20px;
                        text-decoration: line-through;
                    }
                }
                .sell{
                    display: flex;
                    justify-content: space-between;
                    margin: 0;
                }
            }
           
        }
    }
   
</style>
