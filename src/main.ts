import { createApp } from 'vue'
import store from './stores'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue'
import ViewWrap from './components/view-wrap/index.vue'
// @ts-ignore
import router from '@/router'

const app = createApp(App)
app.component('view-wrap', ViewWrap)
app.use(Antd)

app.use(router)
app.use(store)
app.mount('#app')
