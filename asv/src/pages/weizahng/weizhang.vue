<template>
<div class="weizhang">
  <HeaderThree :title="'确认订单'" :path="'/asv/index'" ></HeaderThree>
  <div class="wz">
    <van-cell-group>
      <van-field rows="1" autosize label="添加收件地址" type="textarea" disabled/>
    </van-cell-group>
    <div class="item">
      <p>收件人</p><span>&nbsp;&nbsp;&nbsp;李小龙</span>
    </div>
    <div class="item">
      <p>手机号码</p><span>13678340098</span>
    </div>
    <div class="item">
      <p>所在地区</p><span>广东省深圳市福田区</span><i class="weizhang"><img src="../manage/img/right.png" alt=""></i>
    </div>
    <div class="item">
      <p>详细地址</p><span>报业大厦10A501</span>
    </div>
    <div class="item">
      <span class="list">添加年检所需资料</span>
    </div>
    <div class="images">
      <div class="images_item"><img src="./img/ic_car.png" alt=""></div>
      <div class="images_item"><img src="./img/fuben.png" alt=""></div>
      <div class="images_item"><img src="./img/jiao.png" alt=""></div>
    </div>
    <div class="text">
      <p @click="image1 = !image1">查看示例</p>
      <p @click="image2 = !image2">查看示例</p>
      <p @click="image3 = !image3">查看示例</p>
    </div>
    <van-popup v-model="image1"><div class="mask"><img src="./img/ic_car.png" alt=""><p @click="image1 = false">我知道了</p></div></van-popup>
    <van-popup v-model="image2"><div class="mask"><img src="./img/fuben.png" alt=""><p @click="image2 = false">我知道了</p></div></van-popup>
    <van-popup v-model="image3"><div class="mask"><img src="./img/jiao.png" alt=""><p @click="image3 = false">我知道了</p></div></van-popup>
    <div class="down">
      <div class="jiage">¥ 88</div>
      <div class="btn">立即支付</div>
    </div>
  </div>
</div>
</template>
<script>
import HeaderThree from '../../components/header/header_three'
import {Field, CellGroup, Dialog} from 'vant'
export default {
  components: {
    [Field.name] : Field ,
    [Dialog.name] : Dialog ,
    [CellGroup.name] : CellGroup ,
  },
  methods: {
    
  },
  data () {
    return {
      image1: false,
      image2: false,
      image3: false,
    }
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.weizhang
  max-width 750px
  height 100%
  background-color #fff
  .wz
    margin-top 88px
    max-width 750px
    height 100%
    background-color #fff
    .item
      height:120px;
      line-height 120px
      background:rgba(255,255,255,1);
      text-align left
      padding 0 30px
      position relative
      .list
        height:29px;
        font-size:30px;
        font-weight:500;
        color:rgba(8, 16, 26, 1);
        line-height:48px;
        padding 0 10px
        margin-left 0px
        text-align left
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
        line-height:48px;
        padding 0 10px
        margin-left 50px
        text-align left
      img 
        display inline-block
        width 16px
        height 25px
        position absolute
        z-index 100
        top 45px
        left 680px
    .images
      background:rgba(255,255,255,1);
      display flex
      .images_item
        flex 1
        width:210px;
        height:196px;
        border:1px solid rgba(230,230,230,1);
        margin 20px
        &:nth-of-type(1)
          img 
            width:207px;
            height:144px;
        &:nth-of-type(2)
          img 
            width:209px;
            height:139px;
        &:nth-of-type(3)
          img 
            width:142px;
            height:192px;
    .text
      display flex
      text-align center
      align-items center
      p
        flex 1
        height:24px;
        font-size:24px;
        font-weight:400;
        color:rgba(39,130,244,1);
    .mask 
      background-color #fff
      text-align center
      width:623px;
      height:514px;
      &:nth-of-type(1)
        img 
          width 560px
          height 400px
          margin 20px auto
      &:nth-of-type(1)
        img 
          width 560px
          height 400px
          margin 20px auto
      &:nth-of-type(3)
        img 
          width:294px;
          height:397px;
          margin 20px auto
      p 
        height:26px;
        font-size:28px;
        font-weight:400;
        color:rgba(39,130,244,1);
        line-height 36px
    .down 
      max-width 750px
      width 750px
      position fixed
      bottom 0
      font-size:30px;
      font-weight:bold;
      color:rgba(255,255,255,1);
      display flex
      text-align center
      .jiage
        flex 3
        height:80px;
        background:rgba(0,0,0,1);
        line-height 80px
      .btn
        flex 2
        height:80px;
        background:rgba(39,130,244,1);
        line-height 80px
        text-align center
</style>