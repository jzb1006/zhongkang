import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import BMap from './modules/BMap'
import user from './modules/user'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        search,
        BMap,
        user
    }
   
})

export default store;