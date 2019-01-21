import Vue from 'vue'
const state = {
    bus:new Vue(),
    keyWord:'',
    mainOrResult:'searchMain',
    default_keyword:{
        prefix:'大家都在搜',
        keyword:['水光针','皮秒']
    },
    tabIndex:1
}
const getters = {
   defaultKeywordRandom:status=>{
       let dk = status.default_keyword;
       let i = Math.floor(Math.random()*dk.keyword.length);
       return {
           prefix:dk.prefix,
           default_keyword:dk.keyword[i]
       }
   }
}
const actions = {
    changeMainOrResult({commit},viewName){
        commit('CHANGE_MAIN_OR_RESULT',viewName);
    },
    changeKeyword({commit},keyWord){
        commit('CHANGE_KEY_WORD',keyWord);
    },
    changeTabIndex({commit},tabIndex){
      commit('CHANGE_TAB_INDEX',tabIndex);
    }
}

const mutations = {
    CHANGE_MAIN_OR_RESULT(state,viewName){
        state.mainOrResult = viewName
    },
    CHANGE_KEY_WORD(state,keyWord){
        state.keyWord = keyWord
    },
    CHANGE_TAB_INDEX(state,tabIndex){
        state.tabIndex = tabIndex
        console.log(tabIndex);
    }
}
export default {
    state,
    getters,
    actions,
    mutations
}