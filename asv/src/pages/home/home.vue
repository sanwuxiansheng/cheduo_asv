<template>
<div class="home">
  <Header :title="'汽车年检'"></Header>
  <div class="index" v-bind:style="{height:curHeight}">
    <div class="index_center">
      <div class="head"></div>
      <div class="car swiper-container swiper-container-horizontal swiper-container-android">
        <ul class="list swiper-wrapper">
          <li class="item swiper-slide swiper-slide-next" v-for="(item, index) in user_data" :key="index">
            <div class="item-top">
              <p>{{item.asv_vehicle_plate_number}}</p>
              <span>免上线</span>
              <p>注册日期：{{item.asv_vehicle_register_date}}</p>
              <a class="top-button" @click="goTo('/asv/compile', item.vehicle_id)"><i></i>编辑</a>
            </div>
            <div class="item-down" :class="{active: item.info === '可办理', noactive: item.info !== '可办理'}">
              <p v-show="carsDay[index] <= 0">距年检截止日{{item.asv_day}}</p>
              <p v-show="carsDay[index] <= 0">还剩    <span>{{Math.abs(carsDay[index])}}</span>    天</p>
              <span v-show="(item.errno != 0 && item.info != null)" style="font-size: 0.373333rem;font-weight: bold;line-height: 3rem;">{{item.info}}</span>
              <p v-show="carsDay[index] > 0" style="font-size: 0.373333rem;font-weight: bold;line-height: 3rem;margin: 0 auto; padding-top: 10px;">已逾期<span>{{carsDay[index]}}</span>天，请尽快办理</p>
              <a  @click="goTo('/asv/shoplist', item.vehicle_id)">查看检测站</a>
              <a  @click="dateFn()">我已办理</a>
            </div>
          </li>
          <li class="item swiper-slide swiper-slide-next" v-show="this.user_data.length <= 6">
            <div class="item_center">
              <img src="./img/addvehicle_icon.png" alt="" @click="goTo('/asv/compile')">
              <h3>添加您的爱车</h3>
              <p>未知状态，小心年检逾期</p>
            </div>
          </li>
        </ul>
      </div>
      <router-view/>
      <div class="center">
        <a href="javascript:;" class="center_item" :class="{on:'/asv/index' === $route.path}" @click="goTo('/asv/index')">
          六年免上线
          
        </a>
        <span class="item_icon" :class="{on:'/asv/index' === $route.path}"></span>
        <a href="javascript:;" class="center_item" :class="{on:'/asv/pickcar' === $route.path}" @click="goTo('/asv/pickcar')">
          接车代办
          
        </a>
        <span class="item_icon" :class="{on:'/asv/pickcar' === $route.path}"></span>
        <a href="javascript:;" class="center_item" :class="{on:'/asv/instation' === $route.path}"  @click="goTo('/asv/instation')">
          站内代办
          
        </a>
        <span class="item_icon"  :class="{on:'/asv/instation' === $route.path}"></span>
      </div>
    </div>
  </div>
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
</div>
</template>
<script>
import Footer from '../../components/footer/footer';
import { Swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/dist/css/swiper.css';
import Header from '../../components/header/header';
import Center from '../../components/center/center';
import BScroll from 'better-scroll';
import {Toast, Dialog} from 'vant';
import {reqAnnualCar, saveAsvDate} from '../../api';
import {RECEIVE_INDEX, RECEIVE_ASCAR, RECEIVE_CARINDEX, RECEIVE_USER} from '../../store/mutation-types';
let that;
export default {
  name: 'home',
  data () {
    return {
      curHeight:1140,//当前所需屏幕高度  
      user_data:[],
      vehicle_id: null, // 车辆ID
      yuqi: false, // 车辆是否逾期
      cars:[],
      carsDay:[],
      diff_year:6, // 车辆注册年数
      index:null,
    }
  },
  component:{
    Header,
    Center
  },
  components: {
    Swiper,
    swiperSlide
  },
  mounted () {
    this.vehicle_id = this.$route.query.vehicle_id;
    if (this.vehicle_id) {
      this.setCookie('vehicle_id', this.vehicle_id);
    }
    const token = this.$store.state.token;
    const _this = this;
    async function req() {
      if (token) {
        const result = await reqAnnualCar(token);
        _this.user_data = result.datas;
         _this.$store.commit(RECEIVE_USER, _this.user_data)
      }
    }
    if (!_this.user_data) {
      req();
    }
    this.$nextTick(() => {
      //必须是界面显示后才有效果
      new Swiper(".swiper-container", {
        spaceBetween: 60,
        effect: 'coverflow',
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows : false
        },
        observer:true,
        observeParents:true,
        _this: this,
        on:{
          init: async function() {
            const getCookie = function(name){
              var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
              if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
              }else{
                return null;
              }
            };
            const setCookie = function(name, value) {
              var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
              var date = new Date();
              date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); //设置date为当前时间加一年
              str += ";expires=" + date.toGMTString();
              console.log(str)
              document.cookie = str;
            };
            let token = _this.$store.state.token;
            if (!token) {
              token = _this.getCookie('token');
            }
            if (token) {
              const result = await reqAnnualCar(token);
              _this.user_data = result.datas;
               _this.$store.commit(RECEIVE_USER, _this.user_data)
              for (let index = 0; index < _this.user_data.length; index++) {
                const element = _this.user_data[index].asv_day;
                _this.cars.push(element);
              }
              let vehicle_id;
              if (_this.user_data && _this.user_data.length != 0) {
                vehicle_id = _this.user_data[0].vehicle_id;
                setCookie('vehicle_id', vehicle_id);
              }
              let diff_year = _this.diff_year;
              let index;
              if (_this.user_data && _this.user_data.length != 0) {
                _this.diff_year = _this.user_data[this.activeIndex].diff_year;
                _this.index = this.activeIndex;
                index = _this.index;
                _this.$store.commit(RECEIVE_INDEX, index);
                if (vehicle_id) {
                  _this.$store.state.diff_year.splice(index,0,{[vehicle_id]:diff_year})
                }
                _this.$store.commit(RECEIVE_CARINDEX, index)
              }
            }
          },
          slideChangeTransitionEnd: async function () {
            const getCookie = function(name){
              var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
              if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
              }else{
                return null;
              }
            };
            const setCookie = function(name, value) {
              var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
              var date = new Date();
              date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); //设置date为当前时间加一年
              str += ";expires=" + date.toGMTString();
              console.log(str)
              document.cookie = str;
            };
            const token = getCookie('token');
            let diff_year = _this.diff_year;
            if (token) {
              const result = await reqAnnualCar(token);
              _this.user_data = result.datas;
               _this.$store.commit(RECEIVE_USER, _this.user_data)
              let vehicle_id;
              if (_this.user_data[this.activeIndex]) {
                vehicle_id = _this.user_data[this.activeIndex].vehicle_id;
              }
              setCookie('vehicle_id', vehicle_id);
              const index = this.activeIndex;
              _this.index = index;
              if (vehicle_id) {
                _this.diff_year = _this.user_data[this.activeIndex].diff_year;
                _this.$store.state.diff_year.splice(index,0,{[vehicle_id]:diff_year})
                _this.$store.state.carIndex = index;
              }
              _this.$store.commit(RECEIVE_CARINDEX, index)
            }
          },
          
        }
      });
      this.scroll = new BScroll('.index', {
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
    this.beforeMount(80);
  },
  watch: {
    cars () {
      // console.log(this.cars);
      for (let index = 0; index < this.cars.length; index++) {
        const element = this.cars[index];
        let day = this.yuqiFn(element)
        if (day > 0) {
          this.yuqi = true;
        } else {
          this.yuqi = false;
        }
        this.carsDay.push(day);
      }
    }
  },
  methods: {
    async dateFn () {
      Toast.loading({
        message: '请稍候',
        forbidClick: true,
        duration: 1000,
      });
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token')
      }
      let vehicle_id = this.vehicle_id;
      if (!vehicle_id) {
        vehicle_id = this.getCookie('vehicle_id')
      }
      let result;
      try {
        result = await saveAsvDate(vehicle_id, token)
        if (result.errno == '10000') {
          Toast.success({
            msg: '已办理',
            duration: 1000,
            forbidClick: true
          });
        } else if (result.errno != '10000') {
          Toast(result.msg)
        }
      } catch (error) {
        console.log(error);
      }
    },
    goTo (path,data) {
      const index = this.$store.state.index;
      // console.log(data);
      let carId = data;
      if (data) {
         this.$router.push({ path, query:{data: carId} });
      } else {
        this.$router.push(path);
      }
    },
    setCookie (name, value) {
      var str = name + "=" + escape(value) + ";domain=m.cheduo.com;path=/html";
      var date = new Date();
      date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000); //设置date为当前时间加一年
      str += ";expires=" + date.toGMTString();
      console.log(str)
      document.cookie = str;
    },
    yuqiFn(asv_day) {
      let timer = (new Date(asv_day)).getTime();
      let value = new Date();
      let time = value - timer;
      let day = Math.floor(time/86400000);
      if (day > 0) {
        this.yuqi = true;
        return day
      } else if (day <= 0) {
        this.yuqi = false;
        return day
      }
    },
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
    },
    getCookie(name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
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
      let carIndex;
      let year;
      let isTrue;
      if (this.index !== null) {
        carIndex = this.index
        if (carIndex !== null) {
          year = this.user_data[carIndex].diff_year;
          isTrue = this.user_data[carIndex].errno;
        }
      }
      
      if (token && year < 4.1 && isTrue == 1) {
        const source = 'H5-cheduo';
        // const result = await reqSix(source, vehicle_id, token);
        window.location.href = "https://m.cheduo.com/asv/index?source="+source+'&vehicle_id='+vehicle_id+'&token='+token;
      } else if (token && year >= 4.1 && isTrue == 1) {
        this.$router.push(path);
      } else if (!this.user_data) {
        Toast('请先添加车辆')
      } else {
        Toast('车辆不可办理')
      }
    }
  },
  updated () {
    let token = this.$store.state.token;
    if (!token) {
      token = this.getCookie('token');
    }
    const _this = this;
    let index;
    index = _this.index;
    _this.$store.state.carIndex = index;
    async function req() {
      if (token) {
        const result = await reqAnnualCar(token);
        _this.user_data = result.datas;
        _this.$store.commit(RECEIVE_USER, _this.user_data)
        // console.log(_this.user_data);
      }
    }
    if (!_this.user_data) {
      req();
    }
    // console.log(this.activeIndex);
    // if (token) {
      // if (_this.diff_year >= 4 || !_this.diff_year) {
      //   _this.$router.push({ path: '/asv/pickcar', query: { index } });
      // } else {
      //   _this.$router.push({ path: '/asv/index', query: { index } });
      // }
    // }
  },
  beforeCreate() {
    that = this;
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
@import '../../common/stylus/mixins.styl'
.home
  padding-top: 88px;
  padding-bottom: 100px;
  background-color #eee
  .index
    overflow hidden
    .index_center
      position relative
      width 100%
      .head
        width 100%
        height 375px
        background url('./img/banner.png') no-repeat center center
        background-repeat no-repeat
        background-size cover
      .car
        width 100%
        height 447px
        position absolute
        top 236px
        .list
          height 447px
          .swiper-slide-active
            transform: scale(1)
          .item
            width:590px;
            height:447px;
            border-radius:16px;
            background-color #fff
            .item_center
              text-align center
              img
                width:155px;
                height:155px;
                line-height 155px
                margin 70px auto 30px auto
              h3 
                height:29px;
                font-size:30px;
                font-weight:bold;
                color:rgba(8,16,26,1);
                line-height:30px;
                margin 20px auto
              p 
                height:24px;
                font-size:24px;
                font-weight:bold;
                color:rgba(159,166,174,1);
                line-height:30px;
            .item-top
              position relative
              width:590px;
              height:160px;
              background:linear-gradient(0deg,rgba(2,164,245,1),rgba(71,194,255,1));
              background-image url('./img/card-title.png')
              background-repeat no-repeat
              background-size contain
              span 
                position absolute
                left 270px
                top 45px
                height:22px;
                font-size:22px;
                font-weight:bold;
                color:rgba(253,254,255,1);
                line-height:30px;
              p
                font-weight:bold;
                color:rgba(254,254,254,1);
                line-height:30px;
                &:nth-of-type(1)
                  position absolute
                  left 40px
                  top 40px
                  width:190px;
                  height:34px;
                  font-size:36px;
                &:nth-of-type(2)
                  position absolute
                  left 39px
                  top 98px
                  width:297px;
                  height:23px;
                  font-size:24px;
              .top-button
                position absolute
                left 403px
                top 55px
                width:156px;
                height:70px;
                background:rgba(255,255,255,1);
                border-radius:30px;
                font-size:30px;
                font-weight:500;
                color:rgba(39,130,244,1);
                line-height:70px;
                i
                  display inline-block
                  width:30px;
                  height:26px;
                  background url('./img/edit_icon.png') no-repeat center center
                  background-size contain
            .item-down
              position relative
              width 590px
              height 288px
              p 
                width:416px;
                height:27px;
                font-size:28px;
                font-weight:bold;
                color:rgba(159,166,174,1);
                line-height:30px;
                &:nth-of-type(1)
                  position absolute
                  top 49px
                  left 87px
                &:nth-of-type(2)
                  position absolute
                  left 106px
                  bottom 110px
                  // width:178px;
                span 
                  width:72px;
                  height:46px;
                  font-size:60px;
                  font-weight:bold;
                  color:rgba(8,16,26,1);
                  line-height:30px;
              a 
                width:171px;
                height:27px;
                font-size:28px;
                font-weight:bold;
                line-height:30px;
                color:rgba(39,130,244,1);
                position absolute
                &:nth-of-type(1)
                  left 38px
                  bottom 33px
                &:nth-of-type(2)
                  left 420px
                  bottom 34px
            .noactive
              background url('./img/cannothandle.png')
              background-repeat no-repeat;
              background-size 107px 107px
              background-color rgba(255, 255, 255, 1)
            .active 
              background url('./img/canhandle.png')
              background-repeat no-repeat;
              background-size 107px 107px
              background-color rgba(255, 255, 255, 1)
      .center
        position absolute
        top 705px
        width 100%
        height 100px
        display flex
        justify-content center
        align-items center
        font-size:30px;
        background-color rgba(255,255,255,1)
        font-weight:bold;
        .center_item
          flex: 1; 
          text-align:center
          height 100px
          line-height 100px
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
            background-image url('./img/question_icon.png')
            background-size 36px 36px
        &:nth-of-type(2)
          .item_icon
            width:36px;
            height:36px
            background-image url('./img/coupon_icon.png')
            background-size 36px 36px
        &:nth-of-type(3)
            .item_icon
              width:36px;
              height:36px
              background-image url('./img/order.png')
              background-size 36px 36px
    .guide_item:nth-of-type(1)
        .item_icon
          width:36px;
          height:36px
          background-image url('./img/question_icon.png')
          background-size 36px 36px
    .guide_item:nth-of-type(2)
        .item_icon
          width:36px;
          height:36px
          background-image url('./img/coupon_icon.png')
          background-size 36px 36px
    .guide_item:nth-of-type(3)
        .item_icon
          width:36px;
          height:36px
          background-image url('./img/order.png')
          background-size 36px 36px
      span
        font-size:20px;
        font-weight:500;
        color:rgba(8,16,26,1);
        line-height:35px;
</style>