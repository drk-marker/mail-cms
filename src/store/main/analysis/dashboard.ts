import { Module } from 'vuex'
import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

import { IDashboardState } from './types'
import { IRootState } from '../../types'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      // 商品个数
      categoryGoodsCount: [],
      // 销量
      categoryGoodsSale: [],
      // 收藏
      categoryGoodsFavor: [],
      // 不同地方的销量
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryCount(state, list) {
      state.categoryGoodsCount = list
    },
    changeCategorySale(state, list) {
      state.categoryGoodsSale = list
    },
    changeCategoryFavor(state, list) {
      state.categoryGoodsFavor = list
    },
    changeAddressGoodsSale(state, list) {
      state.addressGoodsSale = list
    }
  },
  actions: {
    async getDashboardDataAction({ commit }) {
      const categoryCountResult = await getCategoryGoodsCount()
      commit('changeCategoryCount', categoryCountResult.data)
      const categorySaleResult = await getCategoryGoodsSale()
      commit('changeCategorySale', categorySaleResult.data)
      const categoryFavorResult = await getCategoryGoodsFavor()
      commit('changeCategoryFavor', categoryFavorResult.data)
      const addressGoodsResult = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsResult.data)
    }
  }
}
export default dashboardModule
