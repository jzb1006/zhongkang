import Vue from 'vue'
const state={
	bus:new Vue(),
    bank:'',
    userinfo:'',
    otherId:'',
    order_sn:'',
}
const getters={
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
    }
}
const actions = {
    changeBank({commit},viewName){
        commit('CHANGE_BANK',viewName);
    },
    changeUserinfo({commit},viewName){
        commit('CHANGE_USERINFO',viewName);
    },
    changeOtherId({commit},viewName){
        console.log(viewName);
        commit('CHANGE_OTHER_ID',viewName);
    },
    changeOrderSn({commit},viewName){
        console.log(viewName);
        commit('CHANGE_ORDER_SN',viewName);
    }
}

const mutations = {
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
    }
}
export default{
	state,
    getters,
	actions,
	mutations
}