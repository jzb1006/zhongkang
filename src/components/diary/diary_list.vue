<template>
    <div>   
        <diaryListC v-show="isShow" @changeLoadmore=changeLoadmore :diaryListInfo=diaryListInfo :params=params></diaryListC>
        <kong v-if="!isShow" text="康复日志为空"></kong>
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="$_get_diary"></LoadMore>
    </div>
</template>

<script>
import api from "@/api/diary";
import apiCom from "@/api/common";
import kong from "@/components/nosearch/kong.vue"
import diaryListC from "@/templates/diary/diaryList";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins";
import {commonShare, shareTitle, shareUrl, shareImg, shareDesc} from "@/assets/share.js";
import { isArray } from 'util';
export default {
    mixins: [mixin],
    props: ["insId", "docId", "cid", "query"],
    components: {
        diaryListC,
        Loading,
        LoadMore,
        kong
    },
    data() {
        return {
            show_backdrop_list: false,
            backdropList: [],
            user_info: [],
            mediaList: [],
            diaryList: [],
            diaryListInfo: {},
            doctor_id: this.docId,
            page: 0,
            is_more:this.params['is_more']||1,
            pageList:this.params.number,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true,
            isShow: true
        };
    },
    methods: {
        $_get_diary: function() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            let arr = {
                page: self.page,
                pageList: this.pageList,
                persional: 0,
                doctor_id: self.docId,
                institution_id: self.insId,
                cid: self.cid,
                query: this.query
            };

            api
                .ajaxSearch("diary_index", arr)
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.diaryList = self.diaryList.concat(res.data.diaryList);
                    self.diaryListInfo = {
                        diaryList: self.diaryList,
                    };

                    if (self.diaryList.length == 0 || self.diaryList == false || res.data.diaryList == false) {
                        self.isShow = false;
                    }

                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        },
        changeLoadmore() {
            this.loadmore = false;
        }
    },
    mounted() {
        this.$_get_diary();
    }
};
</script>

<style>
</style>
