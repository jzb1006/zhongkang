<template>
    <div id="diary_backdrop_userC">
        <diaryBackdropUserC :diaryBackdropUserInfo=diaryBackdropUserInfo></diaryBackdropUserC>
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
            self_diary:false,
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
                    // self.memuList = res.data.item_name;
                    self.user = res.data.user;
                    self.diaryNum = res.data.diary_count;
                    self.self_diary = res.data.self_diary;

                    if (res.data.backdrop[0].img1.length != 0) {
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
                        diaryNum:this.diaryNum,
                        user:this.user,
                        backList:this.backList,
                        self_diary:this.self_diary
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
