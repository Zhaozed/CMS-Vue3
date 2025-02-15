import { localCache } from '@/utils/cache'
import { createRouter, createWebHashHistory } from 'vue-router'
import { firstRoute, mapMenuToRoutes } from '@/utils/map-menu'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      // 这里需要进行导航守卫，如果用户没有登录（跳到login），如果登录了，跳到main
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/login.vue')
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/main/main.vue')
    },
    {
      // path: '/:pathMatch(.*)*', :pathMatch(.*)*是一个正则表达式，匹配所有路径 :表示的是动态路由参数
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notfound/notfound.vue')
    }
  ]
})

export function addRoutesWithMenu(menus: any) {
  // 1.获取匹配到的所有的路由
  const routes = mapMenuToRoutes(menus)
  // 2.动态添加到router中
  for (const route of routes) {
    router.addRoute('main', route)
  }
}

// 导航守卫逻辑
router.beforeEach((to) => {
  const token = localCache.getCache('token')
  if (to.path === '/main' && !token) return '/login'
  if (to.path === '/login' && token) {
    return '/main'
  }
  if (to.path === '/main' && firstRoute) {
    return firstRoute.path
  }
})

export default router
