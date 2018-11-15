<template>
    <div id="backdrop_content">
        <p class="btop">
            <span>变美过程</span>
            <span class="see_v" @click="seeOnlyVideo">{{videoMessage}}</span>
        </p>
        <div class="list">
            <div class="list_content" v-for="(diary,index) in diaryList" :class="{hiddenNow:mediaList[diary.id].type == hiddenNum}">
                <div class="check_status" v-if="s_uid == p_uid">
                    <div v-if="diary.check_status == '0'">
                        <img src="./../../../static/images/no.png" alt="" />
                    </div>

                    <div v-else-if="diary.check_status === '1'">
                        <img src="./../../../static/images/pass.png" alt="" />
                    </div>

                    <div v-else="diary.check_status == '2'">
                        <img src="./../../../static/images/nopass.png" alt="" />
                        <p v-model="show" @click="showModule(diary.reject_cause)">点击查看详情</p>

                        <p></p>
                    </div>
                </div>
                <p class="time">
                    <i class="zk-icon-shijian"></i> {{diary.course_time.split(" ")[0]}}
                    <em>第{{transform_num(diaryNum - index)}}篇日记</em>
                </p>
                <div class="timeLine">
                    <!-- <router-link :to="{name:'container',query:{id:setId.id,bid:bid,did:diary.id}}" tag="div"> -->
                    <router-link :to="{name:'diaryDetail',query:{bid:bid,did:diary.id}}" tag="a">   
                        <p class="title">{{memu}}
                            <span class="time">第{{getDays(backdropList.time,diary.course_time)}}天</span>
                        </p>
                        <p class="content">{{diary.content}}</p>
                        <ul :class="'pic pic-'+getMediaNum(mediaList[diary.id].origin_urls)" v-if="mediaList[diary.id].type == '1'">
                            <li v-for="media in getMediaUrl(mediaList[diary.id].origin_urls)">
                                <img v-lazy="getImgUrl()+media" alt="">
                            </li>
                        </ul>
                        <ul class="video-1" v-else-if="mediaList[diary.id].type == '2'">
                            <li>
                                <video controls controlsList="nodownload" :src="getImgUrl()+mediaList[diary.id].origin_urls"></video>
                            </li>
                        </ul>
                        <p v-else>媒体类型错误！！！无法显示</p>
                    </router-link>
                    <e-meta :info="format_info(diary,diary.view_count,diary.favor)"></e-meta>
                    <div v-if="s_uid == p_uid" class="operate_list">
                        <div class="operate_btn" @click="update_diary(diary.id)">
                            <i class="zk-icon-xiugai"></i>
                        </div>
                        <div class="operate_btn" @click="delDiary(diary.id,index)">
                            <i class="zk-icon-icon "></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_getBackdrop"></LoadMore>
        <p class="write_diary" v-if="s_uid == p_uid" @click="create_diary()">继续写日记</p>
    </div>
