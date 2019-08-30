<template>
    <div class="photoinfo-container">
        <!-- 图片详情信息 -->
       <h3 class="photo-title">{{photoInfo.title}}</h3>
       <p class="photo-subtitle">
           <span>发表时间：{{photoInfo.add_time | dateFormat}}</span>
           <span>点击：{{photoInfo.click}}次</span>
       </p>
       <hr>
       <!-- 描述 -->
       <div class="photo-info" v-html="photoInfo.content"></div>

       <!-- 图片预览区域 -->
       <div class="thubms">
           <vue-preview :slides="thumbs" @close="handleClose"></vue-preview>
       </div>

        <!-- 评论区域 -->
       <Comment></Comment>

    </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Comment from '../subcomponents/Comment.vue';
export default {
    
    data(){
        return {
            id:this.$route.params.id,
            photoInfo:{},
            thumbs: []
        }
    },
    methods:{
        getPhotoInfo(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id)
                .then(result=>{
                    if(result.body.status===0){
                        this.photoInfo=result.body.message[0];
                    }else{
                        Toast('详情加载失败');
                    }

                })
        },
        getThumbs(){
            this.$http.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
                .then(result=>{
                    if(result.body.status===0){
                        result.body.message.forEach(item => {
                            item.w=600;
                            item.h=400;
                            item.msrc=item.src;
                            item.alt='';
                            item.title='';
                        });
                        this.thumbs=result.body.message;
                        // Toast('获取图片缩略图成功');

                    }else{
                        Toast('获取图片缩略图失败');
                    }
                })
        },
        handleClose () {
            console.log('close event')
        }
    },
    components:{
        Comment
    },
    props:['faId'],
    created(){
        this.getPhotoInfo();
        this.getThumbs();
    }
}
</script>

<style lang="scss" scoped>
.photoinfo-container{
    padding: 6px;
    .photo-title{
        text-align: center;
         color: rgb(92, 174, 221);
        font-size: 15px;
    }

    .photo-subtitle{
        display: flex;
        justify-content: space-between;
    }
    .photo-info{
        line-height: 26px;
        font-size: 14px;
        text-indent: 2em;
    }
   
}
</style>

