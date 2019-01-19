<template>
    <div>
        <diaryOperateDiaryC ref="diarys" :diaryInfo=diary_info :info=info></diaryOperateDiaryC>
    </div>
</template>

<script>
import api from "@/api/diary";
import diaryOperateDiaryC from "@/templates/diary/diary_operate_diary";
import { mapGetters } from "vuex";
export default {
    props: {
        info: {
            default: function() {
                return {};
            }
        }
    },
    components: {
        diaryOperateDiaryC
    },
    computed: {
        ...mapGetters([
            "getDiaryOperate",
            "getAestheticStatus",
            "getBid",
            "getDid"
        ])
    },
    data() {
        return {
            diary_show_status: "公开",
            diaryFileList: [], //媒体文件地址
            diary_content: "", //康复日志内容
            did: "",
            bid: "",
            diary_info: {}
        };
    },
    methods: {
        getDiary() {
            return this.$refs.diarys.getDiary();
        },
        getDiaryData() {
            var self = this;
            this.did = this.getDid;
            api
                .ajaxSearch("diary_update_diary", { did: this.getDid })
                .then(res => {
                    let diary = res.data.diary;
                    for (let index in diary) {
                        let imgs = diary[index].origin_urls.split(",");
                        for (let inx in imgs) {
                            this.diaryFileList.push({
                                url: imgs[inx],
                                alt: ""
                            });
                        }

                        this.diary_info = {
                            bid: diary[index].bid,
                            did:this.getDid,
                            admin_check_id:diary[index].admin_check_id,
                            diary_content: diary[index].content,
                            diary_show_status:
                                diary[index].is_show == 1
                                    ? "公开"
                                    : "私密",
                            diaryFileList:this.diaryFileList
                        };
                    }
                });
        }
    },
    mounted() {
        if (this.getDid && this.getDiaryOperate == "ud") {
            this.getDiaryData();
        }
    }
};
</script>

<style>
</style>
