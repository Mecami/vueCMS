
import VueRouter from 'vue-router';
//导入需要用到的4个组件
import HomeComponent from './components/tabbar/HomeComponent.vue';
import MemberComponent from './components/tabbar/MemberComponent.vue';
import ShopcarComponent from './components/tabbar/ShopcarComponent.vue';
import SearchComponent from './components/tabbar/SearchComponent.vue';
import Newslist from './components/news/Newslist.vue';
import NewsInfo from './components/news/NewsInfo.vue';
import PhotoList from './components/photos/PhoteList.vue';
import PhoteoInfo from './components/photos/PhotoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';
import GoodsDesc from './components/goods/GoodsDesc.vue';

import Comment from './components/subcomponents/Comment.vue';
var router = new VueRouter({
    routes: [ //根据不同的url切换不同的组件
      { path:'/',redirect:'/home'}, //重定向
 
      { path:'/home',component:HomeComponent},
      { path:'/member',component:MemberComponent},
      { path:'/shopcar',component:ShopcarComponent},
      { path:'/search',component:SearchComponent},
      { path:'/home/news',component:Newslist},
      { path:'/home/newsinfo/:id',component:NewsInfo},
      { path:'/home/photolist',component:PhotoList},
      { path:'/home/photoinfo/:id',component:PhoteoInfo},
      { path: '/home/goodslist', component:GoodsList},
      { path: '/home/goodsinfo/:id', component:GoodsInfo,name:'goodsinfo'},
      { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
      { path: '/home/goodscomment/:id', component: Comment, name: 'goodscomment'},

  
    ],
    linkActiveClass:'mui-active' //修改默认的router-link标签中的高亮显示类router-active-class
    
  })

export default router;
// http://vue.studyit.io

//http://www.liulongbin.top:3005
  