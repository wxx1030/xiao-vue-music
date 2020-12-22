// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"  //es6一些api转义
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import fastclick from "fastclick"
import VueLazyLoad from "vue-lazyload"
import store from './store/index'
Vue.config.productionTip = false
// body 下所有按钮点击没有300毫秒延迟
fastclick.attach(document.body)
Vue.use( VueLazyLoad, {
  loading: require('common/image/default.png')
}) 
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
