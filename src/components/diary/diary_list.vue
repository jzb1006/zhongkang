<template>
    <div>
        <diaryListC v-show="isShow" @changeLoadmore=changeLoadmore :diaryListInfo=diaryListInfo :params=params></diaryListC>
        <!-- <diaryListC @changeLoadmore=changeLoadmore :params=params :memuList=memuList :diaryList=diaryList :backdropList=backdropList :handbookList=handbookList :mediaList=mediaList></diaryListC> -->
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-show="loadmore" :state='hasMore' :isLoading='isBusy' @loadmore="$_get_diary"></LoadMore>
    </div>
</template>

<script>
import api from "@/api/diary";
import apiCom from "@/api/common";
import diaryListC from "@/templates/diary/diaryList";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins";
export default {
    mixins: [mixin],
    props: ["insId", "docId", "cid", "query"],
    components: {
        diaryListC,
        Loading,
        LoadMore
    },
    data() {
        return {
            show_backdrop_list: false,
            backdropList: [],
            handbookList: [],
            mediaList: [],
            diaryList: [],
            memuList: [],

            diaryListInfo: {},

            doctor_id:this.docId,

            pd: "",
            page: 0,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true,
            isShow:false
        };
    },
    methods: {
        $_get_diary: function() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            let arr = {
                page: self.page,
                pageList: 3,
                pd: this.pd,
                doctor_id: self.docId,
                institution_id: self.insId,
                cid: self.cid,
                query: this.query
            };

            api
                .ajaxSearch("diary_index", arr)
                .then(res => {
                    this.hasMore = res.data.hasMore;

                    self.handbookList = Object.assign(
                        self.handbookList,
                        res.data.handbook
                    );
                    self.mediaList = Object.assign(
                        self.mediaList,
                        res.data.media_diary
                    );
                    self.diaryList = Object.assign(
                        self.diaryList,
                        res.data.diary
                    );
                    self.memuList = Object.assign(self.memuList, res.data.memu);
                    self.backdropList = self.backdropList.concat(
                        res.data.backdrop
                    );

                    self.diaryListInfo = {
                        handbookList: self.handbookList,
                        mediaList: self.mediaList,
                        diaryList: self.diaryList,
                        memuList: self.memuList,
                        backdropList: self.backdropList
                    };
                    
                    if(self.backdropList.length > 0){
                        self.isShow = true;
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
