<template>
    <div id="videoDetail">
        <div class="reha_wrapper vux-1px-b" v-for="m in material">
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
        <div class="other_model">
            <div class="anthology" v-for="m in material">
                <p>选集
                    <span class="more zk-icon-fanhui1" @click="on_show"></span><span class="more" @click="on_show">共{{JSON.parse(m.material_content).length}}集</span>
                </p>
                <p class="sel_num">
                    <span v-for="(msg,index) in JSON.parse(m.material_content)" :class="{active:play_index == index}" @click="changeIndex(index)">{{index+1}}</span>
                </p>
                <popup v-model="show" position="bottom" max-height="50%">
                    <div style="padding: 15px;">
                        <x-button @click.native="show = false" plain type="primary"> Close Me </x-button>
                    </div>
                    <group>
                        <span v-for="(msg,index) in JSON.parse(m.material_content)" :class="{active:play_index == index}" @click="on_hide(index)">{{index+1}}</span>
                    </group>
                </popup>
            </div>
            <commentList></commentList>
        </div>
    </div>
</template>
<script>
import { Popup, Group, Cell, XButton } from "vux";
import { Scroller } from "vux";
import apiM from "@/api/material/index.js";
import top from "@/components/decorate/top_back_title.vue";
import commentList from "@/components/comment/comment_list";
export default {
    data() {
        return {
            healthy_talk_id: "",
            material: [],
            play_index: 0,
            show: false
        };
    },
    components: {
        commentList,
        top,
        Scroller,
        Popup,
        Group,
        Cell,
        XButton
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
            console.log("播放完毕");
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
                    self.material = res.data.material_once;
                    console.log(self.material);
                });
        },
        fileUrl() {
            return apiM.fileUrl();
        },
        toJson: function(str) {
            let _str = new Function("", "return " + str)();
            return _str;
        }
    },
    mounted() {
        this.healthy_talk_id = this.$route.query.healthy_talk_id;
        this.getData();
    }
};
</script>
 <style scoped>
.active {
    background-color: #00000050;
}
#videoDetail {
    width: 100%;
}
#videoDetail .other_model {
    margin-top: 6rem;
}
#videoDetail .other_model .anthology p {
    font-size: 0.4rem;
    font-weight: 800;
    padding: 0 0.1rem;
}
#videoDetail .other_model .anthology p .more {
    float: right;
    font-size: .35rem;
}

#videoDetail .other_model .anthology {
    height: 100px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
#videoDetail .other_model .anthology p.sel_num > span {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.3rem;
    margin: 0.1rem 0.1rem 0.1rem 0;
    border: 1px solid #000;
    cursor: pointer;
}
#videoDetail .other_model .anthology .sel_num {
    overflow-y: hidden;
    height: 1.3rem;
}
#videoDetail .other_model .anthology .vux-popup-dialog{
    height: 50%!important;
}
#videoDetail .other_model .anthology .vux-popup-dialog span{
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.3rem;
    margin: 0.1rem 0.1rem 0.1rem 0;
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
    position: fixed;
    top: 1rem;
    left: 0;
    right: 0;
    width: 100%;
    background-color: #000000;
}
#videoDetail .reha_wrapper div:first-child {
    height: 4.16rem;
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
    justify-content: space-between;
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
#commentList {
    /* margin: 5.6rem 0 1.5rem; */
}
</style>

