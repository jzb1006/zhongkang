<template>
    <div id="hospital_detail">
        <!-- 头部 -->
        <top title="医院详情"></top>
        <!-- 医院详情头部 -->
        <article class="hospital-detail">
            <section class="sec-info">
                <div class="w-top">
                    <div class="logo">
                        <defaultImg :imgPath="ins_info['profile_photo']"></defaultImg>
                        <!-- <img src="http://img2.soyoung.com/doctor/20180116/0/20180116171114390_100_100.png"> -->
                        <!-- 云诊所 -->
                        <!-- 认证 --><span class="v-icon v-icon-1"></span></div>
                    <p class="title">{{ins_info['name']}}</p>
                    <!-- 关注详情 -->
                    <!-- 评价 -->
                    <div class="comment-box">
                        <div class="star-bg">
                            <star :star="evaluate['total_evaluate']"></star>
                        </div>
                    </div>
                    <div class="comment-info">
                        <commentInfo :list="[{text:'服务',value:evaluate['service']},{text:'医生',value:evaluate['doctor']},{text:'效果',value:evaluate['effect']}]"></commentInfo>
                    </div>
                    <div class="ls-box">
                         <router-link :to="{name:'docList',params:{ins_id:ins_id,doc_team:doc_team}}">
      
                            <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" class="zk-icon-yisheng"></span><span>{{doc_count}}医师</span></a>
                        </router-link>
                        <router-link :to="{name:'InsLicence',params:{ins_id:ins_id,tab:0}}">
                          <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" class="zk-icon-yingyezhizhao"></span><span>医疗执业许可</span></a>
                        </router-link>
                        
                    </div>
                </div>
                <!-- 虚线 -->
                <div class="ls-box-rows"></div>
                <!-- <div class="w-bot">
                            <div class="bottom-ls">
                                <a class="child-ls" href="#"><i style="font-size: 0.5rem;display: block;" class="zk-icon-yingyezhizhao"></i><span>医疗执业许可</span></a>
                            </div>
                        </div> -->
            </section>
        </article>
        <!-- 内容 -->
        <div class="main">
            <!-- 定位 -->
            <group>
                <cell title="查看地图" value="点击查看🔍" is-link :link="{name:'Map',params:{lat:ins_info['lat'],lon:ins_info['lon'],name:ins_info['name'],address:ins_info['address']}}">
                </cell>
            </group>
            <!-- 商品列表 -->
            <section class="recommend-box">
                <div class="box-ls border-bot" id="tpl-1">
                    <product v-if="goods.length!=0" :list="goods"></product>
                     <router-link :to="{name:'productList',params:{id:ins_id,type:1,name:ins_info['name']}}" class="footer border-top">
                                  查看全部{{goods_total}}个商品
                     </router-link>
                </div>
            </section>
            <!-- 医生列表 -->
            <section class="teacher-box">
                <div class="title">医师团队
                     <router-link :to="{name:'docList',params:{ins_id:ins_id}}" class="fr right">
                         共{{doc_count}}个医师
                            <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
                     </router-link>
                </div>
                <ul class="box-ls teacher ">
                    <!-- 美容师不进入医师主页 -->
                    <li class="part" :key="index" v-for="(item,index) in doc_team">
                         <router-link :to="{name:'doctorDetail',params:{doc_id:item['id'],ins_id:ins_id}}"  class="img-box">
                            <defaultImg :imgPath="item['avatar']"></defaultImg>
                        
                        <div class="right">
                            <span class="tit">
                                   {{item['name']}}
                                </span>
                            <span>
                                    医师
                                </span>
                        </div>
                        </router-link>
                    </li>
                </ul>
            </section>
            <!-- 商家相册 -->
            <section class="business-box">
                <div class="title border-bot">商家相册</div>
                <!-- 医院相册 -->
                <ul class="part imgs border-bot swipe-group">
                    <li :key="index" v-for="(item,index) in pic['photo']" >
                        <img :src="imgPrifix()+item['url']">
                    </li>
                    <li>
                         <router-link :to="{name:'InsImgList',params:{ins_id:ins_id,tab:1}}" class="chinese">
                       
                                <span>查看更多</span>
                                <span class="english">View More</span>
                        
                         </router-link>
                    </li>
                </ul>
                <div class="business-info"><span>营业时间：{{ins_info['office_hours']}}</span></div>
            </section>
        </div>
        <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>
