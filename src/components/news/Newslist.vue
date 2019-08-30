<template>
    <div>
       <ul class="mui-table-view">
			<li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
				<router-link :to="'/home/newsinfo/'+item.id">
					<img class="mui-media-object mui-pull-left" :src="item.img_url">
					<div class="mui-media-body">
						<h1>{{item.title}}</h1>
						<p class="mui-ellipsis">
                            <span>发表时间：{{item.add_time | dateFormat('YYYY-MM-DD hh:mm') }}</span>
                            <span v-cloak>点击：{{item.click}}次</span>
                        </p>
					</div>
				</router-link>
			</li>
			
		</ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
    data(){
        return {
            newslist:[]
        }
    },
    methods:{
        getNewslist(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnewslist').then(result=>{
                // console.log(result.body);
                if(result.body.status===0){
                    this.newslist=result.body.message;
                    // Toast('加载新闻列表成功');

                }else{
                    Toast('加载新闻列表失败');
                }
            })
        }
    },
    created(){
        this.getNewslist();
    }
}
</script>

<style lang="scss" scoped>
    .mui-table-view{
        li{
           
            h1{
                font-size: 12px;
            }
        }
    }
    .mui-ellipsis {
        font-size: 12px;
        display: flex;
        color: rgb(92, 174, 221);
        justify-content: space-between;
    }
</style>
