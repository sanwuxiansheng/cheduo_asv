<template>
<div>
  <HeaderFore :title="'优惠券'"></HeaderFore>
  <div class="coupon" v-bind:style="{height:curHeight}">
    <div class="inner" v-if="isNo">
      <img src="./img/no_coupon.png" alt="">
      <p>空空如也</p>
    </div>
    <div class="center" v-if="!isNo">
      <ul class="center_list">
        <li class="center_item"  v-for="(item, index) in datas" :key="index">
          <div class="item_left">
            <p>年检</p>
            <p>代办</p>
          </div>
          <div class="item_middle">
            <p class="top">{{item.title}}</p>
            <p class="middle">￥<span>{{item.point_amount}}</span></p>
            <p class="down">{{item.start_expire_time | formatDate}}-{{item.expire_time | formatDate}}</p>
          </div>
          <div class="item_right" v-show="isShow">
            <button @click="onSelect(item, index)">选择</button>
          </div>
        </li>
        <!-- <li class="center_item">
          <div class="item_left">
            <p>年检</p>
            <p>代办</p>
          </div>
          <div class="item_middle">
            <p class="top">年检代办优惠券</p>
            <p class="middle">免费年检代办一次或抵扣130元代办费用</p>
            <p class="down">2019.10.09-2020.02.28</p>
          </div>
          <div class="item_right">
            <button>选择</button>
          </div>
        </li> -->
      </ul>
    </div>
  </div>
</div>
</template>
<script>
import HeaderFore from '../../components/header/header_fore.vue';
import {reqCoupon} from '../../api';
import BScroll from 'better-scroll';
import {Dialog} from 'vant';
export default {
  name: 'coupon',
  component:{
    HeaderFore
  },
  data () {
    return {
      curHeight:0,//当前所需屏幕高度  
      datas: [], // 请求回来的优惠卷数据
      isShow: false, // 是否显示选择按钮
      isNo: false,
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
      return y + '-' + MM + '-' + d 
    }
  },
  methods: {
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
    },
    onSelect(item, index) { // 选择优惠卷
      let couponId = item.id;
      let token = this.getCookie('token')
      this.setCookie('couponId', couponId)
      this.setCookie('couponIndex', index)
      // if (this.$store.state.isWX) {
        // let payUrl = `https://m.cheduo.com/html/paydir/asv-pay?order_code=${order_code}&token=${token}`;
        // let wxUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxa9bc2c68483cb54c&redirect_uri="+payUrl+"&response_type=code&scope=snsapi_base&state=STATE&connect_redirect=1#wechat_redirect"
        // window.location.href = wxUrl;
        // console.log(wxUrl);
      // }else {
      this.$router.go(-1)
      // }
    },
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    setCookie(name, value) {
      var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 2 * 60 * 60 * 1000); //设置date为当前时间
      str += ";expires=" + date.toGMTString();
      // console.log(str)
      document.cookie = str;
    },
  },
  async mounted () {
    let isShow = this.$route.query.isShow;
    if (isShow) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
    this.$nextTick(() => {
      this.scroll = new BScroll('.center', {
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
    this.beforeMount(40);
    let token = this.$store.state.token;
    if (!token) {
      token = this.getCookie('token')
    }
    if (!token) {
      Dialog.confirm({
        message: '登录超时，请重新登录'
      }).then(() => {
        this.$router.replace('/asv/login')
      }).catch(() => {
        // on cancel
      });
    } else {
      const result = await reqCoupon(token);
      if (result.errno == '10000') {
        this.datas = result.datas;
        if (this.datas.length == 0) {
          this.datas = []
          this.isNo = true;
        } else {
          this.isNo = false;
        }
      } else {
        this.datas = [];
        this.isNo = true;
      }
      // console.log(result);
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.coupon
  margin-top 88px
  background-color rgba(255,255,255,1)
  width 100%
  .inner 
    position: relative; 
    left: 50%; 
    top: 40%;
    transform: translate(-50%, -50%);
    p
      font-size:32px;
      font-weight:bold;
      color:rgba(69,73,72,1);
    img 
      width 560px
      height 560px
  .center
    width 100%
    height 100%
    overflow hidden
    .center_list
      width 100%
      .center_item
        margin 20px auto
        display flex
        width 100%;
        height 185px
        background-image url('./img/coupon.png')
        background-repeat no-repeat
        background-size cover
        .item_left
          flex 3
          margin auto
          color #fff
          font-size 50px
          font-weight 600
        .item_middle
          flex 4
          margin auto 20px
          color #fff
          p
            text-align left
            margin 10px 0
          .top 
            font-size 36px
          .middle
            font-size 24px
            span 
              font-size 30px;
        .item_right
          flex 3
          margin auto
          button 
            width: 100px;
            height: .633333rem;
            background: #fff;
            border-radius: .4rem;
            font-size: 26px;
            font-weight: 500;
            color: #FA2443;
            line-height: .633333rem;
            margin: 0;
            padding: 0;
            border: 1px solid transparent;  //自定义边框
            outline: none; 
</style>