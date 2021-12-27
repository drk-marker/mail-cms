// 传进来pageName和权限名称去判断state的permissions里是否有对应的权限
// 整体步骤是，先去utils里定义拿到所有三级权限的方法并在store的login时调用，然后在此处封装判断传进来的权限
// 是否在第一步存的权限数组里的方法,最后在page-content里传入参数并调用该方法，把返回值加到对相应的组件上控制其是否可以增删改查
import { useStore } from '@/store'
export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.login.permissions
  // 拼接一下传过来的路径
  const verfiPermission = `system:${pageName}:${handleName}`
  return Boolean(permissions.find((item) => item === verfiPermission))
  // 或者通过!!a的方式对一个对象进行变成布尔值
}
