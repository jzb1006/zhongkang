import Vue from 'vue'

const state = {
    open_image_mode:false,
    close_image_browse:true
}

const getters = {
    getOpenImageModeStatus(state){
        return state.open_image_mode;
    },
    getCloseImageBrowseStatus(state){
        return state.close_image_browse;
    }
}

const actions = {
    Open_Image_Mode({commit},data){
        commit('OPEN_IMAGE_MODE',data);
    },
    Close_Image_Browse({commit},data){
        commit('CLOSE_IMAGE_BROWSE',data);
    }
}

const mutations = {
    OPEN_IMAGE_MODE(state,data){
        state.open_image_mode = data;
    },
    CLOSE_IMAGE_BROWSE(state,data){
        state.close_image_browse = data;
    }
}

export default{
    state,
    getters,
    actions,
    mutations
}