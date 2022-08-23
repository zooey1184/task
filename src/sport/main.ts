import { createApp } from 'vue'
import App from './App.vue'
import 'ant-design-vue/dist/antd.css';
import './css/index.less'
import './js/jquery-1.8.3.min.js'
import './js/swiper.animate1.0.2.min.js'
import './js/swiper.min.js'
import './js/clipboard.min.js'
import './js/web3.min.js'

// @ts-ignore
import routes from './router'

const app = createApp(App)
app.use(routes)
app.mount('#app')
