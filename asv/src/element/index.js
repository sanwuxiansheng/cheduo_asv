// 导入自己需要的组件
import { Steps, Step } from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Steps)
    Vue.use(Step)
    // Vue.prototype.$message = Message
    // 解决首次进入自动弹出的问题
    // Vue.component(Message.name, Message)
  }
}
export default element