// 引入定义好的常量
import { RECEIVE_ORDERS, RECEIVE_ORDER, FOUND_ORDER } from '../mutation-types';
import {reqOrderList, reqOrder, reqAddOrder} from '../../api'; 
const state = {
  // 年检车辆信息
  orders: [],
};
const mutations = {
  // 获取年检车辆信息
  [RECEIVE_ORDERS](state, {orders}) {
    state.orders = orders
  },
};
const actions = {
  async getOrderList(token, {commit}) {
    const result = await reqOrderList(token)
    if(result.errno == '10000') {
      const orders = result.datas;
      commit(RECEIVE_ORDERS, {orders})
    }
  },
  async getOrder(order_code, token) {
    const orderResult = await reqOrder(order_code, token);
    if (result.errno == '10000') {
      return orderResult;
    }
  },
  async addOrder(vcode, vehicle_id, contact_mobile, contact_name, region_code, address, source, token) {
    const addOrderResult = await reqAddOrder(vcode, vehicle_id, contact_mobile, contact_name, region_code, address, source, token);
    if (result.errno == '10000') {
      return addOrderResult;
    }
  }
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters
}