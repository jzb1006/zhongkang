const state = {
    author_id:"",//作者的id
    comment_form_id:"",//素材的id
}
const getters = {
    get_author_id(state){
        return state.author_id;
    },
    get_comment_form_id(state){
        return state.comment_form_id;
    }
}
const actions = {
    Save_Author_Id({commit},data){
        commit("SAVE_AUTHOR_ID",data);
    },
    Save_Comment_From_Id({commit},data){
        commit("SAVE_COMMENT_FORM_ID",data);
    }
}
const modules = {
    SAVE_AUTHOR_ID(state,data){
        state.author_id = data;
    },
    SAVE_COMMENT_FORM_ID(state,data){
        state.comment_form_id = data;
    }
}
export default{
    state,
    actions,
    modules,
    getters
}

