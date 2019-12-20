<template>
  <div>
    <HeaderTwo :title="'位置'"/>
    <div class="mymapM" v-bind:style="{height:curHeight}">
      <!--捜索-->
      <div v-if="loading" class="loading">
      </div>
      <div class="search-box">
        <div class="search-postion">
          <span class="buts">返回</span>
          <input type="text" placeholder="输入关键字搜索" v-model="search_key" />
          <span class="clear" v-if="search_key" @click="search_key ='' ">
          </span>
          <span class="buts border_but" @click="keySearch()">捜索</span>
        </div>
      </div>
      <div class="con-box con-map" v-if="!search_key">
        <!--地图-->
        <div class="mapbox">
          <div class="map" id="container"></div>
          <div class="sign"></div>
        </div>
      </div>
      <div class="con-box" v-if="!search_key">
        <!--地址列表-->
        <div class="Hlist-box">
          <ul>
            <li v-for="(item, index) in lists" :key="index" @click="onAddressLi(item)">
              <b>
              </b>
              <div>
                <span>{{item.name}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!--捜索列表-->
      <div class="search-list" v-show="search_key">
        <ul>
          <li v-for="(item, index) in search_list" :key="index" @click="onSearchLi(item.location)">
            <span>{{item.name}}</span>
          </li>
          <li v-if="noSearchShow">
            <p>暂无搜索结果</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script src="//webapi.amap.com/ui/1.0/main.js?v=1.0.11"></script>
<script>
import HeaderTwo from '../../components/header/header_two';
import BScroll from 'better-scroll';
import eventBus from '../../event/eventBus.js';
import {RECEIVE_CITY} from '../../store/mutation-types.js';
export default {
  data() {
    return {
      center: [113.8637316227, 22.5836023500], //经度+纬度
      search_key: "", //搜索值
      lists: [], //地点列表
      search_list: [], //搜索结果列表
      marker: "",
      loading: false,
      noSearchShow: false, //无搜索结果提示，无搜索结果时会显示暂无搜索结果
      scroll: {},
      curHeight:0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.adMap();
    }, 1000);
    this.$nextTick(() => {
      this.scroll = new BScroll('.search-list', {
        click: true,
        bounce: {
          top: true,
          bottom: true,
          left: true,
          right: true
        },
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
      })
      // console.log(this.scroll);
    }),
    this.$nextTick(() => {
      if (!this.search_key) {
        this.scroll = new BScroll('.Hlist-box', {
          click: true,
          bounce: {
            top: true,
            bottom: true,
            left: true,
            right: true
          },
          // scrollbar: {
          //   fade: false,
          //   interactive: false // 1.8.0 新增
          // },
          mouseWheel: {
            speed: 20,
            invert: false,
            easeTime: 300
          }
        })
      }
    })
    this.beforeMount(0)
  },
  methods: {
    beforeMount(height) {
      var h = document.documentElement.clientHeight || document.body.clientHeight;
      this.curHeight =h - height + `px`; //减去页面上固定高度height
      //// console.log(this.curHeight, h);
    },
    adMap() {
      this.loading = true;
      //初始化地图
      var map = new AMap.Map("container", {
        zoom: 18, //缩放级别
        center: this.center //设置地图中心点
        //resizeEnable: true,  //地图初始化加载定位到当前城市
      });
      //获取初始中心点并赋值
      // 同时引入工具条插件，比例尺插件和鹰眼插件
      AMap.plugin([
          'AMap.ToolBar',
          'AMap.Scale',
          // 'AMap.OverView',
          // 'AMap.MapType',
          'AMap.Geolocation',
      ], function(){
          // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
          map.addControl(new AMap.ToolBar());

          // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
          map.addControl(new AMap.Scale());

          // 在图面添加鹰眼控件，在地图右下角显示地图的缩略图
          // map.addControl(new AMap.OverView({isOpen:true}));
        
          // 在图面添加类别切换控件，实现默认图层与卫星图、实施交通图层之间切换的控制
          // map.addControl(new AMap.MapType());
        
          // 在图面添加定位控件，用来获取和展示用户主机所在的经纬度位置
          map.addControl(new AMap.Geolocation());
      });
      var currentCenter = map.getCenter(); //此方法是获取当前地图的中心点
      this.center = [currentCenter.lng, currentCenter.lat]; //将获取到的中心点的纬度经度赋值给data的center
      // // console.log(this.center);

      //创建标记
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(currentCenter.lng, currentCenter.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      });
      this.marker.setLabel({
        offset: new AMap.Pixel(0, 15),  //设置文本标注偏移量
        content: "<div class='info' style='background-color:#5396E6;border:5px solid #fff; width:10px; height:10px;border-radius:10px;'></div>", //设置文本标注内容
        direction: 'center' //设置文本标注方位
      });
      
      // 将创建的点标记添加到已有的地图实例：
      map.add(this.marker);
      var circleMarker = new AMap.CircleMarker({
          center: new AMap.LngLat(currentCenter.lng, currentCenter.lat),  // 圆心位置
          radius: 50, // 圆半径
          fillColor: 'rgba(200, 210, 229, 1)',   // 圆形填充颜色
          strokeColor: '#fff', // 描边颜色
          strokeWeight: 1, // 描边宽度
      });

      map.add(circleMarker);
      //根据地图中心点查附近地点，此方法在下方
      this.centerSearch();
      //监听地图移动事件，并在移动结束后获取地图中心点并更新地点列表
      var moveendFun = e => {
        // 获取地图中心点
        currentCenter = map.getCenter();
        this.center = [currentCenter.lng, currentCenter.lat];
        this.marker.setPosition([currentCenter.lng, currentCenter.lat]); //更新标记的位置
        //根据地图中心点查附近地点
        circleMarker.setCenter([currentCenter.lng, currentCenter.lat])  // 更新圆形覆盖物的圆心
        // // console.log(currentCenter.lng, currentCenter.lat);
      };
      // var setcenterFun = e => {
      //   currentCenter = map.getCenter();
      //   circleMarker.setCenter(currentCenter.lng, currentCenter.lat)
      //   // console.log(currentCenter.lng, currentCenter.lat);
      // }
      //更新数据
      var centerSearch = () => {
        this.loading = true;
        this.centerSearch();
      };

      // 绑定事件移动地图事件
      map.on("mapmove", moveendFun); //更新标记
      map.on("moveend", centerSearch); //更新数据
      // map.on("mapmove", setcenterFun); // 更新圆形覆盖物的圆心
    },
    centerSearch() {
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //根据地图中心点查附近地点
        placeSearch.searchNearBy(
          "",
          [this.center[0], this.center[1]],
          200,
          (status, result) => {
            if (status == "complete") {
              this.lists = result.poiList.pois; //将查询到的地点赋值
              this.loading = false;
            }
          }
        );
      });
    },
    keySearch() {
      this.loading = true;
      AMap.service(["AMap.PlaceSearch"], () => {
        //构造地点查询类
        var placeSearch = new AMap.PlaceSearch({
          type:
            "汽车服务|餐饮服务|购物服务|生活服务|体育休闲服务|医疗保健服务|住宿服务|风景名胜|商务住宅|政府机构及社会团体|科教文化服务|交通设施服务|金融保险服务|公司企业|地名地址信息", // 兴趣点类别
          pageSize: 30, // 单页显示结果条数
          pageIndex: 1, // 页码
          city: "全国", // 兴趣点城市
          citylimit: false, //是否强制限制在设置的城市内搜索
          autoFitView: false // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
        });
        //关键字查询
        placeSearch.search(this.search_key, (status, result) => {
          if (status == "complete") {
            if (result.poiList.count === 0) {
              this.noSearchShow = true;
            } else {
              this.search_list = result.poiList.pois; //将查询到的地点赋值
              this.noSearchShow = false;
              this.loading = false;
            }
          } else {
            this.search_list = [];
            this.noSearchShow = true;
          }
        });
      });
    },
    onAddressLi(e) {
      // // console.log(e);
      eventBus.$emit('city_address',e);
       this.$store.commit(RECEIVE_CITY, e)
      //  // console.log(this.$store.state.address);
      this.$router.go(-1)
      this.marker.setPosition([e.location.lng, e.location.lat]); //更新标记的位置
    },
    onSearchLi(e) {
      // console.log(e);
      // console.log(e.lng + "-" + e.lat);
      this.center = [e.lng, e.lat];
      // console.log(this.center);
      this.search_key = "";
      // this.loading=true;
      setTimeout(() => {
        this.adMap();
      }, 1000);
    },
    // AMapUI.loadUI(['overlay/SimpleMarker'], function(SimpleMarker) {
    //   new SimpleMarker({
    //     //显示定位基点
    //     showPositionPoint: true,
    //     iconStyle: 'red',
    //   });
    // }),
  },
  watch: {
    search_key(newv, oldv) {
      if (newv == "") {
        this.search_list = [];
        this.noSearchShow = false;
        setTimeout(() => {
          this.adMap();
        }, 1000);
      }
    }
  },
};
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
.mymapM
  width 750px
  height 100%
  padding-top: 88px;
  .con-map 
    height: 190px;
    width: 750px;
  .con-box 
    width 750px
    height 680px
    overflow hidden
    .mapbox 
      margin-bottom: 10px;
      position: fixed;
      z-index: 111;
      width: 750px;
      height 650px;
      padding: 10px 0;
      background: #eceeee;
      .map 
        width: 750px;
        height 650px;
    .Hlist-box 
      width: 96%;
      height 75%
      margin: 0 auto;
      background: #fff;
      border-radius: 5px;
      li 
        height: 40px;
        padding: 14px 22px;
        border-bottom: 1px solid #d9d9d9;
        display: flex;
        b 
          display: inline-block;
        div 
          width: 100%;
        span 
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 20px;
          display: inline-block;
          text-align left 
          line-height 40px
          width: 90%;
  .search-box 
    height: 48px;
    line-height: 48px;
    background: #fff;
    border-bottom: 1px solid #bfbec4;
    .search-postion 
      height: 65px;
      line-height: 65px;
      background: #fff;
      border-bottom: 1px solid #bfbec4;
      width: 750px;
      position: fixed;
      z-index: 99999;
      display: flex;
      input 
        flex: 4;
        height: 25px;
        padding: 20px 0;
        border: none;
        text-indent: 10px;
        font-size 20px
      .clear 
        margin: 2px 6px;
      .buts 
        width: 15%;
        text-align: center;
        display: inline-block;
        flex: 1;
      .border_but 
        border-left: 1px solid #8f8f8f;
        height: 14px;
        line-height: 14px;
        margin: 17px 0;
  .search-list 
    width: 96%;
    margin: 0 auto;
    margin-top: 10px;
    border-radius: 5px;
    background: #fff;
    height 100%;
    li 
      height: 40px;
      padding: 14px 22px;
      border-bottom: 1px solid #d9d9d9;
      span 
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 20px;
        display: inline-block;
        width: 90%;
        text-align left 
        line-height 40px
  .loading
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99999999;
</style>

