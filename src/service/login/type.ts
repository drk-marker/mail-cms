export interface IAcount {
  name: string
  password: string
}
// login时，返回数据的data里的类型
export interface IloginResult {
  token: string
  id: number
  name: string
}
// 用户信息的data类型
// export interface IUserInfo {
//   token: string
//   id: number
//   name: string
// }
