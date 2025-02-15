import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserMenusByRoleId,
  getUserInfoById
} from '@/service/users'
import type { IAccount } from '@/type'
import { localCache } from '@/utils/cache'
import router, { addRoutesWithMenu } from '@/router'
import { LOGINTOKEN } from '@/global/constants'
import { mapPathToPermissions } from '@/utils/map-menu'
import useMainStore from '@/store/main/main'
interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  userPermissions: string[]
}
const useLoginStore = defineStore('login', {
  state(): ILoginState {
    return {
      userMenus: localCache.getCache('userMenus') || [],
      userInfo: localCache.getCache('userInfo') || {},
      token: localCache.getCache(LOGINTOKEN) || '',
      userPermissions: localCache.getCache('userPremissions') || []
    }
  },
  actions: {
    async loginAccountAction(account: IAccount) {
      try {
        const response = await accountLoginRequest(account)
        // 存储 token
        this.token = response.data.data.token
        // console.log('登录成功，Token:', response.data.data.token)
        localCache.setCache(LOGINTOKEN, this.token)

        // 获取用户信息
        const userInfo = await getUserInfoById(response.data.data.id)
        this.userInfo = userInfo.data.data
        localCache.setCache('userInfo', this.userInfo)

        // 获取用户的菜单权限
        const resmenus = await getUserMenusByRoleId(response.data.data.id)
        this.userMenus = resmenus.data.data
        localCache.setCache('userMenus', this.userMenus)

        // 获取用户按钮权限
        const userPremissions = mapPathToPermissions(this.userMenus)
        this.userPermissions = userPremissions
        localCache.setCache('userPermissions', this.userPermissions)
        console.log('当前用户的权限', userPremissions)

        // 动态添加路由
        // mapMenuToRoutes是我们自己封装的一个工具函数，用于将菜单映射到路由
        // 5.动态添加路由
        addRoutesWithMenu(this.userMenus)
        router.push('/main')
      } catch (error) {
        console.error('登录请求失败', error)
      }
    },
    // 刷新页面时，重新获取本地缓存的数据，对动态路由进行重置，防止刷新页面时，动态路由丢失
    loadLocalDataAction() {
      this.token = localCache.getCache('token')
      this.userInfo = localCache.getCache('userInfo')
      this.userMenus = localCache.getCache('userMenus')
      this.userPermissions = localCache.getCache('userPermissions')
      if (this.token && this.userMenus) {
        addRoutesWithMenu(this.userMenus)
        // 获取所有的数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()
      }
    }
  }
})

export default useLoginStore
