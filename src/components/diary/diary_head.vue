<template>
    <div id="diary_head">
        <searchBar :title="'众康医疗'" :iconShow="true"></searchBar>
        <p>
            <span @click="toUser">写日记</span>
             <router-link :to="{name:'FMain'}">
            <span>医导</span>
             </router-link>
        </p>
        <DiaryList></DiaryList>
    </div>
</template>

<script>
import common from '../../widget/lib/user'
import DiaryList from "./diary_list";
import searchBar from "@/components/home/search_bar.vue";
export default {
    methods:{
        toUser(){
            common.checkLogin(this,'/diary/diaryBackdropList');
        }
    },
    components:{
        DiaryList,
        searchBar
    }
};
</script>

<style scoped>
#diary_head{

}
#diary_head p {
    text-align: right;
}
#diary_head p span {
    font-size: 0.3rem;
    padding: 0.1rem 0.3rem;
    border: 1px solid rgb(255, 83, 112);
}
</style>

