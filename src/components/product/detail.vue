<template>
    <div id="product">
        <!--头部-->
        <top :title="title"></top>
        <swiper :slidOptions="swiperOption" :slides="slides"></swiper>
        <!--商品名-->
        <div class="goods_title shrink">
            {{result['goods_name']}} 【{{result['cat_name']}}】【{{result['cat_desc']}}】 {{result['sort_desc']}}
        </div>
        <!--价格-->
        <div class="other shrink">
            <div class="other_money">
                <em><i style="font-size: 0.2rem; padding-right: 4px">￥</i> {{result['pifa_price']}}</em>
                <em class="vip_price">￥ {{result['market_price']}}</em>
            </div>
        </div>
        <!--医院-->
        <div class="hospital shrink">
            <router-link :to="{name:'hospitalDetail',params:{ins_id:ins_id}}">
                <!-- <img :src="getImgUrl()+hospital.profile_photo" class="hospital_icon"> -->
                <div class="hospital_icon">

                <defaultImg :imgPath="hospital.profile_photo"></defaultImg>
                </div>
                <div class="hospital_text">
                    <p>
                        <span>{{hospital.name}}</span>
                        <img src="//mstatic.soyoung.com/m/static/img/product/yimei.png" alt="">
                    </p>
                    <p>资质：{{hospital.institution_type_id==1?'公立':'民营'}}</p>
                    <p>地址：{{hospital.address}}</p>
                </div>
                <!-- <span class="iconfont icon-right arrow"></span> -->
            </router-link>
        </div>
        <!--医生-->
        <div class="shrink">
            <router-link :to="{name:'doctorDetail',params:{doc_id:doctor_info.id,ins_id:ins_id}}" class="little-hospital-title border-1px">
                <span class="title">
                        <span>医生 :{{doctor_info.name}} </span>
                <span style="font-size:0.2rem; color: #999">
                        擅长：<productItem :items="doctor_info.expert_project_classify3_id" class="product_item"></productItem>
                    </span>
                </span>
                <span class="zk-icon-jiantou arrow"></span>
            </router-link>
        </div>
        <!--详情-->
        <div class="main on shrink" style="margin-top: 0.5rem;">
            <tab :line-width="1" custom-bar-width="60px">
                <tab-item selected @on-item-click="onItemClick">详情</tab-item>
                <tab-item @on-item-click="onItemClick">评论</tab-item>
                <tab-item @on-item-click="onItemClick">日记</tab-item>
            </tab>
            <div id="detail" v-html="result.goods_desc" v-show="surrentTab==0">
                {{result.goods_desc}}
            </div>
            <div id="comment" v-show="surrentTab==1">
                <p>暂时没有评论哦</p>
            </div>
            <div id="diary" v-show="surrentTab==2">
                <!-- 商家日记 -->
                <section class="diary-box">
                    <div class="title border-bot">商家日记
                        <router-link :to="{name:'proDiary',query:{cid:cid}}" class="fr right">
                            查看更多日记
                                <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
                        </router-link>
                    </div>
                    <diary :cid=cid :once = 2 :query=true></diary>
                </section>
                
            </div>
        </div>
        <!--底部-->
        <div class="order border-1px">
            <div class="order-table">
                <div class="p1">
                    <p style="padding-bottom: 0.1rem;"> 预约金:<span style="visibility: hidden">金</span><span class="order-price">￥ {{result.deposit_price}}</span> </p>
                    <p>到院再付:<span style="color: #333">￥ {{result.pifa_price-result.deposit_price}}</span></p>
                </div>
                <p class="p4">
                    <a @click="$_ajax_add_card()">提交订单</a>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Loading from '@/widget/loading'
    import api from "../../api/search"
    import goods_api from "../../api/goods"
    import swiper from '@/components/slide/index.vue'
    import productItem from "@/components/decorate/product_item.vue";
    import top from "@/components/decorate/top_back_title.vue";
    import diary from './../diary/diary_list'
     import defaultImg from "@/components/decorate/default_img.vue";
    import {
        Tab,
        TabItem
    } from 'vux'
    export default {
        data() {
            return {
                id: this.$route.params.id,
                ins_id: this.$route.params.ins_id,
                result: [],
                slides: [],
                hospital: [],
                doctor_info: [],
                //轮播config
                swiperOption: {
                    pagination: '.swiper-pagination',
                    direction: 'horizontal',
                    autoplay: 3000,
                    pagination: {
                        el: '.swiper-pagination'
                    },
                },
                title: '商品详情',
                surrentTab: 0,
                cid:"",
            }
        },
        methods: {
            $_ajax_product_detail() {
                var self = this;
                api.ajaxProduct({
                    id: this.id,
                    ins_id: this.ins_id
                }).then(res => {
                    if (res.data == '') {
                        alert('你请求的商品不存啊@！')
                        this.$router.back(-1)
                    }
                    self.slides = res.data.gallery;
                    self.result = res.data.goodsinfo;
                    self.hospital = res.data.institution_info[0];
                    self.doctor_info = res.data.doctor_info;
                    self.cid = res.data.goodsinfo.cat_id;
                }).catch(error => {
                    console.log(error);
                })
            },
            getImgUrl() {
                return api.imgUrl();
            },
            $_ajax_add_card() {
                var self = this;
                var goods = Object();
                goods.goods_id = this.result.goods_id;
                goods.price = this.result.pifa_price;
                goods.deposit_price = this.result.deposit_price;
                goods.market_price = this.result.market_price;
                goods.merchant_id = this.result.merchant_id;
                goods_api.addCard({
                    goods: goods
                }).then(res => {
                    var result = res.data;
                    var code = result.error + '';
                    var msg = result.message
                    switch (code) {
                        case '2':
                            alert(msg)
                            break;
                        case '44':
                            alert(msg)
                            break;
                        case '3':
                            alert(msg)
                            break;
                        case '0':
                            self.$router.push({
                                name: 'mycart'
                            })
                            break;
                        case '88':
                            self.$router.push({
                                name: 'login'
                            })
                            break;
                    }
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            },
            getCookie(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                if (arr = document.cookie.match(reg))
                    return (arr[2]);
                else
                    return null;
            },
            onItemClick(index) {
                this.surrentTab = index;
            }
        },
        created() {
            this.$_ajax_product_detail();
            
        },
       
        components: {
            swiper,
            productItem,
            top,
            Tab,
            TabItem,
            diary,
            defaultImg
        }
    }
</script>
<style>
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
<<<<<<< HEAD
    .vux-tab .vux-tab-item {
        font-size: 0.3rem!important;
    }
    .vux-tab-wrap {
        padding: 0.5rem 0!important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
    .vux-tab-bar-inner {
        background-color: #ff5370!important;
    }
            /* defaultImg
        }
    } */
=======
>>>>>>> d9ec916ec5e31bc106023afc9e45860317d411fe
</style>
<style scoped>
    .shrink {
        padding: 0 0.2rem;
    }
    
    .goods_title {
        padding: 10px 13px 0;
        font-size: 0.3rem;
        color: #000;
    }
    .other {
        /* padding: .1rem; */
        overflow: hidden;
    }
    .other_money {
        text-align: left;
        padding-bottom: .1rem;
        width: 100%;
    }
    .other_money em {
        font-size: 0.4rem;
        color: #ff527f;
        display: inline-block;
        font-style: normal;
    }
    .other_money .vip_price {
        font-size: .3rem;
        color: #333;
    }
    .hospital {
        height: 2rem;
        padding-top: 0.5rem;
    }
    .hospital_icon {
        width: 1rem;
        height: 1rem;
        border-radius: 1rem;
        float: left;
        margin-right: .2rem;
    }
    .hospital_text {
        width: 5rem;
        float: left;
    }
    .hospital_text p {
        font-size: .25rem;
        color: #949494;
        line-height: 200%;
    }
    .hospital_text span {
        display: inline-block;
        width: 5rem;
        color: #333;
        font-size: 0.3rem;
    }
    .hospital_text img {
        float: right;
        width: 1rem;
    }
    .little-hospital-title {
        display: block;
        line-height: 40px;
        padding: 0 .2rem;
        font-size: 0.25rem;
        color: #777;
    }
    .border-1px {
        position: relative;
    }
    .little-hospital-title .arrow {
        margin-top: 0;
    }
    .arrow {
        font-size: .4rem;
        float: right;
        margin-top: .5rem;
        color: #B8B8B8;
    }
    .order {
        background: #fff;
        position: fixed;
        bottom: 0;
        z-index: 1000;
    }
    .order,
    .order .order-table {
        width: 100%;
        height: 1.04rem;
    }
    .order .order-table .p1 {
        position: relative;
        text-align: left;
        width: 40%;
        line-height: .3rem;
        font-size: .3rem;
        color: #777;
        border-right: 1px solid #f0f0f0;
        min-width: 0.5rem;
        float: left;
        padding: 0.2rem 0.2rem;
    }
    .order .order-table .p1 .order-price {
        color: #ff527f;
        font-size: .3rem;
    }
    .order .order-table .p1 .tos_btn {
        font-size: .4rem;
        color: #fe8da3;
        vertical-align: baseline;
        position: relative;
        top: -1px;
    }
    .iconfont {
        font-size: 16px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .order .order-table td {
        text-align: center;
        vertical-align: middle;
    }
    .order .order-table .p2 {
        width: 15%;
        font-size: 10px;
        color: #777;
        min-width: 44px;
    }
    .zixun-wrapper {
        border-right: 1px solid #f0f0f0;
    }
    .order .order-table .p2 {
        width: 12%;
        font-size: 10px;
        color: #777;
        min-width: 44px;
    }
    .order .order-table .p4 {
        width: 3rem;
        height: 1rem;
        line-height: 1rem;
        background-color: #fc5d7b;
        font-size: 0.3rem;
        float: right;
        text-align: center;
    }
    .order .order-table .p3 a,
    .order .order-table .p4 a {
        color: #fff;
        margin: 0;
        font-size: 100%;
        vertical-align: baseline;
        text-decoration: none;
    }
    .product_item {
        font-size: 0.2rem;
        color: rgb(153, 153, 153);
        display: inline;
    }
    .main {
        overflow: hidden;
        font-size: 0.4rem;
        margin-bottom: 1.5rem;
        min-height: 7rem;
    }
    
</style>