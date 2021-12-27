<template>
  <div class="page-content">
    <hy-table
      :listData="dataList"
      :listCount="dataCount"
      @selectChange="selectChange"
      v-bind="contentTableConfig"
      v-model:page="pageInfo"
    >
      <!-- v-model:page相当于:page和@update:page -->
      <!-- header中的插槽 -->
      <template #headerHandler>
        <el-button v-if="isCreate" @click="handleNewClick" type="primary">
          新建{{ contentTableConfig.buttonInfo }}
        </el-button>
      </template>

      <!-- 列中的插槽 -->
      <!-- 具名插槽和作用域插槽的结合，把想更改的样式给拿到的数据 -->

      <template #createAt="scope">
        <span>{{ $filters.formatTime(scope.row.createAt) }}</span>
      </template>
      <template #updateAt="scope">
        <span>{{ $filters.formatTime(scope.row.updateAt) }}</span>
      </template>
      <template #handler="scope">
        <div class="handle-btns">
          <el-button
            size="mini"
            type="text"
            v-if="isUpdate"
            @click="handleEditClick(scope.row)"
          >
            <el-icon>
              <edit />
            </el-icon>
            编辑</el-button
          >
          <el-button
            size="mini"
            type="text"
            v-if="isDelete"
            @click="handleDeleteClick(scope.row)"
          >
            <el-icon><delete /> </el-icon>删除</el-button
          >
        </div>
      </template>

      <!-- 动态插槽，针对每个页面独特属于自己的插槽 -->
      <template
        v-for="item in otherPropSlots"
        :key="item.prop"
        #[item.slotName]="scope"
      >
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
      <template #footer></template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch } from 'vue'
import { Delete, Edit, Refresh } from '@element-plus/icons'
import HyTable from '@/base-ui/table'
import { useStore } from '@/store'
import { usePermission } from '@/hooks/use-permission'

export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    // 每个页面传来的
    PageName: {
      type: String,
      required: true
    }
  },
  components: {
    Delete,
    Edit,
    HyTable
  },
  emits: ['newBtnClick', 'editBtnClick'],
  // setup里函数默认只会调用一次
  setup(props, { emit }) {
    const store = useStore()

    // 0.获取操作的权限
    const isCreate = usePermission(props.PageName, 'create')
    const isUpdate = usePermission(props.PageName, 'update')
    const isDelete = usePermission(props.PageName, 'delete')
    const isQuery = usePermission(props.PageName, 'query')
    // 1.双向绑定pageInfo
    const pageInfo = ref({
      currentPage: 1,
      pageSize: 10
    })
    watch(pageInfo, () => {
      getPageData()
    })
    // 2.发送网络请求,queryInfo: any = {}没有传的话默认给个对象
    const getPageData = (queryInfo: any = {}) => {
      if (!isQuery) return

      store.dispatch('system/getPageListAction', {
        pageName: props.PageName,
        queryInfo: {
          // 偏移量和一页里的个数
          // 偏移量相当于pagesize*pagenum
          offset: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
          size: pageInfo.value.pageSize,
          ...queryInfo
        }
      })
    }
    getPageData()
    // 3.通过getters动态获取list数据
    const dataList = computed(() => {
      return store.getters['system/pageListData'](props.PageName)
    })
    // console.log(userList.value)
    const dataCount = computed(() => {
      return store.getters['system/pageListCount'](props.PageName)
    })

    // 4.获取其他的动态插槽
    const otherPropSlots = props.contentTableConfig?.propList.filter(
      (item: any) => {
        // 把固定的插槽过滤
        if (item.slotName === 'createAt') return false
        if (item.slotName === 'updateAt') return false
        if (item.slotName === 'handler') return false
        return true
      }
    )
    // 5.删除操作,分层（点击触发事件->vuex里发送删除请求->具体请求写在service里）
    const handleDeleteClick = (item: any) => {
      store.dispatch('system/deletePageDataAction', {
        pageName: props.PageName,
        id: item.id
      })
    }
    const handleNewClick = () => {
      emit('newBtnClick')
    }
    const handleEditClick = (item: any) => {
      emit('editBtnClick', item)
    }
    return {
      dataList,
      dataCount,
      getPageData,
      pageInfo,
      otherPropSlots,
      isCreate,
      isUpdate,
      isDelete,
      handleDeleteClick,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
