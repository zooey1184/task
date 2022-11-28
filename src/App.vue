<template>
  <a-config-provider :locale="zhCN">
    <router-view></router-view>
  </a-config-provider>
</template>

<script>
import {reactive, defineComponent} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';

export default defineComponent({
  setup() {
    const state = reactive({})

    return {
      state,
      zhCN
    }
  }
})
</script>