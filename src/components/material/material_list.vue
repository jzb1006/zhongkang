<template>
    <div id="materialList">
        <top title="素材"></top>
        <div class="material_tab">
            <button-tab>
                <button-tab-item @on-item-click="select_material_type" selected>
                    <i class="zk-icon-all"></i>
                </button-tab-item>
                <button-tab-item @on-item-click="select_material_type">
                    <i class="zk-icon-tupian"></i>
                </button-tab-item>
                <button-tab-item @on-item-click="select_material_type">
                    <i class="zk-icon-icon-test"></i>
                </button-tab-item>
            </button-tab>
        </div>
        <div class="list">
            <div class="material" v-for="material in materiallist" v-if="material.material_type == 'article'" v-show="article_show">
                <router-link :to="{name:'articledetail',query:{healthy_talk_id:material.hid}}">
                    <div class="article clearfix">
                        <div class="img_wrapper">
                            <img :src="material.material_cover" alt="">
                        </div>
                        <p class="content">
                            {{material.title}}
                        </p>
                        <div class="other">
                            <span class="icon zk-icon-icon-1"></span>
                            <span class="author">{{material.author}}</span>
                            <span class="comment">{{material.comments_count}}评论</span>
                        </div>
                    </div>
                </router-link>
            </div>
            <div class="material" v-else-if="material.material_type == 'atlases'" v-show="atlases_show">
                <atlasesdetail :info=material></atlasesdetail>
            </div>
            <div class="material" v-else-if="material.material_type == 'video'" v-show="video_show">
                <div class="RehaList_wrapper">
                    <router-link :to="{name:'videodetail',query:{healthy_talk_id:material.hid}}">
                        <p class="title">
                            {{material.title}}
                            <span class="play">{{material.view_count}}次播放</span>
                        </p>
                        <div class="reha" v-for="(msg,index) in JSON.parse(material.material_content)" v-if="index == 0">
                            <video :src="fileUrl()+msg.url"></video>
                            <span class="time">04:21</span>
                        </div>
                    </router-link>
                    <div class="other">
                        <div class="headimg">
                            <img src="https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=75708ef69425bc31345d07986edf8de7/8694a4c27d1ed21b567175dda06eddc451da3f49.jpg" alt="">
                        </div>
                        <p>
                            <span class="name">{{material.author}}</span>
                            <span class="favor">· · ·</span>
                            <span class="comments zk-icon-edit">{{material.comments_count}}</span>
                            <span class="follow zk-icon-guanzhu">关注</span>
                        </p>
                    </div>
                </div>
            </div>
            <div v-else></div>
        </div>
        <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="getData"></LoadMore>
    </div>
</template>

<script>
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import top from "@/components/decorate/top_back_title.vue";
import atlaseswrapper from "./atlases_wrapper";
import atlasesdetail from "./atlases_detail";
import apiM from "@/api/material/index.js";
import { ButtonTab, ButtonTabItem } from "vux";
import preciew from "@/components/decorate/preciew.vue";
export default {
    data() {
        return {
            video_show: true,
            atlases_show: true,
            article_show: true,
            materiallist: [],
            atlases_content_show: false,
            content_show: 1,
            condition: "",
            imgs: [],
            page: 0,
            isBusy: false,
            hasMore: 0,
            loadinging: true
        };
    },
    components: {
        preciew,
        ButtonTab,
        ButtonTabItem,
        atlaseswrapper,
        top,
        atlasesdetail,
        Loading,
        LoadMore
    },
    methods: {
        fileUrl() {
            return apiM.fileUrl();
        },
        toJson: function(str) {
            let _str = new Function("", "return " + str)();
            return _str;
        },
        show() {
            var t;
            var self = this;
            clearTimeout(t);
            t = setTimeout(function() {
                self.atlases_content_show = true;
            }, 300);
        },
        close() {
            this.atlases_content_show = false;
        },
        reha_comment(url) {
            this.$router.push({ name: "RehaDetail", params: { urls: url } });
        },
        select_material_type(index) {
            this.page = 0;
            this.materiallist = [];
            if (index == 0) {
                this.condition = "";
            } else if (index == 1) {
                this.condition = "atlases";
            } else {
                this.condition = "video";
            }
            this.getData();
        },
        getData() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            apiM
                .act_material("material_list", {
                    condition: this.condition,
                    type: "public",
                    page: self.page
                })
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.materiallist = self.materiallist.concat(
                        res.data.material_list
                    );
                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        this.getData();
    }
};
</script>

