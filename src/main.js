import Vue from 'vue'
import App from './App.vue'

// 引入初始化样式
import '@/styles/reset.less'

// 引入路由
import router from '@/router/index'


// 引入vant插件
import { toast, Icon, Uploader, Dialog, Field, ActionSheet, Tab, Tabs } from 'vant'
Vue.use(toast)
  .use(Icon)
  .use(Uploader)
  .use(Dialog)
  .use(Field)
  .use(ActionSheet)
  .use(Tab)
  .use(Tabs)

Vue.config.productionTip = false


new Vue({
  // 注入
  router,
  render: h => h(App),
}).$mount('#app')