</template>
<script>
import api from "@/api/diary";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { Alert, AlertModule } from "vux";
export default {
    name:"diary_backdrop_content",
    props:{
        b_id:{
            default:"",
        },
        setId:{
            default:function(){
                return {}
            }
        }
    },
    data() {
        return {
            bid:this.b_id,
            diaryList: [],
            mediaList: [],
            diaryNum: 0,
            backdropList: [],
            memu: "",
            s_uid: 0,
            p_uid: 0,
            onlyVideo: true,
            page: 0,
            isBusy: false,
            hasMore: 0,
            hiddenNum: 0,
            videoMessage: "只看视频",
            loadinging: true,
            show: false
        };
    },
    components: {
        LoadMore,
        Loading,
        Alert,
    },
    methods: {
        format_info(item, browses, likes) {
            let data = {
                browses: browses,
                likes: likes,
                item: { table: "recovery_diary", id: item.id }
            };
            return data;
        },
        update_diary(did) {
            this.$store.dispatch("Save_Diary_Operate", "ud");
            this.$store.dispatch("Save_Aesthetic_Status", false);
            this.$router.push({
                name: "diaryOperate",
                query: { operate:'ud',did: did }
            });
        },
        create_diary() {
            this.$store.dispatch("Save_Diary_Operate", "cd");
            this.$store.dispatch("Save_Aesthetic_Status", false);
            this.$router.push({
                name: "diaryOperate",
                query: { operate:"cd", bid: this.bid }
            });
        },
        delDiary(did, index) {
            api.ajaxSubmit("delDiary", { did: did }).then(res => {
                if (res.data.error == 0) {
                    alert(res.data.message);
                    this.diaryList.splice(index, 1);
                } else {
                    alert(res.data.message);
                }
            });
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        $_ajax_getBackdrop: function() {
            var self = this;
            this.isBusy = true;

            if(!this.bid){
                this.bid = this.$route.query.bid;
            }

            self.page = self.page + 1;
            let arr = {
                num_list: 3,
                page: self.page,
                bid: this.bid
            };

            api
                .ajaxSearch("diary_detail_basic", arr)
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.backdropList = Object.assign(
                        self.backdropList,
                        res.data.backdrop[0]
                    );
                    self.diaryList = self.diaryList.concat(res.data.diary);
                    self.mediaList = Object.assign(
                        self.mediaList,
                        res.data.diary_media
                    );
                    self.diaryNum = res.data.total_tt;

                    for (let index in res.data.item_name) {
                        self.memu = res.data.item_name[index].cat_name;
                        break;
                    }
                    self.s_uid = res.data.s_uid;
                    self.p_uid = res.data.b_uid;
                    self.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        },
        getImgUrl() {
            return api.imgUrl();
        },
        getMediaUrl(data) {
            let arr = data.split(",");
            return arr;
        },
        getMediaNum(data) {
            let arr = this.getMediaUrl(data);
            return arr.length;
        },
        getDays: function(day1, day2) {
            let arr1 = day1.split(" ");
            let arr2 = day2.split(" ");

            let date1 = arr1[0];
            let date2 = arr2[0];

            var date1Str = date1.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日
            //根据年 . 月 . 日的值创建Date对象
            var date1Obj = new Date(date1Str[0], date1Str[1] - 1, date1Str[2]);
            var date2Str = date2.split("-");
            var date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2]);
            var t1 = date1Obj.getTime();
            var t2 = date2Obj.getTime();
            var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
            var minusDays = Math.floor((t2 - t1) / dateTime); //计算出两个日期的天数差
            var days = Math.abs(minusDays); //取绝对值

            return days;
        }, 
        seeOnlyVideo() {
            this.hiddenNum = this.hiddenNum == 1 ? 0 : 1;
            this.videoMessage =
                this.videoMessage == "只看视频" ? "查看全部" : "只看视频";
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
        showModule(content) {
            AlertModule.show({
                title: "拒绝理由",
                content: content,
                onShow() {
                    console.log("Module: I'm showing");
                },
                onHide() {
                    console.log("Module: I'm hiding now");
                }
            });
        },
        favor(did) {
            api.ajaxSubmit("add_favor", { did: did }).then(res => {
                alert(res.data.message);
            });
        }
    },
    mounted() {
        this.$_ajax_getBackdrop();
    }
};
</script>
<style scoped>
.hiddenNow {
    display: none;
}
.ios-time {
    fill: rgba(255, 83, 112, 0.7);
}
ul {
    margin: 0;
    padding: 0;
}
div.check_status {
    position: absolute;
    right: 0.5rem;
    top: 0.8rem;
    z-index: 222;
}
div.check_status > div:first-child {
    width: 1.1rem;
    overflow: hidden;
}
div.check_status > div > img {
    width: 100%;
}
div.check_status > div > p {
    width: 1.1rem;
    max-height: 1rem;
    font-size: 0.3rem;
    color: rgb(255, 0, 0);
}

#backdrop_content {
    position: relative;
    padding: 0 15px;
}
#backdrop_content .btop {
    font-size: 0.25rem;
    font-weight: 550;
    padding: 0.2rem;
    background-color: rgb(255, 83, 112);
    display: flex;
    justify-content: space-between;
}
#backdrop_content .btop .see_v {
    float: right;
    font-size: 0.25rem;
    font-weight: 500;
    color: #fff;
}
#backdrop_content .list .list_content {
    position: relative;
}
#backdrop_content .list .list_content p.time {
    font-size: 0.28rem;
    margin: 0.3rem 0;
}

#backdrop_content .list .list_content p.time em {
    font-size: 0.25rem;
    color: #ccc;
}

#backdrop_content .list .list_content .timeLine {
    position: relative;
    margin-bottom: 0.8rem;
    border: 1px solid #ccc;
    box-shadow: 5px 5px 5px #ccc;
    border-radius: 0.1rem;
    padding: 0.3rem;
}

#backdrop_content .list .list_content .timeLine .operate_list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.3rem;
    font-size: 0.3rem;
    text-align: center;
}
#backdrop_content .list .list_content .timeLine .operate_list .operate_btn {
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    padding: 0.1rem 0;
    background-color: rgb(255, 83, 112);
    color: #fff;
}

#backdrop_content .list .list_content .timeLine p.title {
    font-size: 0.28rem;
    /* font-weight: 550; */
    margin: 0.1rem;
}
#backdrop_content .list .list_content .timeLine p.title span.time {
    font-size: 0.25rem;
    color: #aaa;
}
#backdrop_content .list .list_content .timeLine p.content {
    font-size: 0.25rem;
    margin: 0.1rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    color: #272727;
}

