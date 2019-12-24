<template>
<div class="login_next">
  <div class="head">
    <h1>验证码<p>已发送至{{mobile}}</p></h1>
  </div>
  <div class="center">
    <van-password-input :value="value" :length="6" :gutter="10" :focused="showKeyboard" @focus="onFocus()" :mask="false"/>
    <van-number-keyboard :show="showKeyboard" @input="onInput" @delete="onDelete" @blur="showKeyboard = false"/>
  </div>
  <p :class='{cus: !isFloat}' @click="gain()">{{content}}</p>
  <button class="next" @click="toLogin()">登录</button>
</div>
</template>
<script>
import HeaderThree from '../../components/header/header_three'
import { PasswordInput, NumberKeyboard, Popup, Toast } from 'vant';
import '@vant/touch-emulator';
import {reqSmsLogin, reqSendCode} from '../../api';
import {RECEIVE_USER, RECEIVE_TOKEN} from '../../store/mutation-types';
export default {
  data () {
    return {
      mobile: '',
      value: 'aabbbcccc',
      showKeyboard: true,
      totalTime: 60,
      content: '',
      isFloat: true,
      regSource: 'H5-cheduo',
      isGet: false,
    }
  },
  components: {
    [PasswordInput.name] : PasswordInput ,
    [NumberKeyboard.name] : NumberKeyboard ,
    [Popup.name] : Popup ,
    [Toast.name] : Toast ,
  },
  mounted () {
    this.mobile = this.$route.query.mobile;
    this.calculagraph()
  },
  methods: {
    calculagraph() { // 倒计时函数
      let totalTime = this.totalTime;
      let _this = this;
      let clock = setInterval(() => {
        if (_this.totalTime > 0) {
          _this.totalTime--;
          _this.content = _this.totalTime + 's后重新获取';
          _this.isFloat = true;
          // _this.showKeyboard = true;
        } else if(_this.totalTime <= 0 && _this.isFloat) {     //当倒计时小于0时清除定时器
          clearInterval(clock)
          _this.content = '获取验证码';
          _this.isFloat = false;
          _this.isGet = true;
          _this.totalTime = 60;
        } 
      },1000)
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    onFocus() { // 输入框获取焦点
      this.showKeyboard = true;
    },
    setCookie(name, value) {
      var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 2 * 60 * 60 * 1000); //设置date为当前时间加一年
      str += ";expires=" + date.toGMTString();
      // console.log(str)
      document.cookie = str;
    },
    getCookie(name){
      let arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    async toLogin() {
      const vcode = this.value;
      const result = await reqSmsLogin(this.mobile, vcode, this.regSource);
      if(result.errno === '10000') {
        const data = result.data
        const token = result.token
        this.$store.commit(RECEIVE_USER, data);
        this.$store.commit(RECEIVE_TOKEN, token)
        this.setCookie('token', token)
        this.$router.push({ path: '/asv/index', query: { data } })
      } else if (result.errno !== '10000') {
        Toast(result.msg)
      }
    },
    async login() {
      let text = this.content;
      if (text == '获取验证码') {
        const result = await reqSendCode(this.mobile);
        Toast(result.msg)
        this.calculagraph()
      }
    },
    gain() {
      if(!this.isFloat) {
        this.login()
      }
    }
  },
  updated () {
    // if(this.value.length >= 6) {
    //   this.showKeyboard = false;
    // }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.login_next
  padding-top 180px
  width 100%
  height 100%
  .head 
    padding 20px 80px
    h1 
      font-size 50px
      text-align left
      p 
        font-size 32px
        color: #A7ABAA;
        padding 20px 0
  .center
    width 700px
    margin 50px auto
  p 
    text-align: left;
    padding-left: 55px
  .cus
    color: rgba(39, 130, 244, 1);
  button 
    display: block;
    width: 600px;
    line-height: 80px;
    text-align: center;
    margin: 160px auto 0 auto;
    font-size: 40px;
    color: #fff;
    background: rgba(39, 130, 244, 1);
    border-radius: 40px;
    border: none;
    height 80px
</style>