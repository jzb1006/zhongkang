<template>
    <div id="detail_top">
        <p class="top">
            <top title="美丽内容"></top>
        </p>

        <div v-for="backdrop in backdropList">
            <div class="head">
                <div class="headImg">
                    <img src="http://img2.imgtn.bdimg.com/it/u=1409135023,2233259101&fm=27&gp=0.jpg " alt="" />
                </div>

                <span class="user_name">{{userName}}</span>
                <span class="time">{{backdrop.add_time}}</span>
            </div>
            <div class="other">
                <div class="info">
                    <router-link :to="{name:'hospitalDetail',params:{ins_id:backdrop.institution_id}}">
                        <span class="icon_institution">机构</span>
                        <span class="" :title="backdrop.institution_name">{{backdrop.institution_name}}</span>
                    </router-link>
                </div>
                <div class="info">
                    <router-link :to="{name:'doctorDetail',params:{doc_id:backdrop.doctor_id,ins_id:backdrop.institution_id}}">
                        <span class="icon_doctor">医生</span>
                        <span class="" :title="backdrop.doctor_name">{{backdrop.doctor_name}}</span>
                    </router-link>
                </div>
                <div class="info">
                    <router-link :to="{name:'diaryBackdrop',query:{bid:bid}}" tag="div">
                        <p class="see_diary text-center text-info">查看其他日记</p>
                    </router-link>
                </div>
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
            userName: "",
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
                self.backdropList = res.data.backdrop;
                self.memuList = res.data.item_name;
                self.userName = res.data.user_name.user_name;
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

/* #detail_top .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 83, 112);
    color: #fff;
    z-index: 999;
}
#detail_top .top p {
    text-align: center;
    font-size: .4rem;
    margin-bottom: 0;
}
#detail_top .top span{
    float: left;
} */
#detail_top .head {
    position: relative;
    margin-top: 1rem;
    height: 1.2rem;
}
#detail_top .head span.time {
    position: absolute;
    left: 1.5rem;
    font-size: 0.3rem;
    top: 1.1rem;
    color: #796e6e;
}
#detail_top .head .headImg {
    position: absolute;
    width: 1rem;
    height: 1rem;
    overflow: hidden;
    left: 0.3rem;
    top: 0.5rem;
    border-radius: 50%;
    background-color: #ddd;
    z-index: 1;
}
#detail_top .head .headImg img {
    width: 100%;
    min-height: 100%;
}
#detail_top .head .user_name {
    position: absolute;
    left: 1.2rem;
    top: 0.5rem;
    padding: 0.1rem 0.3rem;
    font-size: 0.35rem;
    font-weight: 500;
    color: #000;
    border-radius: 5rem;
    z-index: 1;
}
#detail_top .other {
    font-size: 0.4rem;
    margin: 0.5rem 0;
    padding: 0.1rem 0.3rem;
}
#detail_top .other .info {
    font-size: 0.3rem;
    padding: 0.2rem;
    overflow: hidden;
    border: 1px solid #ccc;
    box-shadow: 5px 5px 5px #ccc;
}
#detail_top .other .info span.icon_institution,
#detail_top .other .info span.icon_doctor {
    font-size: 0.3rem;
    padding: 0.2rem;
    border-radius: 1rem;
    color: #fff;
    border: 1px solid #000;
    background-color: rgb(255, 83, 112);
}
#detail_top .other .other_img {
    width: 1rem;
    height: 1rem;
    display: inline-block;
}
#detail_top .other span {
    display: inline-block;
}
p.see_diary {
    text-align: center;
    font-size: 0.3rem;
    font-weight: 550;
    padding: 0;
    margin: 0;
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
