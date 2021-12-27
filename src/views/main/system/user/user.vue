<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    ></page-search>
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      PageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    >
      <template #status="scope">
        <el-button
          size="mini"
          :type="scope.row.enable ? 'success' : 'danger'"
          plain
          >{{ scope.row.enable ? '启用' : '禁用' }}</el-button
        >
      </template>
    </page-content>
    <page-modal
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      PageName="users"
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
//hooks
import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModal } from '@/hooks/use-page-modal'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModal
  },
  setup() {
    // 这里写的都是user.vue独有的逻辑
    // 注意数组解构的顺序
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    // 1.点击新增和修改时会触发的事件，为了解决user.vue独有的逻辑，比如修改时dialog的密码字段要隐藏
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      // 确定有值的情况下可以用非空断言，关掉Eslint
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 2.动态添加增加角色中的部门和角色列表数据
    const store = useStore()
    // 因为vuex发生改变了，computed里面的副作用就开始执行，解决了动态数据需要刷新的问题
    const modalConfigRef = computed(() => {
      // 返回的是modalConfig里面的数据，departmentItem修改了modalConfig也会修改
      const departmentItem = modalConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      // vuex在template里引用或者computed里才会是响应式，这种把拿到的值直接赋值给一个配置文件不是响应式，
      // 会导致有时候还没请求到值就开始赋值，部门和角色的下拉框无结果显示选项
      // 所以此处为解决这个问题，把其放在了computed里面
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      roleItem!.options = store.state.entireRole.map((item: any) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    // 获取公共的变量和函数
    const [handleNewData, handleEditData, pageModalRef, defaultInfo] =
      usePageModal(newCallback, editCallback)
    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modalConfigRef,
      handleNewData,
      handleEditData,
      pageModalRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
