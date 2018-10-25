<template>
    <div id="diary_list">
        <div class="diary_third" v-for="(backdrop,index) in backdropList" v-if="checkOnce(index)">
            <div class="top">
                <div class="headImg">
                    <img v-if="handbookList[backdrop.id].headimgurl" :src="getImgUrl()+handbookList[backdrop.id].headimgurl" alt="" />
                </div>
                <span class="user_name" v-if="handbookList[backdrop.id].nickname">{{handbookList[backdrop.id].nickname}}</span>
                <span class="user_name" v-else>{{handbookList[backdrop.id].user_name}}</span>
                <span class="time">{{diaryList[backdrop.id].course_time.split(" ")[0]}}</span>
            </div>
            <router-link :to="{name:'diaryBackdrop',query:{bid:backdrop.id}}" tag="div" class="vux-1px-b">
                <div class="middle clearfix">
                    <div class="avg" v-if="mediaList[diaryList[backdrop.id].id].type == '1'">
                        <div v-if="backdrop.img1.length == 0" class="alone_img">
                            <div class="no_back">
                                <img v-lazy="getImgUrl()+getMediaImg(mediaList[diaryList[backdrop.id].id].origin_urls)">
                            </div>
                        </div>
                        <div v-else class="lr_avg">
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
                        <video controls :src="getImgUrl()+mediaList[diaryList[backdrop.id].id].origin_urls"></video>
                    </div>
                    <div v-else>

                    </div>

                </div>
            </router-link>
            <div class="bottom">
                <p class="content">{{diaryList[backdrop.id].content}}</p>
                <p class="item">
                    <span v-for="memu in memuList[backdrop.id]">#{{memu.cat_name}}</span>
                </p>
                <div class="other clearfix">
                    <div class="other_see">
                        <span>
                            <i class="zk-icon-liulan"></i> {{transform_num(diaryList[backdrop.id].view_count)}}</span>
                    </div>
                    <div class="other_see">
                        <span @click="favor(diaryList[backdrop.id].id)">
                            <i class="zk-icon-dianzan"></i> {{transform_num(diaryList[backdrop.id].favor)}}</span>
                    </div>
                    <div class="other_see">
                        <span>
                            <i class="zk-icon-edit"></i> {{transform_num(handbookList[backdrop.id].total_comment)}}</span>
                    </div>
                </div>
            </div>

        </div>
        <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_get_diary"></LoadMore>
    </div>
</template>
<script>
import Vue from "vue";
import api from "@/api/diary";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";

export default {
    props: ["insId", "once", "docId", "cid", "query"],
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
            loadinging: true
        };
    },
    components: {
        LoadMore,
        Loading
    },
    methods: {
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
                    console.log(res);
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
        checkOnce(index) {
            if (this.once) {
                if (index < this.once) {
                    return true;
                }
                return false;
            }
            return true;
        },
        favor(did) {
            api.ajaxSubmit("add_favor", { did: did }).then(res => {
                alert(res.data.message);
            });
        }
    },
    mounted() {
        this.$_get_diary();
    }
};
</script>
<style>
p.top {
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
}
video::-webkit-media-controls-enclosure {
    overflow: hidden;
}
video::-webkit-media-controls-panel {
    width: calc(100% + 30px);
}
</style>

<style scoped>
#diary_list {
    margin-top: 0.5rem;
}
#diary_list .diary_third {
    padding: 0.2rem;
}
#diary_list .diary_third .top {
    position: relative;
}
#diary_list .diary_third .top .headImg {
    width: 0.7rem;
    height: 0.7rem;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgb(255, 83, 112);
}
#diary_list .diary_third .top .headImg img {
    max-width: 100%;
    min-height: 100%;
}
#diary_list .diary_third .top .user_name {
    position: absolute;
    left: 1rem;
    top: 0.05rem;
    width: 3rem;
    font-size: 0.3rem;
    overflow: hidden;
}
#diary_list .diary_third .top .time {
    position: absolute;
    left: 1rem;
    top: 0.4rem;
    font-size: 0.25rem;
    color: #ccc;
}

#diary_list .diary_third .middle {
    margin-top: 0.2rem;
}

#diary_list .diary_third .middle .avg {
}
#diary_list .diary_third .middle .avg .lr_avg {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.1rem;
}
#diary_list .diary_third .middle .avg .no_back {
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diary_list .diary_third .middle .avg .no_back img {
    width: 100%;
}
#diary_list .diary_third .middle .avg .contrast_img {
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
#diary_list .diary_third .middle .show_video {
    text-align: center;
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diary_list .diary_third .middle .show_video video {
    width: 100%;
    /* max-height: 4.5rem; */
}
#diary_list .diary_third .middle .avg .contrast_img .img_tip {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.2rem;
    color: #fff;
    padding: 0.1rem;
    border-top-right-radius: 0.1rem;
    background-color: rgba(255, 83, 112, 0.7);
}
#diary_list .diary_third .middle .avg .contrast_img .before {
    background-color: rgba(0, 0, 0, 0.7);
}
#diary_list .diary_third .middle .avg .contrast_img img {
    width: 100%;
    min-height: 100%;
}
#diary_list .diary_third .bottom p.content {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #643232;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 0.2rem 0;
}
#diary_list .diary_third .bottom p.item {
    padding-bottom: 0.3rem;
    font-size: 0.25rem;
    color: rgb(255, 83, 112);
}
#diary_list .diary_third .bottom p.item span {
    display: inline-block;
    margin-right: 0.2rem;
}
#diary_list .diary_third .bottom .other {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.2rem;
    font-size: 0.3rem;
    text-align: center;
    color: #524c4c;
}
#diary_list .diary_third .bottom .other span {
    vertical-align: middle;
}
#diary_list .diary_third .bottom .other span i {
    color: #ccc;
}
</style>


