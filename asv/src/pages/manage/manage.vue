<template>
<div style="height:100%">
  <Header :title="'专人上门代办'"/>
  <div class="manage">
    <div class="steps">
      <el-steps :active="-1" align-center style="padding: 10px">
        <el-step title="提交订单" ></el-step>
        <el-step title="师傅上门取车" ></el-step>
        <el-step title="办理年检" ></el-step>
        <el-step title="交车完成" ></el-step>
      </el-steps>
    </div>
    <div class="center">
      <div class="timer">
        <p>预约时间</p>
        <input type="text" value="" placeholder="请选择接车时间" @click="showPopFn()" v-model="timeValue" readonly="readonly">
        <van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
          <van-datetime-picker v-model="currentDate" type="datetime" title="请选择预约时间" :formatter="formatter" :min-date="minDate" @change="changeFn()" @confirm="confirmFn()" @cancel="cancelFn()" />
        </van-popup>
        <img src="./img/right.png" alt="">
      </div>
      <div class="site">
        <div class="site_top">
          <span>取还车地址</span>
          <span>{{this.city}}</span>
          <div class="site_button" @click="site()">请选择</div>
          <van-popup v-model="isSite" position="bottom" ><van-area :area-list="areaList" @confirm="Onconfirm" @cancel="Oncancel" value="440306"/></van-popup>
          <img src="./img/right.png" alt="">
        </div>
        <div class="site_down">
          <input type="text" value="" placeholder="请完善详细的街道及门牌号" v-model="address">
          <img src="./img/location_icon.png" alt="" @click="goTo('/asv/map')">
        </div>
      </div>
    </div>
    <div class="message">
      <div class="name">
        <p>车主姓名</p>
        <input type="text" value="" placeholder="请填写车主姓名" v-model="userName" id="INPUT">
      </div>
      <div class="phone">
        <p>联系电话</p>
        <input type="number" value="" placeholder="请填写联系电话" v-model="mobile" maxlength="11"  id="INPUT">
      </div>
      <div class="code">
        <p>验证码</p>
        <input type="text" value="" placeholder="请填写验证码" v-model="vcode"  id="INPUT" maxlength="6">
        <span @click="sendCode()">{{content}}</span>
      </div>
    </div>
    <ul class="list">
      <li class="item">
        <img src="./img/safetywarning_icon.png" alt="">
        <p>准备好年检所需资料，在指定地点和车辆一并移交给师 傅，办理完成后，当天送回。</p>
      </li>
      <li class="item">
        <img src="./img/safetywarning_icon.png" alt="">
        <p>在办理年检前，请先确认车辆是否有违章。<span @click="isWZfn()">点击查看</span></p>
      </li>
    </ul>
    <div class="button" @click="submit()">提交订单</div>
  </div>
