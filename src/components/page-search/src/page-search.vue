<template>
  <div class="page-search">
    <hy-form v-bind="searchFormConfig" v-model="formData">
      <template #header>
        <h1>高级检索</h1>
      </template>
      <template #footer>
        <div class="handle-btns">
          <el-button @click="handleResetClick">
            <el-icon><refresh /></el-icon>
            重置</el-button
          >
          <el-button type="primary" @click="handleQueryClick">
            <el-icon><search /></el-icon>
            搜索</el-button
          >
        </div>
      </template>
    </hy-form>
    <div class="content"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'
import { Search, Refresh } from '@element-plus/icons'
export default defineComponent({
  props: {
    // 配置对象
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    HyForm,
    Search,
    Refresh
  },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 优化一
    // 双相绑定的属性应该是由配置文件的field来决定，不应该在下面直接写死，因为不同的页面里的formdata是不同的
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = ref(formOriginData)
    // 优化二：重置处理
    const handleResetClick = () => {
      // 这样修改无法改掉form.vue里的formData的值,除非搭配form.vue里的方法二
      formData.value = formOriginData
      // 用遍历修改属性而不是直接赋值,这样可以对form.vue里的formData进行修改
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      emit('resetBtnClick')
    }
    // 优化三：点击搜索,因为请求的方法在page-content里，所以先把事件发给共同父组件user.vue,再传给page-content
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
}
</style>
