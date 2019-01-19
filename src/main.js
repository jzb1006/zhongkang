// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import {} from './widget/lib/flexible'
import behavior from '../static/lib/behavior'
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import VueScroller from 'vue-scroller'
import "./assets/css/iconfont.css"
import "./assets/css/Base.css";
import "./assets/css/routeAnimate.css";
import VueTextareaAutosize from 'vue-textarea-autosize'
import VueLazyload from 'vue-lazyload' //引入这个懒加载插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Toast
} from 'vux'
import VueTouch from 'vue-touch' //滑动事件
// import preview from 'vue-photo-preview'//图片预览
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)
import all_plug from './container/all_plug.js'
Vue.use(all_plug);

import VueDND from 'awe-dnd'
Vue.use(VueDND)


Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(ElementUI);
Vue.component('toast', Toast)
Vue.use(VueTextareaAutosize)
Vue.prototype.behavior = behavior
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1545468235751&di=22543bdd1855da587efde12af4889af8&imgtype=0&src=http%3A%2F%2Ff.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fa8014c086e061d95ef3c374d7df40ad162d9ca49.jpg',
  loading: './../static/images/loading.gif',
})

Vue.config.productionTip = false
Vue.use(VueScroller);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
