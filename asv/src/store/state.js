// 存储数据状态的对象
export default {
  // 是否是微信环境
  isWX: false,
  // token
  token: '',
  // 监测站列表
  rims: [],
  // 用户信息
  user: {},
  // 订单列表
  orders:[],
  // 优惠卷列表
  coupons: [],
  // 车辆ID
  vehicle_id: '',
  // 用户选择index
  index: null,
  // 用户车辆注册年限数组
  diff_year: [],
  // 当前车辆的index
  carIndex: null,
  // 用户选择的详细地址
  address:{},
}