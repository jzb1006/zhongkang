import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import BMap from './modules/BMap'
import fang from './modules/Fang'
import user from './modules/user'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        search,
        BMap,
        fang,
        user
    }
   
})

export default store;