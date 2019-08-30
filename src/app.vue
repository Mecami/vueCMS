<template>
    <div class="container">
        <!-- header部分 -->
        <mt-header fixed title="Mecami商城">
			 <span slot="left" @click="goBack" v-show="flag">
    			<mt-button icon="back">返回</mt-button>
  			</span>
		</mt-header>
         
        <!-- 中间router-view部分 -->
		<transition name="tra1" mode="">
			<router-view></router-view>
		</transition>

		<!-- http://www.liulongbin.top:3005 -->

        <!-- foot部分 -->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item--up" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>

			<router-link class="mui-tab-item--up " to="/member">
				<span class="mui-icon mui-icon-contact">
                    
                </span>
				<span class="mui-tab-label">会员</span>
			</router-link>

			<router-link class="mui-tab-item--up" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
					<span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
				</span>
				<span class="mui-tab-label">购物车</span>
			</router-link>

			<router-link class="mui-tab-item--up" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
       
    </div>
</template>

<script>
export default {
	data(){
		 return {
			 flag:true
		 }
	},
	methods:{
		goBack(){
			
			this.$router.go(-1);
			 
			//我tm也是醉了
		}    

	},
	created(){
		this.flag=this.$route.path=='/home'?false:true;
	},
	watch:{	//监听上面的url，方法名有.所以不能直接写方法名，要加上''
		'$route.path'(newVal){
			if(newVal=='/home'){
				this.flag=false;
			}else{
				this.flag=true;
			}
		}
	}
}
</script>

 
<style lang="less" scoped>
	 .container{

		background-color: #fff;
		padding-top: 40px;
		overflow-x: hidden;
		padding-bottom: 50px;

		.mint-header.is-fixed {
			z-index: 100;
		}
		.tra1-enter{
		 
			transform: translateX(100%);
		}
		.tra1-leave-to {
			position: absolute;

			transform: translateX(-100%);
		}
		.tra1-enter-active,
		.tra1-leave-active{
			transition: all .5s;
		}
		
	}
	
	.mui-bar-tab .mui-tab-item--up.mui-active {
    color: #007aff;
	}

	.mui-bar-tab .mui-tab-item--up {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item--up .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item--up .mui-icon~.mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}


</style>
