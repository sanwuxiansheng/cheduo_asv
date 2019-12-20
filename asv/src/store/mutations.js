// 存储直接修改状态数据的方法的对象
// 引入定义的常量
import { RECEIVE_TOKEN,  RECEIVE_WX, RECEIVE_USER, RECEIVE_ASCAR, RESET_ASCAR, RECEIVE_INDEX, ADD_ASCAR, RECEIVE_CITY, RECEIVE_CARINDEX } from './mutation-types.js'
export default {
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  [RECEIVE_WX](state, isWX) {
    state.isWX = isWX
  },
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  [RECEIVE_ASCAR](state, cars) {
    state.cars = cars
  },
  [ADD_ASCAR](state, car) {
    state.cars.push(car)
  },
  [RESET_ASCAR](state, cars, index) {
    const carsList = cars;
    carsList.splice(index, 1);
    state.cars = carsList;
  },
  [RECEIVE_INDEX](state, index) {
    state.index = index;
  },
  [RECEIVE_CITY] (state, city) {
    state.address = city
  },
  [RECEIVE_CARINDEX] (state, carIndex) {
    state.carIndex = carIndex
  }
}