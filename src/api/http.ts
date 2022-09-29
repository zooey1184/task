import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// 异常拦截处理器
const errorHandler = (error: { response: { data: any; status: number } }) => {
  if (error.response) {
    const data = error.response.data
    if (error.response.status === 403) {
      console.log(403)
    } else if (error.response.status === 401) {
      console.log(401)
    } else if (error.response.status.toString().match(/^50/)) {
      return Promise.reject(data)
    } else {
      console.log('other error')
    }
  }
  return Promise.reject(error)
}

const http = (options: any) => {
  const header:any = {
    'Content-Type': 'application/json;charset=UTF-8',
  }
  const token = window.localStorage.getItem('access_token')
  if (token) {
    header.access_token = token
  }
  if (options.header) {
    Object.assign(header, options.header)
  }
  const service = axios.create({
    timeout: options.timeout || 30*10000,
    withCredentials: true,
    ...options,
    headers: { ...header },
  })

  service.interceptors.request.use(config => {
    return config
  }, errorHandler)

  service.interceptors.response.use(response => {
    const success = response.data.success ?? true
    if (success) {
      const data = response.data?.data ?? response.data
      return Promise.resolve(data)
    } else {
      !options.hideMsg && message.error(response.data.errorMsg || 'error')
      return Promise.reject(response.data)
    }
    
  }, errorHandler)
  return service(options)
}

http.get = (url: string, options?: AxiosRequestConfig | undefined) => {
  const _data = options?.data || {}
  return http({
    ...options,
    params: _data,
    data: true,
    method: 'get',
    url: url,
    cancelToken: source.token,
  })
}

http.post = (url: string, options?: AxiosRequestConfig | undefined) => {
  return http({ ...options, method: 'post', url: url, cancelToken: source.token })
}

http.del = (url: string, options?: AxiosRequestConfig | undefined) => {
  return http({ ...options, method: 'delete', url: url, cancelToken: source.token })
}

http.put = (url: string, options?: AxiosRequestConfig | undefined) => {
  return http({ ...options, method: 'put', url: url, cancelToken: source.token })
}

export default http