#backdrop_content p.write_diary {
    position: fixed;
    bottom: 1.13rem;
    left: 0.4rem;
    right: 0.4rem;
    text-align: center;
    padding: 0.1rem;
    color: #fff;
    font-size: 0.3rem;
    background: rgb(255, 83, 112);
    border: 1px solid rgb(255, 83, 112);
    border-radius: 1rem;
    z-index: 499;
}

div.other {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.2rem;
    font-size: 0.3rem;
    text-align: center;
}
.pic {
    margin-bottom: 0.2rem;
}
.pic img {
    width: 100%;
    min-height: 100%;
}

.pic li {
    display: flex;
    align-items: center;
    border-radius: 0.1rem;
}
.pic-1 {
    margin-top: 0.2rem;
    height: 4rem;
}
.pic-1 li {
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.pic-2 {
    margin-top: 0.2rem;
    height: 3.5rem;
    /* width: 6.3rem; */
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
.pic-2 li {
    height: 3.5rem;
    width: 3.1rem;
    overflow: hidden;
    border-radius: 0.1rem;
}
.pic-3 {
    overflow: hidden;
    margin-top: 0.2rem;
    height: 4.1rem;
    width: 100%;
}
.pic-3 li {
    float: left;
    height: 2rem;
    width: 2rem;
    overflow: hidden;
    border-radius: 0.05rem;
}
.pic-3 li:nth-child(2) {
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
}
.pic-3 li:last-child {
    margin-left: 0.1rem;
}
.pic-3 li:first-child {
    height: 4.1rem;
    width: 4rem;
    overflow: hidden;
    border-radius: 0.05rem;
}
.pic-4,
.pic-5 {
    overflow: hidden;
    margin-top: 0.2rem;
    height: 6.4rem;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.pic-4 li,
.pic-5 li {
    height: 3.1rem;
    width: 3.1rem;
    margin-top: 0.1rem;
    overflow: hidden;
    border-radius: 0.05rem;
}
.pic-5 {
    height: 5.3rem;
}
.pic-5 li {
    height: 2.05rem;
    width: 2.05rem;
}
.pic-5 li:nth-child(1),
.pic-5 li:nth-child(2) {
    height: 3.1rem;
    width: 3.1rem;
}
.pic-6 {
    overflow: hidden;
    margin-top: 0.2rem;
    width: 100%;
}
.pic-6 li {
    float: left;
    height: 2rem;
    width: 2rem;
    overflow: hidden;
    border-radius: 0.05rem;
    margin-left: 0.1rem;
    margin-bottom: 0.1rem;
}
.pic-6 li:nth-child(1) {
    height: 4.1rem;
    width: 4.1rem;
    margin-left: 0;
    margin-bottom: -0.01rem;
}
.pic-6 li:nth-child(4) {
    margin-left: 0;
}
.pic-6 li:nth-child(n + 4) {
    margin-bottom: 0;
}
.pic-7 {
    overflow: hidden;
    margin-top: 0.2rem;
    height: 8.5rem;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.pic-7 li,
.pic-8 li {
    overflow: hidden;
    border-radius: 0.05rem;
    height: 3.1rem;
    width: 3.1rem;
}
.pic-7 li:nth-child(n + 5),
.pic-8 li:nth-child(n + 3) {
    height: 2.05rem;
    width: 2.05rem;
}
.pic-8,
.pic-9 {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: stretch;
    -webkit-align-items: stretch;
    align-items: stretch;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    -webkit-flex-wrap: wrap;
    flex-wrap: wrap;
}
.pic-8 {
    overflow: hidden;
    margin-top: 0.1rem;
    width: 100%;
    height: 7.5rem;
}
.pic-9 {
    height: 6.3rem;
}
.pic-9 li {
    overflow: hidden;
    border-radius: 0.05rem;
    height: 2.05rem;
    width: 2.05rem;
    margin-top: 0.1rem;
}
.pic-9,
.video-1 {
    overflow: hidden;
    margin-top: 0.2rem;
    width: 100%;
}
.video-1 li span {
    display: block;
    position: absolute;
    height: 1rem;
    width: 1rem;
    text-align: center;
    top: 50%;
    left: 50%;
    margin-left: -0.5rem;
    margin-top: -0.5rem;
    font-size: 1rem;
    color: transparent;
    background: url(//mstatic.soyoung.com/m/static/fe_m/view/diary/img/play@2x-b243e646be.png)
        no-repeat center center;
    background-size: 100%;
    padding: 0.01rem;
}
.video-1 li img,
.video-1 li video {
    width: 100%;
    height: 100%;
    max-height: 4rem;
}
</style>
