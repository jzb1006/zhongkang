<template>
    <div id="diary_list">
        <div class="diary" v-for="(backdrop,index) in backdropList" v-if="checknumber(index)">
            <div class="top">
                <router-link :to="{name:'container',query:{id:params.user_page,bid:backdrop.id}}">
                <div class="headImg">
                    <img v-if="handbookList[backdrop.id].headimgurl" :src="getImgUrl()+handbookList[backdrop.id].headimgurl" alt="" />
                </div>
                </router-link>
                <span class="user_name">{{handbookList[backdrop.id].nickname?handbookList[backdrop.id].nickname:""}}</span>
                <p class="content">{{diaryList[backdrop.id].content}}{{number}}</p>
            </div>
            <!-- <router-link :to="{name:'diaryBackdrop',query:{bid:backdrop.id}}" tag="a"> -->
                <router-link :to="{name:'container',query:{id:params.diary_page,bid:backdrop.id}}" tag="div">
                <div class="middle clearfix">
                    <div class="avg" v-if="mediaList[diaryList[backdrop.id].id].type == '1'">
                        <div class="one_img" v-if="backdrop.img1.length == 0">
                            <img v-lazy="getImgUrl()+getMediaImg(mediaList[diaryList[backdrop.id].id].origin_urls)">
                        </div>
                        <div class="lr_avg" v-else>
                            <div class="b_left contrast_img">
                                <img v-lazy="getImgUrl()+backdrop.img1">
                                <span class="img_tip before">Before</span>
                            </div>
                            <div class="a_right contrast_img">
                                <img v-lazy="getImgUrl()+getMediaImg(mediaList[diaryList[backdrop.id].id].origin_urls)">
                                <span class="img_tip">After</span>
                            </div>
                        </div>
                    </div>
                    <div class="show_video" v-else-if="mediaList[diaryList[backdrop.id].id].type == '2'">
                        <video controls controlsList="nodownload" :src="getImgUrl()+mediaList[diaryList[backdrop.id].id].origin_urls"></video>
                    </div>
                    <div v-else>

                    </div>
                </div>
            </router-link>
            <div class="bottom">
                <p class="item">
                    <span v-for="memu in memuList[backdrop.id]">#{{memu.cat_name}}</span>
                </p>
                <e-meta :info="format_info(diaryList[backdrop.id],diaryList[backdrop.id].course_time,diaryList[backdrop.id].view_count,diaryList[backdrop.id].favor,handbookList[backdrop.id].total_comment)"></e-meta>
            </div>
        </div>
        <div class="write_diary" v-show="has_limit()">
            <router-link :to="{name:'diaryBackdropList'}">
                <span class="zk-icon-edit"></span>
            </router-link>
        </div>
        <Loading v-show="loadinging"></Loading>
        <div v-show="loadmore">
            <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_get_diary"></LoadMore>
        </div>

    </div>
</template>
<script>
import Vue from "vue";
import api from "@/api/diary";
import apiCom from "@/api/common";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins";

export default {
    mixins: [mixin],
    props: ["insId", "docId", "cid", "query"],
    name: "diary_list",
    data() {
        return {
            backdropList: [],
            handbookList: [],
            mediaList: [],
            diaryList: [],
            memuList: [],
            pd: "",
            page: 0,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true
        };
    },
    components: {
        LoadMore,
        Loading
    },
    methods: {
        has_limit() {
            if (this.number) {
                return false;
            }
            return true;
        },
        format_info(item, time, browses, likes, comments) {
            let data = {
                date: time,
                browses: browses,
                likes: likes,
                comments: comments,
                item: { table: "recovery_diary", id: item.id }
            };
            return data;
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        $_get_diary: function() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            let arr = {
                page: self.page,
                pageList: 3,
                pd: this.pd,
                doctor_id: self.docId,
                institution_id: self.insId,
                cid: self.cid,
                query: this.query
            };

            api
                .ajaxSearch("diary_index", arr)
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.handbookList = Object.assign(
                        self.handbookList,
                        res.data.handbook
                    );
                    self.mediaList = Object.assign(
                        self.mediaList,
                        res.data.media_diary
                    );
                    self.diaryList = Object.assign(
                        self.diaryList,
                        res.data.diary
                    );
                    self.memuList = Object.assign(self.memuList, res.data.memu);
                    self.backdropList = self.backdropList.concat(
                        res.data.backdrop
                    );
                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        },
        getImgUrl() {
            return api.imgUrl();
        },
        getMediaImg(data) {
            let arr = data.split(",");
            return arr[0];
        },
        getScrollTop: function() {
            var scrollTop = 0;
            if (
                document.documentElement &&
                document.documentElement.scrollTop
            ) {
                scrollTop = document.documentElement.scrollTop;
            } else if (document.body) {
                scrollTop = document.body.scrollTop;
            }
            return scrollTop;
        },
        checknumber(index) {
            if (this.number) {
                this.loadmore = false;
                if (index < this.number) {
                    return true;
                }
                return false;
            }
            return true;
        }
    },
    mounted() {
        this.$_get_diary();
    }
};
</script>
<style>
/* #diary_list p.top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: 0.35rem;
    text-align: center;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #ccc;
    background-color: rgb(255, 83, 112);
    z-index: 999;
} */
</style>

