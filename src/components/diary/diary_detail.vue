<template>
    <div>
        <diaryDetailC :params=params :diaryDetailInfo=diaryDetailInfo></diaryDetailC>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import apiCom from "@/api/common";
import api from "@/api/diary";
import diaryDetailC from "@/templates/diary/diary_detail";
import Loading from "@/components/decorate/loading.vue";
import { mixin } from "@/assets/js/mixins.js";
export default {
    components: {
        diaryDetailC,
        Loading
    },
    mixins: [mixin],
    data() {
        return {
            diaryDetailInfo: {},

            bid: "",
            did: "",
            diaryContent: [],
            mediaList: [],
            username: "",
            loadinging: true
        };
    },
    methods: {
        $_ajax_getDiaryDetail: function() {
            var self = this;
            this.did = this.$route.query.did;
            this.bid = this.$route.query.bid;

            api
                .ajaxSearch("diary_detail_diary", { did: this.did })
                .then(res => {
                    self.diaryDetailInfo = {
                        diaryContent: res.data.diary,
                        mediaList: res.data.media,
                    };
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        this.$_ajax_getDiaryDetail();
    }
};
</script>

<style>
</style>
