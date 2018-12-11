<template>
    <div id="diary_operate">
        <div class="operate_wrapper">
            <topHide v-if="getAestheticStatus" @hide=to_back :params="{hasBtn:true,btnText:'下一步',next:this.next_step}"></topHide>
            <topHide v-else @hide=to_back :params="{hasBtn:true,btnText:'发表',next:this.submit}"></topHide>
            <diaryInfo v-show="diary_show" ref="diary" :info=info></diaryInfo>
            <backdropInfo v-show="backdrop_show" @changeShowBackdrop=changeShowBackdrop ref="backdrop" :showbackdrop1=show_backdrop1 :info=info></backdropInfo>
        </div>
    </div>
</template>

<script>
import api from "@/api/diary";
import Bus from "@/assets/bus.js";
import top from "@/components/decorate/top_back_title.vue";
import diaryInfo from "./diary_operate_diary";
import backdropInfo from "./diary_operate_backdrop";
import { mapGetters } from "vuex";
export default {
    name: "diary_operate",
    data() {
        return {
            diary_show: true,
            backdrop_show: true,
            total_data: {},
            show_backdrop1: false,
            bid: this.getBid,
            did: this.getDid,
            info: {},
            backimg: []
        };
    },
    computed: {
        ...mapGetters([
            "getDiaryOperate",
            "getAestheticStatus",
            "getBid",
            "getDid"
        ])
    },
    components: {
        diaryInfo,
        backdropInfo,
        top
    },
    methods: {
        to_back() {
            this.$emit("back");
        },
        changeShowBackdrop(res) {
            this.show_backdrop1 = res;
        },
        submit() {
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
        },
        next_step() {
            if (this.getBackInfo()) {
                this.show_backdrop1 = true;
                this.$store.dispatch("Save_Create_Info", this.total_data);
            }
        },
        update_backdrop() {
            if (this.getBackInfo()) {
                api.ajaxSubmit("ajax_update_basic", this.total_data).then(
                    res => {
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "container",
                                query: { id: "7", bid: res.data.bid }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    }
                );
            }
        },
        update_diary() {
            if (this.getDInfo()) {
                api.ajaxSubmit("updateDiary", this.total_data).then(res => {
                    if (res.data.error == 0) {
                        this.$router.push({
                            name: "container",
                            query: {
                                id: 8,
                                bid: res.data.bid,
                                did: res.data.did
                            }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            }
        },
        create_basicdrop() {
            console.log('cb');
            if (this.getBackInfo()) {
                api.ajaxSubmit("ajax_create_basic", this.total_data).then(
                    res => {
                        console.log(res);
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "container",
                                query: { id: 7, bid: res.data.bid }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    }
                );
            }
        },
        create_diary() {
            if (this.getDInfo()) {
                api.ajaxSubmit("ajax_create_diary", this.total_data).then(
                    res => {
                        if (res.data.error == 0) {
                            this.$router.push({
                                name: "container",
                                query: {
                                    id: 8,
                                    bid: res.data.bid,
                                    did: res.data.did
                                }
                            });
                        } else {
                            alert(res.data.message);
                        }
                    }
                );
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

                if (this.getBid) {
                    var data = {
                        bid: this.getBid
                    };
                }

                this.total_data = Object.assign({}, this.total_data, data);
                return true;
            }
        },
        getBackdropData() {
            var self = this;
            api.ajaxSearch("diary_update_basic", { bid: self.getBid }).then(
                res => {
                    self.info = res.data;
                    if (this.getAestheticStatus) {
                        let data = res.data.backdrop;
                    }
                }
            );
        }
    },
    mounted() {
        if (this.getDiaryOperate == "ub") {
            this.getBackdropData();
        }
        if (this.$route.query.bid) {
            this.bid = this.$route.query.bid;
        }

        if (this.$route.query.did) {
            this.did = this.$route.query.did;
        }

        if (this.getDiaryOperate == "cd" || this.getDiaryOperate == "ud") {
            this.backdrop_show = false;
        }

        Bus.$on("changeAestheticStatus", res => {
            this.getAestheticStatus = res;
        });
    }
};
</script>

<style scoped>
#diary_operate {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    background-color: #fff;
}
#diary_operate .operate_wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
#diary_operate p.top {
    position: sticky;
    top: 0;
    margin-bottom: 0.1rem;
    height: 1rem;
    background-color: crimson;
}
#diary_operate p.top .back {
    color: #fff;
    font-size: 0.4rem;
    position: absolute;
    top: 0.3rem;
    left: 0.1rem;
}
#diary_operate p.top span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
}
</style>
