<template>
    <div id="media_display">
        <div class="media_wrapper">
            <div class="media_show" v-for="(file,index) in filelist1" v-if="checkImgType(file.url) == '1'">
                <img @click="change_media_browse_status(index)" :src="fileUrl()+file.url" :alt="file.name" class="img_wrapper">
            </div>
            <div class="media_show" v-else-if="checkImgType(file.url) == '2'">
                <div class="video_wrapper">
                    <video :src="fileUrl()+file.url"></video>
                </div>
                <div class="btn" v-show="btnStatus" @click="change_media_browse_status(index)">
                    <span class="zk-icon-bofang1"></span>
                </div>
            </div>
            <span style="display:none" v-else></span>
            <div v-if="up_show" class="media_show">
                <uploadC @getFileList=getFileList :filelist1=filelist1 :acceptTypeNum=acceptTypeNum></uploadC>
            </div>
        </div>
        <div v-if="this.$store.state.media_display.open_image_mode">
            <aloneDisplay @changemediabrowsestatus=change_media_browse_status_in :filelistss=filelist1 :selindex1=sel_index :delshow1=del_show></aloneDisplay>
        </div>
    </div>
</template>

<script>
import bus from "@/assets/bus.js";
import aloneDisplay from "./alone_display";
import apiUp from "@/api/upload";
import uploadC from "./upload";
import { mapGetters } from "vuex"   
export default {
    name:"media_display",
    props: {
        limitnum1: {
            default: -1
        },
        filelists: {
            default: function() {
                return [];
            }
        },
        upshow1: {
            default: true
        },
        acceptTypeNum:{
            default:0
        }
    },
    computed:{
        ...mapGetters([
            'getOpenImageModeStatus',
            'getCloseImageBrowseStatus'
        ])
    },
    components: {
        uploadC,
        aloneDisplay
    },
    data() {
        return {
            up_show: this.upshow1,
            del_show: false,
            btnStatus: true,
            filelist1: this.filelists,
            sel_index: 0,
            limitnum: this.limitnum1
        };
    },
    watch: {
        filelists(val, oldval) {
            this.filelist1 = val;
            this.limitnums(val.length);
        },
        filelist1(val,oldval){
            this.limitnums(val.length);
        }
    },
    methods: {
        limitnums(max_index) {
            if (this.limitnum != -1) {
                if (this.limitnum == max_index) {
                    this.up_show = false;
                } else {
                    this.up_show = true;
                }
            }
            this.del_show = true;
        },
        changeFileList() {
            this.$emit("getFileList", this.filelist1);
        },
        change_media_browse_status(index) {
            this.sel_index = index;
            // this.media_browse_status = !this.media_browse_status;
            this.$store.dispatch('Open_Image_Mode',true);
            this.$store.dispatch('Close_Image_Browse',false);
            // this.go_media_browse(index);
        },
        change_media_browse_status_in(index){
            this.sel_index = index;
            // this.media_browse_status = !this.media_browse_status;
            this.$store.dispatch('Open_Image_Mode',false);
            this.$store.dispatch('Close_Image_Browse',true);
        },
        go_media_browse(index) {
            this.$router.push({
                name: "aloneDisplay",
                params: {
                    filelistss: JSON.stringify(this.filelist1),
                    selindex1: index,
                    delshow1: this.del_show
                }
            });
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
        },
        fileUrl() {
            return apiUp.fileUrl();
        },
        getFileList(data) {
            this.filelist1 = data;
            this.changeFileList();
        }
    },
    mounted() {
        // if(this.$route.params.filelist1){
        //     this.filelist1 = JSON.parse(this.$route.params.filelist1);
        // }
        
        // this.bus.$on("adgetFileList", ()=>{
        //     console.log(123);
        // });
        // this.bus.$on("adgetFileList", () => {
        //     this.$_ajax_licence(this.defaultItem);
        // });
    }
};
</script>

<style scoped>
.text-fade-enter-active,
.text-fade-leave-active {
    transition: all 0.3s ease;
}
.text-fade-leave-active {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
.text-fade-enter,
.text-fade-leave-to {
    opacity: 0;
    background: rgba(7, 17, 27, 0);
}
#media_display .www {
    width: 500px;
    margin: 0 auto;
}
#media_display .media_browse .operate_more {
    position: absolute;
    left: 0;
    right: 0;
    font-size: 0.5rem;
    padding: 0.4rem 0.2rem 0.3rem;
    color: #fff;
    background-color: #cccccc50;
    z-index: 1051;
}
#media_display .media_browse .operate_more .num {
    font-size: 0.4rem;
    position: absolute;
    left: 0.8rem;
    top: 0.45rem;
}
#media_display .media_browse .operate_more .back {
    font-size: 0.5rem;
}
#media_display .media_browse .operate_more .trash {
    font-size: 0.5rem;
    float: right;
}
#media_display .media_browse .operate {
    position: absolute;
    width: auto;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    z-index: 1025;
}
#media_display .media_browse div.prev {
    left: 0;
}
#media_display .media_browse div.next {
    right: 0;
}
#media_display .media_browse .operate span {
    font-size: 0.5rem;
    padding: 0.3rem;
    color: #fff;
    background-color: #00000050;
}
#media_display .media_browse {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    z-index: 1000;
}
#media_display .media_browse .media_show {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000000;
}
#media_display .media_browse .media_show .video_wrapper,
#media_display .media_browse .media_show .img_wrapper {
    width: 100%;
    height: 100%;
}
#media_display .media_browse .media_show .media {
    /* display: none; */
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
#media_display .media_browse .media_show .media img,
#media_display .media_browse .media_show .media video {
    width: 100%;
}

#media_display .media_wrapper {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-rows: 2.2rem;
    grid-gap: 0.1rem;
    overflow: hidden;
}
#media_display .media_wrapper .media_show {
    position: relative;
    display: flex;
    align-items: center;
    overflow: hidden;
    background-color: #cccccc50;
}
#media_display .media_wrapper .media_show .del {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0.02rem;
    background-color: #00000050;
    color: #fff;
    border-radius: 1rem;
    z-index: 50;
}
#media_display .media_wrapper .media_show img {
    width: 100%;
    min-height: 100%;
}
#media_display .media_wrapper .media_show video {
    width: 100%;
    min-height: 100%;
}
#media_display .media_wrapper .media_show .btn {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}
#media_display .media_wrapper .media_show .btn span {
    position: absolute;
    font-size: 0.5rem;
    top: 50%;
    left: 50%;
    margin-top: -0.25rem;
    margin-left: -0.25rem;
    color: #fff;
}
</style>
