import Vue from 'vue'
import Vuex from 'vuex'
import search from './modules/search'
import BMap from './modules/BMap'
import fang from './modules/Fang'
import user from './modules/user'
import commont from './modules/commont'
import diary from './modules/diary'
import media_display from './modules/media_display'
import customized from './modules/customized'
import comment from './modules/comment'

Vue.use(Vuex);
const store = new Vuex.Store({
    modules:{
        search,
        BMap,
        fang,
        user,
        commont,
        diary,
        media_display,
        customized,
        comment
    }
   
})

export default store;