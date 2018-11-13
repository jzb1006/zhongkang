<template>
    <div id="detail_top">
        <p class="top">
            <top title="美丽内容"></top>
        </p>
        <div v-for="backdrop in backdropList">
            <div class="head">
                <div class="headImg">
                    <img v-if="user.headimgurl" :src="getImgUrl()+user.headimgurl" alt="" />
                </div>
                <span class="user_name">{{user.nickname?user.nickname:""}}</span>
                <span class="time">{{backdrop.update_time.split(" ")[0]}}</span>
            </div>
            <div class="other">
                <div class="info">
                    <router-link :to="{name:'hospitalDetail',params:{ins_id:backdrop.institution_id}}" tag="a">
                        <span class="icon_institution zk-icon-yiyuan"></span>
                        <span class="name" :title="backdrop.institution_name">{{backdrop.institution_name}}</span>
                    </router-link>
                </div>
                <div class="info">
                    <router-link :to="{name:'doctorDetail',params:{doc_id:backdrop.doctor_id,ins_id:backdrop.institution_id}}" tag="a">
                        <span class="icon_doctor zk-icon-ys"></span>
                        <span class="name" :title="backdrop.doctor_name">{{backdrop.doctor_name}}</span>
                    </router-link>
                </div>
            </div>
            <div class="info">
                <router-link :to="{name:'diaryBackdrop',query:{bid:$route.query.bid}}" tag="a" class="see_diary">
                    <span>查看其他日记</span>
                </router-link>
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
            user: [],
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
        getImgUrl() {
            return api.imgUrl();
        },
        $_ajax_getBackdrop: function() {
            var self = this;
            let bid = this.$route.query.bid;

            if (!bid) {
                bid = this.bid;
            }
            api.ajaxSearch("diary_detail_basic", { bid: bid }).then(res => {
                self.backdropList = res.data.backdrop;
                self.memuList = res.data.item_name;
                self.user = res.data.user;
                self.diaryNum = res.data.tt;
                self.s_uid = res.data.s_uid;
                self.p_uid = res.data.b_uid;
            });
        },
        back() {
            this.$router.push({
                name: "diaryBackdrop",
                query: { bid: this.bid }
            });
        }
    },
    mounted() {
        this.$_ajax_getBackdrop();
    }
};
</script>
<style scoped>
.ios-arrow-back {
    fill: #fff;
}
.ios-contact {
    fill: #ddddff;
}

#detail_top > p.top {
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
#detail_top .head {
    position: relative;
    margin-top: 1rem;
    height: 1.2rem;
}
#detail_top .head span.time {
    position: absolute;
    left: 1.3rem;
    font-size: 0.25rem;
    top: 0.9rem;
    color: #796e6e;
}
#detail_top .head .headImg {
    position: absolute;
    width: 0.7rem;
    height: 0.7rem;
    overflow: hidden;
    left: 0.3rem;
    top: 0.5rem;
    border-radius: 50%;
    background-color: #ddd;
    z-index: 1;
    display: flex;
    align-items: center;
}
#detail_top .head .headImg img {
    width: 100%;
}
#detail_top .head .user_name {
    position: absolute;
    left: 1rem;
    top: 0.43rem;
    width: 3rem;
    padding: 0.1rem 0.3rem;
    font-size: 0.28rem;
    font-weight: 500;
    color: #000;
    border-radius: 5rem;
    overflow: hidden;
    z-index: 1;
}
#detail_top .other {
    display: grid;
    grid-template-columns: 50% 50%;
    grid-gap: 0.2rem;
    font-size: 0.4rem;
    margin: 0.3rem 0;
    padding: 0.1rem 0.3rem;
}
#detail_top .other .info {
    font-size: 0.3rem;
    padding: 0.2rem;
    overflow: hidden;
    box-shadow: 5px 5px 5px #eeeeeef3;
}
#detail_top .other .info a {
    display: flex;
    align-items: center;
}
#detail_top .other .info span.icon_institution,
#detail_top .other .info span.icon_doctor {
    font-size: 0.3rem;
    padding: 0.2rem;
    border-radius: 1rem;
}
#detail_top .other .info span.name {
    white-space: nowrap;
    overflow: hidden;
    font-size: 0.3rem;
}
#detail_top .other .other_img {
    width: 1rem;
    height: 1rem;
    display: inline-block;
}
#detail_top .other span {
    display: inline-block;
}
.see_diary {
    display: block;
    text-align: center;
    font-size: 0.3rem;
    color: #ff5370;
    margin: 0;
}
.see_diary span {
    display: inline-block;
    width: 80%;
    margin-bottom: 0.1rem;
    padding: 0.1rem 0.2rem;
    box-shadow: #cbc7c7 0 0 20px;
    border: 4px solid #f8f8f8;
}
p.title {
    font-size: 0.9rem;
    padding: 0.3rem 0;
    border-bottom: 1px solid #ccc;
}
span.back {
    left: 0;
}
</style>
