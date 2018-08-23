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
            <div id="fill"></div>
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
 @import '../../assets/css/hospital.css';
</style>