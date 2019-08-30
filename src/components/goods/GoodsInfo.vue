<template>
    <div class="mui-card-container">
       
            <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
                <div class="ball" v-show="ballFlag" ref="ball"></div>
            </transition>
      
        <!-- 轮播图区域 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <Lunbo :lunboData="lunbolist" :isfull="false"></Lunbo>
					</div>
				</div>
		</div>


        <!-- 商品购买区域 -->
        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						 <h2 class="price">市场价：￥<del>{{goodsinfo.market_price}}</del>&nbsp;&nbsp;&nbsp;&nbsp;销售价：￥<span class="now">{{goodsinfo.sell_price}}</span></h2>
                              
                            <p>购买数量：
                                <goodsInfo_box @getNum="getNumFromSon" :maxNum="goodsinfo.stock_quantity"></goodsInfo_box>
                            </p>
                            <div class="btn"> 
                                <mt-button type="primary" size="small" >立即购买</mt-button>
                                <span>&nbsp;&nbsp;</span>
                                 <mt-button type="danger" size="small" @click="addShopCar">进入购物车</mt-button>
                            </div>
                        

					</div>
				</div>
			 
		</div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsinfo.add_time | dateFormat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                   
                    <mt-button type="primary" size="large" plain @click="goGoodsDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goGoodsComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>

<script>
//导入轮播图子组件
import Lunbo from '../subcomponents/Lunbo.vue';

//导入添加数量按钮组件
import goodsInfo_box from '../subcomponents/GoodsInfo_numrBox.vue';


export default {
    data(){
        return {
            id:this.$route.params.id,
            lunbolist:[],
            goodsinfo:{},
            ballFlag:false,
            numFromSon:1  //默认值是1
           
        }
    },
    methods:{
        getLunboData(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
                .then(result=>{
                    if(result.body.status===0){
                         //循环遍历数组message
                     result.body.message.forEach(item => {
                         //为每一个对象添加img成员，用于轮播图
                         item.img=item.src;
                     });
                     this.lunbolist=result.body.message;
                    }
                })
        },
        getGoodsInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id)
                .then(result=>{
                    if(result.body.status===0){
                        this.goodsinfo=result.body.message[0];
                    }
                })
        },
        goGoodsDesc(id){
            this.$router.push({name:'goodsdesc',params:{id}});
        },
        goGoodsComment(id){
            this.$router.push({name:'goodscomment',params:{id}});

        },
        addShopCar(){
            this.ballFlag=!this.ballFlag;
            //把商品的id,价格，数量,是否被选中这些信息放到一个对象中
            var goodsObj={
                id:this.id,
                count:this.numFromSon,
                price:this.goodsinfo.sell_price,
                selected:true
                }
            //调用store中的mutation中的addCar方法
            this.$store.commit('addCar',goodsObj);
           
        },
        beforeEnter(el){
            el.style.transform='translate(0,0)';
        },
        enter(el,done){
            const ballPosition=this.$refs.ball.getBoundingClientRect();
            const badgePosition=document.getElementById('badge').getBoundingClientRect();
            const x=badgePosition.left-ballPosition.left;
            const y=badgePosition.top-ballPosition.top;
            el.offsetWidth;
            el.style.transform=`translate(${x}px,${y}px)`;
            el.style.transition='all 1s cubic-bezier(.4,-0.3,1,0.68)';
            done();

        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;
        },
        getNumFromSon(num){
            this.numFromSon=num;
            console.log('从子组件中获得的值是'+this.numFromSon);
        }
      
    },
    components:{
        Lunbo,
        goodsInfo_box
    },
    created(){
        this.getLunboData();
        this.getGoodsInfo();
    },
    mounted(){
       
    }
}
</script>

<style lang="scss" scoped>
    .mui-card-container{
        background-color: #eee;
        overflow: hidden;
        .price{
            font-size: 14px;
            font-weight: 400;
            margin-bottom: 20px;
        }
        .now{
            color:red;
            font-weight: 700;
            font-size: 16px;
        }
        .btn{
            margin-top: 20px;
            
        }
        .mui-card-footer{
            display: block;
            button{
                margin-bottom: 10px;
            }
        }
    }
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top:420px;
        left: 146px;
        // transform: translate(147px,378px);
         
    }
</style>
