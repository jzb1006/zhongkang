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
import VueLazyload from 'vue-lazyload'  //引入这个懒加载插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Toast } from 'vux'
import VueTouch from 'vue-touch'//滑动事件


import all_plug from './container/all_plug.js'
Vue.use(all_plug);


// import preview from 'vue-photo-preview'//图片预览
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(ElementUI);
Vue.component('toast', Toast)
Vue.use(VueTextareaAutosize)
Vue.prototype.behavior = behavior
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://pic.qiantucdn.com/58pic/28/21/33/80c58PICx96_1024.jpg!/fw/1024/watermark/url/L2ltYWdlcy93YXRlcm1hcmsveGlhb3R1LnBuZw==/align/center',
  loading: 'http://pic.qiantucdn.com/58pic/13/15/64/54D58PIC5BF_1024.jpg!/fw/1024/watermark/url/L2ltYWdlcy93YXRlcm1hcmsveGlhb3R1LnBuZw==/align/center',
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

