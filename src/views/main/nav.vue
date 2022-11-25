<template>
  <div class="flex items-center">
    <div v-for='item in getNavs'>
      {{item.meta?.title || '--'}}
    </div>
  </div>
</template>

<script>
import {reactive, defineComponent, computed} from 'vue'
import {useNavStore} from '@/stores/nav'
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const store = useNavStore()
    const { routes } = storeToRefs(store);
    const state = reactive({

    })

    const getNavs = computed(() => {
      // const r = routes.value
      console.log(routes.value)
      const list = []
      // for(let i in r) {
      //   list.push({
      //     ...r[i]
      //   })
      // }
      return list
    })

    return {
      state,
      getNavs
    }
  }
})
</script>