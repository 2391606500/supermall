import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from '@/components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
    // 创建事件总线
Vue.prototype.$bus = new Vue()
    //安装toast插件
Vue.use(toast)
    //解决移动端延迟问题
FastClick.attach(document.body)
    //图片懒加载插件
Vue.use(VueLazyLoad, {
    loading: require('./assets/img/common/placeholder.png')
})
new Vue({
    render: h => h(App),
    router,
    store
}).$mount('#app')