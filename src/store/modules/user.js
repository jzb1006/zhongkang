import Vue from 'vue'
const state={
	bus:new Vue(),
    bank:'',
    userinfo:'',
    otherId:'',
    order_sn:'',
    isBackToPrevious:true,
    token:''
}
const getters={
    getToken(state){
        return state.token;
    },
    getBank(state){
        if(state.bank==''){
            let bank=sessionStorage.getItem('userBank');
            state.bank=JSON.parse(bank);
        }
        return state.bank;
    },
    getUserinfo(state){
        if(state.userinfo==''){
            let userinfo=sessionStorage.getItem('userinfo');
            state.userinfo=JSON.parse(userinfo);
        }
        return state.userinfo;
    },
    getOtherId(state){
        if(state.otherId==''){
            state.otherId=sessionStorage.getItem('otherId');
        }
        return state.otherId;
    },
    getOrderSn(state){
        if(state.order_sn==''){
            state.order_sn=sessionStorage.getItem('order_sn');
        }
        
        console.log(state.order_sn);
        return state.order_sn;
    },
    getIsBackToPrevious(state){
        // if(state.isBackToPrevious==''){
        //     state.isBackToPrevious=sessionStorage.getItem('isBackToPrevious');
        // }
        
        console.log(state.isBackToPrevious);
        return state.isBackToPrevious;
    },
}
const actions = {
    saveToken({commit},data){
        commit('SAVE_TOKEN',data);
    },
    changeBank({commit},viewName){
        commit('CHANGE_BANK',viewName);
    },
    changeUserinfo({commit},viewName){
        commit('CHANGE_USERINFO',viewName);
    },
    changeOtherId({commit},viewName){
        commit('CHANGE_OTHER_ID',viewName);
    },
    changeOrderSn({commit},viewName){
        commit('CHANGE_ORDER_SN',viewName);
    },
    changeIsBackToPrevious({commit},viewName){
        commit('CHANGE_IS_BACK_TO_PREVIOUS',viewName);
    },
}

const mutations = {
    SAVE_TOKEN(state,data){
        state.token = data;
    },
    CHANGE_BANK(state,viewName){
        sessionStorage.setItem('userBank',JSON.stringify(viewName));
        state.bank = viewName
    },
    CHANGE_USERINFO(state,viewName){
        sessionStorage.setItem('userinfo',JSON.stringify(viewName));
        state.userinfo = viewName
    },
    CHANGE_OTHER_ID(state,viewName){
        sessionStorage.setItem('otherId',viewName);
        state.otherId=viewName;
    },
    CHANGE_ORDER_SN(state,viewName){
        sessionStorage.setItem('order_sn',viewName);
        state.order_sn=viewName;
    },
    CHANGE_IS_BACK_TO_PREVIOUS(state,viewName){
        // sessionStorage.setItem('isBackToPrevious',viewName);
        state.isBackToPrevious=viewName;
    },
}
export default{
	state,
    getters,
	actions,
	mutations
}