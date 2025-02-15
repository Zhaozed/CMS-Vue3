import axios, { AxiosError } from 'axios'
import type { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
// import { ElMessage } from 'element-plus'
import useLoginStore from '@/store/login/login'
import { localCache } from '@/utils/cache'
// 创建axios实例 进行基本参数配置
const service = axios.create({
  // 默认请求地址，根据环境的不同可在.env 文件中进行修改
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // 设置接口访问超时时间
  timeout: 3000000, // request timeout，
  // 跨域时候允许携带凭证
  withCredentials: false
})

//  request interceptor 接口请求拦截
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const userStore = useLoginStore()
    const token = userStore.token || localCache.getCache('token') || ''

    // console.log('拦截器执行了! 当前 Token:', token)

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 这里手动添加 Content-Type 试试看
    if (!config.headers['Content-Type']) {
      config.headers['Content-Type'] = 'application/json'
    }
    // console.log('请求头最终 headers:', config.headers)   打印看请求头的结果是什么来判断错误，原因是多打印了一个banner
    return config
  },
  (error: AxiosError) => {
    // console.error('请求拦截器错误:', error)
    return Promise.reject(error)
  }
)

//  response interceptor 接口响应拦截
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 直接返回res，当然你也可以只返回res.data
    // 系统如果有自定义code也可以在这里处理
    return response
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// /**
//  * @description 显示错误消息
//  * opt 传入参数
//  * err 错误信息
//  * type 消息类型
//  * duration 消息持续时间
//  */
// function showErrMessage(opt, err, type: any = 'error', duration = 5000) {
//   ElMessage({
//     message: err.msg,
//     type: type,
//     duration: duration,
//   });
// }

export default service
