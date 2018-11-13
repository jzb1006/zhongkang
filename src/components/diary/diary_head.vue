<template>
    <div id="diary_head" class="clearfix">
        <searchBar :title="'众康医疗'" :iconShow="true"></searchBar>
        <DiaryList></DiaryList>
    </div>
</template>

<script>
import {
    commonShare,
    shareTitle,
    shareUrl,
    shareImg,
    shareDesc
} from "@/assets/share";
import common from "../../widget/lib/user";
import DiaryList from "./diary_list";
import searchBar from "@/components/home/search_bar.vue";
export default {
    components: {
        DiaryList,
        searchBar
    },
    methods: {
        share() {
            commonShare(this, shareTitle, shareUrl, shareImg, shareDesc);
        }
    },
    mounted(){
    }
};
</script>

<style scoped>
#diary_head{
    position: relative;
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

