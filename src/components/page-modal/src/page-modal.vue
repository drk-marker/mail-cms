<template>
  <div class="page-modal">
    <el-dialog
      destroy-on-close
      v-model="dialogVisible"
      :title="
        (Object.keys(defaultInfo).length === 0 ? '新建' : '编辑') +
        modalConfig.dialogTitle
      "
      width="30%"
      center
    >
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerConfirmClick"
            >确定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useStore } from 'vuex'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    PageName: {
      type: String,
      required: true
    },
    // 其他的数据，比如需要把角色弹出框里树的数据menuList传过来和page-modal的数据一起发送请求
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  components: {
    HyForm
  },
  setup(props) {
    const dialogVisible = ref(false)
    const formData = ref<any>({})
    // role传来defaultInfo的时候，把其新数据放在输入框中
    watch(
      () => props.defaultInfo,
      (newValue) => {
        // 遍历地把modalConfig中的formItems取出，并用相对应的传来的item里的值赋值(在编辑操作里)
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    // 点击确定按钮逻辑
    const store = useStore()
    const handlerConfirmClick = () => {
      dialogVisible.value = false
      // 判断是点击的新增数据还是修改数据
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        store.dispatch('system/editPageDataAction', {
          pageName: props.PageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        store.dispatch('system/createPageDataAction', {
          pageName: props.PageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      dialogVisible,
      formData,
      handlerConfirmClick
    }
  }
})
</script>

<style scoped></style>
