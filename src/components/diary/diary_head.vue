<template>
    <div id="diary_head">
        <searchBar :title="'众康医疗'" :iconShow="true"></searchBar>
        <p>
            <router-link :to="{name:'diaryBackdropList'}">
                <span>写日记</span>
            </router-link>
            <router-link :to="{name:'FMain'}">
                <span>医导</span>
            </router-link>
            <router-link :to="{name:'commentList'}">
                <span>评论列表</span>
            </router-link>
            <router-link :to="{name:'materialList'}">
                <span>素材</span>
            </router-link>
            <router-link :to="{name:'reward'}">
                <span>打赏</span>
            </router-link>
            <span @click="share">分享</span>
        </p>
        <DiaryList></DiaryList>
    </div>
</template>

<script>
// import {
//     commonShare,
//     shareTitle,
//     shareUrl,
//     shareImg,
//     shareDesc
// } from "@/assets/share";
// import common from "../../widget/lib/user";
import DiaryList from "./diary_list";
import searchBar from "@/components/home/search_bar.vue";
export default {
    components: {
        DiaryList,
        searchBar
    },
    methods: {
        // share() {
        //     commonShare(this, shareTitle, shareUrl, shareImg, shareDesc);
        // }
    }
};
</script>

<style scoped>
#diary_head p {
    text-align: right;
}
#diary_head p span {
    font-size: 0.3rem;
    padding: 0.1rem 0.3rem;
    border: 1px solid rgb(255, 83, 112);
}
</style>

