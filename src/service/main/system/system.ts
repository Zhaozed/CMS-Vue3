import service from '@/service/request'
export function postUserListData(Info: any) {
  return service({
    url: '/users/list',
    method: 'post',
    data: Info
  })
}

export function deleteUserData(id: number) {
  return service({
    url: `/users/${id}`,
    method: 'delete'
  })
}

export function newUserData(Info: any) {
  return service({
    url: '/users',
    method: 'post',
    data: Info
  })
}

export function editUserData(id: number, Info: any) {
  return service({
    url: `/users/${id}`,
    method: 'patch',
    data: Info
  })
}

// 针对页面数据的增删改擦请求接口（抽取版本）
export function postPageListData(pagename: string, Info: any) {
  return service({
    url: `/${pagename}/list`,
    method: 'post',
    data: Info
  })
}

export function deletePageById(pagename: string, id: number) {
  return service({
    url: `/${pagename}/${id}`,
    method: 'delete'
  })
}

export function editPageData(pagename: string, id: number, Info: any) {
  return service({
    url: `/${pagename}/${id}`,
    method: 'patch',
    data: Info
  })
}

export function newPageData(pagename: string, Info: any) {
  return service({
    url: `${pagename}`,
    method: 'post',
    data: Info
  })
}
