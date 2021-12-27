// 这里帮助完成角色url和component对应关系routes,其类型是RouteRecordRaw
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import { RouteRecordRaw } from 'vue-router'
let firstMenu: any = null
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []
  // 1.先去加载所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require.context()是webpack里的工具，可以帮助我们加载某一个文件夹,第二个参数表示要不要递归地进行查找,
  // 第三个参数是正则表达式，去匹配文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  // 对所有的拿到的文件的路径进行遍历
  routeFiles.keys().forEach((key) => {
    // 例如./story/chat/chat.ts,会切割成数组['.','/story/chat/chat','.ts']
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  // 2.根据菜单获取需要添加的routes
  // 先定义一个递归函数
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        // filter以数组方式返回所有符合查找要求的值，some找到符合的值就返回true，find是返回第一个找到的符合的值
        const route = allRoutes.find((route) => route.path === menu.url)
        if (route) routes.push(route)
        // 此处是为了解决如果直接把url修改为首页路径，其会重定向到/main,但是userMenus并不会匹配到这个路径，所以此处
        // 记录userMenus里的第一个注册的路径，并在修改到首页时，进行显示
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }
  // 调用递归
  _recurseGetRoute(userMenus)
  return routes
}

// 因为面包屑和用给定路径匹配userMenus里的路径这两个方法几乎一样，所以此处做一个合并
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}
export function pathMapToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: IBreadcrumb[]
) {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const findMenu: any = pathMapToMenu(menu.children ?? [], currentPath)
      if (findMenu) {
        breadcrumbs?.push({ name: menu.name })
        breadcrumbs?.push({ name: findMenu.name })
        return findMenu
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}
export { firstMenu }
// 对于是否显示某些权限按钮，先把用户所有userMenus所有权限都放在一个数组里，然后再对内容做相应显示
export function mapMenusToPermissons(userMenus: any[]) {
  const permissions: string[] = []
  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 1 || menu.type === 2) {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.type == 3) {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)
  return permissions
}
// 解决树组件回显时，从叶子节点进行设置的方法,也就是从传来的menuList里找到叶子节点
// 这么做是因为如果直接把选中的id给el-tree，会导致只要有其id其子节点都会被选上，但其实并不一定其子节点都选上
// 也就是本来该显示半选的显示了全选，且从显示的角度来说应该从子节点入手
export function MenuMapLeafKeys(menuList: any[]) {
  const leftKeys: number[] = []
  const _recurseGetLeaf = (menuList: any[]) => {
    for (const menu of menuList) {
      if (menu.children) {
        _recurseGetLeaf(menu.children)
      } else {
        leftKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leftKeys
}
// 给面包屑匹配路径
// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu: any = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         breadcrumbs.push({ name: menu.name, path: menu.path })
//         breadcrumbs.push({ name: findMenu.name, path: findMenu.path })
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
//   return breadcrumbs
// }

// 此方法是用给定路径匹配userMenus里的路径
// export function pathMapToMenu(userMenus: any[], currentPath: string) {
//   for (const menu of userMenus) {
//     if (menu.type === 1) {
//       const findMenu: any = pathMapToMenu(menu.children ?? [], currentPath)
//       if (findMenu) {
//         return findMenu
//       }
//     } else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }
// export { firstMenu }
