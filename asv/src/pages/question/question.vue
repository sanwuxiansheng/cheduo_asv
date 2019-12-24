<template>
<div>
  <Header :title="'常见问题'"></Header>
  <div class="question" v-bind:style="{height:curHeight}">
    <ul>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>年检办理的条件是什么？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p> 1、7座及以下普通小型车辆。</p>
          <p>2、私家车、公司非营运小车。</p>
          <p>3、车辆需购买交强险。</p>
          <p>4、车辆没有违章情况。</p>
          <p>5、免检期内未发生过致人伤亡事故的车辆。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>能做哪种车辆、哪种情况的年检？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p> 1、6座及以下小车可正常办理所需年检。</p>
          <p> 2、7座小车只可办理上线检测办理。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>大车能否代办年检？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>很抱歉，目前我司暂未提供大车的年检代办服务。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>历史违章未处理，能否帮我处理违章并年检？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>车多App有违章查缴功能，您可以先在车多App里将违章处理完毕，之后您再下单办理年检。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>年检需要提供什么资料？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>1、6年内免上线年检需提供：行驶证正本正面， 行驶证副本正面，保单交强险正本或副本；在确 认订单处上传照片。</p>
          <p>2、上线年检需提</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>交强险未生效可否办理盖章年检？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>可以，目前只要已购买交强险即可办理。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>代办年检周期多久？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>1、6年内免上线年检代办周期一般为1-2个工作 日，不含来回快递时间，具体办理周期以快递时 限为准。</p>
          <p>2、上线年检代办周期为当天，预约成功后，师 傅按时上门取车到年检站办理年检，完成后返回 交接车辆及资料。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>下单后可否退款？退款什么时候到账？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>可以,退款于退单后的1-3个工作日按照原渠道退还至您账户,若是因客户原因导致代办不成功的话无法退还服务费。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>逾期年检有什么处罚？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>部分地区规定未年检是需要扣分罚款的。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>逾期未年检的车能代办吗？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>您可以输入需要年检的车牌，系统会提示您该车辆能否代办；由于每个地区年检规则不同，大部分的逾期也可代办。</p>
        </div>
      </li>
      <li>
        <img src="./img/question_icon.png" alt="">
        <div class="up">
          <p>年检费用如何计算？</p>
        </div>
        <img src="./img/answer_icon.png" alt="">
        <div class="down">
          <p>不同的地区代办费有所差异，您可以输入需代办 的年检车牌，下单时系统会提示具体的年检费用。</p>
        </div>
      </li>
    </ul>
  </div>
</div>
</template>
 
<script>
import BScroll from 'better-scroll'
import Header from '../../components/header/header'
export default {
  data () {
    return {
      curHeight:0,//当前所需屏幕高度  
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll('.question', {
        click: true,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        },
        scrollbar: {
          fade: true,
          interactive: false // 1.8.0 新增
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      })
    })
    this.beforeMount(90)
  },
  methods: {
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
      //// console.log(this.curHeight, h);
    }
  }
}
</script>

<style lang='stylus' rel='stylesheet/stylus' scoped>
.question 
  background-color rgba(248, 248, 248, 1)
  padding-top: 88px;
  padding-bottom: 100px;
  ul 
    padding-top: 88px;
    li 
      background-color #fff
      padding: 30px 50px;
      img 
        display inline-block
        width 32px
        height 32px
        line-height 32px
        float: left;
        padding-top 15px
      .up 
        padding-left 50px
        p 
          text-align left 
          font-size:28px;
          font-weight:bold;
          color:rgba(69,73,72,1);
          line-height:50px;
      .down
        padding-left 50px
        padding-top 15px
        p 
          text-align left 
          font-size:28px;
          font-weight:500;
          color:rgba(167,171,170,1);
          line-height:30px;
</style>