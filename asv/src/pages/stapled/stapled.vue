<template>
<div>
  <HeaderTwo :title="'确认订单'"/>
  <div class="confirm_order">
    <div class="money">
      <p>合计</p>
      <span>¥ 350.00</span>
      <p>（检测费￥280  服务费70）</p>
    </div>
    <div class="center">
      <div class="center_item">
        <p>订单信息</p>
        <div class="item">
          <p>服务项目：</p><span>专人上门接车代办服务</span><p>（粤BQA088）</p>
        </div>
      </div>
      <div class="center_item" @click="show()">
        <div class="item">
          <p>服务项目：</p><span>违章代办服务</span><p>（粤BQA088）<i class="weizhang"><img src="../manage/img/right.png" alt="" :class='{active_img: isShow}'></i></p>
        </div>
      </div>
      <div class="list" v-show="isShow">
        <ul class="list_item">
          <li>1</li>
          <div class="text">
            <p>2019-05-17 12:09</p>
            <h3>发展大道中一路路段</h3>
            <span>机动车违反规定停放、临时停车、驾驶人不在现场或者 虽在现场但驾驶人拒绝立即驶离，妨碍其他车辆、行人 通行的。</span>
            <div class="xiang">
              <div>
                <span>罚款：</span>
                <span>¥ 500</span>
              </div>
              <div>
                <span>扣分：</span>
                <span>5</span>
              </div>
              <div>
                <span>代办费：</span>
                <span>5</span>
              </div>
              <div>
                <span>滞纳金：</span>
                <span>5</span>
              </div>
            </div>
          </div>
          <div class="line"></div>
          <li>2</li>
          <div class="text">
            <p>2019-05-17 12:09</p>
            <h3>发展大道中一路路段</h3>
            <span>机动车违反规定停放、临时停车、驾驶人不在现场或者 虽在现场但驾驶人拒绝立即驶离，妨碍其他车辆、行人 通行的。</span>
            <div class="xiang">
              <div>
                <span>罚款：</span>
                <span>¥ 500</span>
              </div>
              <div>
                <span>扣分：</span>
                <span>5</span>
              </div>
              <div>
                <span>代办费：</span>
                <span>5</span>
              </div>
              <div>
                <span>滞纳金：</span>
                <span>5</span>
              </div>
            </div>
          </div>
        </ul>
        
      </div>
      <div class="center_item" :class='{active: isShow}'>
        <p>优惠信息</p>
        <div class="item">
          <span>选择优惠券</span><p class="item_pp">暂无可用优惠券 <i><img src="../manage/img/right.png" alt=""></i></p>
        </div>
      </div>
      <div class="center_item">
        <p>选择支付方式</p>
        <div class="item">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <img src="../confirm_order/img/pay_icon_wechat.png" alt="">
              <van-cell title="微信支付" clickable @click="radio = '2'">
                <van-radio slot="right-icon" name="2" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
        <div class="item">
          <van-radio-group v-model="radio">
            <van-cell-group>
              <img src="../confirm_order/img/pay_icon_alipay.png" alt="">
              <van-cell title="支付宝" clickable @click="radio = '1'">
                <van-radio slot="right-icon" name="1" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </div>
      </div>
    </div>
    <div class="down">
      <div class="down_text">
        <img src="../confirm_order/img/safetywarning_icon.png" alt="">
        <span>请放心支付，未支付成功全额退款</span>
      </div>
      <div class="btn">
        <a href="javascript:;">立即支付</a>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import {RadioGroup, Radio, CellGroup, Cell} from 'vant'
import HeaderTwo from '../../components/header/header_two'
export default {
  name: 'confirmOrder',
  components: {
    [RadioGroup.name] : RadioGroup ,
    [Radio.name] : Radio,
    [Cell.name] : Cell,
    [CellGroup.name] : CellGroup,
  },
  data() {
    return {
      radio: '1',
      active: 3,
      isShow: false
    }
  },
  methods: {
    show() {
      this.isShow = !this.isShow
    }
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
    .list
      position relative
      text-align left
      padding 20px
      .list_item 
        display block
        position relative
        .line
          width:1px;
          height:200px;
          border-left:2px dashed rgba(39,130,244,1);
          margin-left 10px
        li
          display block
          width:28px;
          height:28px;
          background:rgba(39,130,244,1);
          border-radius:50%;
          font-size:20px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:28px;
          text-align center
        .text
          position absolute
          margin-left 30px
          height 200px
          padding 20px
          p 
            height:19px;
            font-size:24px;
            font-weight:400;
            color:rgba(167,171,170,1);
            line-height:17px;
            position absolute
            top -25px
          h3 
            height:29px;
            font-size:30px;
            font-weight:400;
            color:rgba(69,73,72,1);
            line-height:29px;
            margin-bottom 20px
          span
            height:91px;
            font-size:24px;
            font-weight:400;
            color:rgba(167,171,170,1);
            line-height:34px;
          .xiang
            display flex
            text-align left
            div 
              felx 1
              padding 20px
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
        p 
          .weizhang
            img 
              display inline-block
              width 15px
              height 23px
              position absolute
              z-index 100
              top 45px
              left 650px
            .active_img
              transform rotate(90deg)
              transition all .5s
        .item_pp
          margin-left 250px
          i 
            width:12px;
            height:22px;
            margin-left 10px
            img 
              width:12px;
              height:22px;
              left 660px
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
          line-height:48px;
          padding 0 10px
    .active
      margin-top 200px
  .down
    .down_text
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
      position relative
      width:686px;
      height:88px;
      background:rgba(39,130,244,1);
      border-radius:44px;
      left 50%
      right 50%
      transform translate(-50%, -50%)
      margin-top 50px
      a 
        height:35px;
        font-size:36px;
        font-weight:bold;
        color:rgba(255,255,255,1);
        line-height:88px;
</style>