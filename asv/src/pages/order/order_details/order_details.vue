<template>
<div class="details">
  <header>
    <div class="header_img" @click="goTo('/asv/order')">
      <img src="../img/left.png" alt="">
    </div>
    <span class="header_title">
      <span class="header_title_text ellipsis">订单详情</span>
    </span>
  </header>
  <div class="inner" v-bind:style="{height:curHeight}">
    <div class="scroll">
      <div class="header">
        <div class="header_top">
          <img v-if="order_status == '1'" src="../img/to_be_pay.png" alt="">
          <img v-if="order_status == '2'" src="../img/order_to_be_paid.png" alt="">
          <img v-if="order_status == '3'" src="../img/order_completed.png" alt="">
          <img v-if="order_status == '4'" src="../img/to_be_audited.png" alt="">
          <img v-if="order_status == '5'" src="../img/order_completed.png" alt="">
          <img v-if="order_status == '6'" src="../img/order_processing.png" alt="">
          <img v-if="order_status == '7'" src="../img/order_completed.png" alt="">
          <img v-if="order_status == '8'" src="../img/order_cancelled.png" alt="">
          <span v-if="order_status == '1'">待支付</span><span v-if="order_status == '2'">处理中</span><span v-if="order_status == '3'">已收款</span><span v-if="order_status == '4'">处理中</span><span v-if="order_status == '5'">已完成</span><span v-if="order_status == '6'">退款中</span><span v-if="order_status == '7'">已退款</span><span v-if="order_status == '8'">已取消</span>
        </div>
      </div>
      <div class="center">
        <ul class="title">
          <li>订单信息</li>
          <li>订单编号</li>
          <li>检测站</li>
          <li>接车时间</li>
          <li>接车地址</li>
          <li>下单时间</li>
          <li>订单金额</li>
        </ul>
        <ul class="list">
          <li></li>
          <li>{{composite.order_code}}</li>
          <li>{{composite.shop_name}}</li>
          <li>{{asv.appointment_datetime}}</li>
          <li>{{asv.address}}</li>
          <li>{{composite.pay_time | formatDate}}</li>
          <li>￥{{composite.pay_money}}</li>
        </ul>
      </div>
      <div class="car_details">
        <ul class="title">
          <li>年检信息</li>
          <li>车牌号码</li>
          <li>车架号</li>
          <li>发动机号</li>
          <li>注册日期</li>
          <li>车座位数</li>
          <li>年检到期</li>
          <li>订单金额</li>
        </ul>
        <ul class="list">
          <li></li>
          <li>{{vehicle.asv_vehicle_plate_number}}</li>
          <li>{{vehicle.asv_vehicle_vin}}</li>
          <li>{{vehicle.asv_vehicle_engine_no}}</li>
          <li>{{vehicle.asv_vehicle_register_date}}</li>
          <li>{{vehicle.asv_vehicle_seating}}座 </li>
          <li>{{vehicle.check_day}}</li>
          <li>{{composite.pay_money}}元</li>
        </ul>
      </div>
      <div class="user_details">
        <ul class="title">
          <li>用户信息</li>
          <li>姓名</li>
          <li>手机号码</li>
          <li>联系地址</li>
        </ul>
        <ul class="list">
          <li></li>
          <li>{{asv.contact_name}}</li>
          <li>{{asv.contact_mobile}}</li>
          <li>{{asv.address}}</li>
        </ul>
      </div>
    </div>
    
  </div>
