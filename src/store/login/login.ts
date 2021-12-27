import { Module } from 'vuex'
import { ILoginState } from './types'
import { IRootState } from '../types'
import { IAcount } from '@/service/login/type'
import router from '@/router'
import localCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermissons } from '../../utils/map-menus'
import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
// Module<S,R>module后面两个泛型是没有默认值的，且S是模块中State的类型，R是store的state类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 第一次拿到menu数据是登录时从服务器拿的，以后都是从localStorage里
    // 在此处做角色的权限注册
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // 去所有routes去匹配menu里有的route并返回
      const routes = mapMenusToRoutes(userMenus)
      // 动态添加路由
      // 添加二级路由对象，这里是main的子路由，第一个参数是给谁加路由，
      // 第二个是要加入的路由
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      //获取用户按钮
      const permissions = mapMenusToPermissons(userMenus)
      state.permissions = permissions
    }
  },
  getters: {},
  actions: {
    // async把函数变成异步，里面可以用同步代码结构写异步的代码
    async accountLoginAction({ commit, dispatch }, payload: IAcount) {
      //1. 实现登陆逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)
      //在此处发送获取完整部门和角色数据的请求，下一行第二三个参数是为了设置dispatch store根中的getInitialDataAction，此处解决登录时没有token的情况
      dispatch('getInitialDataAction', null, { root: true })
      // 2.请求用户信息数据
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      // 登陆成功后的主页就需要用户信息
      localCache.setCache('userInfo', userInfo)

      // 3.获取列表数据
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMunes = userMenusResult.data
      commit('changeUserMenus', userMunes)
      localCache.setCache('userMunes', userMunes)

      // 4.跳到首页
      router.push('./main')
    },
    // 刷新的时候vuex数据会消失，此处在消失前记录下来
    loadLocalLogin({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 做刷新操作时去本地拿部门和角色
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMunes = localCache.getCache('userMunes')
      if (userMunes) {
        commit('changeUserMenus', userMunes)
      }
    }
  }
}
export default loginModule
