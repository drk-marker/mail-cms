type IFormType = 'input' | 'password' | 'select' | 'datepicker'
// 封装的form组件，里面可能传的值
export interface IFormItem {
  // 字段
  field: string
  type: IFormType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对特殊的属性
  otherOptions?: any
  isHidden?: boolean
}
export interface IForm {
  formItems: IFormItem[]
  dialogTitle?: string
  labelWidth?: string
  itemStyle?: any
  colLayout?: any
}
