<template>
    <div id="diary_backdrop_user">
        <p class="top">
            <top :title="getUserName()+'的美丽日记'"></top>
        </p>

        <div v-for="backhead in backdropList">
            <div class="up">
                <div class="img_head">
                    <defaultImg :imgPath="user.headimgurl" :styles="img_style"></defaultImg>
                </div>
                <div class="name">
                    <span class="name" v-if="user.nickname">{{user.nickname}}</span>
                    <span class="name" v-else>{{user.user_name}}</span>
                </div>
            </div>
            <div class="down">
                <ul class="info">
                    <li>
                        <div class="item" ref="keyword">
                            <span class="item" :key="index" v-for="(memu,index) in memuList">{{memu.cat_name}}</span>
                        </div>
                    </li>
                    <li>
                        <div class="institution">
                            <span>医院：</span>{{backhead.institution_name}}
                        </div>
                    </li>
                    <li>
                        <div class="institution">
                            <span>医生：</span>{{backhead.doctor_name}}
                        </div>
                    </li>
                    <li>
                        <div class="date">
                            <span class="time"> 于{{backhead.update_time.split(" ")[0]}}创建</span>
                            <span class="total_num">共发表了{{transform_num(diaryNum)}}篇日记</span>
                        </div>

                    </li>
                    <li>
                        <ul class="other">
                            <li class="reward clearfix">
                                <router-link :to="{name:'diaryReward'}" tag="div">
                                    <p>
                                        <i class="zk-icon-liwu left_icon"></i>
                                        查看日记奖励
                                        <i class="zk-icon-fanhui1 icon_right badge"></i>
                                    </p>
                                </router-link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <div class="backdropImage" v-if="backList.length > 0" v-for="(backdrop,index) in backdropList">
                            <p v-if="index == '0'" class="title">过去的她</p>
                            <div class="check_status" v-if="p_uid == s_uid">
                                <div v-if="backdrop.check_status == '0'">
                                    <img src="./../../../../static/images/no.png" alt="" />
                                </div>

                                <div v-else-if="backdrop.check_status == '1'">
                                    <img src="./../../../../static/images/pass.png" alt="" />
                                </div>

                                <div v-else="backdrop.check_status == '2'">
                                    <img src="./../../../../static/images/nopass.png" alt="" />
                                </div>
                            </div>
                            <div class="img">
                                <mediaDisplay :filelists=backList :upshow1=false></mediaDisplay>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div class="operate">
                            <span class="operate_btn" v-if="is_user()" @click="update_backdrop(backhead.id)">
                                <!-- <router-link :to="{name:'diaryOperate',query:{bid:backhead.id,operate:'ub'}}" tag="div"> -->
                                    编辑 
                                <!-- </router-link> -->
                            </span>
                            <span class="operate_btn" v-else>关注</span>
                            <span class="operate_btn" v-if="del_show()" @click="del_backdrop(backhead.id)">删除</span>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/diary";
