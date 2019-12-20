<template>
<div class="login">
  <div class="wrap">
    <div class="login">
      <h1>手机号登录</h1>
      <div class="form">
        <div class="label" :class='{float: isFloat}'>手机号</div>
        <input type="tel" name="mobile" @click="switchmenu()" v-model="mobile" maxlength="11"/>
        <div>
          <hr class="line">
          <hr class="focus_line" :class='{focus: isFloat}'>
        </div>
        <button class="next" @click="toLogin(isRightPhone, mobile)">下一步</button>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import { Toast, Dialog } from 'vant';
import {reqSendCode} from '../../api'
export default {
  data () {
    return {
      isFloat: false,
      mobile: '' // 手机号码
    }
  },
  components: {
    [Toast.name] : Toast ,
  },
  computed: {
    isRightPhone () {
      return /^[1]([3-9])[0-9]{9}$/.test(this.mobile)
    }
  },
  methods: {
    switchmenu () {
      this.isFloat = true
    },
    // throttle(fn, time) { // 节流函数，单位时间内只触发第一次
    //   let startTime = 0;
    //   return function () {
    //     const endTime = Date.now();
    //     if (endTime - startTime >= time) {
    //     fn.apply(this, arguments);  // [[123], 2, 3]
    //     }
    //   }
    // },
    async toLogin(isRightPhone, mobile) {
      Dialog.alert({
        message: '请稍候',
        showConfirmButton: false,
        width:'100px',
        closeOnPopstate: true,
      })
      if(!mobile) {
        Toast('手机号码不能为空');
      } else if(!isRightPhone) {
        Toast('请输入正确的手机号码');
      } else {
        const result = await reqSendCode(this.mobile)
        Dialog.close();
        if(result.errno == '10000') {
          this.$router.push({ path: '/asv/login_next', query: { mobile } });
          Toast('验证码已发送至手机');
        } else {
          Toast(result.msg.msg);
        }
      }
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.login 
  position relative
  max-width 750px
  min-width 320px
  height 100%
  background-color #fff
  .wrap
    max-width 750px
    min-width 320px
    height 450px
    position absolute
    left: 50%; 
    top: 50%;
    transform: translate(-50%, -50%);
    .login
      position absolute
      left: 50%; 
      top: 50%;
      transform: translate(-50%, -50%);
      h1 
        font-size 50px
        padding-bottom 150px
        text-align left
      .form 
        width 100%
        height 400px
        position relative
        .label
          position absolute
          font-size 42px
          font-weight:500;
          color #A7ABAA
        .float
          line-height: 20px;
          font-size: 40px;
          color: rgba(39, 130, 244, 1);
          transition: all 1s cubic-bezier(.23,1,.32,1);
          z-index: 0;
          transform: scale(.8) translateZ(0);
          transform-origin: left top;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          top: -28px;
          position: absolute;
        input 
          width 100%
          height 80px
          background: none;
          outline: none;
          border: none;
          font-size 40px
        .next
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
        div
          .line 
            border: none;
            height: 3px;
            background: #A7ABAA;
          .focus_line
            position: absolute;
            left: 0;
            right: 0;
            height: 3px;
            background: rgba(39, 130, 244, 1);
            border: none;
            margin-top: -1px;
            transform: scaleX(0);
            transition: transform .8s cubic-bezier(.23,1,.32,1);
          .focus
            transform: scaleX(1);
</style>