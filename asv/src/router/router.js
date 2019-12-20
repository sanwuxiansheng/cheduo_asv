import Home from '../pages/home/home.vue';
import Order from '../pages/order/order.vue';
import Question from '../pages/question/question.vue';
import Coupon from '../pages/coupon/coupon.vue';
import Sixyear from '../pages/home/sixyear/sixyear.vue';
import Pickcar from '../pages/home/pickcar/pickcar.vue';
import Instation from '../pages/home/instation/instation.vue';
import Manage from '../pages/manage/manage.vue';
import Map from '../pages/map/map.vue';
import ConfirmOrder from '../pages/confirm_order/confirm_order.vue';
import ShopList from '../pages/shop_list/shopList.vue';
import Compile from '../pages/compile/compile.vue';
import OrderDetails from '../pages/order/order_details/order_details.vue';
import Login from '../pages/login/login.vue';
import LoginNext from '../pages/login/login_next.vue';
import Stapled from '../pages/stapled/stapled.vue';
import WeiZhang from '../pages/weizahng/weizhang.vue';
import AliPay from '../pages/pay/aliPay.vue';
import PageNotFound from '../pages/page_not_found/page_not_found.vue';
export default [
  {
    path: '/asv/index',
    name: 'Home',
    component: Home,
    meta: {
      isShowFooter: true
    },
    children:[
      {
        path: '/asv/index',
        name: 'Sixyear',
        component: Sixyear,
        meta: {
          isShowFooter: true,
          isMyself: true,
        },
      },
      {
        path: '/asv/pickcar',
        name: 'Pickcar',
        component: Pickcar,
        meta: {
          isShowFooter: true,
          isMyself: false,
        },
      },
      {
        path: '/asv/instation',
        name: 'Instation',
        component: Instation,
        meta: {
          isShowFooter: true,
          isMyself: false,
        },
      }
    ]
  },
  {
    path: '/asv/shoplist',
    name: 'ShopList',
    component: ShopList,
    meta: {
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/order',
    name: 'Order',
    component: Order,
    meta: {
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/question',
    name: 'Question',
    component: Question,
    meta: {
      isShow: true
    }
  },
  {
    path: '/asv/coupon',
    name: 'Coupon',
    component: Coupon,
    meta: {
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/manage',
    name: 'Manage',
    component: Manage,
    meta: {
      isShowTel: true,
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/map',
    name: 'Map',
    component: Map,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/paydir/asv-pay',
    name: 'ConfirmOrder',
    component: ConfirmOrder,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/asv/compile',
    name: 'Compile',
    component:Compile,
    meta: {
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/order_det',
    name: 'OrderDetails',
    component: OrderDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/asv/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/asv/login_next',
    name: 'LoginNext',
    component: LoginNext,
    meta:{
      isShow: true
    }
  },
  {
    path: '/asv/stapled',
    name: 'Stapled',
    component: Stapled,
    meta: {
      requiresAuth: true
    }
  },
  {
    path:'/asv/weizhang',
    name: 'WeiZhang',
    component: WeiZhang,
    meta:{
      isShow: true,
      requiresAuth: true
    }
  },
  {
    path: '/asv/aliPay',
    name: 'AliPay',
    component: AliPay,
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: '/asv/index'
  },
  {
    path: '*',
    component: PageNotFound
  }
]
