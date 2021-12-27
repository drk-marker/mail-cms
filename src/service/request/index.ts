import axios from 'axios'
import { AxiosInstance } from 'axios'
import { HYRequestInterceptors, HYRequestConfig } from './type'
import { ElLoading } from 'element-plus'
import { LoadingInstance } from 'element-plus/es/components/loading/src/loading'
// import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'
const DEFAULT_LOADING = true
// 类的封装性更强
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  loading?: LoadingInstance
  showLoading: boolean
  // HYRequestConfig是新定义的类型既有原有的config属性，又有传来的新定义的接口属性
  constructor(config: HYRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)
    // 保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors
    // 从config实例中取出的拦截器是对应的实例的拦截器(new HYRequest)
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )
    // 此处是所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('所有实例都有的 请求拦截成功')
        if (this.showLoading) {
          this.loading = ElLoading.service({
            // 蒙版
            lock: true,
            // 显示文字
            text: '正在请求数据',
            background: 'rgba(0,0,0,0.5)'
          })
        }
        return config
      },
      (err) => {
        // console.log('所有实例都有的 请求拦截失败')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        // console.log('所有实例都有的 响应拦截成功')
        // 将loading移除
        // setTimeout(() => {
        this.loading?.close()
        // }, 3000)
        const data = res.data
        if (data.returnCode === '-1001') {
          console.log('请求失败')
        } else {
          return data
        }
      },
      (err) => {
        console.log('所有实例都有的 响应拦截失败')
        // 将loading移除
        this.loading?.close()
        // 例子：判断不同的HTTPcode显示不同的错误信息
        if (err.response.state === 404) {
          console.log('错误404')
        }
        return err
      }
    )
  }
  // 控制单此请求的拦截器
  request<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        // 执行函数并赋值
        config = config.interceptors.requestInterceptor(config)
      }
      // 判断是否显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 因为上面showLoading被设置成了false，会导致下一个默认值本该是true的loading不显示，这里手动调成true
          this.showLoading = DEFAULT_LOADING

          // 3将结果resolve返回出去,刚开始res是AxiosResponse类型
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }
  get<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T = any>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
