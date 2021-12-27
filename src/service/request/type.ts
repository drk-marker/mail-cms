import { AxiosRequestConfig, AxiosResponse } from 'axios'
// 封装拦截器类型，接口可以接收泛型，但是里面的属性不行，然后把接口的泛型给属性用，虽然下面
// HYRequestConfig后面已经传给HYRequestInterceptors泛型默认值,但是以防有其他地方没通过HYRequestConfig,所以还是在HYRequestInterceptors也给个泛型默认值
export interface HYRequestInterceptors<T = AxiosResponse> {
  // 表示每个拦截器都是可选的
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (err: any) => any
  responseInterceptor?: (res: T) => T
  responseInterceptorCatch?: (err: any) => any
}
// 这里其实是对axios做了一个扩展
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: HYRequestInterceptors<T>
  // 是否显示loading
  showLoading?: boolean
}
