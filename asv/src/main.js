// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import 'lib-flexible/flexible';//引入rem自适应
import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'element-ui/lib/theme-chalk/index.css';
import element from './element/index';
import { Steps, Step } from 'element-ui';
import moment from 'moment'; // 格式化时间
import { DatetimePicker, Popup, Cell, RadioGroup, Radio, CellGroup, Field, SwitchCell, Toast, PasswordInput, NumberKeyboard } from 'vant';
import '@vant/touch-emulator';
// 定义全局组件
import Header from './components/header/header.vue';
import HeaderTwo from './components/header/header_two.vue';
import HeaderThree from './components/header/header_three.vue';
import Footer from './components/footer/footer.vue';
import PageNotFound from './components/404/404.vue';
import AMap from 'vue-amap';
import Distpicker from 'v-distpicker';
import VueAreaLinkage from 'vue-area-linkage';
// import BScroll from 'better-scroll'
// Vue.use(BScroll);
Vue.use(Steps);
Vue.use(Step);
Vue.use(VueAreaLinkage);
Vue.use(PasswordInput);
Vue.use(NumberKeyboard);
Vue.use(AMap);
Vue.use(Distpicker);
Vue.use(CellGroup);
Vue.use(Toast);
Vue.use(Field);
Vue.use(SwitchCell);
Vue.component('Header', Header);
Vue.component('Footer', Footer);
Vue.component('HeaderTwo', HeaderTwo);
Vue.component('HeaderThree', HeaderThree);
Vue.component('PageNotFound', PageNotFound);
Vue.config.productionTip = false;
Vue.use(VueAwesomeSwiper);
Vue.use(element);
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Cell);
Vue.use(RadioGroup);
Vue.use(Radio);
//全局过滤器
Vue.filter('dateFmt', (input, formatString = "YYYY-MM-DD") => {
  //es5函数参数设置默认值
  //const lastFormatString = formatString || ''

  
   // moment(input) 把时间字符串转成时间对象
   // format(formatString) 把时间对象，按照指定格式，格式化成符合条件的字符串
  return moment(input).format(formatString)
})
// 初始化vue-amap
AMap.initAMapApiLoader({
  // 高德的key
  key: '974cfbd62b61661516a0d98e4a425f11',
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  v: '1.4.4'
});
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
