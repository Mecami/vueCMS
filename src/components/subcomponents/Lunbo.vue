<template>
    <div>
         <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboData" :key="item.img">
                <img :src="item.img" alt="" :class="{full:isfull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    props:['lunboData','isfull']//isfull是父组件传过来的bool值，用于轮播图的图片是否宽度100%
}
</script>

<style lang="scss" scoped>
 .mint-swipe {
            height: 200px;

            .mint-swipe-item {
                text-align: center;
                // &:nth-child(1) {
                //     background-color:#007aff;
                // }

                // &:nth-child(2) {
                //     background-color: #007aff;
                // }

                // &:nth-child(3) {
                //     background-color: #007aff;
                // }

                img {
                     
                    height: 100%;
                }
                .full{
                    width: 100%;
                }
            }
        }
</style>
