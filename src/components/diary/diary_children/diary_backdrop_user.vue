<template>
    <div id="diary_backdrop_user">
        <p class="top">
            <top title="美丽日记"></top>
        </p>

        <div v-for="backhead in backdropList">
            <div class="up">
                <div class="img_head">
                    <img :src="getImgUrl()+user.headimgurl">
                </div>
                <router-link :to="{name:'diaryUpdateBasic',query:{bid:backhead.id}}" tag="a">
                    <span class="operate" v-if="s_uid == p_uid">编辑</span>
                    <span class="operate" v-else>关注</span>
                </router-link>
            </div>
            <div class="down">
                <div class="info clearfix">
                    <div class="col_4">
                        <span class="name" v-if="user.nickname">{{user.nickname}}</span>
                        <span class="name" v-else>{{user.user_name}}</span>
                    </div>
                    <div class="col_6 clearfix">
                        <span class="item" v-for="memu in memuList">{{memu.cat_name}}</span>
                    </div>
                    <div class="col_4">
                        <span class="time">{{backhead.add_time}}</span>
                    </div>
                    <div class="col_2">
                        <span>|</span>
                    </div>
                    <div class="col_4">
                        <span class="total_num">共{{diaryNum}}篇日记</span>
                    </div>
                </div>
                <ul class="other">
                    <li class="reward clearfix">
                        <router-link :to="{name:'diaryReward'}" tag="div">
                            <p>
                                查看日记奖励
                                <i class="zk-icon-fanhui1 icon_right badge"></i>
                            </p>

                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/diary";
import top from "@/components/decorate/top_back_title.vue";
export default {
    data() {
        return {
            backdropList: [],
            memuList: [],
            user: "",
            diaryNum: 0,
            s_uid: 0,
            p_uid: 0
        };
    },
    props: ["bid"],
    components: {
        top
    },
    methods: {
        $_ajax_getBackdrop: function() {
            var self = this;
            let bid = this.$route.query.bid;

            if (!bid) {
                bid = this.bid;
            }
            api.ajaxSearch("diary_detail_basic", { bid: bid }).then(res => {
                console.log(res);
                self.backdropList = res.data.backdrop;
                self.memuList = res.data.item_name;
                self.user = res.data.user;
                self.diaryNum = res.data.tt;
                self.s_uid = res.data.s_uid;
                self.p_uid = res.data.b_uid;
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
/* 图标颜色 */
.col_4 {
    width: 40%;
}
.col_6 {
    width: 60%;
}
.col_2 {
    width: 20%;
}
#diary_backdrop_user {
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

#diary_backdrop_user .up .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: 0.4rem;
    padding: 0 0.2rem 0.1rem;
    z-index: 999;
    background-color: rgb(255, 83, 112);
}
#diary_backdrop_user .up .top span {
    padding: 0.2rem;
    color: #fff;
}
#diary_backdrop_user .up .top .back {
    float: left;
}

#diary_backdrop_user .up .top .share {
    float: right;
}
#diary_backdrop_user .up .img_head {
    position: absolute;
    top: 1rem;
    left: 20%;
    margin-left: -0.75rem;
    width: 1.5rem;
    height: 1.5rem;
    border: 1px solid rgb(255, 83, 112);
    border-radius: 50%;
    overflow: hidden;
}
#diary_backdrop_user .up .img_head img {
    width: 100%;
    min-height: 100%;
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
    margin-top: 0.6rem;
}
#diary_backdrop_user .down .info > div {
    float: left;
    font-size: 0.35rem;
    text-align: center;
    margin-top: 0.3rem;
}

#diary_backdrop_user .down .info > div span {
    display: inline-block;
}
#diary_backdrop_user .down .info > div span.item {
    padding: 0.1rem 0.3rem;
    border: 1px solid rgb(15, 108, 124);
    font-size: 0.3rem;
    margin: 0.1rem 0.1rem 0 0;
}
#diary_backdrop_user .down .info > div span.time {
    color: #ccc;
}
#diary_backdrop_user .down .info > div span.total_num {
    color: rgb(34, 77, 62);
}
#diary_backdrop_user .down .other {
    margin: 0.3rem 0;
    padding: 0 30px;
    list-style: none;
}
#diary_backdrop_user .down .other .reward {
    font-size: 0.3rem;
    font-weight: 550;
    padding: 0.3rem 0;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
}
#diary_backdrop_user .down .other .reward .badge {
    float: right;
    margin-right: 0.1rem;
}
</style>
