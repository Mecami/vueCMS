<template>
    <div class="comment-container">
        <hr>
        <h2>发表评论</h2>
        
        <textarea placeholder="请输入要评论的内容（最多120字）" maxlength="120" v-model="msg"></textarea>
        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>
        <div class="cmd-list">
            <div class="cmd-item" v-for="(item, index) in comments" :key="item.add_time">
                <div class="cmd-title">
                    第{{index+1}}楼&nbsp;&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：&nbsp;&nbsp;{{item.add_time | dateFormat('YYYY-MM-DD hh:mm:ss')}}
                </div>
                <div class="cmd-main">
                    {{item.content==='undefined'?'这个用户很懒，什么都没留下':item.content}}
                </div>
            </div>

          
        </div>
        <mt-button type="danger" size="large" @click="getMore" >加载跟多</mt-button>
    </div>
</template>

<script>
import { Toast } from 'mint-ui';
    export default {
        data(){
            return {
                comments:[],
                pageindex:1,
                msg:'',
                id:this.$route.params.id
            }
        },
        methods:{
            getComments(){
                this.$http.get('http://www.liulongbin.top:3005/api/getcomments/'+this.id+'?pageindex='+this.pageindex)
                .then(result=>{
                    // console.log(result);
                    if(result.body.status===0){
                        this.comments=this.comments.concat(result.body.message);
                    }else{
                        Toast('加载评论失败');
                    }
                })
            },
            getMore(){
                this.pageindex++;
                this.getComments();
            },
            postComment(){
                //验证评论不能为空
                if(this.msg.trim()===''){
                    return Toast('评论不能为空');
                }
                //post请求在main.js设置了emulateJSON=true，所以这里不用填第3个参数。
                this.$http.post('http://www.liulongbin.top:3005/api/postcomment/'+this.id,
                {content:this.msg})
                .then(result=>{
                    if(result.body.status===0){
                        var cmt={
                            user_name:'匿名用户',
                            add_time:Date.now(),
                            content:this.msg.trim()
                        }
                        this.comments.unshift(cmt);
                        this.msg='';
                    }
                })
            }
        },
        created(){
            this.getComments();
        },
        // props:['id']
    }
</script>

<style lang="scss" scoped>
    .comment-container{
        padding: 6px 10px;
        hr{
            margin:15px 0;
        }
        h2{
            font-size: 16px;
        }
        textarea{
            font-size: 12px;
            height: 80px;
            margin: 0;
        }
        .cmd-list{
            .cmd-item{
                font-size: 12px;
                margin:10px 0;
                .cmd-title{
                    background-color: #ccc;

                }
                .cmd-main{}
            }
        }
    }
</style>