import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
// import './service/axios.demo'
// import hyRequest from './service/index'
// import { BASE_URL, BASE_NAME } from './service/request/config'
// import axios from 'axios'
import { registerApp } from './globle'
// element全局引用
// import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'normalize.css'
import './assets/css/index.less'
import { setupStore } from './store/index'

const app = createApp(App)

registerApp(app)
app.use(store)
// app.use(ElementPlus)
// app.component('ElButton', ElButton)
// 每次重新运行代码就会执行setupStore,防止刷新导致vuex内容没了,且要注意app.use(router)要放在setupStore函数后面
// 因为app去执行install方法的时候，会直接拿到path并去routes里去匹配,如果放前面了，还没有收集并注册routes,匹配到not-found组件
// 然后获取路径并注册，然后才到导航守卫
setupStore()
// app.use传入函数会传入app当参数然后执行，如果use后跟的是对象，则执行install方法，方法中也会传入app
app.use(router)
// 这样设置就能够全局使用

app.mount('#app')

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)
// console.log(BASE_URL)
// console.log(BASE_NAME)

// 只有这个request请求才有拦截器
// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
// headers: {},
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的config')
//       return res
//     }
//   }
// })
// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }
// hyRequest
//   .request<DataType>({
//     url: '/home/multidata',
//     method: 'GET',
//     showLoading: false
//   })
//   // res就是DataType类型了,因为index.ts里Promise<T>
//   .then((res) => {
//     // console.log(res.data)
//     // console.log(res.returnCode)
//     // console.log(res.success)
//   })
// hyRequest
//   .get<DataType>({
//     url: '/home/multidata',
//     showLoading: false
//   })
//   // res就是DataType类型了
//   .then((res) => {
//     console.log(res.data)
//     console.log(res.returnCode)
//     console.log(res.success)
//   })
