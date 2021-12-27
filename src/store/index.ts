import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { IRootState, IStoreType } from './types'
import { getPageListData } from '@/service/main/system/system'
const store = createStore<IRootState>({
  state() {
    return {
      name: 'coderwhy',
      age: 18,
      // 全部部门
      entireDepartment: [],
      // 全部角色
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, departmentList) {
      state.entireDepartment = departmentList
    },
    changeEntireRole(state, rolementList) {
      state.entireRole = rolementList
    },
    changeEntireMenu(state, menuList) {
      state.entireMenu = menuList
    }
  },
  getters: {},
  actions: {
    async getInitialDataAction({ commit }) {
      // 1请求部门和角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      // 解构之后起别名
      const { list: departmentList } = departmentResult.data
      const RoleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: rolementList } = RoleResult.data

      // 请求角色弹框里树组件的数据，同样不要使用有请求条件的权限页面的数据
      const menuResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuResult.data
      // 2.保存数据
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', rolementList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})
// 如果登录后，然后刷新，localstorage里数据有，但是vuex数据没了，所以这个函数要防止其刷新，对store里做初始化
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
  // 这个请求的是dialog里的角色和部门的数据，但是最好不要直接调，因为有可能这边发送了数据请求，但是token的请求还没拿到，
  // 这样就会出现请求不到数据的问题,解决方法在store的login模块拿到token数据之后去请求
  // store.dispatch('getInitialDataAction')
}
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
