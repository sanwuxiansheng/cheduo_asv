<template>
  <footer class="footer_guide border-1px">
    <a href="javascript:;" class="guide_item" :class="{on:'/asv/question' === $route.path}" @click="goTo('/asv/question')">
      <span class="item_icon">
      </span>
      <span>常见问题</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:'/asv/coupon' === $route.path}" @click="goTo('/asv/coupon')">
      <span class="item_icon">
      </span>
      <span>优惠卷</span>
    </a>
    <a href="javascript:;" class="guide_item" :class="{on:'/asv/order' === $route.path}" @click="goTo('/asv/order')">
      <span class="item_icon">
      </span>
      <span>订单</span>
    </a>
    <div class="guide_button" @click="toSix('/asv/manage')">
      <span>立即办理</span>
    </div>
  </footer>
</template>
<script>
import {reqSix} from '../../api';
export default {
  data () {
    return {
      isMyself: false  
    }
  },
  methods: {
    goTo (path) {
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token');
      }
      // console.log(token);
      if(path == '/asv/question') {
        this.$router.push(path);
      }else if(token) {
        this.$router.push(path);
      }else {
        this.$router.push('/asv/login');
      }
    },
    getCookie (name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
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
    toSix (path) {
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token');
      }
      if (!token) {
        this.$router.replace('/asv/login');
      }
      const vehicle_id = this.getCookie('vehicle_id');
      let carIndex = this.$store.state.carIndex;
      const year = this.$store.state.asv_counts[carIndex][vehicle_id];
      const isTrue = this.$store.state.user[carIndex].errno;
      if (token && year < 4.1) {
        const source = 'H5-cheduo';
        // const result = await reqSix(source, vehicle_id, token);
        window.location.href = "https://m.cheduo.com/asv/index?source="+source+'&vehicle_id='+vehicle_id+'&token='+token;
      } else if (token && year >= 4.1 && isTrue == 1) {
        this.$router.push(path);
      }
    }
  },
  mounted () {
    if (this.$route.meta.isMyself) {
      this.isMyself = this.$route.meta.isMyself;
    } else {
      this.isMyself = false;
    }
  },
  updated () {
    if (this.$route.meta.isMyself) {
      this.isMyself = this.$route.meta.isMyself;
    } else {
      this.isMyself = false;
    }
  }
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.footer_guide // footer
  top-border-1px(#e4e4e4)
  position fixed
  z-index 100
  left 0
  right 0
  bottom 0
  max-width 750px
  height:100px;
  margin 0 auto
  box-sizing border-box
  background:rgba(255,255,255,1);
  border:1px solid rgba(223,226,230,1);
  display flex
  .guide_button
    margin 12px 32px 12px 0
    width:208px;
    height:76px;
    background:linear-gradient(0deg,rgba(2,164,245,1),rgba(71,194,255,1));
    border-radius:36px;
    span 
      width:122px;
      font-size:30px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      line-height:76px;
  .guide_item
    display flex
    flex 1
    text-align center
    flex-direction column
    align-items center
    justify-content center
    color #999999
    text-decoration:none
    &.on
       &:nth-of-type(1)
        .item_icon
          width:36px;
          height:36px
          background-image url('../img/question_icon.png')
          background-size 36px 36px
      &:nth-of-type(2)
        .item_icon
          width:36px;
          height:36px
          background-image url('../img/coupon_icon.png')
          background-size 36px 36px
      &:nth-of-type(3)
          .item_icon
            width:36px;
            height:36px
            background-image url('../img/order.png')
            background-size 36px 36px
  .guide_item:nth-of-type(1)
      .item_icon
        width:36px;
        height:36px
        background-image url('../img/question_icon.png')
        background-size 36px 36px
  .guide_item:nth-of-type(2)
      .item_icon
        width:36px;
        height:36px
        background-image url('../img/coupon_icon.png')
        background-size 36px 36px
  .guide_item:nth-of-type(3)
      .item_icon
        width:36px;
        height:36px
        background-image url('../img/order.png')
        background-size 36px 36px
    span
      font-size:20px;
      font-weight:500;
      color:rgba(8,16,26,1);
      line-height:35px;
</style>