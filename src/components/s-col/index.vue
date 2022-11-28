<template>
  <a-col :xxxl='6' :xxl='6' :xl='6' :lg='12' :md='24'>
    <slot></slot>
  </a-col>
</template>

<script>
import {reactive, defineComponent} from 'vue'

export default defineComponent({
  props: {
    split: {
      type: Number,
      default: 2
    }
  },
  setup() {
    const SUM = 24
    const state = reactive({
      xxxl: 6,
      xxl: 6,
      xl: 6,
      lg: 12,
      md: 24,
      sm: 24,
    })

    return {
      state
    }
  }
})
</script>