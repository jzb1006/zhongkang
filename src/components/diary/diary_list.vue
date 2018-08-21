<template>
    <div id="diary_list">
        <searchBar :title="'众康医疗'" :iconShow="true"></searchBar>
        <DiaryHead></DiaryHead>
        <div class="diary_third" v-for="backdrop in backdropList">
            <div class="top">
                <div class="headImg">
                    <img src="1.jpg" alt="" />
                </div>
                <span class="user_name">{{handbookList[backdrop.id].user_name}}</span>
                <span class="time">{{diaryList[backdrop.id].course_time}}</span>
            </div>
            <div class="middle clearfix">
                <router-link :to="{name:'diaryBackdrop',query:{bid:backdrop.id}}" tag="a">
                    <div class="avg" v-if="mediaList[diaryList[backdrop.id].id].type == '1'">
                        <div class="b_left contrast_img">
                            <img v-lazy="getImgUrl()+backdrop.img1">
                            <span class="img_tip">Before</span>
                        </div>
                        <div class="a_right contrast_img">
                            <img v-lazy="getImgUrl()+getMediaImg(mediaList[diaryList[backdrop.id].id].origin_urls)">
                            <span class="img_tip">After</span>
                        </div>
                    </div>
                    <div class="show_video" v-else-if="mediaList[diaryList[backdrop.id].id].type == '2'">
                        <video controls :src="getImgUrl()+mediaList[diaryList[backdrop.id].id].origin_urls"></video>
                    </div>
                    <div v-else>

                    </div>
                </router-link>
            </div>
            <div class="bottom">
                <p class="item">
                    <span v-for="memu in memuList[backdrop.id]">{{memu.cat_name}}</span>
                </p>
                <div class="other clearfix">
                    <div class="other_see">
                        <span>浏览-{{diaryList[backdrop.id].view_count}}</span>
                    </div>
                    <div class="other_see">
                        <span>点赞-{{diaryList[backdrop.id].favor}}</span>
                    </div>
                    <div class="other_see">
                        <span>品论-{{handbookList[backdrop.id].total_comment}}</span>
                    </div>
                </div>
            </div>
            <hr/>
        </div>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_get_diary"></LoadMore>

    </div>
</template>
<script>
import Vue from "vue";
import DiaryHead from "./diary_head";
import api from "@/api/diary";
import Loading from "@/widget/loading";
import LoadMore from '@/components/loadMore/index.vue'
import searchBar from '@/components/home/search_bar.vue'

export default {
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
            isBusy:false,
            hasMore:0,
        };
    },
    components: {
        DiaryHead,
        LoadMore,
        searchBar
    },
    methods: {
        $_get_diary: function() {
            
            var self = this;
            self.page = self.page + 1;
            let arr = {
                page: self.page,
                pageList: 3,
                pd: this.pd
            };

            api.ajaxSearch("diary_index", arr).then(res => {
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
                self.diaryList = Object.assign(self.diaryList, res.data.diary);
                self.memuList = Object.assign(self.memuList, res.data.memu);
                self.backdropList = self.backdropList.concat(res.data.backdrop);

                Loading.stop();
            }).catch(err=>{
                Loading.stop();
            });
        },
        getImgUrl() {
            return api.imgUrl();
        },
        getMediaImg(data) {
            let arr = data.split(",");
            return arr[0];
        },
        get() {
            console.log(123);
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
        }
    },
    mounted() {
        Loading.run();
        this.$_get_diary();

        // var self = this;
        // let sw = true;
        // window.addEventListener("scroll", function() {
        //     if (
        //         self.getScrollTop() + window.innerHeight >=
        //         document.body.offsetHeight
        //     ) {
        //         self.page++;
        //         if (sw) {
        //             sw = false;
        //             let arr = {
        //                 page: self.page,
        //                 pageList: 3,
        //                 pd: this.pd
        //             };
        //             api.ajaxSearch("diary_index", arr).then(res => {
        //                 if (res.data.backdrop.length > 0) {
        //                     self.handbookList = Object.assign(
        //                         self.handbookList,
        //                         res.data.handbook
        //                     );
        //                     self.mediaList = Object.assign(
        //                         self.mediaList,
        //                         res.data.media_diary
        //                     );
        //                     self.diaryList = Object.assign(
        //                         self.diaryList,
        //                         res.data.diary
        //                     );
        //                     self.memuList = Object.assign(
        //                         self.memuList,
        //                         res.data.memu
        //                     );
        //                     self.backdropList = self.backdropList.concat(
        //                         res.data.backdrop
        //                     );
        //                 } else {
        //                     self.page--;
        //                 }
        //                 sw = true;
        //             });
        //         }
        //     }
        // });
    },
    created() {}
};
</script>
<style scoped>
#diary_list {
    /*padding: 0 15px;*/
}
#diary_list .diary_third{
    padding: 0 .2rem;
}
#diary_list .diary_third .top {
    position: relative;
}
#diary_list .diary_third .top .headImg {
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    border-radius: 50%;
    background-color: rgb(255, 83, 112);;
}
#diary_list .diary_third .top .headImg img {
    max-width: 100%;
    min-height: 100%;
}
#diary_list .diary_third .top .user_name {
    position: absolute;
    left: 1.4rem;
    top: 0.1rem;
    font-size: 0.4rem;
}
#diary_list .diary_third .top .time {
    position: absolute;
    left: 1.4rem;
    top: 0.7rem;
    font-size: 0.3rem;
    color: #ccc;
}

#diary_list .diary_third .middle {
    margin-top: 0.2rem;
}

#diary_list .diary_third .middle .avg {
}

#diary_list .diary_third .middle .avg .contrast_img {
    position: relative;
    width: 49%;
    height: 5rem;
    border-top-right-radius: 0.3rem;
    border-top-left-radius: 0.3rem;
    overflow: hidden;
}
#diary_list .diary_third .middle .avg .b_left {
    float: left;
}
#diary_list .diary_third .middle .avg .a_right {
    float: right;
}
#diary_list .diary_third .middle .show_video{
    width: 100%;
}
#diary_list .diary_third .middle .show_video video{
    width: 100%;
}
#diary_list .diary_third .middle .avg .contrast_img .img_tip {
    position: absolute;
    left: 0;
    bottom: 0;
    font-size: 0.4rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border: 1px solid #000;
    background-color: rgba(255, 83, 112,.7);
}
#diary_list .diary_third .middle .avg .contrast_img img {
    width: 100%;
    min-height: 100%;
}
#diary_list .diary_third .bottom p.item{
    padding-bottom: .5rem;
}
#diary_list .diary_third .bottom p.item span {
    display: inline-block;
    font-size: 0.3rem;
    margin-right: 0.1rem;
    padding: 0.1rem 0.2rem;
    border: 1px solid rgb(255, 83, 112);;
}
#diary_list .diary_third .bottom .other .other_see {
    width: 33.3%;
    float: left;
    color: #ff5370;
    font-size: 0.35rem;
    text-align: center;
}
</style>


