import { defineStore } from 'pinia'
import service from '@/service/request'
import {
  deletePageById,
  postPageListData,
  deleteUserData,
  newUserData,
  editUserData,
  newPageData,
  editPageData
} from '@/service/main/system/system'
import type { Iuser, ISystemState } from './type'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userTotalCount: 0,
    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(Info: any) {
      const token = localStorage.getItem('token')
      if (!token) {
        console.error('Token is missing!')
        return
      }
      const usersList = await service({
        url: '/users/list',
        method: 'post',
        headers: {
          Authorization: `Bearer ${token}` // 手动添加 token
        },
        data: Info
      })
      const { totalCount, list } = usersList.data.data
      this.userList = list
      this.userTotalCount = totalCount
    },
    async deleteUserAction(id: number) {
      await deleteUserData(id)
      this.postUsersListAction({ page: 1, limit: 10 })
    },
    async newUserDataAction(Info: Iuser) {
      const newUser = await newUserData(Info)
      this.postUsersListAction({ page: 1, limit: 10 })
    },
    async editUserDataAction(id: number, Info: Iuser) {
      const newUser = await editUserData(id, Info)
      this.postUsersListAction({ page: 1, limit: 10 })
    },
    // 针对页面数据的增删改擦请求接口（抽取版本）
    async getPageListDataAction(pagename: string, Info: any) {
      const result = await postPageListData(pagename, Info)
      const { totalCount, list } = result.data.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageDataAction(pagename: string, id: number) {
      await deletePageById(pagename, id)
      this.getPageListDataAction(pagename, { page: 1, limit: 10 })
    },
    async editPageDataAction(pagename: string, id: number, Info: any) {
      await editPageData(pagename, id, Info)
      this.getPageListDataAction(pagename, { page: 1, limit: 10 })
    },
    async newPageDataAction(pagename: string, Info: any) {
      await newPageData(pagename, Info)
      this.getPageListDataAction(pagename, { page: 1, limit: 10 })
    }
  }
})

export default useSystemStore
