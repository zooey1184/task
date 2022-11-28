<template>
  <a-config-provider :locale="zhCN">
    <LoginProvider>
      <router-view></router-view>
    </LoginProvider>
  </a-config-provider>
</template>

<script>
import {reactive, defineComponent} from 'vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import LoginProvider from '@/components/provider/login-provider.vue'

export default defineComponent({
  components: {
    LoginProvider
  },
  setup() {
    const state = reactive({})

    return {
      state,
      zhCN
    }
  }
})
</script>