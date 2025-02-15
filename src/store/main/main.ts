import { defineStore } from 'pinia'
import {
  postDepartmentListData,
  getEntireRoles,
  getEntireMenus
} from '@/service/main/main'
interface IMainState {
  entireDepartments: { list: any[]; totalCount: number }
  entireRoles: { list: any[]; totalCount: number }
  entireMenus: { list: any[] }
}

const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireDepartments: { list: [], totalCount: 0 }, //  初始化 list 为空数组，totalCount 为 0
    entireRoles: { list: [], totalCount: 0 },
    entireMenus: { list: [] }
  }),
  actions: {
    // 登录成功之后发送请求获取部门和角色数据
    async fetchEntireDataAction() {
      const departmentsResult = await postDepartmentListData()
      const rolesResult = await getEntireRoles()
      const menusResult = await getEntireMenus()

      this.entireMenus = menusResult.data.data
      this.entireDepartments = departmentsResult.data.data
      this.entireRoles = rolesResult.data.data
    }
  }
})

export default useMainStore
