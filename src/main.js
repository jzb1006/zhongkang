// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {} from './widget/lib/flexible'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueScroller from 'vue-scroller'
import "./assets/css/iconfont.css"
import "./assets/css/Base.css";
import "./assets/css/routeAnimate.css";
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
import { Toast } from 'vux'

Vue.component('toast', Toast)
Vue.use(VueTextareaAutosize)

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: './../static/images/error.png',
  loading: './../static/images/load_back.jpg',
})

Vue.config.productionTip = false
Vue.use(VueScroller);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

