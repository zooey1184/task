// // @ts-nocheck
// import { createStore } from 'vuex'

// const SET_DATA = 'SET_DATA'

// const store = createStore({
//   state: {
//     isLogin: false, // 是否已登录
//     lang: 'zh_CN',
//     loading: false, // 全局loading
//     contentLoading: false, // 内容区loading
//     userInfo: {}, // 用户信息
//     keepAlive: [], // 路由缓存
//     auth: {},
//     routes: {}
//   },
//   mutations: {
//     [SET_DATA](state, data) {
//       for (const key in data) {
//         if (/\./g.test(key)) {
//           const [m, k] = key.split('.')
//           if (state[m]) {
//             state[m][k] = data[key]
//           } else {
//             state[m] = {}
//             state[m][k] = data[key]
//           }
//         } else {
//           state[key] = data[key]
//         }
//       }
//     },
//     SET_KEEP_ALIVE(state, r) {
//       state.keepAlive = r
//     },
//   },
//   actions: {
//     set_keepAlive(state, n) {
//       state.commit('SET_KEEP_ALIVE', n)
//     },
//     set_data(state, n) {
//       state.commit('SET_DATA', n)
//     }
//   },
//   getters: {
//     getState: state => {
//       return key => {
//         return state[key]
//       }
//     },
//     getLoading: state => state?.loading,
//   },
// })

// export default store
