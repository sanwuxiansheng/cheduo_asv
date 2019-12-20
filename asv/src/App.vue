<template>
  <div id="app">
    <router-view/>
    <!-- <Footer v-show="$route.meta.isShowFooter"></Footer> -->
  </div>
</template>

<script>
import Footer from './components/footer/footer';
import {RECEIVE_WX} from './store/mutation-types.js';
export default {
  name: 'App',
  components: {
    Footer
  },
  mounted () {
    const isWeixin = function() { // 判断浏览器环境是否是微信环境
      let wx = navigator.userAgent.toLowerCase()
      if (wx.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    }
    if(isWeixin()) {
      const isWX = true;
      this.$store.commit(RECEIVE_WX, isWX);
      // console.log(this.$store.state.isWX);
    } else {
      const isWX = false;
      this.$store.commit(RECEIVE_WX, isWX);
      // console.log('非微信');
      // console.log(this.$store.state.isWX);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, PingFangSC,Microsoft YaHei, Helvetica-Medium,PingFang SC,Microsoft YaHei;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  max-width: 750px;
  box-sizing:border-box;
  height:100%;
  overflow: hidden;
  margin: 0 auto;
  background-color: #eee;
}
/* 步骤条样式更改 */
.is-process>.el-step__icon.is-icon {
  width:40px !important;
  height:40px !important;
  background:rgba(197,220,250,1) !important;
  border-radius:50% !important;
  border: 1px;
  border-color: inherit;
}
.is-process>.el-step__icon.is-icon>.el-step__icon-inner {
  width:20px !important;
  height:19px !important;
  background:rgba(39,130,244,1) !important;
  border-radius:50% !important;
}
.el-step__icon.is-icon {
  width:20px;
  height:19px;
  background:rgba(223,226,230,1);
  border-radius:50%;
  border: 1px;
  border-color: inherit;
}
.el-step__icon.is-text {
    border-radius: 50%;
    border: 1px;
    border-color: inherit;
    background:rgba(223,226,230,1);
}
/* .el-step__icon.is-text>.el-step__icon-inner {
  width:20px;
  height:19px;
  background:rgba(223,226,230,1);
  border-radius:50%;
} */
.el-step__title.is-process.el-step__title.is-wait {
  height:25px !important;
  font-size:26px !important;
  font-weight:500 !important;
  color:rgba(159,166,174,1) !important;
  line-height:29px !important;
  margin-top: 20px;
}
.el-step__title{
  height:25px !important;
  font-size:26px !important;
  font-weight:500 !important;
  color:rgba(159,166,174,1) !important;
  line-height:29px !important;
  margin-top: 20px;
}
.el-step__title.is-wait {
  height:25px !important;
  font-size:26px !important;
  font-weight:500 !important;
  color:rgba(159,166,174,1) !important;
  line-height:29px !important;
  margin-top: 28px;
}
/* 时间选择样式更改 */
.van-picker-column:nth-of-type(5) {
  display: none;
}
.van-picker-column:nth-of-type(4) {
  flex: 2;
}
.van-picker__cancel, .van-picker__confirm:nth-of-type(1) {
    padding: 0 16px;
    color: rgba(167, 171, 170, 1);
    font-size: 32px;
    background-color: transparent;
    border: 0;
}
/* 地图样式的更改 */
.amap-marker-label {
    position: absolute;
    z-index: 0;
    border: 1px solid white;
    background-color: white;
    white-space: nowrap;
    cursor: default;
    padding: 3px;
    font-size: 12px;
    line-height: 14px;
    border-radius: 25px;
}
.amap-geolocation-con {
  bottom: 90px !important;
}
/* 地区选择样式的更改 */
.area-select-wrap{
  position: relative;
  display: flex;
}
.area-select-wrap .area-select {
    margin-left: 0px !important;
}
.area-select {
    display: inline-block;
    vertical-align: top;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 65px;
    cursor: pointer;
    background: #fff;
    border-radius: 0px !important;
    border: 0px solid #e1e2e6 !important;
}
.area-select-wrap>.area-select.medium .area-selectable-list-wrap{
    text-align: left;
    position: absolute;
    left: 0;
    width: 300%;
    max-height: 650px;
    z-index: 15000;
    border: 0px solid #a1a4ad !important;
    border-radius: 2px;
    background-color: #fff;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    overflow-x: hidden;
    overflow-x: auto;
    margin: 0;
    -webkit-box-shadow: 0;
    box-shadow: 0;
}
.area-select .area-select-icon {
    position: absolute;
    top: 35%;
    margin-top: -2px;
    right: 6px;
    content: "";
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-top-color: #a1a4ad;
    -webkit-transition: all .3s linear;
    transition: all .3s linear;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.area-select-wrap>.area-select .area-select-icon {
  left: 70%;
}
.area-selectable-list .area-select-option.selected {
    background-color: #e4e8f1;
    color: rgba(39, 130, 244, 1);
    font-weight: 700;
}
/* 输入框样式更改 */
.van-field__label{
  text-align: left;
  width: 200px;
  padding-left: 1px;
}
/* .van-cell__value {
    position: relative;
    overflow: hidden;
    color: #969799;
    text-align: right;
    vertical-align: middle;
} */
textarea{
  padding-left:30px !important;
}
/* 开关单元格样式更改 */
.van-cell__title{
  text-align: left;
}
.van-step--finish .van-step__line {
  background-color: #2782f4;
}
.van-step--finish .van-step__circle, .van-step--finish .van-step__line {
    background-color: #2782f4;
}
</style>
