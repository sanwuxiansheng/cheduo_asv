// 引入定义好的常量
import { RECEIVE_RIMS } from '../mutation-types' 
// 引入api中的index.js文件使用其中的方法
import { reqRims } from '../../api'
const state = {
  // 监测站列表
  rims: [],
};
const actions = {
  // 发送请求获取商铺信息
  // async getShops ({ commit, state }) {
    // const { longitude, latitude } = state
    // 传入经纬度通过ajax请求获取数据
    // const result = await reqShops(longitude, latitude)
    // if (result.code === 0) { 
      // 说明成功获取数据
      // const shops = result.data
      // commit(RECEIVE_SHOPS, shops)
    // }
  // },
};
const mutations = {
  // 获取监测站列表
  [RECEIVE_RIMS] (state, rims) {
    state.rims = rims
  },
};
const getters = {};
export default {
  state,
  actions,
  mutations,
  getters
}