import mediaDisplay from "@/components/upload/media_display";
import top from "@/components/decorate/top_back_title.vue";
import defaultImg from "@/components/decorate/default_img.vue";
export default {
    data() {
        return {
            backdropList: [],
            diaryList: [],
            backList: [],
            memuList: [],
            user: "",
            diaryNum: 0,
            s_uid: 0,
            p_uid: 0,
            img_style: "width:100%;min-height:100%",
            keyword: this.$refs.keyword
        };
    },
    props: ["bid"],
    components: {
        top,
        defaultImg,
        mediaDisplay
    },
    methods: {
        update_backdrop(bid) {
            this.$store.dispatch("Save_Diary_Operate", "ub");
            this.$router.push({ name: "diaryOperate", query: { bid: bid } });
        },
        del_backdrop(bid) {
            api.ajaxSubmit("delBasic", { bid: bid }).then(res => {
                if (res.data.error == 0) {
                    alert(res.data.message);
                    this.$router.push({ name: "diaryBackdropList" });
                } else {
                    alert(res.data.message);
                }
            });
        },
        getUserName() {
            return this.user.nickname
                ? this.user.nickname
                : this.user.user_name ? this.user.user_name : "";
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        del_show() {
            if (this.is_user() && this.diaryList.length == 0) {
                return true;
            }
            return false;
        },
        is_user() {
            if (this.s_uid == this.p_uid) {
                return true;
            } else {
                return false;
            }
        },
        is_edit() {
            for (let index in this.memuList) {
                if (this.memuList[index].is_aesthetic_custom == "1") {
                    return false;
                }
            }
            return true;
        },
        $_ajax_getBackdrop: function() {
            var self = this;
            let bid = this.$route.query.bid;

            if (!bid) {
                bid = this.bid;
            }
            api.ajaxSearch("diary_detail_basic", { bid: bid }).then(res => {
                self.diaryList = res.data.diary;
                self.backdropList = res.data.backdrop;
                self.memuList = res.data.item_name;
                self.user = res.data.user;
                self.diaryNum = res.data.tt;
                self.s_uid = res.data.s_uid;
                self.p_uid = res.data.b_uid;

                if (res.data.backdrop[0].img1) {
                    let arrImg = [];
                    arrImg.push({ url: res.data.backdrop[0].img1, alt: "" });
                    arrImg.push({ url: res.data.backdrop[0].img2, alt: "" });
                    arrImg.push({ url: res.data.backdrop[0].img3, alt: "" });
                    self.backList = arrImg;
                }
            });
        },
        back() {
            this.$router.push({ path: "/" });
        },
        getImgUrl() {
            return api.imgUrl();
        }
    },
    mounted() {
        this.$_ajax_getBackdrop();
    }
};
</script>
<style scoped>
#diary_backdrop_user .backdropImage {
    position: relative;
}
#diary_backdrop_user .backdropImage p.title {
    font-size: 0.3rem;
    margin-bottom: 0.3rem;
}
#diary_backdrop_user .backdropImage div.check_status {
    position: absolute;
    right: 0.5rem;
    top: -0.4rem;
}
#diary_backdrop_user .backdropImage div.check_status > div:first-child {
    width: 1.1rem;
    height: 1.1rem;
    overflow: hidden;
}
#diary_backdrop_user .backdropImage div.check_status > div > img {
    max-width: 100%;
    min-height: 100%;
}
#diary_backdrop_user > p.top {
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

#diary_backdrop_user .up {
    text-align: center;
    position: relative;
    background-color: rgb(17, 94, 94, 0.5);
    height: 2rem;
}
#diary_backdrop_user .up > .name {
    position: absolute;
    top: 1.8rem;
    left: 1.7rem;
    font-size: 0.35rem;
    width: 3rem;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 1rem;
    padding: 0.1rem 0;
    background-color: #fff;
}
#diary_backdrop_user .up .img_head {
    position: absolute;
    top: 1.5rem;
    left: 0.3rem;
    width: 1rem;
    height: 1rem;
    border: 3px solid #fff;
    border-radius: 50%;
    overflow: hidden;
}
#diary_backdrop_user .up .img_head img {
    width: 100% !important;
    min-height: 100% !important;
    height: 100% !important;
}
#diary_backdrop_user .up .operate {
    position: absolute;
    top: 1.7rem;
    left: 3rem;
    display: inline-block;
    font-size: 0.3rem;
    color: #fff;
    padding: 0.1rem 1rem;
    border: 1px solid rgba(255, 83, 112, 0.7);
    border-radius: 0.5rem;
    background-color: rgb(255, 83, 112);
}
#diary_backdrop_user .down .info {
    margin-top: 1rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
}
#diary_backdrop_user .down .info li {
    margin-bottom: 0.2rem;
}
#diary_backdrop_user .down .info .item {
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
}
#diary_backdrop_user .down .info .item span {
    display: inline-block;
    font-size: 0.25rem;
    padding: 0.1rem 0.2rem;
    background-color: #ccccccfc;
    border-radius: 1rem;
    margin-right: 0.2rem;
    color: #fff;
    background-color: rgb(17, 94, 94, 0.5);
}
#diary_backdrop_user .down .info .date {
    color: #504b4b;
    padding: 0.1rem 0;
}
#diary_backdrop_user .down .info .operate {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.3rem;
    text-align: center;
}
#diary_backdrop_user .down .info .operate .operate_btn {
    padding: 0.1rem 0.3rem;
    border-radius: 0.1rem;
    color: #fff;
    background-color: rgb(255, 83, 112);
}
#diary_backdrop_user .down .other {
    margin: 0.3rem 0;
    list-style: none;
}
#diary_backdrop_user .down .other .reward {
    font-size: 0.25rem;
    padding: 0.2rem 0;
}
#diary_backdrop_user .down .other .reward .badge {
    float: right;
    margin-right: 0.1rem;
    color: #ccc;
}
#diary_backdrop_user .down .other .reward .left_icon {
    color: #fff;
    padding: 3px 4px;
    background-color: rgb(255, 83, 112);
    border-radius: 50%;
}
</style>
