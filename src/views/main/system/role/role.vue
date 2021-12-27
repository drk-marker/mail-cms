<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      :modalConfig="modalConfig"
      PageName="role"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
          ref="elTreeRef"
        />
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'

import { ElTree } from 'element-plus'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import PageModal from '@/components/page-modal'

import { contentTableConfig } from './config/content.config'
import { searchFormConfig } from './config/search.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/use-page-modal'
import { MenuMapLeafKeys } from '@/utils/map-menus'
export default defineComponent({
  name: 'role',
  components: { PageContent, PageSearch, PageModal },
  setup() {
    // 处理pageModal的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = MenuMapLeafKeys(item.menuList)
      nextTick(() => {
        // 如果直接点击了编辑可能elTreeRef.value还没有绑定到el-tree组件上，导致没有显示
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [handleNewData, handleEditData, pageModalRef, defaultInfo] =
      usePageModal(undefined, editCallback)
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    // 选中树组价中的选项时触发的事件
    const handleCheckChange = (data1: any, data2: any) => {
      //  data1是返回点击的选项的列表里的信息，data2主要返回全选和半选的id
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      // 下面是把数组放在对象里是语法糖相当于'menuList'：menuList
      otherInfo.value = { menuList }
      console.log(menuList)
    }
    return {
      contentTableConfig,
      PageSearch,
      searchFormConfig,
      modalConfig,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 20px;
}
</style>
