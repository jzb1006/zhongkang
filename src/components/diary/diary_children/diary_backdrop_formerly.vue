<template>
    <div id="backdrop_formerly">
        <p class="title">过去的她</p>
        <div class="container" v-for="backdrop in backdropList">
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
                <div class="col_3 img_wrapper">
                    <!-- <previewer :list="backdrop.img1"></previewer> -->
                    <img v-lazy="getImgUrl()+backdrop.img1" alt="术前图片" @click="enlarge(backdrop.img1)">
                </div>
                <div class="col_3 img_wrapper">
                    <img v-lazy="getImgUrl()+backdrop.img2" alt="术前图片" @click="enlarge(backdrop.img2)">
                </div>
                <div class="col_3 img_wrapper">
                    <img v-lazy="getImgUrl()+backdrop.img3" alt="术前图片" @click="enlarge(backdrop.img3)">
                </div>
            </div>
            <div class="enlarge_img" v-show="enlarge_status">
                <p class="enlarge_tip">点击图片还原</p>
                <img class="img_enlarge" :src="enlarge_img" alt="" @click="close_enlarge()">
            </div>
        </div>
    </div>
</template>
<script>
import api from "@/api/diary";
export default {
    data() {
        return {
            backdropList: [],
            enlarge_img: "",
            enlarge_status: false,
            s_uid: 0,
            p_uid: 0,
        };
    },
    props: ["bid"],
    methods: {
        $_ajax_getBackdrop: function() {
            var self = this;
            let bid = this.$route.query.bid;
            api.ajaxSearch("diary_detail_basic", { bid: bid }).then(res => {
                console.log(res);
                self.backdropList = res.data.backdrop;
                self.s_uid = res.data.s_uid;
                self.p_uid = res.data.b_uid;

            })
        },
        getImgUrl() {
            return api.imgUrl();
        },
        enlarge(data) {
            console.log(data);
            this.enlarge_status = true;
            this.enlarge_img = this.getImgUrl() + data;
        },
        close_enlarge() {
            this.enlarge_status = false;
        }
    },
    created() {
        this.$_ajax_getBackdrop();
    }
};
</script>
<style scoped>
.col_3{
    width: 33%;
    float: left;
}
#backdrop_formerly {
    position: relative;
    padding: 15px 15px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: .3rem;
}
#backdrop_formerly p.title {
    font-size: 0.35rem;
    font-weight: 550;
    margin-bottom: .3rem;
}
#backdrop_formerly > div.container .img{
    display: flex;
    justify-content: space-around;
    height: 3rem;
    overflow: hidden;
}
#backdrop_formerly .img_wrapper img {
    max-width: 100%;
    min-height: 100%;
}
div.enlarge_img {
    text-align: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.7);
}
div.enlarge_img p.enlarge_tip {
    margin-top: 1rem;
    color: #fff;
    font-size: 0.4rem;
}
div.enlarge_img > img.img_enlarge {
    width: 80%;
    margin-top: 1rem;
}
div.check_status {
    position: absolute;
       right: 0.5rem;
    top: -.5rem;
}
div.check_status > div:first-child {
    width: 1.5rem;
    height: 1.5rem;
    overflow: hidden;
}
div.check_status > div > img {
    max-width: 100%;
    min-height: 100%;
}
</style>

