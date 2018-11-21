<template>
    <div id="diary_operate">
        <p class="top">
            <top title=""></top>
            <span v-if="getAestheticStatus" class="submit" @click="submit(2)">下一步</span>
            <span v-else class="submit" @click="submit(1)">发表</span>
        </p>
        <diaryInfo v-show="diary_show" ref="diary" :info=info></diaryInfo>
        <backdropInfo v-show="backdrop_show" @changeShowBackdrop=changeShowBackdrop ref="backdrop" :showbackdrop1=show_backdrop1 :info=info></backdropInfo>
    </div>
</template>

<script>
import api from "@/api/diary";
import Bus from "@/assets/bus.js";
import top from "@/components/decorate/top_back_title.vue";
import diaryInfo from "./diary_operate_diary";
import backdropInfo from "./diary_operate_backdrop";
export default {
    name:"diary_operate",
    data() {
        return {
            diary_show: true,
            backdrop_show: true,
            total_data: {},
            show_backdrop1: false,
            bid: "",
            did: "",
            info: {},
            backimg: [],

            getDiaryOperate: "cb",
            getAestheticStatus: false
        };
    },
    components: {
        diaryInfo,
        backdropInfo,
        top
    },
    watch: {
        getAestheticStatus(val, oldVal) {}
    },
    methods: {
        changeShowBackdrop(res) {
            this.show_backdrop1 = res;
        },
        submit(index) {
            if (index == 1) {
                switch (this.getDiaryOperate) {
                    case "cb":
                        this.create_basicdrop();
                        break;
                    case "cd":
                        this.create_diary();
                        break;
                    case "ud":
                        this.update_diary();
                        break;
                    case "ub":
                        this.update_backdrop();
                        break;
                    default:
                        alert("404");
                        break;
                }
            } else if (index == 2) {
                this.next_step();
            } else {
            }
        },
        next_step() {
            if (this.getBackInfo()) {
                this.show_backdrop1 = true;
                this.$store.dispatch("Save_Create_Info", this.total_data);
            }
        },
        update_backdrop() {
            if (this.getBackInfo()) {
                api
                    .ajaxSubmit("ajax_update_basic", this.total_data)
                    .then(res => {
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "diaryBackdrop",
                                query: { bid: res.data.bid }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    });
            }
        },
        update_diary() {
            if (this.getDInfo()) {
                api.ajaxSubmit("updateDiary", this.total_data).then(res => {
                    if (res.data.error == 0) {
                        this.$router.push({
                            name: "diaryDetail",
                            query: { bid: res.data.bid, did: res.data.did }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            }
        },
        create_basicdrop() {
            if (this.getBackInfo()) {
                api
                    .ajaxSubmit("ajax_create_basic", this.total_data)
                    .then(res => {
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "diaryBackdrop",
                                query: { bid: res.data.bid }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    });
            }
        },
        create_diary() {
            if (this.getDInfo()) {
                api
                    .ajaxSubmit("ajax_create_diary", this.total_data)
                    .then(res => {
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "diaryDetail",
                                query: { bid: res.data.bid, did: res.data.did }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    });
            }
        },
        getBackInfo() {
            if (this.$refs.diary.getDiary()) {
                this.total_data = Object.assign(
                    {},
                    this.total_data,
                    this.$refs.diary.getDiary()
                );
                if (this.$refs.backdrop.getBackdrop()) {
                    this.total_data = Object.assign(
                        {},
                        this.total_data,
                        this.$refs.backdrop.getBackdrop()
                    );

                    return true;
                }
            }
        },
        getDInfo() {
            if (this.$refs.diary.getDiary()) {
                this.total_data = Object.assign(
                    {},
                    this.total_data,
                    this.$refs.diary.getDiary()
                );

                if (this.bid) {
                    var data = {
                        bid: this.bid
                    };
                }

                this.total_data = Object.assign({}, this.total_data, data);

                return true;
            }
        },
        getBackdropData() {
            var self = this;
            api
                .ajaxSearch("diary_update_basic", { bid: self.bid })
                .then(res => {
                    self.info = res.data;
                    if (this.getAestheticStatus) {
                        let data = res.data.backdrop;
                    }
                });
        }
    },
    mounted() {
        if (this.$route.query.bid) {
            this.bid = this.$route.query.bid;
        }

        if (this.$route.query.did) {
            this.did = this.$route.query.did;
        }

        if (this.$route.query.operate) {
            this.getDiaryOperate = this.$route.query.operate;

            if (
                this.$route.query.operate == "cd" ||
                this.$route.query.operate == "ud"
            ) {
                this.backdrop_show = false;
            }

            if (this.$route.query.operate == "ub") {
                this.getBackdropData();
            }
        }

        Bus.$on("changeAestheticStatus",res=>{
            this.getAestheticStatus = res;
        })
    }
};
</script>

<style scoped>
#diary_operate p.top {
    margin-bottom: 0.1rem;
    height: 1rem;
}
#diary_operate p.top span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
    z-index: 1000;
}
</style>
