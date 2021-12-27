// 这个IDataType是返回数据的类型,后面的泛型是传给data的类型
export interface IDataType<T = any> {
  code: number
  data: T
}
