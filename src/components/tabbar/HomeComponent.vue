<template>
    <div>
        <!-- 轮播图 -->
        <Lunbo :lunboData="lunbolist" :isfull="true"></Lunbo>
        <!-- <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunbolist" :key="item.img">
                <img :src="item.img" alt="">
        </mt-swipe-item> -->

        <!-- </mt-swipe> -->
        <!-- 六宫格 -->
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/news">
                    <img src="../../images/menu1.png" alt="">
                    <div class="mui-media-body">新闻资讯</div>
                </router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/photolist">
                    <img src="../../images/menu2.png" alt="">

                    <div class="mui-media-body">图片分享</div>
                </router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <router-link to="/home/goodslist">
                    <img src="../../images/menu3.png" alt="">

                    <div class="mui-media-body">商品购买</div>
                </router-link>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu4.png" alt="">

                    <div class="mui-media-body">留言反馈</div>
                </a>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu5.png" alt="">

                    <div class="mui-media-body">视频专区</div>
                </a>
            </li>

            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <a href="#">
                    <img src="../../images/menu6.png" alt="">

                    <div class="mui-media-body">联系我们</div>
                </a>
            </li>

        </ul>

    </div>
</template>

<script>
    import {
        Toast
    } from 'mint-ui';

    //导入轮播图子组件
    import Lunbo from '../subcomponents/Lunbo.vue';

    export default {
        data() {
            return {
                lunbolist: [],
                 
            }
        },
        methods: {
            getLunboData() {
                this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
                    //console.log(result.body);
                    if (result.body.status === 0) {
                        this.lunbolist = result.body.message;
                        // Toast('OK');

                    } else {
                        Toast('加载轮播图数据失败');
                    }
                })
            }
        },
        created() {
            this.getLunboData();
        },
        components:{
            Lunbo
        }
    }
</script>

<style lang="less" scoped>
    body {
       

        .mui-grid-view.mui-grid-9 {
            background-color: #fff;

            img {
                width: 60px;
                height: 60px;
            }

            .mui-table-view-cell {
                border: none;
            }
        }
        .isfull{
            width: 100%;
        }
    }
</style>