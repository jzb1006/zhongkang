<template>
    <div id="videoDetail">
        <div v-for="(m,index) in material">
            <top title="视频"></top>
            <div class="reha_wrapper" id="media_wrapper" v-bind:class="{reha_wrapper_fixed1:reha_wrapper_fixed}">
                <div v-for="(msg,index) in JSON.parse(m.material_content)" v-if="index == play_index">
                    <video controls controlsList="nodownload" @ended="videoFinish(JSON.parse(m.material_content).length)" :src="fileUrl()+msg.url"></video>
                </div>
                <div class="other">
                    <div class="headimg">
                        <img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=75708ef69425bc31345d07986edf8de7/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                    </div>
                    <p>
                        <span class="name">{{material.author}}</span>
                        <span class="follow zk-icon-guanzhu">关注</span>
                    </p>
                </div>
            </div>
            <div class="summary">
                <p class="title">{{m.title}}</p>
            </div>
            <div class="other_model">
                <div class="anthology">
                    <p class="sel_nums">
                        <span>选集</span>
                        <span class="more" @click="on_show">共{{JSON.parse(m.material_content).length}}集
                            <i class="more zk-icon-fanhui1" @click="on_show"></i>
                        </span>
                    </p>
                    <p class="sel_num">
                        <span v-for="(msg,index) in JSON.parse(m.material_content)" :class="{active:play_index == index}" @click="changeIndex(index)">{{index+1}}</span>
                    </p>
                    <popup v-model="show" position="bottom" max-height="50%">
                        <div style="padding: 15px;">
                            <x-button @click.native="show = false"> Close Me </x-button>
                        </div>
                        <div class="fenji">
                            <span v-for="(msg,index) in JSON.parse(m.material_content)" :class="{active:play_index == index}" @click="on_hide(index)">{{index+1}}</span>
                        </div>
                    </popup>
                </div>
                <commentList></commentList>
            </div>
        </div>

    </div>
</template>
<script>
import { Popup, Group, Cell, XButton } from "vux";
import { Scroller } from "vux";
import apiM from "@/api/material/index.js";
import top from "@/components/decorate/top_back_title.vue";
import commentList from "@/components/comment/comment_list";
import reward from "@/components/decorate/reward";
export default {
    data() {
        return {
            healthy_talk_id: "",
            material: [],
            play_index: 0,
            show: false,
            reha_wrapper_fixed: false
        };
    },
    components: {
        commentList,
        top,
        Scroller,
        Popup,
        Group,
        Cell,
        XButton,
        reward
    },
    methods: {
        on_show() {
            this.show = true;
        },
        on_hide(index) {
            this.show = false;
            this.changeIndex(index);
        },
        videoFinish(index) {
            if (this.play_index + 1 < index) {
                this.play_index = this.play_index + 1;
            }
        },
        changeIndex(index) {
            this.play_index = index;
        },
        getData() {
            var self = this;
            apiM
                .act_material("material_once", {
                    healthy_talk_id: this.healthy_talk_id
                })
                .then(res => {
                    console.log(res.data);
                    self.material = res.data.material_once;
                });
        },
        fileUrl() {
            return apiM.fileUrl();
        },
        handleScroll() {
            var self = this;
            var navH = document.getElementById("media_wrapper").offsetTop;
            var scroH =
                document.documentElement.scrollTop || document.body.scrollTop;
            if (scroH > navH) {
                self.reha_wrapper_fixed = true;
            } else {
                self.reha_wrapper_fixed = false;
            }
        }
    },
    mounted() {
        this.healthy_talk_id = this.$route.query.healthy_talk_id;
        this.getData();
        // window.addEventListener("scroll", this.handleScroll);
        // document.getElementById(videoDetail).addEventListener("scroll", this.handleScroll);
    }
};
</script>
 <style scoped>
#videoDetail {
    width: 100%;
}
#videoDetail .summary {
    /* margin-top: 5.1rem; */
    border: 0;
    line-height: .5rem;
}
#videoDetail .summary p.title {
    font-size: 0.3rem;
    color: #aaa;
}
#videoDetail .other_model {
    margin-top: 0.3rem 0;
}
#videoDetail .other_model .anthology p {
    font-size: 0.35rem;
    font-weight: 550;
    padding: 0 0.1rem;
}
#videoDetail .other_model .anthology p .more {
    font-size: 0.3rem;
}

#videoDetail .other_model .anthology {
    height: 100px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0.2rem 0.2rem 0 0.2rem;
}
#videoDetail .other_model .anthology p.sel_nums {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
}
#videoDetail .other_model .anthology p.sel_num > span {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.3rem;
    margin: 0.1rem 0.1rem 0.1rem 0;
    /* border: 1px solid #000; */
    cursor: pointer;
    background-color: #f5f5f5;
    color: #333;
}
#videoDetail .other_model .anthology p.sel_num > span.active {
    color: #2692ff;
}
#videoDetail .other_model .anthology .sel_num {
    overflow-y: hidden;
    height: 1.3rem;
}
#videoDetail .other_model .anthology .vux-popup-dialog {
    height: 50% !important;
}
#videoDetail .other_model .anthology .vux-popup-dialog .fenji {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 0.2rem;
    text-align: center;
    padding: 0.3rem;
}
#videoDetail .other_model .anthology .vux-popup-dialog span {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.3rem;
    /* margin: 0.1rem 0.1rem 0.1rem 0; */
    border: 1px solid #000;
    cursor: pointer;
}
#videoDetail .top1 {
    height: 1rem;
}
#videoDetail .top1 .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
}
#videoDetail .reha_wrapper {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 501;
}
#videoDetail .reha_wrapper_fixed1 {
    position: fixed;
    top: 0;
    z-index: 501;
}
#videoDetail .reha_wrapper div:first-child {
    height: 4.16rem;
    background-color: #000000;
}
#videoDetail .reha_wrapper video {
    width: 100%;
    height: 100%;
}
#videoDetail .reha_wrapper .other {
    top: 2rem;
    padding: 0.2rem;
    background-color: #fff;
}
#videoDetail .reha_wrapper .other .headimg {
    float: left;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 1rem;
    overflow: hidden;
}
#videoDetail .reha_wrapper .other .headimg img {
    width: 100%;
    min-height: 100%;
}
#videoDetail .reha_wrapper .other p {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    align-items: center;
    font-size: 0.3rem;
    margin-left: 1rem;
}
#videoDetail .reha_wrapper .other p > span.name {
    margin: 0.27rem 0;
}
#videoDetail .reha_wrapper .other p span.follow {
    display: inline-block;
    margin: 0.16rem 0.2rem 0.16rem 0;
    padding: 0.1rem 0.3rem;
    border: 1px solid #ccc;
}
</style>