</div>
</template>
<script>
import BScroll from 'better-scroll';
import {reqOrder} from '../../../api';
import { Toast } from 'vant';
export default {
  data () {
    return {
      curHeight:0,//当前所需屏幕高度  
      order_code: '',
      composite: {}, // 订单信息
      asv: {}, // 用户信息
      vehicle: {}, // 年检信息
      order_status: '', // 订单状态
    }
  },
  filters: {
    formatDate: function (value) {
      let time = parseInt(value);
      time = time*1000;
      let date = new Date(time);
      // console.log(time, date);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  methods: {
    goTo (path) {
      this.$router.push(path)
    },
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
      // console.log(this.curHeight, h);
    },
    getCookie (name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
  },
  async mounted () {
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
    this.$nextTick(() => {
      this.scroll = new BScroll('.inner', {
        click: true,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        },
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      })
    })
    this.beforeMount(50);
    this.order_code = this.$route.query.order_code;
    if (!this.order_code) {
      this.order_code = theRequest.order_code;
    }
    // // console.log(this.order_code);
    // this.order_status = this.$route.query.order_status;
    // // console.log(this.order_status);
    let token = this.$store.state.token;
    if (!token) {
      token = this.getCookie('token');
    }
    let result;
    try {
      result = await reqOrder(this.order_code, token);
      this.order_status = result.datas.asv.order_status;
      // console.log(this.order_status);
    } catch (error) {
      // console.log(error);
    }
    // console.log(result);
    if (result.errno == '10000') {
      this.composite = result.datas.composite;
      // console.log(this.composite);
      this.asv = result.datas.asv;
      this.vehicle = result.datas.vehicle;
    } else {
      Toast('网络出现问题，联网重新刷新试一试吧！')
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import "../../../common/stylus/mixins.styl"
.details
  position relative
  background-color #fff
  height 100%
  max-width 750px
  background:linear-gradient(0deg,rgba(248,248,248,1),rgba(248,248,248,1),rgba(248,248,248,1),rgba(248,248,248,1),rgba(107,169,247,1),rgba(39,130,244,1));
  header
    position fixed
    left 50%
    top 0
    transform translate(-50%)
    max-width 750px
    width 750px
    height:88px;
    box-sizing border-box
    overflow hidden
    background-color rgba(39,130,244,1)
    z-index 100
    .header_img
      width:50px;
      height:100%;
      line-height 50px
      position: absolute;
      top: 25%;
      left: 5%;
      img
        width 20px
        height 36px
    .header_title
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      width 50%
      color #fff
      text-align center
      .header_title_text
        width:149px;
        height:34px;
        font-size:36px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:35px;
  .header
    max-width 750px
    width 750px
    padding-top 88px
    margin 88px 0 39px 31px
    .header_top
      text-align left
      img 
        width 46px
        height 46px
      span 
        height:46px;
        font-size:48px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        margin-left 15px
        line-height 46px
  .center
    display flex
    width 690px
    margin 20px 30px
    background-color #ccc
    line-height 89px
    border-radius:16px;
    .title
      flex 1
      font-size:30px;
      font-weight:500;
      color:rgba(167,171,170,1);
      text-align left
      li 
        height 89px
        background-color #fff
        padding-left 40px
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          font-size:32px;
          font-weight:bold;
          color:rgba(69,73,72,1);
          border-radius:16px 0 0 0;
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(4)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(5)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(6)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(7)
          border-radius:0 0 0 16px;
    .list 
      flex 2
      text-align left
      font-size:30px;
      font-weight:500;
      color:rgba(69,73,72,1);
      li 
        height 89px
        background-color #fff
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          bottom-border-5px(RGBA(238, 238, 238, 1))
          border-radius: 0 16px 0 0;
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(4)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(5)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(6)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(7)
          border-radius:0 0 16px 0;
  .car_details
    display flex
    width 690px
    margin 20px 30px
    background-color #ccc
    border-radius:16px;
    line-height 89px
    .title
      flex 1
      font-size:30px;
      font-weight:500;
      color:rgba(167,171,170,1);
      text-align left
      li 
        height 89px
        padding-left 40px
        background-color #fff
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          font-size:32px;
          font-weight:bold;
          color:rgba(69,73,72,1);
          border-radius:16px 0 0 0;
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(4)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(5)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(6)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(7)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(8)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(9)
          border-radius:0 0 0 16px;
    .list 
      flex 2
      text-align left
      font-size:30px;
      font-weight:500;
      color:rgba(69,73,72,1);
      li 
        height 89px
        background-color #fff
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          bottom-border-5px(RGBA(238, 238, 238, 1))
          border-radius:0 16px 0 0;
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(4)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(5)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(6)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(7)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(8)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(9)
          border-radius:0 0 16px 0;
  .user_details
    display flex
    width 690px
    margin 20px 30px
    background-color #ccc
    border-radius:16px;
    line-height 89px
    .title
      flex 1
      font-size:30px;
      font-weight:500;
      color:rgba(167,171,170,1);
      text-align left
      li 
        height 89px
        background-color #fff
        padding-left 40px
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          font-size:32px;
          font-weight:bold;
          color:rgba(69,73,72,1);
          border-radius:16px 0 0 0;
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
    .list 
      flex 2
      text-align left
      font-size:30px;
      font-weight:500;
      color:rgba(69,73,72,1);
      li 
        height 89px
        background-color #fff
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: normal;
        &:nth-of-type(1)
          border-radius:0 16px 0 0;
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(2)
          bottom-border-5px(RGBA(238, 238, 238, 1))
        &:nth-of-type(3)
          bottom-border-5px(RGBA(238, 238, 238, 1))
</style>