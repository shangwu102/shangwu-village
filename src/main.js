import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 引入Element Plus按需引入配置
import { setupElementPlus } from './plugins/element-plus'

const app = createApp(App)

app.use(router)
// 使用按需引入的Element Plus组件
setupElementPlus(app)

app.mount('#app')
