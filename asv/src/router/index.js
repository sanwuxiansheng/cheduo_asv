import Vue from 'vue';
import Router from 'vue-router';
import routes from './router.js';
import store from '../store';
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: '/html/',
  routes
})
router.beforeEach((to, from, next) => {
  const getCookie = function(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
      return unescape(arr[2]);
    }else{
      return null;
    }
  };
  // 可以在路由元信息指定哪些页面需要登录权限
  let token = getCookie('token');
  if (!token) {
    token = store.state.token;
  }
  // const token = store.state.token;
  if (to.meta.requiresAuth && !token) { // 需要登录授权，这里还需要判断是否登录
    next('/asv/login') // 跳转到登录
    return
  }
  next()
})
export default router;
