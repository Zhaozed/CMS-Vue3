export interface ISystemState {
  userList: Iuser[]
  userTotalCount: number
  pageList: any[]
  pageTotalCount: number
}

export interface Iuser {
  id: number
  name: string
  realname: string
  cellphone?: number
  enable: boolean
  createAt: string
  updateAt: string
  roleId: number
  departmentId: number
}
