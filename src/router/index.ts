import { createRouter, createWebHashHistory } from 'vue-router'
// 说明是导入的一种类型，RouteRecordRaw是route的类型，必须有path等属性
import type { RouteRecordRaw } from 'vue-router'
import { firstMenu } from '@/utils/map-menus'
import localCache from '@/utils/cache'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    // children: []  注册哪些是根据userMenus来决定的
  },
  {
    // notFound的情况
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  }
]
// 解决权限问题的方法
// 1.全部注册，根据菜单显示访问，缺点是虽然点不到跳转的权限按钮，但是可以通过url跳转页面，有风险
// 2.每个角色有哪些权限分别注册，登录时根据角色分配对应权限，缺点如果新加角色的时候需要新加配置然后重新部署，较为麻烦
// 3.请求返回的数据里就有对应的要加载的组件名称，但是组件和路径要保持一致性，否则会访问不到
// 4.配置所有映射，但是根据返回数据里的path匹配映射，然后动态地进行把数据里的path都注册
// 本试验采取动态路由，根据获得的userMenu的数据动态注册路由
// 很多需要动态路由，采用coderwhy这个工具，先全局下载npm install coderwhy -g
// 然后项目里输入指令coderwhy add3page 组件名 -d 组件位置  例如：coderwhy add3page user -d src/views/main/system/user
//会在src/views/main/system/user生成user组件，同时router里也会生成main/system/user的user.ts文件记录path和component的对应关系
const router = createRouter({
  routes,
  history: createWebHashHistory()
})
// 可以在导航守卫里注册每个角色的权限，或者在store的state里注册
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  // 为了重定向到/main的时候，显示第一个注册的菜单
  if (to.path === '/main') {
    return firstMenu.url
  }
})
export default router
