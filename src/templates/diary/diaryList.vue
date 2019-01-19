<template>
    <div id="diaryList"> 
        <div class="diary vux-1px-b" v-for="(diary,index) in diaryList" :key=index>
            <div class="top">
                <router-link :to="{name:'container',query:{id:params.diary_page,bid:diary.bid}}">
                    <div class="headImg">
                        <img v-if="diary.headimgurl" :src="getImgUrl()+diary.headimgurl" alt="" />
                    </div>
                </router-link>
                <span class="user_name">{{diary.nickname?diary.nickname:""}}</span>
                <p class="content">{{diary.content}}</p>
            </div>
            <router-link :to="{name:'container',query:{id:params.diary_page,bid:diary.bid}}" tag="div">
                <div class="middle clearfix">
                    <div class="avg" v-if="diary.type == '1'">
                        <div class="one_img" v-if="diary.img1.length == 0">
                            <img v-lazy="getImgUrl()+getMediaImg(diary.origin_urls)">
                        </div>
                        <div class="lr_avg" v-else>
                            <div class="b_left contrast_img">
                                <img v-lazy="getImgUrl()+diary.img1">
                                <span class="img_tip before">Before</span>
                            </div>
                            <div class="a_right contrast_img">
                                <img v-lazy="getImgUrl()+getMediaImg(diary.origin_urls)">
                                <span class="img_tip">After</span>
                            </div>
                        </div>
                    </div>
                    <div class="show_video" v-else-if="diary.type == '2'">
                        <video controls controlsList="nodownload" :src="getImgUrl()+diary.origin_urls"></video>
                    </div>
                    <div v-else>
                    </div>
                </div>
            </router-link>
            <div class="bottom">
                <!-- <p class="item">
                    <span v-for="(num,index) in getcates(diary.goods_cate_ids)" :key="index">
                           <i v-if="num in cateList">{{cateList[num].cat_name}}</i>
                    </span>
                </p> -->
                <e-meta @click_comment=click_comment(parseInt(diary.bid),diary.did,diary.user_id) :info="format_info(diary,diary.course_time,diary.view_count,diary.favor,0)"></e-meta>
            </div>
        </div>
        <div class="write_diary" v-if="parseInt(is_more)">
            <span class="zk-icon-edit" @click="checkLogin({id:16})"></span>
        </div>
        <diaryBackdropList v-if="show_backdrop_list" @close=close></diaryBackdropList>
    </div>
</template>
<script>
import Vue from "vue";
import api from "@/api/diary";
import apiCom from "@/api/common";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { login_mixin } from "@/assets/js/mixins.js";
export default {
    props: {
        params: {
            default: function() {
                return {};
            }
        },
        diaryListInfo: {
            default: function() {
                return {};
            }
        }
    },
    mixins: [login_mixin],
    name: "diaryList",
    data() {
        return {
            is_more: this.params["is_more"] || 1,
            show_backdrop_list: false,
            backdropList: [],
            user_info: [],
            mediaList: [],
            diaryList: [],
            // cateList: []
        };
    },
    watch: {
        diaryListInfo(val, oldVal) {
            this.diaryList = val.diaryList;
            // this.cateList = val.cateList;
        }
    },
    methods: {
        getcates(data){
            if(data){
                return data.split(";");
            }
            return false;
        },
        click_comment(bid, did, uid) {
            let data = {
                id: "8",
                bid: bid,
                did: did,
                comment_form_id: did,
                uid: uid
            };
            this.$router.push({ name: "container", query: data });
        },
        checkLogin(index) {
            var self = this;
            this.checked_login().then(function(data) {
                self.$router.push({ name: "container", query: index });
            }).catch(err => {});
        },
        close() {
            this.show_backdrop_list = false;
        },
        to_diaryBackdropList() {
            this.show_backdrop_list = true;
        },
        has_limit() {
            if (this.params.number) {
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
                : num > 10000
                    ? Math.floor(num / 10000) + "万"
                    : num;
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
            if (this.params.number) {
                this.$emit("changeLoadmore");
                if (index < this.params.number) {
                    return true;
                }
                return false;
            }
            return true;
        }
    }
};
</script>
<style scoped>
#diaryList .write_diary {
    position: fixed;
    font-size: 0.4rem;
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
    border-radius: 0.3rem;
}
#diaryList .write_diary span {
    font-size: 0.4rem;
    color: #fff;
}
#diaryList .diary {
    padding: 0.2rem 0;
    margin: 0 0.2rem;
}
#diaryList .diary .top {
    position: relative;
}
#diaryList .diary .top p.content {
    margin-left: 1rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    max-height: .8rem;
    color: #643232;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
#diaryList .diary .top .headImg {
    width: 0.7rem;
    height: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgb(255, 83, 112);
}
#diaryList .diary .top .headImg img {
    max-width: 100%;
    min-height: 100%;
}
#diaryList .diary .top .user_name {
    position: absolute;
    left: 1rem;
    top: 0.1rem;
    width: 3rem;
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.3rem;
    overflow: hidden;
}
#diaryList .diary .top .time {
    position: absolute;
    left: 1rem;
    top: 0.4rem;
    font-size: 0.25rem;
    color: #ccc;
}
#diaryList .diary .middle {
    margin:.2rem .5rem 0 1rem;
}
#diaryList .diary .middle .avg .one_img {
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diaryList .diary .middle .avg .one_img img {
    width: 100%;
}
#diaryList .diary .middle .avg .lr_avg {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.1rem;
}
#diaryList .diary .middle .avg .no_back {
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diaryList .diary .middle .avg .no_back img {
    width: 100%;
}
#diaryList .diary .middle .avg .contrast_img {
    position: relative;
    width: 100%;
    height: 3rem;
    border-top-right-radius: 0.1rem;
    border-top-left-radius: 0.1rem;
    overflow: hidden;
    display: flex;
    display: -webkit-flex;
    align-items: center;
}
#diaryList .diary .middle .show_video {
    text-align: center;
    width: 100%;
    height: 3.5rem;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    overflow: hidden;
}
#diaryList .diary .middle .show_video video {
    width: 100%; /* max-height: 4.5rem; */
}
#diaryList .diary .middle .avg .contrast_img .img_tip {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.2rem;
    color: #fff;
    padding: 0.1rem;
    border-top-right-radius: 0.1rem;
    background-color: rgba(255, 83, 112, 0.7);
}
#diaryList .diary .middle .avg .contrast_img .before {
    background-color: rgba(0, 0, 0, 0.7);
}
#diaryList .diary .middle .avg .contrast_img img {
    width: 100%;
    min-height: 100%;
}
#diaryList .diary .bottom {
    margin-left: 1rem;
}
#diaryList .diary .bottom p.item {
    padding: 0.2rem 0;
    font-size: 0.25rem;
    color: rgb(255, 83, 112);
}
#diaryList .diary .bottom p.item span {
    display: inline-block;
    margin-right: 0.2rem;
}
#diaryList .diary .bottom .other {
    display: grid;
    grid-template-columns: 28% 24% 24% 24%;
    font-size: 0.27rem;
    color: #524c4c;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
}
#diaryList .diary .bottom .other span {
    vertical-align: middle;
}
#diaryList .diary .bottom .other span i {
    color: #ccc;
}
</style>


