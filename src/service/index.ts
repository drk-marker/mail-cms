// service文件夹统一的出口
import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 此处想传拦截器，但是config没有interceptors属性，在request/index里定义接口
  interceptors: {
    requestInterceptor: (config) => {
      // console.log('request success')
      const token = localCache.getCache('token')
      // const token = ''
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log('request failed')
      return err
    },
    responseInterceptor: (res) => {
      // console.log('response success')
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log('response failed')
      return err
    }
  }
})
export default hyRequest
