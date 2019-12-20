import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import actions from './actions';
// 拆出来的模块
import user from './modules/user';
import msite from './modules/msite';
import cars from './modules/cars';
Vue.use(Vuex);
export default new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules:{
    msite,
    user,
    cars,
  }
})