<script>
    import {
        Group,
        Cell,
        CellFormPreview,
        XSwitch,
        XDialog,
        XButton,
        Qrcode,
        Popup,
    } from 'vux'
    import Alert from "@/components/decorate/alert.vue";
    import defaultImg from "@/components/decorate/default_img.vue";
    import api from "../../api/hospital";
    import top from "@/components/decorate/top_back_title.vue";
    import star from "@/components/decorate/star.vue";
    import commentInfo from "@/components/decorate/comment_info.vue";
    import product from '@/components/product/list.vue'
    export default {
        data() {
            return {
                ins_id: this.$route.params.ins_id,
                ins_info: [],
                doc_count: 0,
                doc_team: [],
                goods: [],
                goods_total: 0,
                pic: [],
                alertShow: false,
                alerttType: 'wran',
                alertText: '',
                evaluate: []
            }
        },
        computed: {
            isShow() {
                return this.alertShow;
            }
        },
        methods: {
            $_ajax_ins_info() {
                var self = this;
                api.detail({
                    id: this.ins_id
                }).then(res => {
                    console.log(res)
                    var result = res.data.data;
                    var errcode = res.data.error_code;
                    var msg = res.data.msg;
                    if (errcode == 0) {
                        self.ins_info = result.institution_info
                        self.doc_count = result.doc_count[0]['count']
                        self.doc_team = result.doc_team
                        self.goods = result.goods
                        self.pic = result.pic
                        self.goods_total = result.goods_total
                        if(result.evaluate!=null){
                             self.evaluate = result.evaluate
                        }
                        
                    } else {
                        self.alertText = msg;
                        self.alertShow = true;
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            imgPrifix(){
                return api.imgPrifix();
            }
        },
        mounted() {
            this.$_ajax_ins_info();
        },
        components: {
            top,
            Group,
            Cell,
            CellFormPreview,
            XSwitch,
            XDialog,
            XButton,
            Qrcode,
            Popup,
            Alert,
            defaultImg,
            star,
            commentInfo,
            product
        }
    }
</script>
<style>
    .weui-cells {
        font-size: 0.3rem!important;
        padding: 0 0.2rem!important;
    }
    .hospital-detail {
        padding-top: 0.72rem;
        background-image: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/blue-bg-533e01b577.png);
        background-size: 100% auto;
        padding-bottom: 0.20rem;
    }
    .hospital-detail section {
        width: 7.10rem;
        box-sizing: border-box;
        margin: 0 auto;
        border-radius: 0.08rem;
        text-align: center;
    }
    .hospital-detail section .w-top {
        position: relative;
        padding-top: 1.20rem;
        padding-bottom: 0.24rem;
        border-radius: 0.08rem 0.08rem 0 0;
    }
    .hospital-detail section .logo {
        position: absolute;
        top: -0.42rem;
        left: 50%;
        height: 1.20rem;
        width: 1.20rem;
        border: 0.08rem solid #fff;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        margin-left: -0.64rem;
        z-index: 3;
    }
    .hospital-detail section .logo .doctor-c,
    .hospital-detail section .logo .v-icon {
        display: block;
        position: absolute;
        bottom: -0.14rem;
        left: 0.10rem;
    }
    .v-icon.v-icon-1 {
        background: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/yimei-9818547328.png) no-repeat center;
        background-size: auto 100%;
    }
    .v-icon {
        width: 1.00rem;
        height: 0.32rem;
        display: inline-block;
        vertical-align: middle;
    }
    .hospital-detail section .title {
        padding: 0 0.30rem 0 0.20rem;
        margin-bottom: 0.20rem;
        font-size: 0.36rem;
        line-height: 0.50rem;
        color: #333;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        word-break: break-word;
    }
    .hospital-detail section .comment-box {
        color: #777;
        letter-spacing: 0;
        line-height: 0.24rem;
        margin-bottom: 0.20rem;
    }
    .star-bg {
        width: 1.56rem;
        margin-right: 0.20rem;
        background-image: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/star-b79c6c6e97.png);
    }
    .star-bg,
    .star-bg .star-red {
        display: inline-block;
        height: 0.26rem;
        background-repeat: no-repeat;
        background-size: 1.56rem auto;
    }
    .star-bg .star-red {
        float: left;
        background-image: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/star-on-1b4456c652.png);
    }
    .star-bg,
    .star-bg .star-red {
        display: inline-block;
        height: 0.26rem;
        background-repeat: no-repeat;
        background-size: 1.56rem auto;
    }
    .hospital-detail section .comment-info {
        color: #777;
        font-size: 0.24rem;
        margin: 0 0 0.20rem auto;
    }
    .hospital-detail section .ls-box {
        text-align: center;
        overflow: hidden;
        font-size: 0.26rem;
        line-height: 0.26rem;
        color: #777;
        padding: 0 0.30rem;
        margin-top: 0.5rem;
    }
    .hospital-detail section .ls-box .child-ls {
        width: 50%;
        display: block;
        float: left;
    }
    .hospital-detail section .ls-box-rows {
        width: 100%;
        height: 0.24rem;
        background: url(//mstatic.soyoung.com/m/static/fe_m/view/hospital/img/hr-bg-3a83dd752f.png) no-repeat center;
        background-size: 100% auto;
    }
    .hospital-detail section .w-bot {
        padding-top: 0.10rem;
        padding-bottom: 0.24rem;
        border-radius: 0 0 0.08rem 0.08rem;
    }
    .hospital-detail section .w-bot,
    .hospital-detail section .w-top {
        background: #fff;
    }
    .hospital-detail .bottom-ls {
        font-size: 0.24rem;
        text-align: center;
        overflow: hidden;
    }
    .hospital-detail .bottom-ls .child-ls {
        width: 33.3%;
        display: block;
        float: left;
        color: #333;
        line-height: 0.42rem;
    }
    .hospital-detail section .ls-box .child-ls span:first-child {
        padding-bottom: 0.10rem;
        line-height: 0.40rem;
        font-size: 0.40rem;
        color: #333;
        height: 0.40rem;
    }
    .fs3,
    .hospital-detail section .ls-box .child-ls span {
        font-size: 0.24rem;
        color: #777;
    }
    .hospital-detail section .ls-box span {
        display: block;
        text-align: center;
    }
    .main {
        background: #f3f7f7;
        overflow-x: hidden;
    }
    .main section.recommend-box {
        padding-top: 0.40rem;
    }
    section.map-point-nav {
        padding-left: 0;
    }
    .main section .footer {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.30rem;
        color: #2cc7c5;
        letter-spacing: 0;
        text-align: center;
        display: block;
    }
    .border-bot,
    .border-l,
    .border-r,
    .border-top {
        position: relative;
    }
    .main section.map-point-nav .tomap {
        height: 100%;
        width: 100%;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .main section.map-point-nav .tomap .son-box {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
    }
    .layout-box .son-box {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 100%;
        position: relative;
    }
    .iconfont {
        font-family: "iconfont" !important;
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .border-bot,
    .border-l,
    .border-r,
    .border-top {
        position: relative;
    }
    .main section.recommend-box .box-ls ul {
        overflow: hidden;
        padding: 0 0.30rem;
    }
    .main section.recommend-box .box-ls .part {
        padding: 0.30rem 0;
    }
    .border-bot,
    .border-l,
    .border-r,
    .border-top {
        position: relative;
    }
    .layout-box {
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
    }
    .main section.recommend-box .box-ls img {
        width: 1.52rem;
        height: 1.52rem;
        margin-right: 0.30rem;
        border-radius: 0.08rem;
    }
    .main section.recommend-box .box-ls .son-box {
        position: relative;
    }
    .layout-box .son-box {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 100%;
        position: relative;
    }
    .main section.recommend-box .box-ls .tit {
        color: #333;
        font-size: 0.30rem;
        line-height: 0.36rem;
    }
    .rowTwo {
        -webkit-line-clamp: 2;
    }
    .main section.recommend-box .box-ls .text {
        position: absolute;
        bottom: 0.44rem;
        left: 0;
        color: #777;
        font-size: 0.24rem;
    }
    .rowOne,
    .rowSix,
    .rowTwo {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
    .rowOne {
        -webkit-line-clamp: 1;
    }
    .main section.recommend-box .box-ls .bot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 0.24rem;
        color: #ff4c6e;
    }
    .fl,
    .main section.teacher-box ul.teacher.one .right {
        float: left;
    }
    .main section.recommend-box .box-ls .bot .fr {
        color: #777;
        line-height: 0.40rem;
    }
    .fr {
        float: right;
    }
    .main section {
        background: #fff;
        margin-bottom: 0.20rem;
        font-size: 0.36rem;
    }
    .main section .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    .main section .title .right {
        display: inline-block;
        float: right;
        font-size: 0.24rem;
        color: #777;
    }
    .fr {
        float: right;
    }
    .main section.teacher-box ul.teacher {
        -webkit-overflow-scrolling: touch;
        padding: 0.70rem 0.30rem 0.30rem 0;
    }
    .main section.teacher-box ul.teacher li {
        display: inline-block;
        width: 2.50rem;
        height: 1.40rem;
        background: #f3f7f7;
        border-radius: 0.10rem;
        position: relative;
        padding-top: 1.00rem;
        vertical-align: top;
    }
    .main section.teacher-box ul.teacher li .img-box {
        width: 1.20rem;
        height: 1.20rem;
        position: absolute;
        top: -0.50rem;
        left: 50%;
        margin-left: -0.60rem;
        display: block;
    }
    .main section.teacher-box ul.teacher li .tit {
        text-align: center;
        font-size: 0.30rem;
        color: #333;
        line-height: 0.32rem;
    }
    .main section.teacher-box ul.teacher li span {
        display: block;
        font-size: 0.24rem;
        color: #333;
        text-align: center;
        line-height: 0.52rem;
    }
    .main section.teacher-box ul.teacher li span {
        display: block;
        font-size: 0.24rem;
        color: #333;
        text-align: center;
        line-height: 0.52rem;
    }
    .main section.business-box ul.imgs {
    padding: 0.28rem 0 0.28rem 0.30rem;
}


.main section.business-box ul.imgs, .main section.teacher-box ul.teacher {
    width: 100%;
    white-space: nowrap;
    /* overflow-x: scroll;
    overflow-y: hidden; */
    box-sizing: border-box;
}

.border-bot, .border-l, .border-r, .border-top {
    position: relative;
}
.main section.business-box ul.imgs li, .main section.business-box ul.imgs li img {
    width: 1.92rem;
    height: 1.92rem;
    border-radius: 0.10rem;
}
.main section.business-box ul.imgs li:last-child {
    position: relative;
}
.main section.business-box ul.imgs li:last-child .chinese {
    position: absolute;
    top: 0;
    left: 0;
    width: 1.92rem;
    height: 1.92rem;
    display: block;
    font-size: 0.24rem;
    color: #333;
    text-align: center;
}
.main section.business-box ul.imgs li {
    display: inline-block;
    overflow: hidden;
    margin-right: 0.10rem;
}
.main section.business-box ul.imgs li, .main section.business-box ul.imgs li img {
    width: 1.92rem;
    height: 1.92rem;
    border-radius: 0.10rem;
}
.swipe-item, img {
    cursor: pointer;
}
.main section.business-box .business-info {
    font-size: 0.30rem;
    color: #777;
    letter-spacing: 0;
    line-height: 0.30rem;
    padding: 0.20rem 0.30rem 0.30rem;
}
.main section.business-box ul.imgs li:last-child .chinese span {
    display: block;
    padding-top: 0.70rem;
}
.main section.business-box ul.imgs li:last-child .chinese .english {
    padding-top: 0;
    font-size: 0.16rem;
    color: #949494;
}

.main section.business-box ul.imgs li:last-child .chinese span {
    display: block;
    padding-top: 0.70rem;
}
</style>