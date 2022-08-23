import http from '@/sport/js/http'

const HOST = window.location.host.match(/(localhost|39.107.224.254)/g) ? '' : 'http://47.242.226.50:7020'

export const getSportList = async(id) => {
  return await http.get(`${HOST}/v1/tournaments/${id}`)
}

// ## 查看赛事举办方的列表，如LCS/PSC等
export const queryCompetitionName = async() => {
  return await http.get(`${HOST}/v2/query/competitionName`)
}

// ## 查看所有比赛
export const queryMatches = async() => {
  return await http.get(`${HOST}/v2/query/matches`)
}

// ## 查询指定比赛的赔率
export const getMatchOdds = async(id) => {
  return await http.get(`${HOST}/v2/query/match/odds/${id}`)
}

// ## 保存钱包和奖池的关系
export const saveTenant = async(data) => {
  return await http.post(`${HOST}/v2/save/tenant`, {data})
}

// ## 创建奖池
export const createTenant = async(data) => {
  return await http.post(`${HOST}/v2/create/tenant`, {data})
}

// ## 查询当前钱包地址关联的奖池，即邀请码，需要传递给链上
export const queryTenant = async(data) => {
  return await http.get(`${HOST}/v2/query/tenant`, {data, hideMsg: true})
}

// ## 下单-预校验，是否允许本次下单
export const preCheck = async(data) => {
  return await http.post(`${HOST}/v2/bet/order/preCheck`, {data})
}

// ## 取合约配置信息
export const getConfig = async() => {
  return await http.get(`${HOST}/v1/contract/getConfig`)
}

// ## 取质押信息
export const getBonusInfo = async() => {
  return await http.get(`${HOST}/v1/contract/getBonusInfo`)
}

// 取banner信息
export const getBanner = async() => {
  return await http.get(`${HOST}/v1/system/getBannerList`)
}

export const getRoomAddress = async(data) => {
  return await http.get(`${HOST}/v2/query/pool/creator`, {data})
}

// 查询指定钱包的下单列表
export const getBetList = async(data) => {
  return await http.get(`${HOST}/v2/query/myBetList`, {data})
}