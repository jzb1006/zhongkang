<template>
    <div id="diaryBackdropDiary">
        <diaryBackdropContentC :params=params :diaryBackdropContent=diaryBackdropContent></diaryBackdropContentC>
        <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_getBackdrop"></LoadMore>
    </div>
</template>

<script>
import api from "@/api/diary";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import diaryBackdropContentC from "@/templates/diary/diary_backdrop_content";
import { mixin } from "@/assets/js/mixins";
export default {
    components: {
        diaryBackdropContentC,
        Loading,
        LoadMore
    },
    mixins:[mixin],
    data() {
        return {
            diaryBackdropContent:{},
            bid: "",
            diaryList: [],
            mediaList: [],
            backdropList: [],
            memu: "",
            self_diary:false,
            page: 0,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
        };
    },
    methods: {
        $_ajax_getBackdrop: function() {
            var self = this;
            this.isBusy = true;

            if (!this.bid) {
                this.bid = this.$route.query.bid;
            }

            self.page = self.page + 1;
            let arr = {
                pageList: 3,
                page: self.page,
                bid: this.bid
            };

            api
                .ajaxSearch("diary_detail_basic", arr)
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.self_diary = res.data.self_diary;
                    self.backdropList = Object.assign(
                        self.backdropList,
                        res.data.backdrop[0]
                    );
                    self.diaryList = self.diaryList.concat(res.data.diary);
                    self.mediaList = Object.assign(
                        self.mediaList,
                        res.data.diary_media
                    );
                    self.diaryNum = res.data.diary_count;

                    // for (let index in res.data.item_name) {
                    //     self.memu = res.data.item_name[index].cat_name;
                    //     break;
                    // }
                    // self.s_uid = res.data.s_uid;
                    // self.p_uid = res.data.b_uid;

                    self.diaryBackdropContent = {
                        bid:self.bid,
                        backdropList:self.backdropList,
                        diaryList:self.diaryList,
                        mediaList:self.mediaList,
                        memu:self.memu,
                        diaryNum:self.diaryNum,
                        self_diary:this.self_diary
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
        this.$_ajax_getBackdrop();
    }
};
</script>

<style>
</style>
