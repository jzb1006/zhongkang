const state = {
   navbarShow:true,
}
const actions = {
   changeTabShow({commit},navbarShow){
      commit('CHANGE_TAB_SHOW',navbarShow)
   }
}
const mutations = {
   CHANGE_TAB_SHOW(state,navbarShow){
       state.navbarShow = navbarShow
   }
}

export default {
    state,
    actions,
    mutations
}