<template>
    <div>
        <diaryDetailTopC :params=params :diaryDetailTopInfo=diaryDetailTopInfo></diaryDetailTopC>
    </div>
</template>

<script>
import api from "@/api/diary";
import diaryDetailTopC from "@/templates/diary/diary_detail_top";
import { mixin } from "@/assets/js/mixins";

export default {
    mixins: [mixin],
    components: {
        diaryDetailTopC
    },
    data() {
        return {
            diaryDetailTopInfo:{},
            backdropList: [],
            memuList: [],
            user: [],
            diaryNum: 0,
            s_uid: 0,
            p_uid: 0
        };
    },
    methods: {
        $_ajax_getBackdrop: function() {
            var self = this;
            let bid = this.$route.query.bid;

            if (!bid) {
                bid = this.bid;
            }
            api.ajaxSearch("diary_detail_basic", { bid: bid }).then(res => {
                self.diaryDetailTopInfo = {
                    backdropList:res.data.backdrop,
                    memuList:res.data.item_name,
                    user:res.data.user,
                    s_uid:res.data.s_uid,
                    p_uid:res.data.b_uid
                }
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
