<template>
<div>
  <HeaderTwo :title="'确认订单'"/>
  <div class="confirm_order">
    <div class="money">
      <p>合计</p>
      <span>¥ {{this.resData.total_amount}}</span>
      <p>（检测费￥{{this.resData.service_price}}  代办费￥{{this.resData.handle_price}}）</p>
    </div>
    <div class="center">
      <div class="center_item">
        <p>订单信息</p>
        <div class="item">
          <p>服务项目：</p><span>专人上门接车代办服务</span><p>（{{this.resData.plate}}）</p>
        </div>
      </div>
      <div class="center_item">
        <p>优惠信息</p>
        <div class="item" @click="goCoupon()">
          <span>选择优惠券</span>
          <p v-if="this.resData.coupon_num == '0'" class="item_pp">暂无可用优惠券 <i><img src="../manage/img/right.png" alt=""></i></p>
          <p v-if="(this.resData.coupon_num != '0' && couponIndex == null)" class="item_pp">可用优惠券数量{{this.resData.coupon_num}}张 <i><img src="../manage/img/right.png" alt=""></i></p>
          <p v-if="(this.resData.coupon_num != '0' && couponIndex != null)" class="item_pp">{{this.coupon[couponIndex].note}}<i><img src="../manage/img/right.png" alt=""></i></p>
        </div>
      </div>
      <div class="center_item">
        <p>选择支付方式</p>
        <div class="item">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <img src="./img/pay_icon_wechat.png" alt="">
              <van-cell title="微信支付" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="item" v-if="!this.isWX">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <img src="./img/pay_icon_alipay.png" alt="">
              <van-cell title="支付宝" clickable @click="radio = '2'">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="down_text">
        <img src="./img/safetywarning_icon.png" alt="">
        <span>请放心支付，未支付成功全额退款</span>
      </div>
      <div class="btn" @click="onPay()">
        <a href="javascript:;">立即支付</a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {RadioGroup, Radio, CellGroup, Cell, Toast} from 'vant';
