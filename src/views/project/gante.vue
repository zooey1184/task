<template>
  <view-wrap>
    <div>
      <Gante />
    </div>
  </view-wrap>
</template>


<script>
import {reactive, defineComponent} from 'vue'
import Gante from '@/components/gante/index.vue'

export default defineComponent({
  components: {
    Gante
  },
  setup() {
    const state = reactive({})

    return {
      state
    }
  }
})
</script>