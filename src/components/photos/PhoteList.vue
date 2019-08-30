<template>
    <div>
        <!-- 顶部分类滑动块 -->
		<div class="mui-scroll-wrapper mui-slider-indicatsor mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
                <a :class="['mui-control-item',item.id===0?'mui-active':'']" v-for="item in cates" :key="item.id" @click="getPhotoListById(item.id)">
                    {{item.title}}
                </a>

        </div>

        <!-- 每个分类下的图片列表 -->
        <ul class="photoList">
            <router-link v-for="item in photoList" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
                <img v-lazy="item.img_url">
                <div class="photo-msg">
                    <h3 class="photo-msg-title">{{item.title}}</h3>
                    <div class="photo-msg-content">{{item.zhaiyao}}</div>
                </div>
            </router-link>
        </ul>
</div>

    </div>
</template>

<script>
// import mui from '../../lib/mui/js/mui.js';
import mui from '../../lib/mui/js/mui.min.js';
import { Toast } from 'mint-ui';

export default {
    data(){
        return {
            cates:[],
            photoList:[],
            photoInfo:{}
        }
    },
    methods:{
        getcates(){
            this.$http.get('http://www.liulongbin.top:3005/api/getimgcategory').then(result=>{
                if(result.body.status===0){
                    result.body.message.unshift({title:'全部',id:0});
                    this.cates=result.body.message;
                    //  Toast('加载分类成功');
                }else {
                    Toast('加载分类失败');
                }
            })
        },
        getPhotoListById(id){
            this.$http.get('http://www.liulongbin.top:3005/api/getimages/'+id)
                .then(result=>{
                    if(result.body.status===0){
                        this.photoList=result.body.message;
                        // console.log('获取到了图片列表');
                        // console.log(result.body);
                    }else {
                        Toast('加载图片列表失败');
                    }
                })
        },
        // getPhotoInfo(id){
        //       this.$http.get('http://www.liulongbin.top:3005/api/getimageInfo/'+id)
        //         .then(result=>{
        //             if(result.body.status===0){
        //                 this.photoInfo=result.body.message[0];
        //                 // console.log('获取到了图片列表');
        //                 // console.log(result.body);
        //                 console.log(photoInfo);
        //             }else {
        //                 Toast('加载图片列表失败');
        //             }
        //         })
        // }
        
        
    },
    created(){
        this.getcates();
        //点击“图片分享后”获取“全部”的图片列表
        this.getPhotoListById(0);
    },
    mounted(){

        mui('.mui-scroll-wrapper').scroll({
        	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    }
    // "transform-remove-strict-mode",
}
</script>

<style lang="scss" scoped>
body{
    margin:0;
    padding:0;
    box-sizing: border-box;
}
* {
   touch-action: pan-y;
}

.mui-scroll {
     position: fixed;
     background-color: #fff;
}

.photoList{
    margin-top: 40px;
    padding:10px;
    list-style: none;
    li{
        background-color:  #76c4f1;
        border-radius: 10px;
        overflow: hidden;
        height: 360px;
        vertical-align: top;
        margin-bottom: 20px;
        text-align: center;
        position: relative;
        img{
            width: 100%;
            height: 100%;
            
        }
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .photo-msg{
            color: #fff;
            position: absolute;
            bottom: 0;
            background-color: rgba(0,0,0,.4);
            text-align: left;
           h3{
                font-size: 14px;
                text-align: center;
            }
            div{
                font-size: 13px;
                text-indent: 2em;
                
            }
        }
    }
}
</style>
