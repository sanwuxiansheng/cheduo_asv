// 引入定义好的常量
import { RESET_USER, RECEIVE_USER } from '../mutation-types' 
const state = {
  // 用户信息
  user: {},
};
const mutations = {
  // 更新用户信息
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  // 干掉用户
  [RESET_USER](state){
    state.user={}
  }
};
const actions = {};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}