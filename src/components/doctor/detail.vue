<template>
    <div id="doctor_info">
        <!-- 头部 -->
        <top title="医生详情"></top>
        <!-- 医生详情头部 -->
        <article class="hospital-detail">
            <section class="sec-info">
                <div class="w-top">
                    <div class="logo">
                        <defaultImg :imgPath="doc_info['avatar']"></defaultImg>
                        <!-- 认证 --><span class="v-icon v-icon-1"></span></div>
                    <p class="title">{{doc_info['name']}}</p>
                    <!-- 关注详情 -->
                    <!-- 评价 -->
                    <div class="comment-box">
                        <div class="star-bg">
                            <star :star="evaluate['total_evaluate']"></star>
                        </div>
                    </div>
                    <div class="comment-info">
                       <p>执业资格证编号：{{doc_info['serial_number']}}</p>
                    </div>
                    <div class="ls-box">
                         <router-link :to="{name:'DocImgList',params:{doc_id:doc_info['id'],tab:1}}">
                          <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" class="zk-icon-tukuxiangce"></span><span>医生相册</span></a>
                        </router-link>
                        <router-link :to="{name:'DocLicence',params:{doc_id:doc_info['id'],tab:0}}">
                          <a class="child-ls" href="#"><span style="font-size: 0.5rem;display: block;" class="zk-icon-yingyezhizhao"></span><span>职业证书</span></a>
                        </router-link>

                    </div>
                </div>
                <!-- 虚线 -->
                <div class="ls-box-rows"></div>
              
            </section>
        </article>
        <!-- 内容 -->
        <div class="main">
            <!-- 所在医院 -->
            <group>
                <cell :title="ins_info['name']" value="详情" is-link :link="{name:'hospitalDetail',params:{ins_id:ins_info['id']}}">
                </cell>
            </group>
             <!-- 商品列表 -->
            <section class="recommend-box">
                <div class="box-ls border-bot" id="tpl-1">
                    <product v-if="goods.length!=0" :list="goods"></product>
                     <router-link :to="{name:'productList',params:{id:doc_id,type:2,name:doc_info['name']}}" class="footer border-top">
                                  查看全部{{goods_total}}个商品
                     </router-link>
                </div>
            </section>
            <!-- 医生日记 -->
            <section class="diary-box">
                <div class="title border-bot">商家日记
                     <router-link :to="{name:'doctorDiary',query:{doc_id:doc_id}}" class="fr right">
                         查看更多日记
                            <i class="zk-icon-jiantou" style="font-size: 0.3rem;"></i>
                     </router-link>
                </div>
                
                <diary :docId=doc_id :number = 1 :query=true></diary>
            </section>
        </div>
        <div id="fill"></div>
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
    import api from "../../api/doctor";
    import top from "@/components/decorate/top_back_title.vue";
    import star from "@/components/decorate/star.vue";
    import commentInfo from "@/components/decorate/comment_info.vue";
    import product from '@/components/product/list.vue'
    import diary from '@/components/diary/diary_list.vue';
    export default {
        data() {
            return {
                doc_id: this.$route.params.doc_id,
                ins_id:this.$route.params.ins_id,
                ins_info: [],
                doc_info: [],
                goods: [],
                goods_total: 0,
                pic: [],
                alertShow: false,
                alerttType: 'wran',
                alertText: '',
                evaluate: [],
                page:0,
                num_lits:5
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
                api.doc_home({
                    id: this.doc_id,
                    ins_id:this.ins_id,
                    page:this.page++,
                    num_list:this.num_lits
                }).then(res => {
                    var result = res.data.data;
                    var errcode = res.data.error_code;
                    var msg = res.data.msg;
                    if (errcode == 0) {
                        self.ins_info = result.institution_info
                        self.doc_info = result.doc_info
                        self.pic = result.pic
                        self.goods_total = result.goods_total
                        // self.goods = result.goods
                        if(result.goods){
                            self.goods = self.goods.concat(result.goods);
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
            product,
            diary
        }
    }
</script>
<style>
 @import '../../assets/css/hospital.css';
</style>