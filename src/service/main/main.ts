import service from '../request'
export function getEntireRoles() {
  return service({
    url: '/role/list',
    method: 'post'
    // data: Info
  })
}
export function postDepartmentListData() {
  return service({
    url: '/department/list',
    method: 'post'
    // data: Info
  })
}

export function getEntireMenus() {
  return service({
    method: 'post',
    url: '/menu/list'
  })
}
