### nested 官网


### 安装依赖
yarn install

### 运行
yarn dev


### 打包
yarn build


### 通过修改vite.config.js 的配置可以打包不同的项目或者单独或者合并


#### SPORT
# score

## 文档地址
 https://iodocs.betradar.com/#/Static%20sport%20event%20information/tournamentSchedule

### Development
```bash
$ npm i
$ npm run dev
$ open http://localhost:7011/
```

## 查看支持的运动类型列表
```js
method: GET
url: /v1/sports
params: ''
req: http://47.242.226.50:7011/v1/sports
```

## 查询指定运动类型下的赛事列表
```js
  method: GET
  url: /v1/tournaments/:sportId
  params: ''
  req: http://47.242.226.50:7011/v1/tournaments/sr:sport:1
```

## 查询指定赛事下的比赛排期
```js
  method: GET
  url: /v1/events/schedule/:tournamentId
  params:
    scheduled 比赛日期，格式是 YYYY-MM-DD
    status 比赛状态  closed/not_start
  req: http://47.242.226.50:7011/v1/events/schedule/sr:tournament:7
```

## 查询指定比赛的赔率 - 测试环境不可用
```js
  method: GET
  url: /v1/sports/events/probabilities/:matchId
  params: ''
  req: http://47.242.226.50:7011/v1/sports/events/probabilities/sr:match:27636100
```

## 下单前预校验 - 是否允许下单
```js
  method: POST
  url: /v1/bet/order/preCheck
  params: 
    walletId: 钱包地址
    usdt: 本次下单usdt数量
    bet：赔率
    bet_type：赔率类型  胜负/比分
    bet_result：下单结果
    matchId:比赛Id
  req: http://47.242.226.50:7011/v1/bet/order/preCheck
```

## 查询我的订单
```js
  method: POST
  url: /v1/bet/order/query
  params: 
    walletId: 钱包地址
    matchStatus：比赛状态
    payStatus: 结算状态 
  req: http://47.242.226.50:7011/v1/bet/order/query
```

## 下单
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
  req: http://47.242.226.50:7011/v1/bet/order/save
```

## 取合约配置信息
```js
  method: GET
  url: /v1/contract/getConfig
  req: http://47.242.226.50:7011/v1/contract/getConfig
```

## 取质押信息
```js
  method: GET
  url: /v1/contract/getBonusInfo
  req: http://47.242.226.50:7011/v1/contract/getBonusInfo
```

## 取banner信息
```js
  method: GET
  url: /v1/system/getBannerList
  req: http://47.242.226.50:7011/v1/system/getBannerList
```

## bet合约下注调用
```contract
  method: bet
  params:
  uint256 _round  比赛id
  uint256 _market 盘口id
  uint256 _betAmount 下注数量
  BetType _betType 下注类型 0胜负/1让球/2比分
  BetSide _betSide 下注队伍 0:Side A队,1:Side B队,2:Equal 平
  uint256 _betSideAScore 下注A队比分(让球/比分需要)
  uint256 _betSideBScore 下注B队比分(让球/比分需要)
  uint256 _odds 赔率(链上不允许小数存在，扩大10000倍) 1.2传12000 
  uint256 _slip 滑点(同上处理) 10%传1000
```





质押整理
新版UI设计以及翻译
新版提供的接口


投注
设计+翻译
接口{
  0. 获取全部运动下的赛事
  1. 点击左侧边栏某项 获取对应项 赛事列表+对应的进行中+待进行的数量
  2. 具体赛事对应的盘口数量，赔率等信息
  3. 具体赛事详情
  4. 关键词检索查询赛事
  5. 创建房间
  6. 加入房间
  7. 房间信息
  8. 仪表盘信息
}
