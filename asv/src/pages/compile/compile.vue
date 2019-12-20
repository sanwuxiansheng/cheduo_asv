<template>
<div class="compile_top">
  <Header :title="'年检代办'"></Header>
  <p>完善车辆信息，车多会为您的爱车智能分析年检类型和到期时间</p>
  <div class="compile">
    <van-cell is-link style="padding-left: 30px;height: 1.3rem">车牌号码<span @click="showCarPlate" class="plate">{{this.value1}}</span><input type="text" maxlength="6" v-model="asv_vehicle_plate_number"></van-cell>
    <van-popup v-model="isShowCarPlate" position="bottom" :style="{ height: '40%' }">
      <van-picker show-toolbar :columns="columns3" @cancel="onCancel1" @confirm="onConfirm1"/>
    </van-popup>
    <van-cell is-link style="height: 1.3rem">
      <van-field style="line-height: .36rem;padding: 8px 12px;border:none;"  v-model="value2" rows="1" autosize label="车辆类型" type="textarea" placeholder="请选择车辆所有人" @click="showCar" readonly="readonly"/>
      <van-popup v-model="isShowCar" position="bottom" :style="{ height: '40%' }">
        <van-picker show-toolbar title="请选择车辆类型" :columns="columns1" @cancel="onCancel2" @confirm="onConfirm2"/>
      </van-popup>
    </van-cell>
    <van-cell is-link style="height: 1.3rem">
      <van-field style="line-height: .36rem;padding: 8px 16px;border:none;" v-model="value3" rows="1" autosize label="车辆座位数" type="textarea" placeholder="请选择车辆座位数"  @click="showCarNub" :style="{paddingLeft: '12px'}" readonly="readonly"/>
      <van-popup v-model="isShowCarNub" position="bottom" :style="{ height: '40%' }">
        <van-picker show-toolbar title="请选择车辆座位数" :columns="columns2" @cancel="onCancel3" @confirm="onConfirm3"/>
      </van-popup>
    </van-cell>
    <div class="vin">
      <van-cell-group>
        <van-field  v-model="vinMessage" rows="1" autosize label="车架号" type="textarea" placeholder="请输入车架号后六位" style="padding-left: 28.5px"/>
        <img src="./img/question_icon.png" alt="">
      </van-cell-group>
    </div>
    <div class="engine">
      <van-cell-group>
        <van-field  v-model="engineMessage" rows="1" autosize label="发动机号" type="textarea" placeholder="请选择发动机号后6位" style="padding-left: 28.5px;"></van-field>
        <img src="./img/question_icon.png" alt="">
      </van-cell-group>
    </div>
    <van-cell is-link style="height: 1.3rem">
      <van-field style="line-height: .36rem;padding: 8px 12px;border:none;"  v-model="timeValue" rows="1" autosize label="车辆注册时间" type="textarea" placeholder="请选择注册日期" @click="showDay" readonly="readonly"></van-field>
      <van-popup v-model="isShowDay" position="bottom" :style="{ height: '40%' }">
        <van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" :formatter="formatter" @change="changeFn" @confirm="confirmFn" @cancel="cancelFn"/>
      </van-popup>
    </van-cell>
    <div class="accident">
      <van-cell-group>
        <van-switch-cell v-model="checked" title="未造成伤亡事故" style="padding-left: 30px;"  @change="onClose()"/>
      </van-cell-group>
    </div>
    <div class="delete" @click="dele()">删除车辆</div>
    <div class="save" @click="dialog(checked)">保存</div>
  </div>
