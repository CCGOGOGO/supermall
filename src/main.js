import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import toast from 'components/common/toast' //会默认引入toast文件夹下面的index.js，引入里面的obj

Vue.config.productionTip = false

// 让$bus等于一个vue实例，vue实例是可以作为事件总线的
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
