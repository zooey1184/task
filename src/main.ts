import { createApp } from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue'
// @ts-ignore
import router from '@/router'
const pinia = createPinia()

const app = createApp(App)
app.use(Antd)

app.use(router)
app.use(pinia)
app.mount('#app')
