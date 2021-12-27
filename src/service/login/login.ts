import hyRequest from '../index'
import { IAcount, IloginResult } from './type'
import { IDataType } from '../types'
// 为了防止以后url值被改掉
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //users/1
  UserMenus = '/role/' //role/1/menu
}
//登陆的接口
export function accountLoginRequest(account: IAcount) {
  return hyRequest.post<IDataType<IloginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
//请求用户登陆信息
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}
//请求列表信息
export function requestUserMenuByRoleId(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
