<template>
<div>
  <div class="coupon" v-bind:style="{height:curHeight}">
    <div class="inner">
      <img src="./img/no_coupon.png" alt="">
      <p>{{title}}</p>
    </div>
  </div>
</div>
</template>
<script>
export default {
  name: 'coupon',
  props: {
    title: String
  },
  data () {
    return {
      curHeight:0,//当前所需屏幕高度  
    }
  },
  methods: {
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
    }
  },
  mounted () {
    this.beforeMount(0);
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.coupon
  // margin-top 88px
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
</style>