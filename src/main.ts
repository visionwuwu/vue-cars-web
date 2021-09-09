import { createApp } from 'vue'
import { join } from 'lodash'
import App from './App.vue'
import router from './router'
import store from './store'
import SvgIcons from '@/icons'

console.log(process.env.BASE_URL)
console.log(process.env.VUE_APP_BASE_API)

console.log(join(['Hello', 'webpack'], ' '))

createApp(App).use(store).use(router).use(SvgIcons).mount('#app')
