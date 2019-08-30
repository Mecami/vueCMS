<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='100'>

        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" ref="num" :value="initCount" @change="countChange"/>
        <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
    </div>
</template>

<script>

//导入mui的js文件
import mui from '../../lib/mui/js/mui.min.js';
    export default {

        data(){
            return {
                
            }
        },
        methods:{
           countChange(){
               this.$store.commit('changeCount',{
                   id:this.goodsId,
                   count:this.$refs.num.value
               });
           }
        },
        mounted(){
             //这里的选择器记得要加上.表示类选择器！！！
        mui('.mui-numbox').numbox();
        
        },
        props:['initCount','goodsId']
       
    }
</script>

<style lang="scss" scoped>

</style>