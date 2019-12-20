<template>
  <div v-html="html"></div>
</template>
<script>
    import {Toast} from 'vant';
    import {reqAlipay} from '../../api';
    export default {
      data(){
        return{
          html:''
        }
      },
      components: {
        [Toast.name] : Toast,
      },
      methods:{
        async fetchVideoPay(){
          let order_code = this.$route.query.order_code;
          let asv_coupon_id = this.$route.query.asv_coupon_id;
          let token = this.$route.query.token;
          alert(order_code, asv_coupon_id, token);
          const alipay = await reqAlipay(order_code, asv_coupon_id, token)
          // console.log(alipay);
          if (typeof alipay === Object) {
            console.log(alipay)
            // console.log('渲染页面');
            Toast('支付失败')
          } else {
            console.log(alipay);
            this.html = alipay;
            this.$nextTick(() => {
              document.forms[0].submit()   //渲染支付宝支付页面
            })
          }
        }
      },
      mounted(){
        this.fetchVideoPay()
      }
    }
</script>
<style lang='stylus' rel='stylesheet/stylus' scoped>
</style>