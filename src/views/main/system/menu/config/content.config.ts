// 不变化的写死的放在配置文件里
export const contentTableConfig = {
  title: '菜单列表',
  buttonInfo: '菜单',
  propList: [
    {
      prop: 'name',
      label: '菜单名称',
      minWidth: '100'
    },
    {
      prop: 'type',
      label: '类型',
      minWidth: '60'
    },
    {
      prop: 'url',
      label: '菜单url',
      minWidth: '100'
    },
    {
      prop: 'icon',
      label: '菜单icon',
      minWidth: '100'
    },
    {
      prop: 'permission',
      label: '按钮权限',
      minWidth: '100'
    },
    {
      prop: 'createAt',
      label: '创建时间',
      minWidth: '220',
      slotName: 'createAt'
    },
    {
      prop: 'updateAt',
      label: '更新时间',
      minWidth: '220',
      slotName: 'updateAt'
    },
    {
      label: '操作',
      minWidth: '120',
      slotName: 'handler'
    }
  ],
  // 表格是否显示序列行
  showIndexColumn: false,
  // 表格是否可选择
  showSelectColumn: false,
  // 为列表展开进行配置
  childrenProps: {
    rowKey: 'id',
    treeProp: {
      children: 'children'
    }
  },
  showFooter: false
}
