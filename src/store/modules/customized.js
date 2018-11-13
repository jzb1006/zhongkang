import Vue from 'vue'
const state={
	bus:new Vue(),
    customized_detail:'',
    lastName:'',
    age:'',
    level:'',
    photo:[],
    minPrice:'',
    maxPrice:'',
}
const getters={
    getCustomizedDetail(state){
        if(state.customized_detail==''){
            state.customized_detail=sessionStorage.getItem('customized_detail');
        }
        return state.customized_detail;
    },
    getLastName(state){
        if(state.lastName==''){
            state.lastName=sessionStorage.getItem('lastName');
        }
        return state.lastName;
    },
    getAge(state){
        if(state.age==''){
            state.age=sessionStorage.getItem('age');
        }
        return state.age;
    },
    getPhoto(state){
        if(state.photo==''){
            state.photo=JSON.parse(sessionStorage.getItem('photo'));
        }
        return state.photo;
    },
    getLevel(state){
        if(state.level==''){
            state.level=sessionStorage.getItem('level');
        }
        return state.level;
    },
}
const actions = {
    save_customized_detail({commit},viewName){
        commit('SAVE_CUSTOMIZED_DETAIL',viewName);
    },
    changeLastName({commit},viewName){
        commit('CHANGE_LAST_NAME',viewName);
    },
    changeAge({commit},viewName){
        commit('CHANGE_AGE',viewName);
    },
    changeLevel({commit},viewName){
        commit('CHANGE_Level',viewName);
    },
    changePhoto({commit},viewName){
        commit('CHANGE_PHOTO',viewName);
    },
    changeMin({commit},viewName){
        commit('CHANGE_MIN',viewName);
    },
    changeMax({commit},viewName){
        commit('CHANGE_MAX',viewName);
    },
}

const mutations = {
    SAVE_CUSTOMIZED_DETAIL(state,viewName){
        sessionStorage.setItem('customized_detail',viewName);
        state.customized_detail=viewName;
    },
    CHANGE_LAST_NAME(state,viewName){
        sessionStorage.setItem('lastName',viewName);
        state.lastName=viewName;
    },
    CHANGE_AGE(state,viewName){
        sessionStorage.setItem('age',viewName);
        state.age=viewName;
    },
    CHANGE_Level(state,viewName){
        sessionStorage.setItem('level',viewName);
        state.level=viewName;
    },
    CHANGE_PHOTO(state,viewName){
        sessionStorage.setItem('photo',JSON.stringify(viewName));
        state.photo=viewName;
    },
    CHANGE_MIN(state,viewName){
        sessionStorage.setItem('minPrice',JSON.stringify(viewName));
        state.minPrice=viewName;
    },
    CHANGE_MAX(state,viewName){
        sessionStorage.setItem('maxPrice',JSON.stringify(viewName));
        state.maxPrice=viewName;
    },

}
export default{
	state,
    getters,
	actions,
	mutations
}