<template>
<div class="warrp">
  <Header :title="'检测站'"></Header>
  <div class="site">
    <div class="city">
      <area-select v-if="show" type='all' :level='2' :data="pcaa" v-model="selected" style="top: 0"></area-select>
    </div>
    <div class="shop">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit" :style="{marginTop: '28px'}">
        <ul>
          <li v-for="(item, index) in dataList" :key="index">
            <div class="shop_left">
              <!-- <img class="shop_img" src="./img/shop.png"/> -->
              <img class="shop_img" :src="imgur + item.shop_icon"/>
            </div>
            <div class="shop_right">
              <section class="shop_detail_header">
                <h4 class="shop_title ellipsis">{{item.shop_name}}</h4>
              </section>
              <section class="shop_rating_order">
                <section class="shop_rating_order_left">
                  <!-- <div class="order_section">营业时间：09:00-24:00</div> -->
                  <div class="order_section">营业时间：{{item.trade_time}}</div>
                </section>
              </section>
              <section class="shop_distance">
                <!-- <p class="shop_delivery_msg">宝安区西乡街道盐田社区银田路1234号</p> -->
                <p class="shop_delivery_msg">{{item.shop_address}}</p>
                <!-- <p class="shop_delivery_msg">A座一层101室</p> -->
              </section>
            </div>
          </li>
        </ul>
      </mescroll-vue>
    </div>
  </div>
</div>
</template>
<script>
import Header from '../../components/header/header';
import 'vue-area-linkage/dist/index.css';
import { pca, pcaa } from 'area-data';
import {reqShop} from '../../api';
 import MescrollVue from 'mescroll.js/mescroll.vue';
 import axios from 'axios';
export default {
  components: {
    MescrollVue // 注册mescroll组件
  },
  data () {
    return {
      selected:['440000', '440300', '440306'],
      pca: pca,
      pcaa: pcaa,
      show: true,
      mescroll: null, // mescroll实例对象
      mescrollDown:{}, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: { // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
      },
      dataList: [], // 列表数据
      reqData: {},
      imgur: `https://static.cheduo.com/img/`
    }
  },
  methods: {
    async reqShopList(){
      const province_code = this.selected[0];
      const city_code = this.selected[1];
      const area_code = this.selected[2];
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token')
      }
      this.reqData = {province_code, city_code, token, area_code};
       let result;
      try {
        result = await reqShop(province_code, city_code, token, area_code)
      } catch (error) {
        
      }
      this.dataList = result.datas;
      // console.log(result);
    },
    getCookie (name){
      var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
      if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
      }else{
        return null;
      }
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit (mescroll) {
      this.mescroll = mescroll  // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    upCallback (page, mescroll) {
      // console.log(page, mescroll);
      const url = `https://m.cheduo.com/api/asv/shop`;
      const province_code = this.selected[0];
      const city_code = this.selected[1];
      let area_code;
      for(var st in this.selected[2]) {
        area_code = st;
      }
      let token = this.$store.state.token;
      if (!token) {
        token = this.getCookie('token')
      }
      this.reqData = {province_code, city_code, token, area_code};
      axios({
        method:"post",
        url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: this.reqData,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
      }).then((response) => {
        // 请求的列表数据
        let arr = response.data.datas;
        if(arr) {
          // 如果是第一页需手动置空列表
          if (page.num === 1) this.dataList = []
          // 把请求到的数据添加到列表
          this.dataList = this.dataList.concat(arr)
          // 数据渲染成功后,隐藏下拉刷新的状态
          this.$nextTick(() => {
            mescroll.endSuccess(arr.length)
          })
        } else {
          mescroll.endErr()
        }
      }).catch((e) => {
        // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
        mescroll.endErr()
      })
    },
    
  },
  mounted () {
    this.reqShopList();
  },
  watch: {
    'selected': function(newVal){
      this.upCallback({num: 1, size: 10, time: null}, this.mescroll)
    },
  }
}
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.warrp
  width 100%
  height 100%
  padding-top 88px
  .shop
    .mescroll
      position fixed;
      top 88px
      bottom 0
      height auto 
      ul 
        background-color #fff
        li 
          padding 15px 20px
          .shop_left
            // float left
            // box-sizing border-box
            width:160px;
            height:140px;
            border-radius:8px;
            display inline-block
            .shop_img
              display block
              width 100%
              height 100%
              border-radius:8px;
          .shop_right
            float right
            width 72%
            padding-left 20px
            .shop_detail_header
              clearFix()
              width 100%
              .shop_title
                height:36px;
                font-size:30px;
                font-weight:bold;
                color:rgba(69,73,72,1);
                line-height:36px;
                text-align left
                margin 10px 0
            .shop_rating_order
              clearFix()
              width 100%
              .shop_rating_order_left
                color #ff9a0d
                .order_section
                  text-align left
                  height:23px;
                  font-size:24px;
                  font-weight:500;
                  color:rgba(167,171,170,1);
                  line-height:35px;
                  margin 10px 0
            .shop_distance
              clearFix()
              width 100%
              font-size 12px
              .shop_delivery_msg
                text-align left
                display block
                height:23px;
                font-size:24px;
                font-weight:500;
                color:rgba(167,171,170,1);
                line-height:35px;
              .segmentation
                color #ccc
</style>