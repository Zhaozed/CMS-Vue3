import service from '@/service/request'
export function getAmountList() {
  return service({
    url: '/goods/amount/list',
    method: 'get'
  })
}

export function getCategoryGoodsCount() {
  return service({
    url: '/goods/category/count',
    method: 'get'
  })
}
export function getCategoryGoodsSale() {
  return service({
    url: '/goods/category/sale',
    method: 'get'
  })
}
export function getCategoryGoodsFavor() {
  return service({
    url: '/goods/category/favor',
    method: 'get'
  })
}
export function getGoodsAddressSale() {
  return service({
    url: '/goods/address/sale',
    method: 'get'
  })
}
