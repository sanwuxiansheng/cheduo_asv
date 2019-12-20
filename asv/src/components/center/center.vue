<template>
<div>
  <div class="center">
    <a href="javascript:;" class="center_item" :class="{on:'/sixyear' === $route.path}" @click="goTo('/sixyear')">
      六年免上线
      
    </a>
    <span class="item_icon" :class="{on:'/sixyear' === $route.path}"></span>
    <a href="javascript:;" class="center_item" :class="{on:'/pickcar' === $route.path}" @click="goTo('/pickcar')">
      接车代办
      
    </a>
    <span class="item_icon" :class="{on:'/pickcar' === $route.path}"></span>
    <a href="javascript:;" class="center_item" :class="{on:'/instation' === $route.path}" @click="goTo('/instation')">
      站内代办
      
    </a>
    <span class="item_icon"  :class="{on:'/instation' === $route.path}"></span>
  </div>
</div>
</template>
<script>
export default {
  methods: {
    goTo (path) {
      this.$router.push(path)
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.center
  position absolute
  top 800px
  width 100%
  height 100px
  display flex
  justify-content center
  align-items center
  font-size:30px;
  background-color rgba(255,255,255,1)
  font-weight:bold;
  .center_item
    flex 1
    text-align center
    &.on 
      color:rgba(39,130,244,1);
  .item_icon
    position absolute
    display none
    bottom 0
    height 4px
    background-color rgba(39,130,244,1);
    &.on
      display block
    &:nth-of-type(1)
      width 155px
      left 50px
    &:nth-of-type(2)
      width 120px
      left 315px
    &:nth-of-type(3)
      width 120px
      left 565px
    
</style>