<style scoped>
#materialList {
    height: auto !important;
    margin-bottom: 1rem;
}
#materialList .material_tab {
    padding: 0.2rem;
    height: 0.5rem;
}
#materialList .material_tab .vux-button-group {
    width: 3rem;
    float: right;
}
#materialList .list .material {
    box-shadow: 1px 1px 0px #dbd6d6;
    border-bottom: 0.1rem solid #eceaea;
}
#materialList .list .article {
    margin: 0.3rem 0;
}
#materialList .list .article .img_wrapper {
    float: left;
    width: 2.7rem;
    height: 1.7rem;
    overflow: hidden;
}
#materialList .list .article .img_wrapper img {
    width: 100%;
    min-height: 1.7rem;
}

#materialList .list .article .content {
    margin: 0 0.3rem 0 3rem;
    font-size: 0.3rem;
    height: 0.8rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#materialList .list .article .other {
    margin: 0.35rem 0.3rem 0 3rem;
    font-size: 0.25rem;
    line-height: 0.4rem;
    color: #ccc;
}
#materialList .list .article .other span {
    margin-right: 0.2rem;
}
#materialList .list .article .other span.icon {
    color: red;
}
#materialList .list .atlases_wrapper .atlases {
    position: relative;
    text-align: center;
    width: 100%;
    height: 3.15rem;
    overflow: hidden;
    background-color: #fff;
}
#materialList .list .atlases_wrapper .atlases_content {
    position: absolute;
    bottom: 63px;
    /* top: 650px; */
    height: 100px;
    line-height: 20px;
    color: #fff;
    font-size: 0.3rem;
    z-index: 4010;
}
#materialList .list .atlases_wrapper .atlases img {
    width: 100%;
    min-height: 3.15rem;
}
#materialList .list .atlases_wrapper .atlases span {
    position: absolute;
    bottom: 0.2rem;
    right: 0.2rem;
    font-size: 0.25rem;
    padding: 0.1rem 0.2rem;
    color: #fff;
    border: 1px solid #000000bd;
    border-radius: 1rem;
    background-color: #000000bd;
}
#materialList .list .atlases_wrapper p.content {
    font-size: 0.3rem;
    line-height: 0.5rem;
    padding: 0.2rem;
}
#materialList .list .atlases_wrapper p.author {
    font-size: 0.25rem;
    color: #aaa;
    padding: 0 0.2rem 0.2rem 0.2rem;
    box-shadow: 1px 1px 0px #dbd6d6;
}
#materialList .list .atlases_wrapper p.author span.comments {
    margin-left: 0.2rem;
}
#materialList .list .RehaList_wrapper {
    position: relative;
}
#materialList .list .RehaList_wrapper p.title {
    position: absolute;
    top: 0.2rem;
    left: 0.2rem;
    right: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
    color: #fff;
    z-index: 1;
}
#materialList .list .RehaList_wrapper span.play {
    display: block;
    font-size: 0.2rem;
    line-height: 0.4rem;
    color: #fff;
}
#materialList .list .RehaList_wrapper .reha {
    position: relative;
    width: 100%;
    height: 4rem;
    background-color: #00000080;
}
#materialList .list .RehaList_wrapper .reha video {
    width: 100%;
    height: 100%;
}
#materialList .list .RehaList_wrapper .reha span.time {
    position: absolute;
    right: 0.2rem;
    bottom: 0.2rem;
    font-size: 0.2rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background-color: #00000085;
}
#materialList .list .RehaList_wrapper div.other {
    position: relative;
}
#materialList .list .RehaList_wrapper div.other .headimg {
    float: left;
    width: 0.8rem;
    height: 0.8rem;
    border: 2px solid #fff;
    border-radius: 1rem;
    overflow: hidden;
}
#materialList .list .RehaList_wrapper div.other .headimg img {
    max-width: 100%;
    min-height: 100%;
}
#materialList .list .RehaList_wrapper div.other p {
    font-size: 0.3rem;
    margin: 0.1rem 0 0.1rem 0.8rem;
    padding: 0.3rem;
}
#materialList .list .RehaList_wrapper div.other p span.name {
    width: 2rem;
    height: 1em;
    overflow: hidden;
    display: inline-block;
}
#materialList .list .RehaList_wrapper div.other p span.follow,
span.comments,
span.favor {
    font-size: 0.3rem;
    margin: 0 0.3rem;
    float: right;
}
</style>
