<template>
    <div id="materialList">
        <div class="list">
            <!-- 文章 -->
            <div v-for="(material,index) in materiallist" :key="index">
                <div class="material vux-1px-b" v-if="material.material_type == '1'" v-show="article_show">
                    <div class="article clearfix">
                        <router-link :to="{name:'container',query:{id:params.article_id,healthy_talk_id:material.hid,comment_form_id:material.hid,uid:material.user_id}}">
                            <div class="img_wrapper">
                                <img :src="fileUrl()+material.material_cover" alt="">
                            </div>
                        </router-link>
                        <p class="content">
                            {{material.title}}
                        </p>
                        <div class="other">
                            <router-link :to="{name:'container',query:getParams(material)}" tag="a">
                                <span class="author">{{material.author}}</span>
                            </router-link>
                            <span class="comment">{{material.comments_count}}评论</span>
                        </div>
                    </div>
                </div>
                <!-- 图集 -->
                <div class="material vux-1px-b" v-else-if="material.material_type == '3'" v-show="atlases_show">
                    <div class="atlases_wrapper">
                        <router-link :to="{name:'container',query:{id:params.atlases_id,healthy_talk_id:material.hid,comment_form_id:material.hid,uid:material.user_id}}">
                            <p class="title">
                                {{material.title}}
                            </p>
                            <div class="atlases img_wrapper" v-for="(msg,index) in JSON.parse(material.material_content)" v-if="index == 0">
                                <img :src="fileUrl()+material.material_cover" alt="">
                            </div>
                        </router-link>
                        <div class="other">
                            <p>
                                <router-link :to="{name:'container',query:getParams(material)}" tag="a">
                                    <span class="name">{{material.author}}</span>
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
                <!-- 视频 -->
                <div class="material vux-1px-b" v-else-if="material.material_type == '2'" v-show="video_show">
                    <div class="RehaList_wrapper">
                        <router-link :to="{name:'container',query:{id:params.video_id,healthy_talk_id:material.hid,comment_form_id:material.hid,uid:material.user_id}}">
                            <p class="title">
                                {{material.title}}
                            </p>
                            <div class="reha img_wrapper" v-for="(msg,index) in JSON.parse(material.material_content)" v-if="index == 0">
                                <img v-if="material.material_cover" :src="fileUrl()+material.material_cover" alt="">
                                <div v-else>
                                    <video :src="fileUrl()+msg.url" id="player"></video>
                                    <!-- <span class="time">{{get_time()}}</span> -->
                                </div>
                            </div>
                        </router-link>
                        <div class="other">
                            <p>
                                <router-link :to="{name:'container',query:getParams(material)}" tag="a">
                                    <span class="name">{{material.author}}</span>
                                </router-link>
                            </p>
                        </div>
                    </div>
                </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>

<script>
import apiM from "@/api/material/index.js";
import top from "@/components/decorate/top_back_title.vue";
import atlasesdetail from "@/components/material/atlases_detail";
import preciew from "@/components/decorate/preciew.vue";
import { mixin } from "@/assets/js/mixins";
export default {
    props: {
        materiallist: {
            default: function() {
                return [];
            }
        }
    },
    name: "material_list",
    mixins: [mixin],
    data() {
        return {
            video_show: true,
            atlases_show: true,
            article_show: true,
            atlases_content_show: false,
            content_show: 1,
            imgs: [],
            page: 0,
            loadmore: true,
            healthy_talk_id: ""
        };
    },
    components: {
        preciew,
        top,
        atlasesdetail
    },
    methods: {
        //获取医生或机构的链接参数
        getParams(data){
            let doc_ins = {};
            if(data.doc_id){
                doc_ins = {
                    id:this.params.doc_id,
                    doc_id:data.doc_id,
                    ins_id:data.ins_id
                }
            }else{
                doc_ins = {
                    id:this.params.ins_id,
                    ins_id:data.ins_id
                }
            }
            return doc_ins;
        },
        get_time() {
            var pl = document.getElementById("player");
            return '4:00';
        },
        fileUrl() {
            return apiM.fileUrl();
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
        }
    },
    mounted() {}
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
    margin: 0.1rem 0.2rem 0;
    padding: 0.1rem 0 0.2rem 0;
}
#materialList .list .material .atlases_wrapper p.title {
    font-size: 0.3rem;
    margin-bottom: .1rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#materialList .list .material .atlases_wrapper .img_wrapper {
    display: flex;
    position: relative;
    height: 3.5rem;
    text-align: center;
    background-color: #00000080;
    align-items: center;
}
#materialList .list .material .atlases_wrapper div.other p {
    font-size: 0.25rem;
    padding: 0.1rem 0;
    color: #7d7d7d;
}
#materialList .list .article .img_wrapper {
    display: flex;
    align-items: center;
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
    margin-bottom: .1rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#materialList .list .RehaList_wrapper .img_wrapper {
    display:flex;
    align-items:center;
    width: 100%;
    height: 4rem;
    text-align: center;
    background-color: #00000080;
}
#materialList .list .RehaList_wrapper .img_wrapper img {
    width: 100%;
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
#materialList .list .RehaList_wrapper div.other p {
    font-size: 0.25rem;
    padding: 0.1rem 0;
    color: #7d7d7d;
}
</style>
