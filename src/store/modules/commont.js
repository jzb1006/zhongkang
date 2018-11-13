const state = {
   navbarShow:true,
   to_container_id:0,
}
const actions = {
   changeTabShow({commit},navbarShow){
      commit('CHANGE_TAB_SHOW',navbarShow)
   },
   changeContainerId({commit},data){
        commit('CHANGECONTAINERID',data);
   }
}
const mutations = {
   CHANGE_TAB_SHOW(state,navbarShow){
       state.navbarShow = navbarShow
   },
   CHANGECONTAINERID(state,data){
       state.to_container_id = data;
   }
}

export default {
    state,
    actions,
    mutations
}