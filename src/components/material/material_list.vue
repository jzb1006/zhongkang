<template>
    <div id="materialList">
        <div class="material_tab" v-show="loadmore">
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
            <!-- 文章 -->
            <div v-for="(material,index) in materiallist" :key="index" v-if="has_limit(index)">
                <div class="material" v-if="material.material_type == '1'" v-show="article_show">
                    <router-link :to="{name:'articledetail',query:{healthy_talk_id:material.hid}}">
                        <div class="article clearfix">
                            <div class="img_wrapper">
                                <img :src="material.material_cover" alt="">
                            </div>
                            <p class="content">
                                {{material.title}}
                            </p>
                            <div class="other">
                                <span class="author">{{material.author}}</span>
                                <span class="comment">{{material.comments_count}}评论</span>
                            </div>
                        </div>
                    </router-link>
                </div>
                <!-- 图集 -->
                <div class="material" v-else-if="material.material_type == '3'" v-show="atlases_show">
                    <atlasesdetail :info=material :healthyTalkId=material.hid></atlasesdetail>
                </div>
                <!-- 视频 -->
                <div class="material" v-else-if="material.material_type == '2'" v-show="video_show">
                    <div class="RehaList_wrapper">
                        <router-link :to="{name:'videodetail',query:{healthy_talk_id:material.hid}}">
                            <p class="title">
                                {{material.title}}
                            </p>
                            <div class="reha img_wrapper" v-for="(msg,index) in JSON.parse(material.material_content)" v-if="index == 0">
                                <img v-if="material.material_cover" :src="material.material_cover" alt="">
                                <div v-else>
                                    <video :src="fileUrl()+msg.url" id="player"></video>
                                    <span class="time">{{get_time()}}</span>
                                </div>
                            </div>
                        </router-link>
                        <div class="other">
                            <p>
                                <span class="name">{{material.author}}</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else></div>
            </div>
        </div>
        <Loading v-show="loadinging"></Loading>
        <div v-show="loadmore">
            <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="getData"></LoadMore>
        </div>
    </div>
</template>

<script>
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import top from "@/components/decorate/top_back_title.vue";
import atlasesdetail from "./atlases_detail";
import apiM from "@/api/material/index.js";
import { ButtonTab, ButtonTabItem } from "vux";
import preciew from "@/components/decorate/preciew.vue";
import {mixin} from '@/assets/js/mixins';
export default {
    name:"material_list",
    mixins:[mixin],
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
            loadmore:true,
            loadinging: true,
            healthy_talk_id: ""
        };
    },
    components: {
        preciew,
        ButtonTab,
        ButtonTabItem,
        top,
        atlasesdetail,
        Loading,
        LoadMore
    },
    methods: {
        has_limit(index) {
            if (this.number == "") {
                return true;
            } else {
                this.loadmore = false;
                if (index + 1 <= this.number) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        get_time() {
            var pl = document.getElementById("player");

            return pl.duration;
        },
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
                this.condition = "3";
            } else {
                this.condition = "2";
            }
            this.getData();
        },
        getData() {
            var self = this;
            this.isBusy = true;
            this.healthy_talk_id = this.$route.query.healthy_talk_id;
            self.page = self.page + 1;
            apiM
                .act_material("material_list", {
                    condition: this.condition,
                    type: "public",
                    page: self.page,
                    healthy_talk_id: self.healthy_talk_id
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
<style>
.vux-button-group > a.vux-button-tab-item-last,
.vux-button-group > a.vux-button-group-current,
.vux-button-group > a.vux-button-tab-item-last:after {
    border-radius: 0 !important;
}
</style>

<style scoped>
#materialList {
    height: auto !important;
}
#materialList .material_tab {
    padding: 0.1rem 0.1rem 0.2rem 0.1rem;
    height: 0.5rem;
    position: sticky;
    top: 0rem;
    z-index: 501;
}
#materialList .material_tab .vux-button-group {
    width: 3rem;
    float: right;
}
#materialList .list .material {
    padding: 0.1rem;
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
    margin: 0.5rem 0.3rem 0 3rem;
    font-size: 0.25rem;
    line-height: 0.4rem;
    color: #7d7d7d;
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
    font-size: 0.3rem;
    padding: 0.1rem 0 0.2rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#materialList .list .RehaList_wrapper span.play {
    /* display: block; */
    /* font-size: 0.2rem; */
    /* line-height: 0.4rem; */
    /* color: #fff; */
}
#materialList .list .RehaList_wrapper .img_wrapper {
    position: relative;
    width: 100%;
    height: 4rem;
    text-align: center;
    background-color: #00000080;
}
#materialList .list .RehaList_wrapper .img_wrapper img {
    height: 100%;
}
#materialList .list .RehaList_wrapper .reha {
    position: relative;
    width: 100%;
    height: 3.5rem;
    overflow: hidden;
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
    font-size: 0.25rem;
    /* margin: 0.1rem 0 0.1rem 0.8rem; */
    padding: 0.1rem 0;
    color: #7d7d7d;
}
/* #materialList .list .RehaList_wrapper div.other p span.name {
    width: 2rem;
    height: 1em;
    overflow: hidden;
    display: inline-block;
} */
#materialList .list .RehaList_wrapper div.other p span.follow,
span.comments,
span.favor {
    font-size: 0.3rem;
    margin: 0 0.3rem;
    float: right;
}
</style>
