import hyRequest from '@/service'
import { IDataType } from '@/service/types'
export function getPageListData(url: string, queryInfo: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
// 删除
export function deletePageData(url: string) {
  return hyRequest.delete<IDataType>({
    url: url
  })
}
// 添加
export function createPageData(url: string, newDate: any) {
  return hyRequest.post<IDataType>({
    url: url,
    data: newDate
  })
}
// 编辑
export function editPageData(url: string, editDate: any) {
  return hyRequest.patch<IDataType>({
    url: url,
    data: editDate
  })
}
