// 不变化的写死的放在配置文件里
export const contentTableConfig = {
  title: '用户列表',
  buttonInfo: '用户',
  propList: [
    {
      prop: 'name',
      label: '用户名',
      minWidth: '100'
    },
    {
      prop: 'realname',
      label: '真实姓名',
      minWidth: '100'
    },
    {
      prop: 'cellphone',
      label: '手机号码',
      minWidth: '100'
    },
    {
      prop: 'enable',
      label: '状态',
      minWidth: '100',
      slotName: 'status'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '250',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '250',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  // 表格是否显示序列行
  showIndexColumn: true,
  // 表格是否可选择
  showSelectColumn: true
}
