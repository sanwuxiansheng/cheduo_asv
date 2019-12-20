import axios from 'axios'
export default function ajax(url, data={}, method='GET') {
  // console.info(url);
  return new Promise((resolve, reject) => {
    let promise
    // 执行异步ajax请求
    if(method==='GET') {
      // console.log(data);
      promise = axios.get(url, {params: data}) // params配置, 指定的是query参数
    } else {
      promise = axios({
        method:"post",
        url,
        headers:{
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data,
        transformRequest: [function (data) {
            let ret = ''
            for (let it in data) {
              ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
            }
            return ret
        }],
      })
      // console.log(url, data);
    }
    promise.then(
      response => {  // 如果成功了, 调用resolve()
        resolve(response.data)
      },
      error => { // 如果失败了, 不调用reject(), 而是提示错误信息
        alert('请求异常: ' + error.message)
      },
      reject => {}
    ).catch()
  })
}
