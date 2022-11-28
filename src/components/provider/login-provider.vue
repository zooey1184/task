<template>
  <a-spin :spinning='state.loading' style="min-height: 50vh">
    <slot></slot>
  </a-spin>
</template>

<script>
import {reactive, defineComponent} from 'vue'

export default defineComponent({
  setup() {
    const state = reactive({
      loading: false
    })

    return {
      state
    }
  }
})
</script>