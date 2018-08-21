import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import BMap from './modules/BMap'
import fang from './modules/Fang'
Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        search,
        BMap,
        fang
    }
   
})

export default store;