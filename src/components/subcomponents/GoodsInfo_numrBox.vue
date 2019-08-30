<template>
    <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' data-numbox-max='100'>

        <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
        <input class="mui-numbox-input" type="number" ref="num" @change="numChange"/>
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
            numChange(){
                //通过change事件将通过ref得到的文本框中的值，先转为数字，再作为参数传递给getNum
                //函数，让父组件得到该值。
                 //console.log(this.$refs.num.value);
                 this.$emit('getNum',parseInt(this.$refs.num.value));
            }
        },
        mounted(){
             //这里的选择器记得要加上.表示类选择器！！！
        mui('.mui-numbox').numbox();
        },
        props:['maxNum'],
        watch:{
            maxNum(newVal,oldVal){
                //监视maxNum的值
                mui('.mui-numbox').numbox().setOption('max',newVal);
                // console.log(newVal);
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>