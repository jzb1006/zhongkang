<template>
    <div>
        <diaryBackdropListC :params=params :diaryBackdropInfo=diaryBackdropInfo :isShow=isShow></diaryBackdropListC>
        <kong v-if="isShow" text="康复日志为空"></kong>
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-show="loadmore" :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_backdropList"></LoadMore>
    </div>
</template>

<script>
import api from "@/api/diary";
import kong from "@/components/nosearch/kong.vue";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import diaryBackdropListC from "@/templates/diary/diary_backdrop_list";
import { mixin } from "@/assets/js/mixins.js";
export default {
    components: {
        diaryBackdropListC,
        Loading,
        LoadMore,
        kong
    },
    mixins: [mixin],
    data() {
        return {
            diaryList:[],
            diaryBackdropInfo: {},
            is_operate: false,
            backdropList: [],
            diaryCount: [],
            page: 0,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true,
            isShow: false
        };
    },
    methods: {
        hidden_backdropList() {
            this.$emit("close");
        },
        $_ajax_backdropList() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            api.ajaxSearch("diary_index", {
                persional:1,
                page: self.page,
                pageList: 5
            })
                .then(res => {
                    self.hasMore = res.data.hasMore;
                    if(res.data.diaryList.length > 0){
                        self.diaryList = self.diaryList.concat(res.data.diaryList);
                        self.diaryCount = Object.assign({},self.diaryCount,res.data.diaryNum);
                        self.diaryBackdropInfo = {
                            diaryList: this.diaryList,
                            diaryCount: this.diaryCount
                        };
                    }

                    if (self.diaryList.length > 0 && self.diaryList == false || res.data.diaryList == false) {
                        self.isShow = true;
                        this.$store.dispatch("Save_Diary_Operate", "cb");
                    }else{
                        self.isShow = false;
                    }

                    self.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        this.$_ajax_backdropList();
    }
};
</script>

<style>
</style>
