// 不变化的写死的放在配置文件里
export const contentTableConfig = {
  title: '角色列表',
  buttonInfo: '角色',
  propList: [
    {
      prop: 'name',
      label: '角色名',
      minWidth: '100'
    },
    {
      prop: 'intro',
      label: '权限介绍',
      minWidth: '100'
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
