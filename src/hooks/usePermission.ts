import useLoginStore from '@/store/login/login'

function usePermission(pageName: string, handleName: string) {
  // 拼接字符串
  const queryPermission = `${pageName}:${handleName}`
  const permissions = useLoginStore().userPermissions
  console.log(queryPermission, permissions)
  // 返回一个布尔值
  return !!permissions.find((item) => item.includes(queryPermission))
}

export default usePermission
