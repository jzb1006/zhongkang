<template>
    <div id="diary_backdrop_userC">
        <diaryBackdropUserC :diaryBackdropUserInfo=diaryBackdropUserInfo></diaryBackdropUserC>
        <!-- <diaryBackdropUserC :backList=backList :pUid=p_uid :sUid=s_uid :user=user :memuList=memuList :diaryList=diaryList :backdropList=backdropList></diaryBackdropUserC> -->
    </div>
</template>

<script>
import api from "@/api/diary";
import diaryBackdropUserC from "@/templates/diary/diary_backdrop_user";
export default {
    components: {
        diaryBackdropUserC
    },
    data() {
        return {
            diaryBackdropUserInfo:{},
            backdropList: [],
            diaryList: [],
            memuList: [],
            backList:[],
            user: "",
            s_uid: 0,
            p_uid: 0,
            bid:"",
        };
    },
    methods: {
        $_ajax_getBackdrop: function() {
            var self = this;

            if (!this.bid) {
                this.bid = this.$route.query.bid;
            }
            api
                .ajaxSearch("diary_detail_basic", { bid: this.bid })
                .then(res => {
                    self.diaryList = res.data.diary;
                    self.backdropList = res.data.backdrop;
                    self.memuList = res.data.item_name;
                    self.user = res.data.user;
                    self.diaryNum = res.data.tt;
                    self.s_uid = res.data.s_uid;
                    self.p_uid = res.data.b_uid;

                    if (res.data.backdrop[0].img1) {
                        let arrImg = [];
                        arrImg.push({
                            url: res.data.backdrop[0].img1,
                            alt: ""
                        });
                        arrImg.push({
                            url: res.data.backdrop[0].img2,
                            alt: ""
                        });
                        arrImg.push({
                            url: res.data.backdrop[0].img3,
                            alt: ""
                        });
                        self.backList = arrImg;
                    }

                    this.diaryBackdropUserInfo = {
                        diaryList:this.diaryList,
                        backdropList:this.backdropList,
                        memuList:this.memuList,
                        user:this.user,
                        backList:this.backList,
                        s_uid:this.s_uid,
                        p_uid:this.p_uid
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
