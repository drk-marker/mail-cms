import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'
// 指定root里State的类型
export interface IRootState {
  name: string
  age: number
  // 全部部门，和全部角色单独保存在vuex里是因为部门页面请求的是有条件的数据(比如角色名称为why的角色列表数据)，也就可能没能全部显示部门或角色
  // 不宜放在增加用户时显示的部门或角色信息，另外也有可能有些用户权限没有部门管理页面，但是可以增加用户，即没有之前的
  // 部门请求逻辑，但增加用户时依然会用到部门，角色信息，所以存在vuex里
  entireDepartment: any[]
  // 全部角色
  entireRole: []
  // 角色弹出框里的树组件
  entireMenu: []
}
// module里的各个模块的state的类型
export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  dashboard: IDashboardState
}
// 交叉类型，既有IRootState也有IRootWithModule
export type IStoreType = IRootState & IRootWithModule
