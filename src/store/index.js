import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import BMap from './modules/BMap'
import fang from './modules/Fang'
import user from './modules/user'
import commont from './modules/commont'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        search,
        BMap,
        fang,
        user,
        commont
    }
   
})

export default store;