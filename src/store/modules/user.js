import Vue from 'vue'
const state={
	bus:new Vue(),
	// page:'home',
    bank:'',
    // mobile:'',
    // email:'',
    userinfo:'',
}
const getters={
    // getmobile(state){
    //     if(state.mobile==''){
    //         state.mobile=sessionStorage.getItem('mobile');
    //     }
    //     return state.mobile;
    // },
    // getemail(state){
    //     if(state.email==''){
    //         state.email=sessionStorage.getItem('email');
    //     }
    //     return state.email;
    // },
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
    }
}
const actions = {
    changePage({commit},viewName){
        commit('CHANGE_PAGE',viewName);
    },
    changeBank({commit},viewName){
        commit('CHANGE_BANK',viewName);
    },
    // changeMobile({commit},viewName){
    //     // console.log('hello');
    //     commit('CHANGE_MOBILE',viewName);
    // },
    // changeEmail({commit},viewName){
    //     // console.log('hello');
    //     commit('CHANGE_EMAIL',viewName);
    // },
    changeUserinfo({commit},viewName){
        commit('CHANGE_USERINFO',viewName);
    }
}

const mutations = {
    CHANGE_PAGE(state,viewName){
        state.page = viewName
    },
    CHANGE_BANK(state,viewName){
        sessionStorage.setItem('userBank',JSON.stringify(viewName));
        state.bank = viewName
    },
    // CHANGE_MOBILE(state,viewName){
    //     sessionStorage.setItem('mobile',viewName);
    //     state.mobile = viewName
    // },
    // CHANGE_EMAIL(state,viewName){
    //     sessionStorage.setItem('email',viewName);
    //     state.email = viewName
    // },
    CHANGE_USERINFO(state,viewName){
        sessionStorage.setItem('userinfo',JSON.stringify(viewName));
        state.userinfo = viewName
    }
}
export default{
	state,
    getters,
	actions,
	mutations
}