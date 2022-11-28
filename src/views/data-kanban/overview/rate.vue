<template>
  <div class="flex items-center">
    {{label}}
    <div class="flex items-center" style="margin-left: 4px" :class="{'color-green': status>0, 'color-red': status<0}">
      <caret-up-outlined v-if='status > 0' style="margin-right: 4px" class="font-size-12" />
      <caret-down-outlined v-if='status < 0' style="margin-right: 4px" class="font-size-12" />
      <slot></slot>
    </div>
  </div>
</template>

<script>
import {reactive, defineComponent} from 'vue'
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    CaretUpOutlined,
    CaretDownOutlined
  },
  props: {
    status: {
      type: [Number]
    },
    label: {
      type: String
    }
  },
  setup() {
    const state = reactive({})

    return {
      state
    }
  }
})
</script>