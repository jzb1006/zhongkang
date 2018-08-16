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

