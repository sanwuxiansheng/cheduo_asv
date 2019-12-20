// 引入定义好的常量
import { RECEIVE_ASCAR, RESET_ASCAR, ADD_ASCAR, ALTER_ASCAR } from '../mutation-types';
import {reqAnnualCar, reqAlterCar, reqAddress} from '../../api'; 
const state = {
  // 年检车辆信息
  cars: [],
};
const mutations = {
  // 获取年检车辆信息
  [RECEIVE_ASCAR](state, {cars}) {
    state.cars = cars
  },
};
const actions = {
  async getCars(token, {commit}) {
    const result = await reqAnnualCar(token)
    if(result.errno == '10000') {
      const cars = result.datas;
      commit(RECEIVE_ASCAR, {cars})
    }
  },
  async addCars(asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin, asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token, {commit}) {
    const addCarsResult = await reqAddress(asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin, asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token);
    if (result.errno == '10000') {
      const vehicle_id = result.datas.vehicle_id
      commit(ADD_ASCAR, {vehicle_id})
      return addCarsResult;
    } else {
      return '添加车辆失败'
    }
  },
  async alterCar(vehicle_id, asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin,asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token) {
    const alterCarResult = await reqAlterCar(vehicle_id, asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin,asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token);
    if (result.errno == '10000') {
      return alterCarResult;
    } else {
      return '编辑车辆信息失败'
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