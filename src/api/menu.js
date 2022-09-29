import http from './http'

// const HOST = 'http://localhost:3000'
const HOST = ''

export const getMenu = async() => {
  return await http.get(`${HOST}/api/v1/menu/getList`)
}