<style scoped>
#diary_list {
    /* margin-top: 0.5rem; */
}
#diary_list .write_diary {
    position: fixed;
    font-size: 0.6rem;
    background: -webkit-linear-gradient(
        180deg,
        #fff,
        #f500ff
    ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(
        180deg,
        #fff,
        #f500ff
    ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(
        180deg,
        #fff,
        #f500ff
    ); /* Firefox 3.6 - 15 */
    background: linear-gradient(180deg, #fff, #f500ff);
    /* 标准的语法（必须放在最后） */
    bottom: 2rem;
    right: 0.2rem;
    padding: 0.2rem;
    border-radius: 1rem;
}
#diary_list .write_diary span {
    font-size: 0.6rem;
    color: #fff;
}
#diary_list .diary {
    padding: 0.2rem;
    border-bottom: 1px solid #f3f3f3;
}
#diary_list .diary .top {
    position: relative;
}
#diary_list .diary .top p.content {
    margin-left: 1rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #643232;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#diary_list .diary .top .headImg {
    width: 0.7rem;
    height: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgb(255, 83, 112);
}
#diary_list .diary .top .headImg img {
    max-width: 100%;
    min-height: 100%;
}
#diary_list .diary .top .user_name {
    position: absolute;
    left: 1rem;
    top: 0.1rem;
    width: 3rem;
    font-size: 0.3rem;
    overflow: hidden;
}
#diary_list .diary .top .time {
    position: absolute;
    left: 1rem;
    top: 0.4rem;
    font-size: 0.25rem;
    color: #ccc;
}
#diary_list .diary .middle {
    margin-left: 1rem;
    margin-top: 0.2rem;
}
#diary_list .diary .middle .avg .one_img {
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diary_list .diary .middle .avg .one_img img {
    width: 100%;
}
#diary_list .diary .middle .avg .lr_avg {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.1rem;
}
#diary_list .diary .middle .avg .no_back {
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diary_list .diary .middle .avg .no_back img {
    width: 100%;
}
#diary_list .diary .middle .avg .contrast_img {
    position: relative;
    width: 100%;
    height: 3.5rem;
    border-top-right-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
#diary_list .diary .middle .show_video {
    text-align: center;
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diary_list .diary .middle .show_video video {
    width: 100%;
    /* max-height: 4.5rem; */
}
#diary_list .diary .middle .avg .contrast_img .img_tip {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.2rem;
    color: #fff;
    padding: 0.1rem;
    border-top-right-radius: 0.1rem;
    background-color: rgba(255, 83, 112, 0.7);
}
#diary_list .diary .middle .avg .contrast_img .before {
    background-color: rgba(0, 0, 0, 0.7);
}
#diary_list .diary .middle .avg .contrast_img img {
    width: 100%;
    min-height: 100%;
}
#diary_list .diary .bottom {
    margin-left: 1rem;
}
#diary_list .diary .bottom p.item {
    padding: 0.2rem 0;
    font-size: 0.25rem;
    color: rgb(255, 83, 112);
}
#diary_list .diary .bottom p.item span {
    display: inline-block;
    margin-right: 0.2rem;
}
#diary_list .diary .bottom .other {
    display: grid;
    grid-template-columns: 28% 24% 24% 24%;
    font-size: 0.27rem;
    color: #524c4c;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
}
#diary_list .diary .bottom .other span {
    vertical-align: middle;
}
#diary_list .diary .bottom .other span i {
    color: #ccc;
}
</style>