</div>
</template>
<script>
import Header from '../../components/header/header';
import AreaList from '../../../static/js/area.js';
import { DatetimePicker, Popup, Cell, Button, Field, Dialog, Toast, Area } from 'vant';
import {reqSendCode, reqWz, reqAddOrder, reqCity, reqSites, reqToken} from '../../api';
import {RECEIVE_ORDERS} from '../../store/mutation-types';
import eventBus from '../../event/eventBus.js';
import input_on from '../../../static/js/input.js';
export default {
  components: {
    [DatetimePicker.name] : DatetimePicker ,
    [Popup.name] : Popup,
    [Cell.name] : Cell,
    [Button.name] : Button,
    [Field.name] : Field,
    [Area.name] : Area,
  },
  data() {
    return {
      msg: '',
      minHour: 8,
      maxHour: 18,
      minDate: new Date(),
      currentDate: new Date(),
      changeDate: new Date(),
      show: false, // 用来显示弹出层
      timeValue: '', // 选择的接车时间
      mobile: '', // 手机号码
      vcode: '', // 短信验证码
      userName: '', // 用户姓名
      isSite: false, // 是否展示省市区组件
      areaList: AreaList,
      city: '广东省 深圳市 宝安区',
      region_code: '440306',
      address: '', // 详细地址
      result: {}, // 创建订单返回的对象
      content:'发送验证码',
      totalTime: 60,
    }
  },
  methods: {
    getCode() {
      let url = location.search;
      let theRequest = new Object();
      /* eslint-disable */
      if (url.indexOf("?") !=-1 ) {
        let str = url.substr(1);  // substr方法返回从参数值从开始到结束的字符串
        /* eslint-disable */
        let strs = url.split("&");
        for (let i = 0; i < strs.length; i++) {
          /* eslint-disable */
          theRequest[ strs[ i ].split( "=" )[ 0 ] ] = ( strs[ i ].split( "=" )[ 1 ] ); 
        }
      }
    },
    setCookie (name, value) {
      var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 2 * 60 * 60 * 1000); //设置date为当前时间加一年
      str += ";expires=" + date.toGMTString();
      // console.log(str)
      document.cookie = str;
    },
    calculagraph() { // 倒计时函数
      // console.log(this.totalTime);
      let totalTime = this.totalTime;
      let _this = this;
      let clock = setInterval(() => {
        if (_this.totalTime > 0) {
          _this.totalTime--;
          _this.content = _this.totalTime + 's后获取';
          _this.isFloat = true;
          _this.showKeyboard = true;
        } else if(_this.totalTime <= 0 && _this.isFloat) {     //当倒计时小于0时清除定时器
          clearInterval(clock)
          _this.content = '发送验证码';
          _this.isFloat = false;
          _this.showKeyboard = false;
          _this.isGet = true;
          _this.totalTime = 60;
        } 
      },1000)
    },
    goTo (path) {
      this.$router.push(path);
    },
    Onconfirm(e) { // 选择省市区确定事件
      let cityName = '';
      cityName = e[0].name + e[1].name + e[2].name;
      this.region_code = e[2].code;
      this.setCookie('region_code', this.region_code)
      // console.log(cityName);
      this.city = cityName;
      this.isSite = false;
    },
    Oncancel() { // 选择省市区取消事件
      this.region_code = '440306';
      this.isSite = false;
    },
    site() {
      this.isSite = !this.isSite;
    },
    isWZfn () {
      if(this.result.datas) {
        if (this.result.datas.wz && this.result.errno == "10000") {
          Dialog.alert({
            title: '温馨提示',
            message: '系统查询到您的车辆存在违章未处理 情况，请先处理好违章，否则年检将 无法办理',
            messageAlign: 'left',
            width: '80%',
            closeOnClickOverlay: 'true',
            confirmButtonText: '处理违章',
            confirmButtonColor: '#2782F4FF',
            confirm: function() {
              // alert('111')
              // const res = await reqWz(source, vehicle_id, token)
              
            }
          }).then(() => {
            // alert('222')
            window.location.href = "https://m.cheduo.com/wz/index?source="+source+'&vehicle_id='+vehicle_id+'&token='+token;
            // on close
          });
        } else if (!this.userName && !this.mobile && !this.vcode) {
          Dialog.alert({
            title: '温馨提示',
            message: '信息不完整，请填写完整信息',
            messageAlign: 'left',
            width: '80%',
            closeOnClickOverlay: 'true',
            confirmButtonText: '确定',
            confirmButtonColor: '#2782F4FF'
          }).then(() => {
            // on close
          });
        }else if (!result.datas.wz && result.errno == "10000") {
          Dialog.alert({
            title: '温馨提示',
            message: '系统未查询到您的车辆存在违章',
            messageAlign: 'left',
            width: '80%',
            closeOnClickOverlay: 'true',
            confirmButtonText: '确定',
            confirmButtonColor: '#2782F4FF',
          }).then(() => {
            // on close
          });
        } 
      }else {
        Toast({
          message: '请您先提交订单',
          forbidClick: true
        });
      }
    },
    async submit(){
      // debugger;
      Toast.loading({
        message: '正在提交订单，请稍候',
        forbidClick: true
      })
      const vehicle_id = this.getCookie('vehicle_id');
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token');
      }
      try {
        let res = await reqToken(token)
        if (res.errno != '10000') {
          Toast('登录超时，请重新登录')
          this.$router.replace('/asv/login')
        } else {
          let source = this.getCookie('source');
          if (!source) {
            source = 'H5-cheduo'
          }
          let appointment_lat = this.getCookie('lat');
          let appointment_lng = this.getCookie('lng');
          if (!appointment_lat || !appointment_lng) {
            appointment_lng = 113.8637316227;
            appointment_lat = 22.5836023500;
          }
          if (!this.userName && !this.mobile && !this.vcode && !this.timeValue) {
            Dialog.alert({
              title: '温馨提示',
              message: '信息不完整，请填写完整信息',
              messageAlign: 'left',
              width: '80%',
              closeOnClickOverlay: 'true',
              confirmButtonText: '确定',
              confirmButtonColor: '#2782F4FF'
            }).then(() => {
              // on close
            });
            return false;
          }
          let result;
          try {
            result = await reqAddOrder(this.vcode, vehicle_id, this.mobile, this.userName, this.region_code, appointment_lat, appointment_lng, this.timeValue, this.address, source, token);
            // console.log(result);
          } catch (error) {
            // console.log(error);
          }
          this.result = result;
          if (this.result.datas.wz && this.result.errno == "10000") {
            Dialog.alert({
              title: '温馨提示',
              message: '系统查询到您的车辆存在违章未处理 情况，请先处理好违章，否则年检将 无法办理',
              messageAlign: 'left',
              width: '80%',
              closeOnClickOverlay: 'true',
              confirmButtonText: '处理违章',
              confirmButtonColor: '#2782F4FF',
              confirm: function() {
                // alert(111)
                // const res = await reqWz(source, vehicle_id, token)
                
              }
            }).then(() => {
              // alert(222)
              window.location.href = "https://m.cheduo.com/wz/index?source="+source+'&vehicle_id='+vehicle_id+'&token='+token;
              // on close
            });
          }else if (this.result.errno == '10000') {
            const order_code = this.result.datas.order_code;
            Toast.clear();
            // this.getCode()
            if (this.$store.state.isWX) {
              let payUrl = `https://m.cheduo.com/html/paydir/asv-pay?order_code=${order_code}&token=${token}`;
              let wxUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9bc2c68483cb54c&redirect_uri="+payUrl+"&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect"
              window.location.href = wxUrl;
              // console.log(wxUrl);
            }else {
              this.$router.push({ path: '/paydir/asv-pay', query: { order_code } })
            }
            const orders = this.$store.state.orders.push(order_code);
            this.$store.commit('RECEIVE_ORDERS', orders);
            // console.log(this.$store.state.orders);
          } else if (this.result.errno != '10000') {
            // console.log(this.result);
            Toast({
              message: this.result.msg,
              forbidClick: true
            });
          }
        }
      } catch (error) {
        // console.log(error);
      }
      
    },
    getCookie(name) {
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    showPopFn() { // 选择时间点击函数
      this.show = true;
    },
    showPopup() {
      this.show = true;
    },
    changeFn() { // 值变化是触发
      this.changeDate = this.currentDate // Tue Sep 08 2020 00:00:00 GMT+0800 (中国标准时间)
    },
    confirmFn() { // 确定时间按钮
      this.timeValue = this.timeFormat(this.currentDate);
      this.setCookie('timeValue', this.timeValue)
      this.show = false;
    },
    cancelFn(){ // 取消时间按钮
      this.show = true;
    },
    timeFormat(time) { // 时间格式化 2019-09-08
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let day = time.getDate();
      let hour = time.getHours();
      let hours = 1 + hour;
      return year + '-' + month + '-' + day + '-' + hour +':00' + '-' + hours + ':00'
    },
    formatter(type, value) {
      if (type === 'hour') {
        let values = value++;
        return `${values}:00-${value}:00`;
      } 
      return value;
    },
    async sendCode() {
      let text = this.content;
      let result;
      // console.log(this.mobile);
      if (text == '发送验证码' && this.mobile) {
        // console.log(this.mobile);
        result = await reqSendCode(this.mobile);
        Toast(result.msg)
        // console.log(result);
        this.calculagraph()
        if (result && result.errno == '10000') {
          Toast(result.msg)
        } else{
          Toast('验证码发送失败，请稍后重试')
        }
      } else {
        Toast('请填写正确的手机号')
      }
      
    }
  },
  mounted() {
    this.timeFormat(new Date());
    if (this.$store.state.address) {
      this.address = this.$store.state.address.address;
    }
    let timeValue = this.getCookie('timeValue');
    if (timeValue) {
      this.timeValue = timeValue;
    }
    let code = this.getCookie('region_code');
    if (coed) {
      this.region_code = code;
    }
  },
  computed: {
    isRightPhone () {
      return /^[1]([3-9])[0-9]{9}$/.test(this.mobile)
    }
  },
  updated () {
    input_on();
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.manage
  width 100%
  padding-top: 88px;
  position relative
  .steps
    width 100%
    height:166px;
    background:rgba(254,254,254,1);
    margin-bottom 22px
  .center
    box-sizing:border-box
    width:100%;
    height:249px;
    background:rgba(254,254,254,1);
    padding 10px 30px
    margin 22px auto
    .timer
      width:100%;
      height:84px;
      background:rgba(254,254,254,1);
      bottom-border-1px(#e4e4e4)
      input
        width 60%
        background-color rgba(254,254,254,1)
        margin-left 50px
        height .6rem
        &::-webkit-input-placeholder 
          font-size: 24px;
      img 
        width:16px;
        height:28px;
        display inline-block
      p
        width:121px;
        height:28px;
        font-size:30px;
        font-weight:500;
        color:rgba(8,16,26,1);
        line-height:84px;
        margin-left 20px
        display inline-block
    .site
      width 100%
      text-align left 
      margin-left 40px
      .site_top
        width 100%
        height 82px
        .site_button
          text-align center
          display inline-block
          width:104px;
          height:40px;
          line-height 40px
          border:2px solid rgba(39,130,244,1);
          color rgba(39,130,244,1)
          border-radius:4px;
          margin 0 20px 0 30px
        img 
          width:16px;
          height:28px;
          display inline-block
        span 
          height:27px;
          font-size:28px;
          font-weight:500;
          color:rgba(8,16,26,1);
          line-height:82px;
          margin-left 5px
      .site_down
        width 100%
        height 82px
        line-height 82px
        margin-left 5px
        input 
          width:570px;
          height:60px;
          font-size:24px;
          font-weight:500;
          color:#08101a;
          line-height:82px;
          text-align left
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          &::-webkit-input-placeholder 
            font-size: 24px;
        img 
          display inline-block
          width 36px
          height 44px
  .message
    width:100%;
    height:250.5px;
    background:rgba(255,255,255,1);
    margin-top 22px
    .name
      bottom-border-1px(#e4e4e4)
      width:100%;
      height:82.5px;
      background:rgba(254,254,254,1);
      input
        width 60%
        background-color rgba(254,254,254,1)
        margin-left 50px
        height .65rem
        font-size 24px
        font-weight:500;
        &::-webkit-input-placeholder 
          font-size: 24px;
      p
        width:121px;
        height:28px;
        font-size:30px;
        font-weight:500;
        color:rgba(8,16,26,1);
        line-height:82.5px;
        margin-left 20px
        display inline-block
        text-align left
    .phone
      bottom-border-1px(#e4e4e4)
      width:100%;
      height:82.5px;
      background:rgba(254,254,254,1);
      input
        width 60%
        background-color rgba(254,254,254,1)
        margin-left 50px
        height .65rem
        font-size 24px
        font-weight:500;
        &::-webkit-input-placeholder 
          font-size: 24px;
      p
        width:121px;
        height:28px;
        font-size:30px;
        font-weight:500;
        color:rgba(8,16,26,1);
        line-height:82.5px;
        margin-left 20px
        display inline-block
        text-align left
    .code
      bottom-border-1px(#e4e4e4)
      width:100%;
      height:82.5px;
      background:rgba(254,254,254,1);
      input
        width 43%
        background-color rgba(254,254,254,1)
        padding-left 48px
        height .65rem
        font-size 24px
        font-weight:500;
        &::-webkit-input-placeholder 
          font-size: 24px;
      p
        width:121px;
        height:28px;
        font-size:30px;
        font-weight:500;
        color:rgba(8,16,26,1);
        line-height:82.5px;
        margin-left 40px
        display inline-block
        text-align left
      span 
        width:143px;
        height:26px;
        font-size:28px;
        font-weight:500;
        color:rgba(231,141,0,1);
        line-height:29px;
    
  .list 
    width 100%
    box-sizing:border-box
    padding 5px 30px
    .item
      display flex
      margin 20px auto
      text-align left 
      img 
        display inline-block
        width:25px;
        height:29px;
        margin 0 10px
      p 
        height:53px;
        font-size:26px;
        font-weight:500;
        color:rgba(198,205,213,1);
        line-height:35px;
        span 
          color rgba(231, 141, 0, 1)
  .button
    position absolute
    bottom -65px
    width:680px;
    left 50%
    transform translate(-50%)
    height:100px;
    background:rgba(39,130,244,1);
    border-radius 40px
    color rgba(255,255,255,1)
    line-height 100px
    text-align center
    font-size:32px;
    font-weight:bold;
    margin 0 auto
</style>