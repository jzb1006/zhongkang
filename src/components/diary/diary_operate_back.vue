<template>
    <div id="diary_create_backdrop">
        <p class="head clearfix">
            <span class="close zk-icon-hebingxingzhuang" @click="close"></span>
            <span class="submit" @click="submit_diary()">完成</span>
        </p>
        <p class="title">添加三张术前照片：</p>
        <div class="m_display">
            <mediaDisplay @getFileList=getBackList :limitnum1=3 :filelists=backList :acceptTypeNum=1></mediaDisplay>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import mediaDisplay from "@/components/upload/media_display";
import api from "@/api/diary";
export default {
    name:"diary_operate_back",
    props: {
        backdropFirst: {
            default: false
        },
        backimg: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            backList: this.backimg,
            bid: ""
        };
    },
    computed: {
        ...mapGetters(["getCreateInfo", "getDiaryOperate"])
    },
    components: {
        mediaDisplay,
        top
    },
    watch: {
        backList(val, oldval) {
            this.$emit("getBackUrl", this.backList);
        }
    },
    methods: {
        close() {
            this.$emit("closeBackdrop", true);
        },
        getBackList(data) {
            this.backList = data;
        },
        submit_diary() {
            let status = this.examination();
            let data = {};
            if (status) {
                data = this.getCreateInfo;

                let infoLen = this.getCreateInfo.length;
                this.$set(data, "img1", this.backList[0].url);
                this.$set(data, "img2", this.backList[1].url);
                this.$set(data, "img3", this.backList[2].url);
            }

            if (this.getDiaryOperate == "ub") {
                api.ajaxSubmit("ajax_update_basic", data).then(res => {
                    if (res.data.error == 0) {
                        this.$router.push({
                            name: "diaryBackdrop",
                            query: { bid: res.data.bid }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            } else if (this.getDiaryOperate == "cb") {
                api.ajaxSubmit("ajax_create_basic", data).then(res => {
                    if (res.data.error == 0) {
                        this.$router.push({
                            name: "diaryBackdrop",
                            query: { bid: res.data.bid }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            } else {
            }
        },
        ajax_submit(formData) {},
        examination() {
            if (this.backList.length < 3) {
                alert("请添加三张图片");
                return false;
            }
            return true;
        }
    },
    mounted() {}
};
</script>

<style>
#diary_create_backdrop {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 9999;
}
#diary_create_backdrop .m_display {
    padding: 0 0.3rem;
}
#diary_create_backdrop p.head {
    height: 1rem;
    background-color: #ff5370;
}
#diary_create_backdrop p.head span.close {
    position: absolute;
    top: 0;
    background-color: #ff5370;
    width: 1rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    font-size: 0.5rem;
    color: #fff;
}
#diary_create_backdrop p.title {
    font-size: 0.35rem;
    margin: 0.3rem;
}
#diary_create_backdrop p.head span.submit {
    position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    font-size: 0.35rem;
    color: #fff;
}
</style>
