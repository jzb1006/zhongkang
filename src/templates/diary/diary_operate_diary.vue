<template>
    <div id="diary_info">
        <div class="text">
            <x-textarea v-model.trim="diary_content" :max="1000" :rows=4 placeholder="这一刻的想法..." :show-counter=false></x-textarea>
        </div>
        <div class="upFile">
            <mediaDisplay @getFileList=getFileList :filelists=diaryFileList></mediaDisplay>
        </div>
        <ul class="info clearfix">
            <li class="sel_item zk-icon-iconfonticon5" ref="see">
                <div @click="click_status($event)">
                    <popup-radio title="谁可以看" :options="is_show_diary" v-model="diary_show_status">
                        <p slot="popup-header" class="vux-1px-b demo3-slot" ref="sss"></p>
                    </popup-radio>
                </div>
            </li>
        </ul>
        <Alert v-bind:Show.sync="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>

<script>
import api from "@/api/diary";
import top from "@/components/decorate/top_back_title.vue";
import { XTextarea, Popup, PopupRadio } from "vux";
import mediaDisplay from "@/components/upload/media_display";
import { mapGetters } from "vuex";
export default {
    name: "diary_operate_diary",
    props: {
        info: {
            default: function() {
                return {};
            }
        },
        diaryInfo: {
            default: function() {
                return {};
            }
        }
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
        top,
        XTextarea,
        Popup,
        PopupRadio,
        mediaDisplay
    },
    data() {
        return {
            isShow: false,
            alerttType: "",
            alertText: "",
            is_show_diary: ["公开", "私密"],
            diary_show_status: "公开",
            diaryFileList: [], //媒体文件地址
            diary_content: "", //康复日志内容
            is_show: "",
            info1: this.info,
            bid: "",
            did: "",
            admin_check_id:""
        };
    },
    watch: {
        info(val, oldVal) {
            if (val.diary) {
                this.bid = val.backdrop.id;
                this.did = val.diary.id;
                this.is_show = val.diary.is_show;
                this.info1 = val;
                this.diary_content = val.diary.content;
                this.diary_show_status =
                    val.diary.is_show == "1" ? "公开" : "私密";
                for (let index in val.diary_media) {
                    let data = val.diary_media[index].origin_urls.split(",");
                    for (let ind in data) {
                        this.diaryFileList.push({ url: data[ind], alt: "" });
                    }
                }
            }
        },
        diaryInfo(val, oldVal) {
            this.bid = val.bid;
            this.did = val.did;
            this.admin_check_id = val.admin_check_id;
            this.diary_content = val.diary_content;
            this.is_show = val.is_show;
            this.diary_show_status = val.diary_show_status;
            this.diaryFileList = val.diaryFileList;
        }
    },
    methods: {
        is_aesthetic_custom() {
            return true;
        },
        getFileList(data) {
            this.diaryFileList = data;
        },
        click_status(event) {
            let h =
                document.documentElement.clientHeight ||
                document.body.clientHeight;
            let top = h - event.clientY - 20;
            this.$refs.sss.parentElement.style.bottom = top + "px";
        },
        getDiary(index) {
            let pd = this.examination();

            if (pd) {
                //组织康复日志的视频和图片
                let origin_urls = "";
                let video_urls = "";

                for (let index in this.diaryFileList) {
                    if (
                        this.checkImgType(this.diaryFileList[index].url) == "1"
                    ) {
                        origin_urls += this.diaryFileList[index].url + ",";
                    } else if (
                        this.checkImgType(this.diaryFileList[index].url) == "2"
                    ) {
                        video_urls += this.diaryFileList[index].url + ",";
                    } else {
                    }
                }

                this.is_show =
                    this.diary_show_status == "公开" ? "1" : "0";

                origin_urls = origin_urls.substring(0, origin_urls.length - 1);
                video_urls = video_urls.substring(0, video_urls.length - 1);

                let data = {
                    did: this.did,
                    bid: this.bid,
                    admin_check_id: this.admin_check_id,
                    is_show: this.is_show,
                    content: this.diary_content,
                    origin_urls: origin_urls,
                    video_urls: video_urls
                };
                return data;
            } else {
                return false;
            }
        },
        submit_diary(data) {
            if (this.bid) {
                api.ajaxSubmit("ajax_create_diary", formData).then(res => {
                    if (res.data.error == 0) {
                        this.$router.push({
                            name: "diaryDetail",
                            query: { bid: res.data.bid, did: res.data.did }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            } else {
                api.ajaxSubmit("ajax_create_basic", formData).then(res => {
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
        next_step(data) {
            this.$store.dispatch("Save_Create_Info", data);
        },
        examination() {
            if (this.diary_content.length <= 0) {
                this.isShow = true;
                this.alerttType = "warn";
                this.alertText = "请添加康复心情";
                return false;
            }
            if (this.diaryFileList.length <= 0) {
                this.isShow = true;
                this.alerttType = "warn";
                this.alertText = "请添加康复图片";
                return false;
            }
            return true;
        },
        checkImgType(fileURL) {
            let fan = "";
            var right_type = new Array(".jpg", ".png", ".jpeg", ".mp4", ".gif");
            var right_typeLen = right_type.length;
            var imgUrl = fileURL.toLowerCase();
            var postfixLen = imgUrl.length;
            var len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            var len5 = imgUrl.substring(postfixLen - 5, postfixLen);

            for (let i = 0; i < right_typeLen; i++) {
                if (len4 == right_type[i] || len5 == right_type[i]) {
                    if (len4 == ".mp4") {
                        fan = "2";
                    } else {
                        fan = "1";
                    }
                }
            }

            if (fan) {
                return fan;
            } else {
                return false;
            }
        }
    }
};
</script>
<style lang="less">
@calendar-selected-bg-color: #000;
// @import url("./../../assets/css/calandar.css");
</style>
<style scoped>
.vux-popup-dialog p{
    padding:0px;
}
.weui-cell_radio{
    padding: 0px!important;
}
#diary_info p.top {
    margin-bottom: 0.1rem;
}
#diary_info p.top span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
    z-index: 556;
    color: #fff;
}
#diary_info .upFile {
    min-height: 4rem;
    padding: 0 0.3rem .3rem;
}
#diary_info .text {
    margin: .2rem 0.3rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
    /* font-weight: 550; */
}
#diary_info p.top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
    border-bottom: 1px solid #ccc;
    /* background-color: rgba(255, 83, 112, 0.7); */
    z-index: 555;
}

#diary_info p.top span.back {
    float: left;
}
#diary_info p.top span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
    z-index: 556;
}
#diary_info div.pic p.tip {
    margin-top: 1rem;
    text-align: center;
    font-size: 0.3rem;
}
#diary_info div.pic p.tip span {
    padding: 0.1rem 0.4rem;
    border: 1px solid #ccc;
    color: #fff;
    border-radius: 1rem;
    background-color: rgba(255, 83, 112, 0.7);
}
#diary_info div.pic {
    margin-top: 1.1rem;
    padding-bottom: 0.3rem;
    border: 1px solid #ccc;
    box-shadow: 0 5px 2px #ccc;
}
#diary_info .info {
    /* margin-top: 1rem; */
    padding: 0 0.3rem;
    /* margin-bottom: 1.5rem; */
}
#diary_info .info li {
    font-size: 0.32rem;
    padding: 0.3rem 0.2rem;
    border-top: 1px solid #ccc;
}
#diary_info .info li > div {
    float: right;
    width: 87%;
}
</style>
