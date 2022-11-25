import {defineStore} from 'pinia'

export const useNavStore = defineStore('nav', {
  state: () => {
    return {
      routes: {},
      active: undefined
    }
  },
  actions: {
    setRoutes(t) {
      this.routes = t
    },
    setItem(key, item) {
      this.routes[key] = item
    },
  }
})