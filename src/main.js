// import Vue from '../node_modules/vue/dist/vue.js';
import Vue from 'vue';

import app from './app.vue';

import router from './rouder.js';

import VueRouter from 'vue-router';
Vue.use(VueRouter);
// console.log('hello');
//导入vue-resource
import VueResource from 'vue-resource';
//安装vue-resource
Vue.use(VueResource);
//导入vuex
import Vuex from 'vuex';
//注册vuex
Vue.use(Vuex);
//全部导入mintui组件
import MintUI from 'mint-ui';
Vue.use(MintUI);

//导入vue-prevue图片预览包
import VuePreview from 'vue-preview';
// defalut install
Vue.use(VuePreview);
//导入moment
import moment from 'moment';
//这里pattern=是指第2个参数有个默认值，到时可以传，可以不传！！！
//过滤器记得要写返回 return !!!!!
Vue.filter('dateFormat',function (dateStr,pattern='YYYY-MM-DD hh:mm:ss') {
  return moment(dateStr).format(pattern);
})
//设置post请求的第3个参数为表单提交方式
Vue.http.options.emulateJSON=true;

//导入MUI的css和字体库
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
import './lib/mui/fonts/mui-icons-extra.ttf';


//按需导入mintui组件
// import {Header,Swipe, SwipeItem,Button} from 'mint-ui';
// Vue.component(Header.name,Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
//创建vuex实例
var car=JSON.parse(localStorage.getItem('car') || '[]');
var store = new Vuex.Store({
  state:{
    car:car
     
  },
  mutations:{
    //将商品添加到购物车
    addCar(state,goodsObj){
      //假设一开始购物车没有该商品
      var flag=false;
      //查看car里有没有该商品
      state.car.some(item=>{
        if(item.id===goodsObj.id){
          //如果有该商品，设置flag为true,然后直接修改之前商品的数量值即可，然后退出some函数
          flag=true;
          item.count+=parseInt(goodsObj.count);
          localStorage.setItem('car',JSON.stringify(state.car));
          return true;
        }
      })
      //如果car里没有该商品
      if(flag===false){
        //把goodsObj添加到car数组里
        state.car.push(goodsObj);
        //同时将完成添加后的car写入到本地存储中
        localStorage.setItem('car',JSON.stringify(state.car));
      }
    },
    changeCount(state,obj){
      state.car.some(item=>{
         if(item.id==obj.id){
         item.count=parseInt(obj.count);
         return true;
         }
      })
      localStorage.setItem('car',JSON.stringify(state.car));

    },
    removeGoods(state,id){
      state.car.some((item,index)=>{
        console.log(id);
        //注意item中的id是个字符串！！！而传过来的id是个数字，用===会出错！！！！
        if(item.id==id){
          state.car.splice(index,1);
        }
        return true;
      })
      //更新本地存储中的数据
      localStorage.setItem('car',JSON.stringify(state.car));

    },
    updateGoodsSelected(state,obj){//将购物车中按钮的姿态更新到store和本地存储中
      state.car.some(item=>{
        if(item.id==obj.id){
          item.selected=obj.selected;

        }
        // return true;
      })

      localStorage.setItem('car',JSON.stringify(state.car));

    }
  
  },
  getters:{
    getAllCount(state){
      var c=0;
      state.car.forEach(item=>{
        if(item.selected===true){
            c+=item.count;

        }
       
      })
      return c;
    },
    getGoodsCount(state){
      var o={};
      state.car.forEach(item=>{
         o[item.id]=item.count;
      })

      return o;
    },
    getGoodsSelected(state){
      var o={};
      state.car.forEach(item=>{
        o[item.id]=item.selected;
      })
      return o;
    },
    getTotalPrice(state){
      var totalPrice=0;
      state.car.forEach(item=>{
        if(item.selected==true){
          totalPrice+=item.price*item.count;
        }
       
      })
      //回调函数里return是没有用的。。。循环结束后再return ！！！！！！！
      return totalPrice;
    }
  }
})

var vm = new Vue({
  el: '#app',
  data: {

  },
  methods: {

  },
  render:e=>e(app),
  router,
  store
})

 