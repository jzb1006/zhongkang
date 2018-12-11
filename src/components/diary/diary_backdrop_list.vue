<template>
    <div>
        <diaryBackdropListC :params=params :diaryBackdropInfo=diaryBackdropInfo></diaryBackdropListC>
        <kong v-if="!isShow" text="康复日志为空"></kong>
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
            diaryBackdropInfo: {},
            is_operate: false,
            backdropList: [],
            itemName: [],
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
            api.ajaxSearch("diary_select_basic", {
                page: self.page,
                pageList: 5
            })
                .then(res => {
                    console.log(res.data);
                    self.hasMore = res.data.hasMore;
                    self.backdropList = self.backdropList.concat(
                        res.data.backdrop
                    );
                    self.itemName = Object.assign(
                        {},
                        self.itemName,
                        res.data.item_name
                    );
                    self.diaryCount = Object.assign(
                        self.diaryCount,
                        res.data.diary_count
                    );
                    self.diaryBackdropInfo = {
                        backdropList: this.backdropList,
                        itemName: this.itemName,
                        diaryCount: this.diaryCount
                    };

                    if (self.backdropList.length > 0) {
                        self.isShow = true;
                    }
                    this.isBusy = false;
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
