import http from '@/sport/js/http'

const HOST = window.location.host.match(/localhost/g) ? '' : 'http://47.242.226.50:7011'

/* ## 查看支持的运动类型列表
* js
* method: GET
* url: /v1/sports
* params: ''
* req: http://47.242.226.50:7011/v1/sports
*/
export const getSports = async() => {
  return http.get(`${HOST}/v1/sports`)
}

/* ## 查询指定运动类型下的赛事列表
js
  method: GET
  url: /v1/tournaments/:sportId
  params: ''
  req: http://47.242.226.50:7011/v1/tournaments/sr:sport:1
*/
export const getSportList = async(id) => {
  return await http.get(`${HOST}/v1/tournaments/${id}`)
}


/* ## 查询指定赛事下的比赛排期
js
  method: GET
  url: /v1/events/schedule/:tournamentId
  params:
    scheduled 比赛日期，格式是 YYYY-MM-DD
    status 比赛状态  closed/not_start
  req: http://47.242.226.50:7011/v1/events/schedule/sr:tournament:7
*/
export const getSportTournament = async(id, data) => {
  return await http.get(`${HOST}/v1/events/schedule/${id}`, {data})
}

/* ## 查询指定比赛的赔率 - 测试环境不可用
js
  method: GET
  url: /v1/sports/events/probabilities/:matchId
  params: ''
  req: http://47.242.226.50:7020/v1/sports/events/probabilities/sr:match:27636100
*/
export const getProbabilities = async(id) => {
  return await http.get(`${HOST}/v1/sports/events/probabilities/${id}`)
}

/* ## 下单前预校验 - 是否允许下单
js
  method: POST
  url: /v1/bet/order/preCheck
  params: 
    walletId: 钱包地址
    usdt: 本次下单usdt数量
    bet：赔率
    bet_type：赔率类型  胜负/比分
    bet_result：下单结果
    matchId:比赛Id
  req: http://47.242.226.50:7020/v1/bet/order/preCheck
*/
export const preCheck = async(data) => {
  return await http.post(`${HOST}/v1/bet/order/preCheck`, {data})
}

/* ## 查询我的订单
js
  method: POST
  url: /v1/bet/order/query
  params: 
    walletId: 钱包地址
    matchStatus：比赛状态
    payStatus: 结算状态 
  req: http://47.242.226.50:7020/v1/bet/order/query
*/
export const orderQuery = async(data) => {
  return await http.post(`${HOST}/v1/bet/order/query`, {data})
}
/* ## 下单
```js
  method: POST
  url: /v1/bet/order/save
  params: 
    orderId: 交易Id
    walletId: 钱包地址
    match_id： 比赛id
    bet_type：赔率类型  胜负/比分
    bet_result：下单结果
    usdt：使用的usdt
    bet： 赔率
    orderInfo：订单信息扩展，都可以往这里存储
  req: http://47.242.226.50:7020/v1/bet/order/save
*/
export const orderSave = async(data) => {
  return http.post(`${HOST}/v1/bet/order/save`, {data})
}

export const getBanner = async(data) => {
  return http.get(`${HOST}/v1/system/getBannerList`, {data})
}