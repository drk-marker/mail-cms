import { Module } from 'vuex'
import { ISystemState } from './types'
import { IRootState } from '../../types'
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData
} from '@/service/main/system/system'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0,
      departmentList: [],
      departmentCount: 0
    }
  },
  mutations: {
    // 把请求到的数据存到state中
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    },
    changeDepartmentList(state, departmentList: any[]) {
      state.departmentList = departmentList
    },
    changeDepartmentCount(state, departmentCount: number) {
      state.departmentCount = departmentCount
    }
  },
  // getters可以返回函数
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        // state之前就有类型的obj['a']没法拿
        return (state as any)[`${pageName}List`]
        // switch (pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    },
    // 根据pageName获取具体的dataCount
    pageListCount(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`]
      }
    }
  },
  actions: {
    // 发送网络请求获取列表数据
    async getPageListAction({ commit }, payload: any) {
      // 1.获取pageUrl
      const pageName = payload.pageName
      // 拼接出来要请求的地址
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //    pageUrl='/users/list'
      //     break
      //   case 'role':
      //    pageUrl='/role/list'
      //     break
      // }
      // 2.对页面发送请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)

      // 3.将数据存储到state中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      // switch (pageName) {
      //   case 'users':
      //     commit(`changeUsersList`, list)
      //     commit(`changeUsersCount`, totalCount)
      //     break
      //   case 'role':
      //     commit(`changeRoleList`, list)
      //     commit(`changeRoleCount`, totalCount)
      //     break
      // }
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取pageName，id拼接路径
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 调用删除网络请求
      await deletePageData(pageUrl)
      // 更新请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 添加数据
    async createPageDataAction({ dispatch }, payload: any) {
      // 1.创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      // 2.请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      // 1.编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      // 2.请求数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  }
}
export default systemModule
