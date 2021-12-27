<template>
  <div class="department">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      PageName="department"
      ref="pageContentRef"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="defaultInfo"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
// 配置文件
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
// 封装的组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'
export default defineComponent({
  name: 'department',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    // modal配置信息
    // const store = useStore()
    // const modalConfigRef = computed(() => {
    //   const parentIdItem = modalConfig.formItems?.find(
    //     (item) => item.field === 'parentId'
    //   )
    //   parentIdItem!.options = store.state.entireDepartments.map((item) => {
    //     return { label: item.name, value: item.id }
    //   })
    //   return modalConfig
    // })
    const [handleNewData, handleEditData, pageModalRef, defaultInfo] =
      usePageModal()
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageContentRef,
      handleResetClick,
      handleQueryClick,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
