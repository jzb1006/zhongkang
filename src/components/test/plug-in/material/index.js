import Vue from 'vue'
import loadingCom from './../loading.vue'


export default {
    install(Vue,options){
        Vue.component('loading',loadingCom)
    }
}