</div>
</template>
<script>
import Header from '../../components/header/header';
import { Popup, Picker, DatetimePicker, Field, CellGroup, Dialog, Toast } from 'vant';
import {reqAddress, reqAnnualCar, reqAlterCar, reqCarDetail, removeCar} from '../../api';
import {RESET_ASCAR} from '../../store/mutation-types';
export default {
  components: {
    [Picker.name] : Picker,
    [Popup.name] : Popup,
    [Popup.DatetimePicker] : DatetimePicker,
    [Popup.Field] : Field,
    [Popup.CellGroup] : CellGroup,
    [Popup.Dialog] : Dialog,
    [Popup.Toast] : Toast,
  },
  data() {
    return {
      car_data: {},
      value1:'粤', // 车牌号归属地
      value2:'', // 车辆类型
      value3:'', // 车辆座位数
      isShowCar: false,
      isShowCarNub: false,
      isShowCarPlate: false,
      checked: false, // 是否是事故车
      columns1: ['公司车', '私家车'],
      columns2: ['2座', '5座', '6座'],
      columns3: ['京', '津', '冀', '黑', '鲁', '赣', '粤', '渝', '鄂', '湘', '新', '藏', '晋', '辽', '蒙', '吉', '沪', '苏', '浙', '皖', '闽', '豫', '桂', '琼', '川', '贵', '云', '陕', '甘', '青', '宁', '港', '澳'],
      currentDate: new Date(),
      minDate: new Date(2000, 1, 1),
      isShowDay: false,
      vinMessage: '', // 车架号
      engineMessage: '', // 发动机号(引擎号)
      timeValue: '', // 车辆注册时间
      vehicle_id:'', // 车库ID
      asv_vehicle_plate_number: '', // 车牌号
      result:{},
      res:{},
    }
  },
  methods: {
    // 获取cookie
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    // 获取车辆详情
    async reqcar(vehicle_id, _this, token) {
      if(vehicle_id) {
        try {
          _this.result = await reqCarDetail(vehicle_id, token);
        } catch (error) {
        }
        _this.car_data = _this.result.datas;
        _this.value1 = _this.result.datas.asv_vehicle_plate_number.slice(0,1); // 车辆归属地
        _this.asv_vehicle_plate_number = _this.result.datas.asv_vehicle_plate_number.slice(1); // 车牌号
        if (_this.result.datas.asv_vehicle_owners_type === "1") {
          _this.value2 = '私家车'
        } else {
          _this.value2 = '公司车'
        }
        _this.vinMessage = _this.result.datas.asv_vehicle_engine_no; // 车架号
        _this.engineMessage = _this.result.datas.asv_vehicle_vin; // 引擎号(发动机号)
        _this.timeValue = _this.result.datas.asv_vehicle_register_date; // 注册时间
        _this.value3 = _this.result.datas.asv_vehicle_seating + '座'; // 车座数
        if (_this.result.datas.is_accident) { // 是否是事故车
          _this.checked = false;
        } else {
          _this.checked = true;
        }
      }else if (!vehicle_id) {

      }
    },
    showCar() {
      this.isShowCar = true;
    },
    showCarNub() {
      this.isShowCarNub = true;
      this.show = true;
    },
    showCarPlate() {
      this.isShowCarPlate = true;
    },
    showDay() {
      this.isShowDay = true;
    },
    onConfirm1(value, index) {
      this.value1 = value;
      this.isShowCarPlate = false;
    },
    onCancel1() {
      this.isShowCarPlate = false;
    },
    onConfirm2(value, index) {
      this.value2 = value;
      this.isShowCar = false;
    },
    onCancel2() {
      this.isShowCar = false;
    },
    onConfirm3(value, index) {
      this.value3 = value;
      this.isShowCarNub = false;
    },
    onCancel3() {
      this.isShowCarNub = false;
    },
    formatter(type,value) { // 时间格式化 2019-09-08
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      } else if (type === 'day') {
        return `${value}日`;
      }
      return value;
    },
    changeFn() { // 值变化是触发
      this.changeDate = this.currentDate; // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() { // 确定按钮
      this.isShowDay = false;
      this.timeValue = this.timeFormat(this.currentDate);
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      return year + '-' + month + '-' + day;
    },
    cancelFn(){
      this.isShowDay = false;
    },
    onClose() {
      if (this.checked) {
        Dialog.confirm({
          title: '温馨提示',
          message: '造成人伤事故的车辆不能办理',
          messageAlign: 'auto',
          width: '80%',
          closeOnClickOverlay: 'true',
        }).then(() => {
          this.checked = true;
        }).catch(() => {
          this.checked = false;
        });
      }
    },
    async dialog (checked) {
      if (this.checked) {
        Dialog.confirm({
          title: '温馨提示',
          message: '造成人伤事故的车辆不能办理',
          messageAlign: 'auto',
          width: '80%',
          closeOnClickOverlay: 'true',
        }).then(() => {
          this.checked = true;
        })
      } else {
        Toast.loading({
          message: '保存中...',
          forbidClick: true
        });
        let token = this.$store.state.token;
        if (!token) {
          token = this.getCookie('token')
        }
        let value2;
        let asv_vehicle_plate_number = this.value1 + this.asv_vehicle_plate_number;
        let is_accident = checked ? 0 : 1;
        if(!this.vehicle_id && !checked){
          if (this.value2 == '私家车') {
            value2 = '1';
          } else {
            value2 = '2';
          }
          if (!asv_vehicle_plate_number || !this.value2 || !this.value3 || !this.engineMessage || !this.vinMessage) {
            Dialog.alert({
              message: '信息不完整，请填写完整信息'
            }).then(() => {
            });
          } else {
            let addres;
            try {
              console.log(asv_vehicle_plate_number, value2, this.value3, this.engineMessage, this.vinMessage, this.timeValue, is_accident, token);
              addres = await reqAddress(asv_vehicle_plate_number, value2, this.value3, this.engineMessage, this.vinMessage, this.timeValue, is_accident, token);
            } catch (error) {
            }
            const vehicle_id = addres.datas.vehicle_id;
            if (addres.errno == '10000') {
              let isShow = true;
              // setInterval(() => {
                this.$router.replace({path: '/asv/index', query: {isShow: isShow}})
              // }, 2000);
            } else {
              Toast(addres.msg);
            }
          }
        }else if(this.vehicle_id && !checked) {
          let alterres;
          if (this.value2 == '私家车') {
            value2 = '1';
          } else {
            value2 = '2';
          }
          try {
            alterres = await reqAlterCar(this.vehicle_id, asv_vehicle_plate_number, value2, this.value3, this.engineMessage, this.vinMessage, this.timeValue, is_accident, token);
          } catch (error) {
          }
          if (alterres.msg == 'ok') {
            let vehicle_id = this.vehicle_id;
            Toast.clear;
            Dialog.alert({
              message: '保存成功'
            }).then(() => {
              this.$router.replace({path: '/asv/index', query: {vehicle_id}})
            });
          } else {
            Dialog.alert({
              message: alterres.msg
            }).then(() => {
            });
          }
        }
      }
    },
    dele() {
      Dialog.confirm({
        title: '温馨提示',
        message: '确定要删除车辆?',
        messageAlign: 'auto',
        width: '80%',
        closeOnClickOverlay: 'true',
        confirmButtonColor: 'RGBA(153, 153, 153, 1)',
        cancelButtonColor: 'rgba(39, 130, 244, 1)',
      }).then(async () => {
        const index = this.$store.state.index;
        const cars = this.$store.state.cars;
        let token = this.$store.state.token;
        if (!token) {
          token = this.getCookie('token')
        }
        let res;
        try {
          console.log(token, this.vehicle_id);
          res = await removeCar(token, this.vehicle_id)
          if (res.errno == '10000') {
            Toast.success('删除成功');
            this.$router.replace('/asv/index');
          } else if(res.errno != '10000') {
            Toast.fail('车辆删除失败,存在处理中订单');
          } else {
            Toast.fail('车辆删除失败,请稍后重试');
          }
        } catch (error) {
        }
      }).catch(() => {
      });
    }
  },
  mounted () {
    this.vehicle_id = this.$route.query.data;
    let token = this.$store.state.token;
    if (!token) {
      token = this.getCookie('token')
    }
    this.reqcar(this.vehicle_id, this, token);
  },
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.compile_top
  padding-top: 88px;
  p 
    height:50px;
    font-size:24px;
    font-weight:400;
    color:rgba(255,74,38,1);
    line-height:50px;
  .compile
    position relative
    width 100%
    font-size:28px;
    font-weight:500;
    // span 
    //   font-size:28px;
    //   font-weight:500;
    //   color:rgba(198,205,213,1);
    input 
      height:50px;
      color:rgba(34,34,34,1);
      line-height:50px;
      padding-left 30px
      width 160px
    .plate
      width:78px;
      height:50px;
      border:1px solid rgba(39,130,244,1);
      margin-left 100px
      display inline-block
      padding-left 5px
      background url('./img/dropdown_cl_icon.png') no-repeat center right
      background-size auto
    // .div 
    //   width 100%
    //   height:80px;
    //   background:rgba(255,255,255,1);
    //   font-size:30px;
    //   font-weight:500;
    //   color:rgba(8,16,26,1);
    //   line-height 80px
    //   text-align left
    .engine
      img 
        position absolute
        width:24px;
        height:24px;
        z-index: 1;
        left: 92%;
        top: 26px;
    .vin 
      img 
        position absolute
        width:24px;
        height:24px;
        z-index: 1;
        left: 92%;
        top: 23px;
    .delete
      height:80px;
      background:rgba(255,255,255,1);
      font-size:30px;
      font-weight:500;
      color:rgba(255,74,38,1);
      line-height 80px
      margin 40px 0
    .save
      width:686px;
      height:88px;
      background:rgba(39,130,244,1);
      border-radius:44px;
      margin 60px auto
      font-size:36px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:88px;
</style>