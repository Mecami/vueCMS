<template>
    <div class="goodsDesc-container">
        <h2 class="title">{{goodsDesc.title}}</h2>
        <hr>
        <div class="desc" v-html="goodsDesc.content"></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsDesc:{}
        }
    },
    methods:{
        getGoodsDesc(){
            this.$http.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.id)
                .then(result=>{
                    if(result.body.status===0){
                        this.goodsDesc=result.body.message[0];
                    }
                })
        }
    },
    created(){
        this.getGoodsDesc();
    }
}
</script>

<style lang="scss">
    .goodsDesc-container{
        
        padding:10px;
        .title{
            font-size: 15px;
            text-align: center;
        }
        img{
            width: 100%;
            height: auto;
        }
    }
</style>
