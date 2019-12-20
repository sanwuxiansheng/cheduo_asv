<template>
<div>
  <Header :title="'全部订单'"></Header>
  <PageNotFound v-if="!orderList.length" :title="'暂无订单'"></PageNotFound>
  <div class="order" v-bind:style="{height:curHeight}">
    <ul>
      <li v-for="(item,index) in orderList" :key="index" @click.stop="goTo('/asv/order_det', index)">
        <div class="item_up">年检代办
          <span v-if="item.order_status == '4'">处理中</span>
          <span v-if="item.order_status == '1' && isFloat">待支付</span>
          <span v-if="item.order_status == '2'">处理中</span>
          <span v-if="item.order_status == '3'">已收款</span>
          <span v-if="item.order_status == '5'">已完成</span>
          <span v-if="item.order_status == '6'">退款中</span>
          <span v-if="item.order_status == '8' || !isFloat">已取消</span>
          <span v-if="item.order_status == '7'">已退款</span>
          <!-- <p v-if="item.order_status == '1' && isFloat" style="font-size:12px;font-weight:500;color:rgba(255,134,22,1);display:inline-block;float:right;padding-right:10px;">请在{{timer[index]}}分钟内完成支付</p> -->
        </div>
        <div class="item_contont">
          <div class="center">
            <span>订单编号</span><span>车牌号码</span><span>下单时间</span>
          </div>
          <div class="middle">
            <!-- <span>CD123456</span><span>粤BAQ806</span><span>2019-10-30 10:52:23</span> -->
            <span>{{item.order_code}}</span><span>{{item.plate}}</span><span>{{item.add_time | formatDate}}</span>
          </div>
        </div>
        <div class="item_down">
          <span class="text">订单金额</span>
          <span class="money" :class="{active: item.order_status !== '2'}">￥{{item.original_money}}</span>
          <div class="btn" v-if="item.order_status == '3'" @click.stop="onRefund(index)">申请退款</div>
          <!-- <div class="btn"  v-if="item.order_status == '1'" @click.stop="onGoPay(index)">去支付</div> -->
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
import Header from '../../components/header/header';
import PageNotFound from '../../components/404/404';
import {reqOrderList, reqRefund} from '../../api';
import { Toast } from 'vant';
import BScroll from 'better-scroll';
export default {
  name: 'order',
  component:{
    Header,
    PageNotFound
  },
  data () {
    return {
      curHeight:1140,//当前所需屏幕高度 
      isShow: false,
      orderList: [],
      totalTime: 1800, // 支付倒计时
      isFloat: true, // 是否超过支付时间
      add_time: [], // 订单下单的时间
      timer:[], // 付款倒计时
    }
  },
  filters: {
    formatDate: function (value) {
      let time = parseInt(value);
      time = time*1000;
      let date = new Date(time);
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
  watch: {
    add_time () {
      for (let index = 0; index < this.add_time.length; index++) {
        const element = this.add_time[index];
        let time;
        setInterval(() => {
          time = this.payTimer(element);
        }, 60000);
        this.timer.push(time);
      }
    }
  },
  methods: {
    onGoPay(_index) { // 订单为待支付状态时去支付
      const order = this.orderList[_index]
      const order_code = order.order_code;
      console.log(order_code);
      this.$router.replace({path: '/paydir/asv-pay', query: {order_code}})
    },
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
    },
    goTo (path, index) {
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token');
      }
      const order_code = this.orderList[index].order_code;
      // console.log(order_code);
      this.$router.push({path, query: {order_code}})
    },
    getCookie (name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    payTimer (timer) {
      let timestamp = Date.parse(new Date())/1000;
      let time = (parseInt(timer)+ 1800) - timestamp;
      // console.log(timestamp, time, parseInt(timer)+1800);
      if (time > 0) {
        this.totalTime = parseInt(time/60);
        this.isFloat = true;
      } else if (time <= 0) {
        this.isFloat = false;
        this.totalTime = 0;
      }
      // console.log(this.totalTime);
      return this.totalTime
    },
    async onRefund(index) {
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token')
      }
      const order = this.orderList[index]
      const order_code = order.order_code;
      // console.log(order_code);
      const order_status = order.order_status;
      const isWX = this.$store.state.isWX;
      const type = '3';
      let res;
      try {
        console.log(order_code, type, token);
        res = await reqRefund(order_code, type, token);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      if (res.errno == '10000') {
        Toast('申请退款中')
        this.$router.push({path: '/asv/order_det', query: {order_code, order_status}})
      } else if(!token) {
        Toast('登录超时，请重新登录')
      }
    }
  },
  async mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.order', {
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
    this.payTimer();
    let token = this.$store.state.token;
    if (!token) {
      token = this.getCookie('token');
    }
    // console.log(token);
    if (token) {
      let result;
      try {
        result = await reqOrderList(token);
        this.orderList = result.datas;
        for (let index = 0; index < this.orderList.length; index++) {
          const element = this.orderList[index];
          this.add_time.push(element.add_time);
        }
        // console.log(this.orderList);
      } catch (error) {
        // console.log(error);
      } 
    } else {
      this.$router.replace('/asv/login')
    }
    this.beforeMount(40)
  },
  updated () {
    this.payTimer();
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.order
  width 100%
  margin-top: 88px;
  overflow hidden
  ul
    li 
      box-sizing content-box
      height 320px
      margin 20px 32px
      background-color #fff
      border-radius:12px;
      padding 0 50px
      .item_up
        height:80px;
        line-height 80px
        font-size:28px;
        font-weight:800;
        color:rgba(69,73,72,1);
        text-align left 
        span 
          height:27px;
          font-size:28px;
          font-weight:500;
          color:rgba(255,134,22,1);
          float right
      .item_contont
        width 100%
        display flex
        .center
          display flex
          flex-direction column
          width:120px;
          height:121px;
          font-size:28px;
          font-weight:500;
          color:rgba(167,171,170,1);
          line-height:47px;
        .middle 
          display flex
          flex-direction column
          width:300px;
          height:115px;
          font-size:28px;
          font-weight:500;
          color:rgba(69,73,72,1);
          line-height:47px;
          text-align left 
          padding-left 50px
      .item_down
        display flex
        padding-top 40px
        span 
          font-size:28px;
          font-weight:500
          text-align left
        .text
          flex 2
          height:27px;
          color:rgba(167,171,170,1);
          line-height:47px;
        .money
          flex 3
          height:21px;
          color:rgba(255,134,22,1);
          line-height:47px;
          // &:nth-of-type(1)
          //   flex 2
          //   height:27px;
          //   color:rgba(167,171,170,1);
          //   line-height:47px;
          // &:nth-of-type(2)
          //   flex 3
          //   height:21px;
          //   color:rgba(255,134,22,1);
          //   line-height:47px;
        .active
          flex 5
        .btn
          flex 2
          width:168px;
          height:56px;
          background:rgba(39,130,244,1);
          border-radius:28px;
          color #ffffff
          font-size:26px;
          line-height 56px
          text-align center
</style>