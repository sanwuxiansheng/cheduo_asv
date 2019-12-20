//微信H5支付
import axios from 'axios';
function wxPay(data, type) {
  WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
          "appId": data.appId,     //公众号名称，由商户传入
          "timeStamp": data.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": data.nonceStr, //随机串
          "package": data.package,
          "signType": data.signType,         //微信签名方式：
          "paySign": data.paySign //微信签名
      },
      function (res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
              if (type == "consume") {
                  window.location.href = "${basePath}/mpay/pay/paySuccess?sessionId=${sessionId}";
              } else if (type == "recharge") {
                  window.location.href = "${basePath}/mpay/pay/rechargePaySuccess?sessionId=${sessionId}";
              }
          } else if (res.err_msg == 'get_brand_wcpay_request:fail') {
              alert(res.err_desc)
          }
      });
};
 //解决微信内置对象报错
function weixinPay(data) {
  var vm= this;
  if (typeof WeixinJSBridge == "undefined"){
    if(document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady(data), false);
    }else if (document.attachEvent){
      document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady(data));
      document.attachEvent('onWeixinJSBridgeReady',vm.onBridgeReady(data));
    }
  }else{
    vm.onBridgeReady();
  }
};
//微信内置浏览器类，weChatParameter对象中的参数是3.步骤代码中从后端获取的数据
function onBridgeReady(){
  var  vm = this;
  var timestamp=Math.round(vm.weChatParameter.timeStamp).toString();
  WeixinJSBridge.invoke(
    'getBrandWCPayRequest',{
      debug:true,
      "appId":vm.weChatParameter.appId,     //公众号名称，由商户传入
      "timeStamp":timestamp, //时间戳，自1970年以来的秒数
      "nonceStr":vm.weChatParameter.nonceStr, //随机串
      "package":vm.weChatParameter.package,
      "signType":vm.weChatParameter.signType, //微信签名方式：
      "paySign":vm.weChatParameter.paySign, //微信签名
      jsApiList: [
        'chooseWXPay'
      ]
    },
    function(res){
      // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
      if(res.err_msg == "get_brand_wcpay_request:ok" ){
        Toast({
          message: '支付成功',
          position: 'middle',
          duration: 3000
        });
        vm.number=null
        vm.$router.go(-1)
        //window.location.href = vm.BASE_URL + 'index.html#/depositResult'
      }else{
        Toast({
          message: '支付失败',
          position: 'middle',
          duration: 3000
        });
      }
    }
  );
}
export default {
    methods:{
        wxpay() {
            axios.post(url,data)
            .then((res) => {
                if(res.code == 200) {
                    const pay_params = res.data.jsApiParameters

                    if (typeof WeixinJSBridge == "undefined"){
                        if(document.addEventListener) {
                            document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                        }else if (document.attachEvent){
                            document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
                            document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                        }
                        }else{
                        this.onBridgeReady(pay_params);
                    }
                }else{
                    alert('微信支付调起失败！');
                }
            }).catch((err) => {
                // console.log(err);
            })
        },
        onBridgeReady(params) {
            const pay_params = JSON.parse(params);
            WeixinJSBridge.invoke(
                'getBrandWCPayRequest', {
                    "appId": pay_params.appId,  //公众号名称，由商户传入     
                    "timeStamp": pay_params.timeStamp,  //时间戳，自1970年以来的秒数     
                    "nonceStr": pay_params.nonceStr,  //随机串     
                    "package": pay_params.package,     
                    "signType": pay_params.signType,  //微信签名方式：     
                    "paySign": pay_params.paySign  //微信签名 
                },
                function(res){
                    if(res.err_msg == "get_brand_wcpay_request:ok"){
                    alert('支付成功！');
                } 
            }); 
        },
    }

}