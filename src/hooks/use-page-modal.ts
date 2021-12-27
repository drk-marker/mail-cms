import { ref } from 'vue'
import PageModal from '@/components/page-modal'
// 回调函数
type CallbackFn = (item?: any) => void
export function usePageModal(
  newCallback?: CallbackFn,
  editCallback?: CallbackFn
) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 有值的时候进行调用
    newCallback && newCallback()
  }
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    editCallback && editCallback(item)
  }
  return [handleNewData, handleEditData, pageModalRef, defaultInfo]
}
