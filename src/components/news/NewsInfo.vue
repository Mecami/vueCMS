<template>
    <div class="newsinfo">
        <!-- 标题 -->
        <h3>{{newsinfo.title}}</h3>
        <p>
            <span>发表时间：{{newsinfo.add_time | dateFormat}}</span>
            <span>点击：{{newsinfo.click}}</span>
        </p>
        <hr>
        <!-- 新闻内容 -->
        <div class="content" v-html="newsinfo.content">
             
        </div>

        <!-- 评论区域 -->
        <comment ></comment>

    </div>
</template>

<script>
//导入评论组件
import comment from "../subcomponents/Comment.vue";
import { Toast } from 'mint-ui';
export default {
    data(){
        return {
            id:this.$route.params.id,
            newsinfo:{}
        }
    },
    methods:{
        getNewsInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getnew/'+this.id)
            .then(result=>{
                if(result.body.status===0){
                    this.newsinfo=result.body.message[0];
                }else{
                    Toast('加载新闻详情失败');
                }
            })
        }
    },
    created(){
        this.getNewsInfo();
    },
    components:{
        comment:comment
    }
}
</script>

<style lang="scss" scoped>
    .newsinfo {
        padding: 10px;
        h3{
            color: red;
            text-align: center;
            margin:12px 0;
            font-size: 16px;
        }
        p{
            display: flex;
            justify-content: space-between;
            color: rgb(92, 174, 221);

        }
        .content{

        }
    }
</style>


