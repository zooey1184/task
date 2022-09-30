import http from './http'
import {HOST} from './config'

export const getUserList = async(data) => {
  return Http.post(`${HOST}/admin/user/list`, {data})
}