import HeaderTwo from '../../components/header/header_two';
import {reqAlipay, reqWechat, reqInwechat, reqWxopenID, reqOrderPay, reqCoupon} from '../../api'
export default {
  name: 'confirmOrder',
  components: {
    [RadioGroup.name] : RadioGroup ,
    [Radio.name] : Radio,
    [Cell.name] : Cell,
    [CellGroup.name] : CellGroup,
    [Toast.name] : Toast,
  },
  data() {
    return {
      radio: '1',
      isWX: null,
      order_code: null,
      token: '',
      resData:{},
      coupon:[], // 年检优惠卷数组
      code:null,
      couponIndex: null,
    }
  },
  mounted () {
    this.isWX = this.$store.state.isWX;
    this.order_code = this.$route.query.order_code;
    if (!this.order_code) {
      this.order_code = Number(this.getUrlParam('order_code'));
    }
    this.code = this.getUrlParam('code');
    // console.log(this.order_code, this.code);
    this.token = this.$store.state.token;
    if (!this.token) {
      this.token = this.getCookie('token');
      if (!this.token) {
        this.token = this.getUrlParam('token');
        this.setCookie('token', this.token)
      }
    }
    this.orderPay(this.order_code);
    this.onReqCoupon();
    this.couponIndex = this.getCookie('couponIndex')
  },
  methods: {
    goCoupon() { // 选择优惠卷函数
      if (this.resData.coupon_num == '0') {
        Toast('暂无可用优惠券')
      } else {
        let isShow = true;
        let order_code = this.order_code;
        this.$router.push({path: '/asv/coupon', query: {isShow, order_code}})
      }
    },
    setCookie(name, value) {
      var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 2 * 60 * 60 * 1000); //设置date为当前时间加一年
      str += ";expires=" + date.toGMTString();
      // console.log(str)
      document.cookie = str;
    },
    getUrlParam(paramname) {
      var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");
      // 查询匹配 substr(1)删除? match()匹配
      var s = window.location.search.substr(1).match(reg);
      if (s != null) {
        return unescape(s[2]); // unescape() 函数可对通过 escape() 编码的字符串进行解码。
      }
      return null;
    },
    async orderPay(order_code) {
      let token = this.getCookie('token')
      let res;
      try {
        res = await reqOrderPay(order_code, token);
        this.resData = res.datas;
      } catch (error) {
        // console.log(error);
      }
    },
    async onPay() {
      Toast.loading({
        message: '加载中...',
        position: 'middle',
        duration: 2000,
        forbidClick: true
      });
      let appID;
      let result;
      if(this.radio == '1' && this.isWX) {
        let asv_coupon_id = this.getCookie('couponId');
        if (!asv_coupon_id) {
          asv_coupon_id = 0;
        }
        try {
          result = await reqWxopenID(this.code)
          appID = result.datas.openid;
          // console.log(result, appID);
        } catch (error) {
          // console.log(error);
        }
        const inwx = await reqInwechat(this.order_code, appID, asv_coupon_id, this.token);
        if (inwx.status === 1) {
          const pay_params = inwx.data
          if (typeof WeixinJSBridge == "undefined"){
            if(document.addEventListener) {
              document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
            }else if (document.attachEvent){
              document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady); 
              document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
            }
          }else{
            this.onBridgeReady(pay_params,this);
          }
        }else {
          Toast({
            message: '支付请求失败',
            position: 'middle',
            duration: 1000,
            forbidClick: true
          });
        }
      } else if (this.radio === '1' && !this.isWX) {
        let asv_coupon_id = this.getCookie('couponId');
        if (!asv_coupon_id) {
          asv_coupon_id = 0;
        }
        const wxwarrp = await reqWechat(this.order_code, asv_coupon_id, this.token)
        if(wxwarrp.status === 1){
          let url=wxwarrp.url
          window.location.replace(url)   //这里是后端返回的URL直接进行跳转即可完成微信外支付
        }else{
          Toast({
            message: '支付请求已失效，请重新发起支付',
            position: 'middle',
            duration: 1000,
            forbidClick: true
          });
          let order_code = this.order_code;
          let token = this.token;
          window.location.href = "https://m.cheduo.com/html/asv/order_det?order_code="+order_code+'&token='+token;
        }
      } else {
        let asv_coupon_id = this.getCookie('couponId');
        if (!asv_coupon_id) {
          asv_coupon_id = 0;
        }
        this.$router.push({path: '/asv/aliPay', query: {order_code: this.order_code, asv_coupon_id: asv_coupon_id, token: this.token}});
      }
    },
    onBridgeReady(params,_this,appID) {
      // alert(167)
      // console.log(218,params);
      // let str = params.parseJSON()
      // console.log(220,str);
      const pay_params = JSON.parse(params);
      // console.log(221,pay_params);
      let res;
      let appid='wxa9bc2c68483cb54c';
      if (!appID) {
        async () => {
          try {
            res = await reqWxopenID(_this.code)
          } catch (error) {
            // console.log(error);
          }
          appID = res.data.openid;
        }
        // console.log(appID)
      }
      WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
          "appId": appid,  //公众号名称，由商户传入     
          "timeStamp": pay_params.timeStamp,  //时间戳，自1970年以来的秒数     
          "nonceStr": pay_params.nonceStr,  //随机串     
          "package": pay_params.package,     
          "signType": pay_params.signType,  //微信签名方式：     
          "paySign": pay_params.paySign  //微信签名 
        },
        function(res){
          // alert(191,'进入微信内部支付了')
          if(res.err_msg == "get_brand_wcpay_request:ok"){
            Toast('支付成功！');
            let order_code = _this.order_code;
            let token = _this.token;
            window.location.href = "https://m.cheduo.com/html/asv/order_det?order_code="+order_code+'&token='+token;
          }else if(res.err_msg == 'get_brand_wcpay_request:cancel') {
            Toast('您已取消支付');
            let order_code = _this.order_code;
            let token = _this.token;
            window.location.href = "https://m.cheduo.com/html/asv/order_det?order_code="+order_code+'&token='+token;
          } else {
            Toast('未知错误.错误详情：'+res.err_msg);
            let order_code = _this.order_code;
            let token = _this.token;
            window.location.href = "https://m.cheduo.com/html/asv/order_det?order_code="+order_code+'&token='+token;
          }
        }); 
    },
    getCookie (name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    async onReqCoupon () {
      let res;
      try {
        res = await reqCoupon(this.token)
      } catch (error) {
        // console.log(error);
      }
      if (res) {
        this.coupon = res.datas;
      }
    }
  },
  updated () {
    this.isWX = this.$store.state.isWX;
    // console.log(this.getCookie('token'),this.$store.state.token);
    this.token = this.getCookie('token')
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.confirm_order
  padding-top: 88px;
  width 100%
  height 100%
  // background-color rgba(244,244,244,1)
  .money 
    width 100%
    height 180px
    padding-top 30px
    p
      margin 0 auto
      &:nth-of-type(1)
        height:26px
        font-size:28px
        font-weight:500
        color:rgba(159,166,174,1)
        line-height:30px
        text-align center
      &:nth-of-type(2)
        height 23px
        font-size 24px
        font-weight 400
        color rgba(198,205,213,1)
        line-height 30px
    span 
      width 304px
      height 61px
      font-size 36px
      font-weight 500
      color rgba(255,88,0,1)
      line-height 71px
      margin 0 auto
  .center
    .center_item
      text-align left
      p
        height:80px;
        font-size:28px;
        font-weight:500;
        color:rgba(159,166,174,1);
        line-height:80px;
        padding 0 0 0 20px
      .item
        width:686px;
        height:120px;
        line-height 120px
        background:rgba(255,255,255,1);
        border-radius:8px;
        margin 5px auto
        padding 0 20px
        position relative
        &:nth-of-type(2)
          img 
            display inline-block
            width 40px
            height 37px
            position absolute
            z-index 100
            top 35px
            left -10px
        &:nth-of-type(1)
          img 
            display inline-block
            width 40px
            height 37px
            position absolute
            z-index 100
            top 35px
            left -10px
        .item_pp
          margin-left 200px
          display: inline-flex;
          i 
            width:12px;
            height:22px;
            margin-left 10px
            img 
              width:12px;
              height:22px;
              left 680px
              top 45px
        p
          height:26px;
          font-size:28px;
          font-weight:500;
          color:rgba(159,166,174,1);
          line-height:100px;
          display inline-block
          padding 0 5px
        span 
          height:29px;
          font-size:30px;
          font-weight:500;
          color:rgba(8, 16, 26, 1);
          line-height:60px;
          padding 0 10px
  .down
    .down_text
      text-align: left;
      padding-left: .15rem;
      img 
        width 25px
        height 29px
        display inline-block
      span 
        height:24px;
        font-size:24px;
        font-weight:500;
        color:rgba(198,205,213,1);
        line-height:29px;
    .btn
      position fixed
      width:686px;
      height:88px;
      background:rgba(39,130,244,1);
      border-radius:44px;
      bottom 0px
      left 50%
      right 50%
      transform translate(-50%, 0%)
      a 
        height:35px;
        font-size:36px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:88px;
</style>