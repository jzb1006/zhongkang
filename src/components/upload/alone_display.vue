<template>
    <div id="aloneDisplay">
        <div class="www_shadow" v-if="www">
            <span class="zk-icon-more more" @click="swiperleft"></span>
            <span class="zk-icon-back back" @click="swiperright"></span>
            <div class="operate_list">
                <div class="toolbar">
                    <span class="zk-icon-back back" @click="swiperright"></span>
                    <span class="zk-icon-more more" @click="swiperleft"></span>
                    <span class="close zk-icon-guanbi1" @click="change_media_browse_status"></span>
                </div>
            </div>
        </div>
        <div class="media_browse" :class="{www_media_browse:www}" v-if="filelist1.length" @click="change_operate_more_status">
            <div class="operate_more" v-if="!www" v-show="operate_more_status">
                <p>
                    <span class="back zk-icon-back" @click="change_media_browse_status"></span>
                    <span class="num">{{sel_index+1}} / {{filelist1.length}}</span>
                    <span v-if="del_show" class="trash zk-icon-icon" @click="del()"></span>
                </p>
            </div>
            <v-touch v-on:swipeleft="swiperleft" v-on:swiperight="swiperright" class="media_show">
                <transition-group name="slide-fade" mode="out-in" tag="a">
                    <div v-for="(file,index) in filelist1" :key="'a'+index" v-show="sel_index == index">
                        <div class="media" :class="{www_media:www}"   v-if="checkImgType(file.url) == '1'">
                            <img :src="fileUrl()+file.url" :alt="file.name">
                        </div>
                        <div class="media" v-else-if="checkImgType(file.url) == '2'">
                            <video autoplay loop :src="fileUrl()+file.url"></video>
                        </div>
                    </div>
                </transition-group>
            </v-touch>
        </div>
    </div>
</template>

<script>
import bus from "@/assets/bus.js";
import apiUp from "@/api/upload";
export default {
    name:"alone_display",
    props: {
        filelistss: {
            default: function() {
                return [];
            }
        },
        selindex1: {
            default: 0
        },
        delshow1: {
            default: false
        },
        www: {
            default: false
        }
    },
    watch: {
        selindex1(val, oldval) {
            this.sel_index = val;
        },
        filelistss(val, oldval) {
            this.filelist1 = val;
        },
        delshow1(val, oldval) {
            this.del_show = val;
        },
        filelist1(val,oldVal){
            this.filelist1 = val;
        }
    },
    data() {
        return {
            filelist1: this.filelistss,
            media_browse_status: false,
            sel_index: this.selindex1,
            del_show: this.delshow1,
            operate_more_status: true,
            up_show: false
        };
    },
    methods: {
        swiperright: function() {
            if (this.sel_index > 0) {
                this.sel_index = this.sel_index - 1;
            } else {
                this.sel_index = this.filelist1.length - 1;
            }
        },
        swiperleft: function() {
            if (this.sel_index < this.filelist1.length - 1) {
                this.sel_index = this.sel_index + 1;
            } else {
                this.sel_index = 0;
            }
        },

        del() {
            if (this.sel_index + 1 == this.filelist1.length) {
                this.filelist1.splice(this.sel_index, 1);
                this.sel_index = 0;
            } else {
                this.filelist1.splice(this.sel_index, 1);
                this.sel_index + 1;
            }
            this.change_operate_more_status();
            this.changeFileList();
            this.limitnums(this.filelist1.length);
        },
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
        change_operate_more_status() {
            this.operate_more_status = !this.operate_more_status;
        },
        change_media_browse_status(index) {
            this.sel_index = index;
            this.media_browse_status = !this.media_browse_status;
            this.$emit("changemediabrowsestatus", index);
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
        }
    },
    mounted() {
        console.log(this.filelistss);
    }
};
</script>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease;
}
.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
}
#aloneDisplay .www_shadow {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000f0;
    z-index: 1000;
}

#aloneDisplay .www_shadow > span.more,
#aloneDisplay .www_shadow > span.back {
    position: absolute;
    top: 50%;
    margin-top: -25px;
    font-size: 35px;
    font-weight: bolder;
    z-index: 1001;
    padding: 20px;
    color: #fff;
}
#aloneDisplay .www_shadow > span.more {
    right: 20px;
}
#aloneDisplay .www_shadow > span.back {
    left: 20px;
}
#aloneDisplay .www_shadow div.operate_list {
    position: absolute;
    bottom: 50px;
    display: flex;
    justify-content: center;
    width: 100%;
    color: #fff;
}
#aloneDisplay .www_shadow div.operate_list .toolbar {
    background: #222;
    border: 2px solid #111;
    color: #eee;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 20px;
    border-radius: 10px;
    margin: 0 0 2px;
    padding: 6px;
}
#aloneDisplay .www_shadow div.operate_list span {
    font-weight: bolder;
    font-size: 35px;
}

#aloneDisplay .www_media_browse {
    position: fixed;
    top: 50% !important;
    left: 50% !important;
    margin-top: -150px;
    margin-left: -300px;
    width: 600px;
    height: 300px;
    background-color: transparent !important;
}
#aloneDisplay .media_browse .media_show .www_media {
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: center;
}

#aloneDisplay .media_browse .media_show .www_media img {
    height: 100% !important;
    width: auto !important;
    border: 4px solid #f8f8f8;
    display: block;
    padding: 0;
    cursor: pointer;
    box-shadow: #888 0 0 20px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
}

#aloneDisplay .media_browse .operate_more {
    position: absolute;
    left: 0;
    right: 0;
    font-size: 0.5rem;
    padding: 0.4rem 0.2rem 0.3rem;
    color: #fff;
    background-color: #cccccc50;
    z-index: 1051;
}
#aloneDisplay .media_browse .operate_more .num {
    font-size: 0.4rem;
    position: absolute;
    left: 0.8rem;
    top: 0.45rem;
}
#aloneDisplay .media_browse .operate_more .back {
    font-size: 0.5rem;
}
#aloneDisplay .media_browse .operate_more .trash {
    font-size: 0.5rem;
    float: right;
}
#aloneDisplay .media_browse .operate {
    position: absolute;
    width: auto;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    z-index: 1025;
}
#aloneDisplay .media_browse div.prev {
    left: 0;
}
#aloneDisplay .media_browse div.next {
    right: 0;
}
#aloneDisplay .media_browse .operate span {
    font-size: 0.5rem;
    padding: 0.3rem;
    color: #fff;
    background-color: #00000050;
}
#aloneDisplay .media_browse {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000000;
    z-index: 1000;
}
#aloneDisplay .media_browse .media_show {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #00000000;
}
#aloneDisplay .media_browse .media_show .video_wrapper,
#aloneDisplay .media_browse .media_show .img_wrapper {
    width: 100%;
    height: 100%;
}
#aloneDisplay .media_browse .media_show a{
    display: block;
    height: 100%;
}
#aloneDisplay .media_browse .media_show>a>div{
    width: 100%;
    height: 100%;
}
#aloneDisplay .media_browse .media_show div .media {
    /* display: none; */
    width: 100%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
#aloneDisplay .media_browse .media_show .media img,
#aloneDisplay .media_browse .media_show .media video {
    width: 100%;
}
</style>
