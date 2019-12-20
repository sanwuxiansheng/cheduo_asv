<template>
  <header class="header">
    <slot name="left">
    </slot>
    <div class="header_img" @click="goTo(path, title)" v-show="$route.meta.isShow">
      <img src="../img/left.png" alt="">
    </div>
    <span class="header_title">
      <span class="header_title_text ellipsis">{{title}}</span>
    </span>
    <a href="tel:0755-23575692" class="block" v-show="$route.meta.isShowTel">
      <img src="../img/Customerservice_icon_title.png" alt="">
    </a>
    <slot name="right">
    </slot>
  </header>
</template>
<script>
  import {Dialog} from 'vant'
  export default {
    props: {
      title: String,
      path: String
    },
    components: {
      [Dialog.name] : Dialog ,
    },
    methods: {
      goTo (path, title) {
        if (title === '确认订单') {
          Dialog.confirm({
            title: '温馨提示',
            message: '你确定要退出订单吗?',
            confirmButtonColor: '#999999FF',
            cancelButtonColor: '#2782F4FF'
          }).then(() => {
            this.$router.push(path);
          }).catch(() => {
            // on cancel
          });
        }else{
          this.$router.push(path);
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '../../common/stylus/mixins.styl'
.header
  bottom-border-1px(#e4e4e4)
  position fixed
  z-index 100
  margin 0 auto
  text-align center
  left 0
  top 0
  right 0
  max-width 750px
  width 750px
  height:88px;
  // box-sizing border-box
  background:rgba(255,255,255,1);
  overflow hidden
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
      background:rgba(255,255,255,1);
  .header_search
    position absolute
    left 15px
    top 50%
    transform translateY(-50%)
    width 10%
    height 50%
    .icon-sousuo
      font-size 25px
      color #fff
  .header_title
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 50%
    color #fff
    text-align center
    .header_title_text
      width:141px;
      height:34px;
      font-size:34px;
      font-weight:400;
      color:rgba(34,34,34,1);
      line-height:35px;
  .block
    position absolute
    left 591px
    top 21px
    img 
      width:40px;
      height:42px;
  .header_login
    font-size 14px
    color #fff
    position absolute
    right 15px
    top 50%
    transform translateY(-50%)
    .header_login_text
      color #fff
</style>
