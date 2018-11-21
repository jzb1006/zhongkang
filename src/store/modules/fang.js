import Vue from 'vue'

const state = {
    bus:new Vue(),
    //模拟整形
    contentJump:'Fitem',//保存下一步要跳转的页面
    contentData:[],//保存参数
    content_type:1,//保存页数
    Price_Data:[],//保存价格
    check_ids:[],//保存选中值的id
    is_sel:false,//是否选择
}
const actions = {
    Content_Jump({commit},name){
        commit('CONTENT_JUMP',name);
    },
    Content_Data({commit},data){
        commit('CONTENT_DATA',data);
    },
    Content_Type({commit},data){
        commit('CONTENT_TYPE',data);
    },
    Price_Data({commit},data){
        commit('PRICE_DATA',data);
    },
    Check_Ids({commit},data){
        commit('CHECK_IDS',data);
    },
    Is_Sel({commit},data){
        commit("IS_SEL",data);
    },
    Del_Check_Ids({commit},data){
        commit("DEL_CHECK_IDS",data);
    }
    
}
const mutations = {
    CONTENT_JUMP(state,name){
        state.contentJump = name;
    },
    CONTENT_DATA(state,data){
        // state.contentData = data;
        state.contentData.forEach((item,index)=>{
            if(data.page == item.page){
                state.contentData.splice(index,state.contentData.length-index);
            }
        });
        state.contentData.push(data);
    },
    CONTENT_TYPE(state,data){
        state.content_type = !state.content_type;
    },
    PRICE_DATA(state,data){
        state.Price_Data.forEach((item,index)=>{
            if(data.num == item.num){
                state.Price_Data.splice(index,1);
            }
        });
        state.Price_Data.push(data);
    },
    CHECK_IDS(state,data){
        state.check_ids.forEach((item,index)=>{
            if(data.num == item.num){
                state.check_ids.splice(index,state.check_ids.length-index);
            }
        });
        state.check_ids.push(data);
    },
    IS_SEL(state,data){
        state.is_sel = data;
    },
    DEL_CHECK_IDS(state,data){
        state.check_ids.forEach((item,index)=>{
            if(data.num == item.num){
                state.check_ids.splice(index,state.check_ids.length-index);
            }
        });
        state.check_ids.push(data);
    }
}
export default{
    state,
    actions,
    mutations
}