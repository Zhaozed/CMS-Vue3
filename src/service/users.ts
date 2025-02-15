import type { IAccount } from '@/type'
import service from './request'
import { localCache } from '@/utils/cache'

// 登录接口
export function accountLoginRequest(account: IAccount) {
  return service({
    url: '/login', // 这里根据接口文档写请求地址
    method: 'post',
    data: account,
    withCredentials: false
  })
}

// getUserInfoById
export function getUserInfoById(id: number) {
  return service({
    url: `users/${id}`,
    method: 'get'
  })
}

// getUserMenusByRoleId
export function getUserMenusByRoleId(id: number) {
  console.log('Axios Config:', service.defaults.headers)
  return service({
    url: `/role/${id}/menu`,
    method: 'get'
  })
}
