import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useNavStore = defineStore('NAV', () => {
  const routes = ref([])

  const setRoutes = (data) => {
    routes.value = data
  }
  return {
    routes,
    setRoutes
  }
})