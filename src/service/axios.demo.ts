import axios from 'axios'
// axios的配制选项,全局配置每个请求都会有，也可以在单个请求里配置
axios.defaults.baseURL = 'http://httpbin.org'
// 超过这个时间就看做超时了
axios.defaults.timeout = 10000
// axios.defaults.headers = {}

// axios就是一个实例对象，已经有方法了
// 模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res.data)
})
// get请求加传参
axios
  .get('/get', {
    params: {
      name: 'coderwhy',
      age: 18
    },
    // 单独配置
    timeout: 5000
  })
  .then((res) => {
    console.log(res.data)
  })
axios
  .post('/post', {
    data: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })
// promise本身可以有类型,<string>说明resolve就是字符串类型，then里拿到的也是字符串类型
// new Promise<string>((resolve) => {
//   resolve('1234')
// }).then((res) => {
//   console.log(res.length)
// })

axios
  .all([
    axios.get('/get', {
      params: {
        name: 'why',
        age: 18
      }
    }),
    axios.post('/post', {
      data: {
        name: 'coderwhy',
        age: 18
      }
    })
  ])
  // 所有请求结果都拿到了再then
  .then((res) => {
    console.log(res[0].data)
    console.log(res[1].data)
  })
// axios拦截器,fn1请求（或响应）成功执行的函数，请求（或响应）失败执行的函数
// axios.interceptors.request.use(fn1.fn2)
// axios.interceptors.response.use(fn1.fn2)
axios.interceptors.request.use(
  (config) => {
    // 想做的一些操作
    // 1.添加token,
    // 2.loading动画
    console.log('请求成功拦截')

    return config
  },
  (err) => {
    console.log('请求发生错误')

    return err
  }
)
axios.interceptors.response.use(
  (res) => {
    console.log('响应成功')
    return res
  },
  (err) => {
    console.log('响应失败')
    return err
  }
)
