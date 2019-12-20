<template>
<div>
  <div class="six">
    <div class="material">
      <div class="material_header">
        <img src="../img/tittle_line.png" alt="" class="heder_left">
        <p>年检所需资料</p>
        <img src="../img/tittle_line.png" alt="" class="heder_right">
      </div>
      <div class="material_center">
        <div class="center_left">
          <img src="../img/driving_front_icon.png" alt="">
          <p>行驶本正副本</p>
          <span>原件</span>
        </div>
        <div class="center_right">
          <img src="../img/cross_insurance_policy_icon.png" alt="">
          <p>交强险保单</p>
          <span>副本</span>
        </div>
      </div>
    </div>
    <div class="condition">
      <div class="condition_header">
        <img src="../img/tittle_line.png" alt="" class="heder_left">
        <p>年检办理条件</p>
        <img src="../img/tittle_line.png" alt="" class="heder_right">
      </div>
      <div class="condition_center">
        <p>• 注册登记日期在6年以内的车辆</p>
        <p>• 6座以下(不含6座)的非营运小型机动车</p>
        <p>• 检车时本车无违章、无未处理的交通事故</p>
        <p>• 按照规定缴纳交强险，检车时需在保险期内</p>
        <p>• 在此期间未发生过造成人员伤亡的交通事故</p>
      </div>
    </div>
    <div class="flow">
      <div class="flow_header">
        <img src="../img/tittle_line.png" alt="" class="heder_left">
        <p>年检办理流程</p>
        <img src="../img/tittle_line.png" alt="" class="heder_right">
      </div>
      <div class="flow_center">
        <ul class="flow_list">
          <li class="flow_item">
            <img src="../img/Fillintheinformation_icon.png" alt="">
            <div class="item_text">
              <p>填写信息</p>
              <span>按照系统提示填写车辆信息</span>
            </div>
          </li>
          <i></i>
          <li class="flow_item">
            <img src="../img/confirmorder_icon.png" alt="">
            <div class="item_text">
              <p>确认订单</p>
              <span>填写联系方式和支付订单</span>
            </div>
          </li>
          <i></i>
          <li class="flow_item">
            <img src="../img/uploadphotos_icon.png" alt="">
            <div class="item_text">
              <p>上传照片</p>
              <span>上传行驶证正本正面、副本正面、有效期内交 强险保单副本</span>
            </div>
          </li>
          <i></i>
          <li class="flow_item">
            <img src="../img/Annualinspectionagency_icon.png" alt="">
            <div class="item_text">
              <p>代办年检</p>
              <span>确认年检资料无误后开始办理年检</span>
            </div>
          </li>
          <i></i>
          <li class="flow_item">
            <img src="../img/Charged'affairescompleted_icon.png" alt="">
            <div class="item_text">
              <p>代办完成</p>
              <span>寄回年检合格标志</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="harm">
      <div class="harm_header">
        <img src="../img/tittle_line.png" alt="" class="heder_left">
        <p>年检逾期危害</p>
        <img src="../img/tittle_line.png" alt="" class="heder_right">
      </div>
      <div class="harm_center">
        <div class="center_left">
          <img src="../img/fine_imag.png" alt="">
          <p>扣分罚款</p>
          <span>超期上路 </span><br/>
          <span>罚两百扣3分</span>
        </div>
        <div class="center_midel">
          <img src="../img/Insurance_imag.png" alt="">
          <p>保险拒赔</p>
          <span>保险公司</span><br/>
          <span> 拒赔年检逾期车</span>
        </div>
        <div class="center_right">
          <img src="../img/Scrappedvehicle_imag.png" alt="">
          <p>强制报废</p>
          <span>连续三年</span><br/>
          <span> 未年检车辆</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default {}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.six
  margin-top 450px
  margin-bottom 130px
  .material
    width:686px;
    height:325px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    margin 20px auto
    .material_header
      display flex
      color:rgba(46,134,244,1);
      align-items center
      justify-content center
      height 100px
      line-height 100px
      img 
        display block
        width:113px;
        height:5px;
        padding 0 10px
      p
        font-size:28px;
        font-weight:bold;
        width:171px;
        height:27px;
        line-height:30px;
      .heder_left
        transform rotateY(180deg)
    .material_center
      padding 0 50px
      display flex
      align-items center
      justify-content center
      .center_left
        flex 1
        p 
          font-size:24px;
          font-weight:bold;
          line-height:30px;
          width:147px;
          height:23px;
          color:rgba(8,16,26,1);
          margin 10px auto
        span 
          font-size:24px;
          font-weight:bold;
          line-height:40px;
          width:47px;
          height:23px;
          color:rgba(159,166,174,1);
        img 
          display block
          width:97px;
          height:97px;
          margin 10px auto
      .center_right
        flex 1
        p 
          font-size:24px;
          font-weight:bold;
          line-height:30px;
          width:147px;
          height:23px;
          color:rgba(8,16,26,1);
          margin 10px auto
        span 
          font-size:24px;
          font-weight:bold;
          line-height:40px;
          width:47px;
          height:23px;
          color:rgba(159,166,174,1);
        img 
          display block
          width:97px;
          height:97px;
          margin 10px auto
  .condition
    width:686px;
    height:417px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    margin 20px auto
    .condition_header
      display flex
      color:rgba(46,134,244,1);
      align-items center
      justify-content center
      height 100px
      line-height 100px
      img 
        display block
        width:113px;
        height:5px;
        padding 0 10px
      p
        font-size:28px;
        font-weight:bold;
        width:171px;
        height:27px;
        line-height:30px;
      .heder_left
        transform rotateY(180deg)
    .condition_center
      width:514px;
      height:265px;
      text-align left
      margin 0 auto
      p 
        font-size:26px;
        font-weight:400;
        color:rgba(34,34,34,1);
        line-height:30px;
        margin 20px 0
  .flow
    width:686px;
    height:788px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    margin 20px auto
    .flow_header
      display flex
      color:rgba(46,134,244,1);
      align-items center
      justify-content center
      height 100px
      line-height 100px
      img 
        display block
        width:113px;
        height:5px;
        padding 0 10px
      p
        font-size:28px;
        font-weight:bold;
        width:171px;
        height:27px;
        line-height:30px;
      .heder_left
        transform rotateY(180deg)
    .flow_center
      padding 10px 50px
      width 100%
      .flow_list
        width 100%
        display flex
        flex-direction column
        i 
          width 2px
          height 45px
          background url('../img/line_icon.png') no-repeat center center
          background-size auto
          margin-left 35px
          margin-bottom 10px
        .flow_item
          display flex
          width 100%
          .item_text
            width 75%
            text-align left
            padding-left 20px
            p
              width:113px;
              height:27px;
              font-size:28px;
              font-weight:bold;
              color:rgba(8,16,26,1);
              line-height:30px;
            span 
              width:478px;
              height:55px;
              font-size:24px;
              font-weight:400;
              color:rgba(102,102,102,1);
              line-height:32px;
              margin 10px 0
          img 
            display block
            width 71px
            height 71px
  .harm
    box-sizing border-box 
    width:686px;
    height:399px;
    background:rgba(255,255,255,1);
    border-radius:16px;
    margin 30px auto
    .harm_header
      display flex
      color:rgba(46,134,244,1);
      align-items center
      justify-content center
      height 100px
      line-height 100px
      img 
        display block
        width:113px;
        height:5px;
        padding 0 10px
      p
        font-size:28px;
        font-weight:bold;
        width:171px;
        height:27px;
        line-height:30px;
      .heder_left
        transform rotateY(180deg)
    .harm_center
      padding 0 50px
      display flex
      align-items center
      justify-content center
      .center_left
        flex 1
        p 
          height:23px;
          font-size:24px;
          font-weight:bold;
          color:rgba(8,16,26,1);
          line-height:30px;
          margin 20px auto
        span 
          height:45px;
          font-size:20px;
          font-weight:bold;
          color:rgba(159,166,174,1);
          line-height:25px;
        img 
          display block
          width:103px;
          height:97px;
          margin 10px auto
      .center_right
        flex 1
        p 
          height:23px;
          font-size:24px;
          font-weight:bold;
          color:rgba(8,16,26,1);
          line-height:30px;
          margin 20px auto
        span 
          height:45px;
          font-size:20px;
          font-weight:bold;
          color:rgba(159,166,174,1);
          line-height:25px;
        img 
          display block
          width:103px;
          height:97px;
          margin 20px auto
      .center_midel
        flex 1
        p 
          width:98px;
          height:23px;
          font-size:24px;
          font-weight:bold;
          color:rgba(8,16,26,1);
          line-height:30px;
          margin 20px auto
        span 
          width:145px;
          height:45px;
          font-size:20px;
          font-weight:bold;
          color:rgba(159,166,174,1);
          line-height:25px;
        img 
          display block
          width:103px;
          height:97px;
          margin 10px auto
</style>