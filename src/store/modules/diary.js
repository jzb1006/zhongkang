import Vue from 'vue'

const state = {
    diaryCreateInfo:{},//保存添加康复日志的数组
    aestheticStatus:false,
    diaryOperate:"",
}

const getters = {
    getCreateInfo(state){
        return state.diaryCreateInfo;
    },
    getAestheticStatus(state){
        return state.aestheticStatus;
    },
    getDiaryOperate(state){
        return state.diaryOperate;
    }
}

const actions = {
    Save_Create_Info({commit},data){
        commit('SAVE_CREATE_INFO',data);
    },
    Save_Aesthetic_Status({commit},data){
        commit('SAVE_AESTHETIC_STATUS',data);
    },
    Save_Diary_Operate({commit},data){
        commit('SAVE_DIARY_OPERATE',data);
    }
}

const mutations = {
    SAVE_CREATE_INFO(state,data){
        state.diaryCreateInfo = data;
    },
    SAVE_AESTHETIC_STATUS(state,data){
        state.aestheticStatus = data;
    },
    SAVE_DIARY_OPERATE(state,data){
        state.diaryOperate = data;
    }
}

export default{
    state,
    actions,
    mutations,
    getters
}