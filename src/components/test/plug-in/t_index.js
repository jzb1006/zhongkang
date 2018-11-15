// import Vue from 'vue'
import toastCom from './toast'

let Toast = {};

Toast.install = (Vue) => {
    Vue.component('toast',toastCom)
}

export default Toast;
