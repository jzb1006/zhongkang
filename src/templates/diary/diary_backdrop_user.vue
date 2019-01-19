<template>
    <div id="diary_backdrop_user">
        <keep-alive v-if="is_operate">
            <diaryOperate @back=click_back></diaryOperate>
        </keep-alive>
        <div v-else>
            <div v-for="(backhead,index) in backdropList" :key=index>
                <div class="up">
                    <div class="img_head">
                        <defaultImg v-if="user.headimgurl" :imgPath="user.headimgurl" :styles="img_style"></defaultImg>
                    </div>
                    <div class="name">
                        <span class="name">{{user.nickname ? user.nickname : ""}}</span>
                    </div>
                </div>
                <div class="down">
                    <ul class="info">
                        <!-- <li>
                            <div class="item" ref="keyword">
                                <span class="item" :key="index" v-for="(memu,index) in memuList">{{memu.cat_name}}</span>
                            </div>
                        </li> -->
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
                            <div class="backdropImage" v-if="backList.length > 0" v-for="(backdrop,index) in backdropList" :key=index>
                                <p v-if="index == '0'" class="title">过去的她</p>
                                <div class="check_status" v-if="self_diary">
                                    <div v-if="backdrop.status == '0'">
                                        <img src="./../../../static/images/no.png" alt="" />
                                    </div>

                                    <div v-else-if="backdrop.status == '1'">
                                        <img src="./../../../static/images/pass.png" alt="" />
                                    </div>

                                    <div v-else="backdrop.status == '2'">
                                        <img src="./../../../static/images/nopass.png" alt="" />
                                    </div>
                                </div>
                                <div class="img">
                                    <mediaDisplay :filelists=backList :upshow1=false></mediaDisplay>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="operate">
                                <span class="operate_btn" v-if="self_diary" @click="update_backdrop(backhead.id)">
                                    编辑
                                </span>
                                <span class="operate_btn" v-else>关注</span>
                                <span class="operate_btn" v-if="del_show()" @click="del_backdrop(backhead.id)">删除</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <Alert v-bind:Show.sync="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>

<script>
import api from "@/api/diary";
import mediaDisplay from "@/components/upload/media_display";
import top from "@/components/decorate/top_back_title.vue";
import defaultImg from "@/components/decorate/default_img.vue";
import { rejects } from "assert";
import { setTimeout } from 'timers';
export default {
    name: "diary_backdrop_user",
    props: {
        b_id: {
            default: ""
        },
        diaryBackdropUserInfo: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            is_operate: false,
            isShow: false,
            alerttType: "",
            alertText: "",
            bid: this.b_id,
            backdropList: [],
            diaryList: [],
            backList: [],
            user: {},
            diaryNum: 0,
            self_diary:false,
            img_style: "width:100%;min-height:100%",
            keyword: this.$refs.keyword
        };
    },
    watch: {
        diaryBackdropUserInfo(val, oldVal) {
            this.backdropList = val.backdropList;
            this.diaryList = val.diaryList;
            this.backList = val.backList;
            // this.self_diary = val.self_diary;
            this.diaryNum = val.diaryNum;
            this.user = val.user;
            // this.sUid = val.s_uid;
            // this.pUid = val.p_uid;
            this.self_diary = val.self_diary;
        }
    },
    components: {
        top,
        defaultImg,
        mediaDisplay
    },
    methods: {
        click_back() {
            this.is_operate = false;
        },
        update_backdrop(bid) {
            this.$store.dispatch("Save_Bid", bid);
            this.$store.dispatch("Save_Diary_Operate", "ub");
            this.is_operate = true;
        },
        del_backdrop(bid) {
            api.ajaxSubmit("delBasic", { bid: bid }).then(res => {
                if (res.data.error == 0) {
                    this.isShow = true;
                    this.alerttType = "success";
                    this.alertText = res.data.message;
                    setTimeout(()=>{
                        this.$router.push({
                            name: "container",
                            query: { id: 16 }
                        });
                    },2000)
                } else {
                    this.isShow = true;
                    this.alerttType = "success";
                    this.alertText = res.data.message;
                }
            });
        },
        getUserName() {
            return this.user.nickname
                ? this.user.nickname
                : this.user.user_name
                    ? this.user.user_name
                    : "";
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000
                    ? Math.floor(num / 10000) + "万"
                    : num;
        },
        del_show() {
            if (this.self_diary && this.diaryList.length == 0) {
                return true;
            }
            return false;
        },
        // is_user() {
        //     if (this.sUid == this.pUid) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        // is_edit() {
        //     for (let index in this.memuList) {
        //         if (this.memuList[index].is_aesthetic_custom == "1") {
        //             return false;
        //         }
        //     }
        //     return true;
        // },
        back() {
            this.$router.push({ path: "/" });
        },
        getImgUrl() {
            return api.imgUrl();
        }
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
/* #diary_backdrop_user > p.top {
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

#diary_backdrop_user .up {
    text-align: center;
    position: relative;
    background-color: rgb(17, 94, 94);
    height: 1rem;
}
#diary_backdrop_user .up > .name {
    position: absolute;
    top: 0.8rem;
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
    top: 0.5rem;
    left: 0.3rem;
    width: 1rem;
    height: 1rem;
    border: 3px solid #fff;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(255, 83, 112);
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
    margin-bottom: 0.3rem;
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
