// 引入ajax.js
import ajax from './ajax.js';
// const BASE = 'https://mc.cheduo.com/cheduo';
// const BASE = '/Java_api';
// const PHP = '/php';
const PHP = 'https://m.cheduo.com'
// 1.添加年检车辆
// eslint-disable-next-line camelcase
export const reqAddress = (asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin, asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token) => ajax(PHP + `/api/asv/car_add`, { asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin, asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token }, 'POST');
// 2.获取年检车辆;
export const reqAnnualCar = (token) => ajax(PHP + `/api/asv/car`, { token }, 'POST');
// 3.修改年检车辆
// eslint-disable-next-line camelcase
export const reqAlterCar = (vehicle_id, asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin,asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token) => ajax(PHP + `/api/asv/car_modify`, { vehicle_id, asv_vehicle_plate_number, asv_vehicle_owners_type, asv_vehicle_seating, asv_vehicle_vin, asv_vehicle_engine_no, asv_vehicle_register_date, is_accident, token }, 'POST');

// 4. 发送短信验证码
export const reqSendCode = (mobile) => ajax(PHP + `/api/normal/send_login_msg`, { mobile }, 'POST');

// 5. 手机号验证码登陆
export const reqSmsLogin = (mobile, vcode, regSource) => ajax(PHP + `/mc_java_api/cheduo/user/h5/sms_login.do`, { mobile, vcode, regSource });

// 6. 年检车辆详情
// eslint-disable-next-line camelcase
export const reqCarDetail = (vehicle_id, token) => ajax(PHP + `/api/asv/car_detail`, { vehicle_id, token }, 'POST');

// 7. 监测站
export const reqRims = () => ajax(PHP + `/api/asv`, {}, 'POST');

// 8. 优惠卷
export const reqCoupon = (token) => ajax(PHP + `/api/asv/coupon`, {token}, 'POST');

// 9. 年检订单详情
export const reqOrder = (order_code, token) => ajax(PHP + `/api/asv/order`, {order_code, token}, 'POST');

// 10. 删除车辆
export const removeCar = (token, carId) => ajax(PHP + `/api/asv/car_del`, {token, carId});

// 11. 六年免检
export const reqSix = (source = '', vehicle_id, token) => ajax(PHP + `/asv/index`, {source, vehicle_id, token}, 'POST');

// 12. 违章
export const reqWz = (source, vehicle_id, token) => ajax(PHP + `/wz/index`, {source, vehicle_id, token}, 'POST');

// 13. 接车代办创建订单
export const reqAddOrder = (vcode, vehicle_id, contact_mobile, contact_name, region_code, appointment_lat = 22.5836023500, appointment_lng = 113.8637316227, appointment_datetime, address, source, token) => ajax(PHP + `/api/asv/create_order_deal_by_cheduo`, {vcode, vehicle_id, contact_mobile, contact_name, region_code, appointment_lat, appointment_lng, appointment_datetime, address, source, token}, 'POST');

// 14. 获取省市县
export const reqCity = () => ajax(PHP + `/api/normal/city`, {}, 'POST');

// 15. 通过经纬度获取用户所在具体位置
export const reqSite = () => ajax(PHP + `/api/normal/address`, {}, 'POST');

// 16. 支付宝支付接口
export const reqAlipay = (order_code, asv_coupon_id = '', token) => ajax(PHP + `/api/asv/alipay_awake`, {order_code, asv_coupon_id, token}, 'POST');

// 17. 外部调用微信支付接口
export const reqWechat = (order_code, asv_coupon_id = '', token) => ajax(PHP + `/api/asv/wechat_h5_awaken`, {order_code, asv_coupon_id, token}, 'POST');

// 18. 微信内部调用微信支付接口
export const reqInwechat = (order_code, openid, asv_coupon_id = '', token) => ajax(PHP +  `/api/asv/jsapi_awaken`, {order_code, openid, asv_coupon_id, token}, 'POST');

// 19. 获取微信公号openID
export const reqWxopenID = (code) => ajax(PHP + `/api/normal/mp_openid`, {code});

// 20. 获取年检站
export const reqShop = (province_code, city_code, token, area_code='', shop_type_id=4, lng=113.85993, lat=22.57246, page=1, size=8) => ajax(PHP + `/api/asv/shop`, {province_code, city_code, area_code, token, shop_type_id, lng, lat, page, size}, 'POST');

// 21. 获取年检订单列表
export const reqOrderList = (token) => ajax(PHP + `/api/asv/order_list`, {token}, 'POST');

// 22. 年检订单退款
export const reqRefund = (order_code, type, token) => ajax(PHP +  `/api/asv/refund`, {order_code, type, token}, 'POST');

// 23. 订单支付页
export const reqOrderPay = (order_code, token) => ajax(PHP + `/api/asv/pay_order_det`, {order_code, token}, 'POST');

// 24. 用户已经办理
export const saveAsvDate = (vehicle_id, token) => ajax(PHP + `/api/asv/save_asv_date`, {vehicle_id, token}, 'POST');

// 25. 测试token是否过期
export const reqToken = (token) => ajax(PHP + `/mc_java_api/cheduo/h5/user/forbidden_token`, {token});