import { reactive, computed, watch, onMounted } from "vue"
import { useRouter } from 'vue-router'
// import { useStore } from 'vuex'
import { useNavStore } from "@/stores/nav"
// import jsStorage from "js-storage"
import { storeToRefs } from "pinia";

// const $storage = jsStorage.localStorage

const useNav = (props) => {
  const state = reactive({
    active: ''
  })
  const store = useNavStore()
  const router = useRouter()
  const {routes} = storeToRefs(store)

  const getRoutesTab = computed(() => {
    const list = routes.value
    const _l = []
    for (let i in list) {
      _l.push({
        ...list[i]
      })
    }
    return _l
  })

  const getActiveNav = computed(() => {
    const name = router.currentRoute.value.name
    return name
  })


  watch(
    () => getActiveNav.value,
    n => {
      // @ts-ignore
      state.active = n
    },
    {
      immediate: true
    }
  )

  const handleGoPage = (/** @type {any} */ item) => {
    // @ts-ignore
    router.push(item.fullPath)
  }

  const handleDeleteItem = (/** @type {{ name: any; }} */ item, cb) => {
    const name = item.name
    const list = routes.value
    const _map = {}
    const index = getRoutesTab.value.findIndex(ii => ii.name === name)

    for (let i in list) {
      if (list[i].name !== name) {
        // @ts-ignore
        _map[i] = list[i]
      }
    }
    // store.commit('SET_DATA', {
    //   routes: _map
    // })
    store.setRoutes(_map)
    if (cb && typeof cb === 'function') {
      cb()
    } else {
      setTimeout(() => {
        if (name === getActiveNav.value) {
          if (index > 0) {
            const _item = getRoutesTab.value[index - 1]
            state.active = _item.name
            handleGoPage(_item)
          } else {
            state.active = getRoutesTab.value[0].name
            handleGoPage(getRoutesTab.value[0])
          }
        }
      }, 20)
    }
  }

  const handleClose = (name, cb) => {
    const _name = name ?? router.currentRoute.value.name
    const item = getRoutesTab.value?.find(item => item.name === _name)
    handleDeleteItem(item, cb)
  }

  onMounted(() => {
    // @ts-ignore
    state.active = router.currentRoute.value.name
  })

  return {
    state,
    handleDeleteItem,
    handleGoPage,
    getActiveNav,
    getRoutesTab,
    handleClose,
  }
}

export default useNav