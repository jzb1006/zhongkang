<template>
    <div id="SearchAll">
        <Product :list="productList"></Product>
        <doctor></doctor>
        <hospital></hospital>
        <div v-for="name in this.result.arrOrder" :key="name">
            <div v-if="name==='product_arr' && productList.length>0" class="wheadtitle">
                <h3>安心购</h3>
                <Product :list="productList"></Product>
                <a class="wbottomlink" href="javascript:void(0)" @click="changeTab(1)">查看全部{{result.product_arr.total}}件商品<!--查看更多安心购<i class="iconfont icon-right"></i>--></a>
            </div>
            <div v-else-if="name==='doctor_arr' && doctorList.length>0 " class="wheadtitle doctor-list">
                <h3>医生</h3>
                <div class="itembox">
                    <doctor v-for="item in doctorList" :key="item.doctor_id" :doctor="item" :doctorHit="doctorHit" />
                </div>
                <a v-if="result.doctor_arr && result.doctor_arr.total > 2" class="wbottomlink" href="javascript:void(0)" @click="changeTab(4)">查看更多医生<!--<i class="iconfont icon-right"></i>--></a>
            </div>
            <div v-else-if="name==='hospital_arr' && hospitalList.length>0" class="wheadtitle hospital-list">
                <h3>医院</h3>
                <div class="itembox">
                    <hospital v-for="item in hospitalList" :key="item.hospital_id" :hospital="item" :hospitalHit="hospitalHit" />
                </div>
                <a v-if="result.hospital_arr && result.hospital_arr.total > 2" class="wbottomlink" href="javascript:void(0)" @click="changeTab(3)">查看更多医院</a>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        mapState
    } from 'vuex'
    import Loading from '@/widget/loading'
    import api from "../../api/search";
    import Product from '@/components/product/list.vue'
    import doctor from '@/components/doctor/list.vue'
    import hospital from '@/components/hospital/list.vue'
    export default {
        name: 'searchAll',
        data() {
            return {
                result: {
                    "errorCode": 0,
                    "errorMsg": "success",
                    "responseData": {
                        "product_arr": {
                            "product": [{
                                    "pid": "61096",
                                    "product_type": "2",
                                    "hospital_id": "5663",
                                    "total_cnt": "0",
                                    "sold_cnt": "468",
                                    "title": "【水光针】广州美莱纳米微晶水光  深层补水直透肌底  肌肤变美看得见",
                                    "each_cnt": "0",
                                    "calendar_cnt": "10",
                                    "show_calendar_cnt": "30",
                                    "avg_score": "4.8",
                                    "marketing_language": "",
                                    "paystages_notice": "",
                                    "paystages_notice_android": "",
                                    "pay_stages_yn": 0,
                                    "wei_kuan_yn": 1,
                                    "wei_kuan": [
                                        "50减10"
                                    ],
                                    "wei_kuan_list": [
                                        "付尾款，最高立减￥10"
                                    ],
                                    "is_pin_tuan_yn": 0,
                                    "tuan": {},
                                    "pin_tuan": [],
                                    "on_sale_flag": "1",
                                    "price_online": "466",
                                    "price_deposit": "100",
                                    "price_origin": "2500",
                                    "vip_cut": 14,
                                    "vip_price_online": "452",
                                    "vip_price_deposit": "86",
                                    "is_vip": "1",
                                    "img_cover": "http:\/\/img2.soyoung.com\/post\/20180702\/4\/f53005a7e1b6d4ac38c13e8095775218.png",
                                    "order_cnt": 745,
                                    "gong_yn": "0",
                                    "ext": "",
                                    "bao_xian_yn": "0",
                                    "tj_order": "0",
                                    "security": "0",
                                    "sole": "0",
                                    "hospital_name": "广州美莱整形美容",
                                    "doctor": [{
                                            "doctor_id": "137329",
                                            "name_cn": "郑义",
                                            "paystages": "0"
                                        },
                                        {
                                            "doctor_id": "49359",
                                            "name_cn": "陈贵宗",
                                            "paystages": "0"
                                        }
                                    ],
                                    "doctor_name": "郑义",
                                    "ad_type": 0
                                },
                                {
                                    "pid": "116158",
                                    "product_type": "2",
                                    "hospital_id": "26634",
                                    "total_cnt": "0",
                                    "sold_cnt": "419",
                                    "title": "【水光针】私信送项目 欣菲聆玻尿酸水光针2ml 深层补水 招募眼、鼻、胸、脂肪模特",
                                    "each_cnt": "0",
                                    "calendar_cnt": "7",
                                    "show_calendar_cnt": "29",
                                    "avg_score": "4.8",
                                    "marketing_language": "",
                                    "paystages_notice": "",
                                    "paystages_notice_android": "",
                                    "pay_stages_yn": 0,
                                    "wei_kuan_yn": 0,
                                    "wei_kuan": [],
                                    "wei_kuan_list": [],
                                    "is_pin_tuan_yn": 0,
                                    "tuan": {},
                                    "pin_tuan": [],
                                    "on_sale_flag": "1",
                                    "price_online": "270",
                                    "price_deposit": "100",
                                    "price_origin": "1800",
                                    "vip_cut": 8,
                                    "vip_price_online": "262",
                                    "vip_price_deposit": "92",
                                    "is_vip": "1",
                                    "img_cover": "http:\/\/img2.soyoung.com\/post\/20180629\/6\/929c8e234f146d48685ed1f1ef652d12.png",
                                    "order_cnt": 898,
                                    "gong_yn": "0",
                                    "ext": "{\"source_id\":\"4\",\"strategy_id\":\"2\"}",
                                    "bao_xian_yn": "0",
                                    "tj_order": "0",
                                    "security": "0",
                                    "sole": "0",
                                    "hospital_name": "广州广美整形（旗舰店）",
                                    "doctor": [{
                                        "doctor_id": "73001",
                                        "name_cn": "伍明政",
                                        "paystages": "0"
                                    }],
                                    "doctor_name": "伍明政",
                                    "ad_type": 0
                                }
                            ],
                            "has_more": 1,
                            "total": 2565,
                            "filter": null
                        },
                        "hospital_arr": {
                            "version": "",
                            "total": 1645,
                            "has_more": 1,
                            "hospital_list": [{
                                    "hospital_id": "24402",
                                    "certified": "1",
                                    "certified_id": "9772830",
                                    "address": "广东省广州市海珠区新港西路1号银华大厦首层",
                                    "award_title": "",
                                    "award_url": "",
                                    "name_cn": "广州艺美医疗美容门诊部",
                                    "institution_type": "1",
                                    "icon": "http:\/\/img2.soyoung.com\/doctor\/20161117\/2\/20161117093122342_100_100.jpg",
                                    "avatar": {
                                        "ident": "lnimage",
                                        "zoom": "89%",
                                        "w": 100,
                                        "h": 100,
                                        "u": "http:\/\/img2.soyoung.com\/doctor\/20161117\/2\/20161117093122342_100_100.jpg"
                                    },
                                    "type": "医疗美容门诊部",
                                    "itemcount": "24357",
                                    "star": "4.9",
                                    "calendar_group_cnt": "640",
                                    "cloud_yn": "0",
                                    "hot_menu1": [{
                                            "menu1_id": "10001",
                                            "ordercount": "4265",
                                            "menu1_name": "眼部整形"
                                        },
                                        {
                                            "menu1_id": "10003",
                                            "ordercount": "5693",
                                            "menu1_name": "鼻部整形"
                                        },
                                        {
                                            "menu1_id": "10019",
                                            "ordercount": "2021",
                                            "menu1_name": "自体脂肪"
                                        }
                                    ],
                                    "products": [{
                                            "pid": "104027",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "15",
                                            "title": "【菲洛嘉】【暑期特惠立减300元】法国原装进口，菲洛嘉水光针3ml，美白补水，养护抗衰老",
                                            "each_cnt": "0",
                                            "calendar_cnt": "1",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "5.0",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "1000减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "0",
                                            "price_online": "2980",
                                            "price_deposit": "596",
                                            "price_origin": "5800",
                                            "vip_cut": 89,
                                            "vip_price_online": "2891",
                                            "vip_price_deposit": "507",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/1\/20180604152302233.png"
                                            },
                                            "order_cnt": 280,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "69513",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "679",
                                            "title": "【伊婉玻尿酸1ml】【爆款套餐】伊婉C玻尿酸+小气泡\/洁牙\/水光针，伊婉官方指定艺美名医注射更保障",
                                            "each_cnt": "0",
                                            "calendar_cnt": "38",
                                            "show_calendar_cnt": "38",
                                            "avg_score": "4.9",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {
                                                "product_tuan_id": "3020",
                                                "pid": "69513",
                                                "tuan_status_old": "0",
                                                "tuan_status": 3,
                                                "tuan_app_status": 0,
                                                "product_tuan_price": "688",
                                                "product_tuan_price_deposit": "137",
                                                "product_tuan_price_hospital": 551,
                                                "tuan_surplus_num": 0,
                                                "tuan_product_cnt": "2",
                                                "tuan_start_date": "2017-02-13 11:30:00",
                                                "tuan_end_date": "2017-02-15 10:00:00",
                                                "tuan_last_time": 0,
                                                "tuan_product_num": "44",
                                                "tuan_product_num_onsale": "38",
                                                "tuan_mount": "2",
                                                "product_tuan_time": "172800"
                                            },
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "980",
                                            "price_deposit": "196",
                                            "price_origin": "3800",
                                            "vip_cut": 29,
                                            "vip_price_online": "951",
                                            "vip_price_deposit": "167",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/3\/20180604160247973.png"
                                            },
                                            "order_cnt": 1680,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "1",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "69764",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "183",
                                            "title": "【水光针】欣菲聆水光针2ml,深层补水，感受丝滑蛋白肌，菁芙水光针买一送一，再送两次小气泡",
                                            "each_cnt": "0",
                                            "calendar_cnt": "14",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "4.9",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {
                                                "product_tuan_id": "10228",
                                                "pid": "69764",
                                                "tuan_status_old": "1",
                                                "tuan_status": 3,
                                                "tuan_app_status": 0,
                                                "product_tuan_price": "398",
                                                "product_tuan_price_deposit": "100",
                                                "product_tuan_price_hospital": 298,
                                                "tuan_surplus_num": 0,
                                                "tuan_product_cnt": "5",
                                                "tuan_start_date": "2018-04-12 00:00:00",
                                                "tuan_end_date": "2018-04-18 23:59:59",
                                                "tuan_last_time": 0,
                                                "tuan_product_num": "50",
                                                "tuan_product_num_onsale": "50",
                                                "tuan_mount": "1",
                                                "product_tuan_time": "172800"
                                            },
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "399",
                                            "price_deposit": "100",
                                            "price_origin": "1980",
                                            "vip_cut": 12,
                                            "vip_price_online": "387",
                                            "vip_price_deposit": "88",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/1\/20180604155621644.png"
                                            },
                                            "order_cnt": 904,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "56813",
                                                    "name_cn": "袁媛",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55766",
                                                    "name_cn": "李闯",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "袁媛"
                                        },
                                        {
                                            "pid": "72259",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "501",
                                            "title": "【海薇玻尿酸1ml】【下单有礼】买海薇就送水光针\/韩国小气泡\/洗牙，海薇M+特惠限时880元抢购中",
                                            "each_cnt": "0",
                                            "calendar_cnt": "10",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "4.7",
                                            "marketing_language": "明星网红都在打的玻尿酸",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "428",
                                            "price_deposit": "100",
                                            "price_origin": "2200",
                                            "vip_cut": 13,
                                            "vip_price_online": "415",
                                            "vip_price_deposit": "87",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/0\/20180604154728608.png"
                                            },
                                            "order_cnt": 1124,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        }
                                    ]
                                },
                                {
                                    "hospital_id": "130",
                                    "certified": "1",
                                    "certified_id": "1078",
                                    "address": "广州市越秀区环市东路360号",
                                    "award_title": "",
                                    "award_url": "",
                                    "name_cn": "广州紫馨韩国定制整形美容",
                                    "institution_type": "1",
                                    "icon": "http:\/\/img2.soyoung.com\/doctor\/20161201\/2\/20161201114806889_100_100.jpg",
                                    "avatar": {
                                        "ident": "lnimage",
                                        "zoom": "89%",
                                        "w": 100,
                                        "h": 100,
                                        "u": "http:\/\/img2.soyoung.com\/doctor\/20161201\/2\/20161201114806889_100_100.jpg"
                                    },
                                    "type": "医疗美容门诊部",
                                    "itemcount": "17929",
                                    "star": "4.9",
                                    "calendar_group_cnt": "653",
                                    "cloud_yn": "0",
                                    "hot_menu1": [{
                                            "menu1_id": "10006",
                                            "ordercount": "4385",
                                            "menu1_name": "面部轮廓"
                                        },
                                        {
                                            "menu1_id": "10003",
                                            "ordercount": "3403",
                                            "menu1_name": "鼻部整形"
                                        },
                                        {
                                            "menu1_id": "10020",
                                            "ordercount": "633",
                                            "menu1_name": "玻尿酸"
                                        }
                                    ],
                                    "products": [{
                                            "pid": "35931",
                                            "product_type": "2",
                                            "hospital_id": "130",
                                            "total_cnt": "0",
                                            "sold_cnt": "153",
                                            "title": "【水光针】润百颜水光针 补水嫩肤加美白配方限时特价888！不限购！！限额100名",
                                            "each_cnt": "0",
                                            "calendar_cnt": "17",
                                            "show_calendar_cnt": "19",
                                            "avg_score": "4.9",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "800减200",
                                                "560减100",
                                                "51减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥200",
                                                "付尾款，最高立减￥100",
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "888",
                                            "price_deposit": "178",
                                            "price_origin": "2100",
                                            "vip_cut": 27,
                                            "vip_price_online": "861",
                                            "vip_price_deposit": "151",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180522\/3\/20180522201234106.png"
                                            },
                                            "order_cnt": 589,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州紫馨韩国定制整形美容",
                                            "doctor": [{
                                                "doctor_id": "49319",
                                                "name_cn": "肖和",
                                                "paystages": "0"
                                            }],
                                            "doctor_name": "肖和"
                                        },
                                        {
                                            "pid": "56505",
                                            "product_type": "2",
                                            "hospital_id": "130",
                                            "total_cnt": "0",
                                            "sold_cnt": "14",
                                            "title": "【水光针】无针水光护理3次 深层补水保湿 肌肤如女神般水嫩超Q弹",
                                            "each_cnt": "0",
                                            "calendar_cnt": "0",
                                            "show_calendar_cnt": "2",
                                            "avg_score": "0.0",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "800减200",
                                                "560减100",
                                                "51减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥200",
                                                "付尾款，最高立减￥100",
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "0",
                                            "price_online": "888",
                                            "price_deposit": "178",
                                            "price_origin": "4000",
                                            "vip_cut": 27,
                                            "vip_price_online": "861",
                                            "vip_price_deposit": "151",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180522\/2\/20180522195709843.png"
                                            },
                                            "order_cnt": 179,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州紫馨韩国定制整形美容",
                                            "doctor": [{
                                                "doctor_id": "49319",
                                                "name_cn": "肖和",
                                                "paystages": "0"
                                            }],
                                            "doctor_name": "肖和"
                                        },
                                        {
                                            "pid": "151583",
                                            "product_type": "2",
                                            "hospital_id": "130",
                                            "total_cnt": "0",
                                            "sold_cnt": "64",
                                            "title": "【水光针】年中大促特惠价299 不限购！全效水光针 深层补水 【皮肤美容明星机构专享】",
                                            "each_cnt": "0",
                                            "calendar_cnt": "7",
                                            "show_calendar_cnt": "9",
                                            "avg_score": "4.2",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "51减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "299",
                                            "price_deposit": "100",
                                            "price_origin": "1300",
                                            "vip_cut": 9,
                                            "vip_price_online": "290",
                                            "vip_price_deposit": "91",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180713\/2\/7f140cd55f5958e3355ac0271b388572.png"
                                            },
                                            "order_cnt": 144,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州紫馨韩国定制整形美容",
                                            "doctor": [{
                                                "doctor_id": "49319",
                                                "name_cn": "肖和",
                                                "paystages": "0"
                                            }],
                                            "doctor_name": "肖和"
                                        },
                                        {
                                            "pid": "76102",
                                            "product_type": "2",
                                            "hospital_id": "130",
                                            "total_cnt": "0",
                                            "sold_cnt": "3",
                                            "title": "【祛眼袋】新氧名医@谷琪 专注祛眼袋20年 30分钟一次消除 下单即赠水光针",
                                            "each_cnt": "0",
                                            "calendar_cnt": "3",
                                            "show_calendar_cnt": "8",
                                            "avg_score": "0.0",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "2400减500",
                                                "800减200",
                                                "560减100",
                                                "51减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥500",
                                                "付尾款，最高立减￥200",
                                                "付尾款，最高立减￥100",
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "3230",
                                            "price_deposit": "646",
                                            "price_origin": "8800",
                                            "vip_cut": 97,
                                            "vip_price_online": "3133",
                                            "vip_price_deposit": "549",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180522\/1\/20180522194042747.png"
                                            },
                                            "order_cnt": 252,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州紫馨韩国定制整形美容",
                                            "doctor": [{
                                                "doctor_id": "138919",
                                                "name_cn": "谷琪",
                                                "paystages": "0"
                                            }],
                                            "doctor_name": "谷琪"
                                        }
                                    ]
                                }
                            ],
                            "name": "水光针"
                        },
                        "doctor_arr": {
                            "version": "",
                            "total": 1872,
                            "has_more": 1,
                            "doctor_list": [{
                                    "doctor_id": "55769",
                                    "occup_type": "1",
                                    "certified": "1",
                                    "certified_id": "10722385",
                                    "avatar": {
                                        "ident": "lnimage",
                                        "zoom": "89%",
                                        "w": 100,
                                        "h": 100,
                                        "u": "http:\/\/img2.soyoung.com\/doctor\/20170929\/7\/20170929160304736_100_100.jpg"
                                    },
                                    "name_cn": "张涛",
                                    "icon": "http:\/\/img2.soyoung.com\/doctor\/20170929\/7\/20170929160304736.jpg",
                                    "calendar_group_cnt": "251",
                                    "hospital_name": "广州艺美医疗美容门诊部",
                                    "hospital_id": "24402",
                                    "star": 5,
                                    "countmenu1": "18545",
                                    "hotmenu1": [{
                                            "menu1_id": "10003",
                                            "ordercount": "3185",
                                            "menu1_name": "鼻部整形"
                                        },
                                        {
                                            "menu1_id": "10008",
                                            "ordercount": "1510",
                                            "menu1_name": "胸部整形"
                                        },
                                        {
                                            "menu1_id": "10000",
                                            "ordercount": "4429",
                                            "menu1_name": ""
                                        }
                                    ],
                                    "zizhi": [{
                                        "doctor_id": "55769",
                                        "word_id": "130",
                                        "name": "主治医师"
                                    }],
                                    "award_title": "",
                                    "award_url": "",
                                    "juli": "",
                                    "products": [{
                                            "pid": "104027",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "15",
                                            "title": "【菲洛嘉】【暑期特惠立减300元】法国原装进口，菲洛嘉水光针3ml，美白补水，养护抗衰老",
                                            "each_cnt": "0",
                                            "calendar_cnt": "1",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "5.0",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "1000减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "0",
                                            "price_online": "2980",
                                            "price_deposit": "596",
                                            "price_origin": "5800",
                                            "vip_cut": 89,
                                            "vip_price_online": "2891",
                                            "vip_price_deposit": "507",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/1\/20180604152302233.png"
                                            },
                                            "order_cnt": 280,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "69513",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "679",
                                            "title": "【伊婉玻尿酸1ml】【爆款套餐】伊婉C玻尿酸+小气泡\/洁牙\/水光针，伊婉官方指定艺美名医注射更保障",
                                            "each_cnt": "0",
                                            "calendar_cnt": "38",
                                            "show_calendar_cnt": "38",
                                            "avg_score": "4.9",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {
                                                "product_tuan_id": "3020",
                                                "pid": "69513",
                                                "tuan_status_old": "0",
                                                "tuan_status": 3,
                                                "tuan_app_status": 0,
                                                "product_tuan_price": "688",
                                                "product_tuan_price_deposit": "137",
                                                "product_tuan_price_hospital": 551,
                                                "tuan_surplus_num": 0,
                                                "tuan_product_cnt": "2",
                                                "tuan_start_date": "2017-02-13 11:30:00",
                                                "tuan_end_date": "2017-02-15 10:00:00",
                                                "tuan_last_time": 0,
                                                "tuan_product_num": "44",
                                                "tuan_product_num_onsale": "38",
                                                "tuan_mount": "2",
                                                "product_tuan_time": "172800"
                                            },
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "980",
                                            "price_deposit": "196",
                                            "price_origin": "3800",
                                            "vip_cut": 29,
                                            "vip_price_online": "951",
                                            "vip_price_deposit": "167",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/3\/20180604160247973.png"
                                            },
                                            "order_cnt": 1680,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "1",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "72259",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "501",
                                            "title": "【海薇玻尿酸1ml】【下单有礼】买海薇就送水光针\/韩国小气泡\/洗牙，海薇M+特惠限时880元抢购中",
                                            "each_cnt": "0",
                                            "calendar_cnt": "10",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "4.7",
                                            "marketing_language": "明星网红都在打的玻尿酸",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "428",
                                            "price_deposit": "100",
                                            "price_origin": "2200",
                                            "vip_cut": 13,
                                            "vip_price_online": "415",
                                            "vip_price_deposit": "87",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/0\/20180604154728608.png"
                                            },
                                            "order_cnt": 1124,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        }
                                    ]
                                },
                                {
                                    "doctor_id": "139151",
                                    "occup_type": "1",
                                    "certified": "1",
                                    "certified_id": "14987669",
                                    "avatar": {
                                        "ident": "lnimage",
                                        "zoom": "89%",
                                        "w": 100,
                                        "h": 100,
                                        "u": "http:\/\/img2.soyoung.com\/doctor\/20180621\/4\/8bdf96a4421792490dd307cad760ccc0_100_100.jpg"
                                    },
                                    "name_cn": "汪坤",
                                    "icon": "http:\/\/img2.soyoung.com\/doctor\/20180621\/4\/8bdf96a4421792490dd307cad760ccc0.jpg",
                                    "calendar_group_cnt": "31",
                                    "hospital_name": "广州艺美医疗美容门诊部",
                                    "hospital_id": "24402",
                                    "star": 5,
                                    "countmenu1": "8478",
                                    "hotmenu1": [{
                                            "menu1_id": "10003",
                                            "ordercount": "5693",
                                            "menu1_name": "鼻部整形"
                                        },
                                        {
                                            "menu1_id": "10000",
                                            "ordercount": "4162",
                                            "menu1_name": ""
                                        },
                                        {
                                            "menu1_id": "10020",
                                            "ordercount": "1612",
                                            "menu1_name": "玻尿酸"
                                        }
                                    ],
                                    "zizhi": [],
                                    "award_title": "",
                                    "award_url": "",
                                    "juli": "",
                                    "products": [{
                                            "pid": "104027",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "15",
                                            "title": "【菲洛嘉】【暑期特惠立减300元】法国原装进口，菲洛嘉水光针3ml，美白补水，养护抗衰老",
                                            "each_cnt": "0",
                                            "calendar_cnt": "1",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "5.0",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 1,
                                            "wei_kuan": [
                                                "1000减50"
                                            ],
                                            "wei_kuan_list": [
                                                "付尾款，最高立减￥50"
                                            ],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "0",
                                            "price_online": "2980",
                                            "price_deposit": "596",
                                            "price_origin": "5800",
                                            "vip_cut": 89,
                                            "vip_price_online": "2891",
                                            "vip_price_deposit": "507",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/1\/20180604152302233.png"
                                            },
                                            "order_cnt": 280,
                                            "gong_yn": "0",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "69513",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "679",
                                            "title": "【伊婉玻尿酸1ml】【爆款套餐】伊婉C玻尿酸+小气泡\/洁牙\/水光针，伊婉官方指定艺美名医注射更保障",
                                            "each_cnt": "0",
                                            "calendar_cnt": "38",
                                            "show_calendar_cnt": "38",
                                            "avg_score": "4.9",
                                            "marketing_language": "",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {
                                                "product_tuan_id": "3020",
                                                "pid": "69513",
                                                "tuan_status_old": "0",
                                                "tuan_status": 3,
                                                "tuan_app_status": 0,
                                                "product_tuan_price": "688",
                                                "product_tuan_price_deposit": "137",
                                                "product_tuan_price_hospital": 551,
                                                "tuan_surplus_num": 0,
                                                "tuan_product_cnt": "2",
                                                "tuan_start_date": "2017-02-13 11:30:00",
                                                "tuan_end_date": "2017-02-15 10:00:00",
                                                "tuan_last_time": 0,
                                                "tuan_product_num": "44",
                                                "tuan_product_num_onsale": "38",
                                                "tuan_mount": "2",
                                                "product_tuan_time": "172800"
                                            },
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "980",
                                            "price_deposit": "196",
                                            "price_origin": "3800",
                                            "vip_cut": 29,
                                            "vip_price_online": "951",
                                            "vip_price_deposit": "167",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/3\/20180604160247973.png"
                                            },
                                            "order_cnt": 1680,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "1",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        },
                                        {
                                            "pid": "72259",
                                            "product_type": "2",
                                            "hospital_id": "24402",
                                            "total_cnt": "0",
                                            "sold_cnt": "501",
                                            "title": "【海薇玻尿酸1ml】【下单有礼】买海薇就送水光针\/韩国小气泡\/洗牙，海薇M+特惠限时880元抢购中",
                                            "each_cnt": "0",
                                            "calendar_cnt": "10",
                                            "show_calendar_cnt": "30",
                                            "avg_score": "4.7",
                                            "marketing_language": "明星网红都在打的玻尿酸",
                                            "paystages_notice": "",
                                            "paystages_notice_android": "",
                                            "pay_stages_yn": 0,
                                            "wei_kuan_yn": 0,
                                            "wei_kuan": [],
                                            "wei_kuan_list": [],
                                            "is_pin_tuan_yn": 0,
                                            "tuan": {},
                                            "pin_tuan": [],
                                            "on_sale_flag": "1",
                                            "price_online": "428",
                                            "price_deposit": "100",
                                            "price_origin": "2200",
                                            "vip_cut": 13,
                                            "vip_price_online": "415",
                                            "vip_price_deposit": "87",
                                            "is_vip": "1",
                                            "img_cover": {
                                                "ident": "lnimage",
                                                "w": "100",
                                                "h": "100",
                                                "u": "http:\/\/img2.soyoung.com\/post\/20180604\/0\/20180604154728608.png"
                                            },
                                            "order_cnt": 1124,
                                            "gong_yn": "0",
                                            "product_icon_yn": 0,
                                            "product_icon": "",
                                            "bao_xian_yn": "0",
                                            "tj_order": "0",
                                            "security": "0",
                                            "sole": "0",
                                            "hospital_name": "广州艺美医疗美容门诊部",
                                            "doctor": [{
                                                    "doctor_id": "139151",
                                                    "name_cn": "汪坤",
                                                    "paystages": "0"
                                                },
                                                {
                                                    "doctor_id": "55769",
                                                    "name_cn": "张涛",
                                                    "paystages": "0"
                                                }
                                            ],
                                            "doctor_name": "汪坤"
                                        }
                                    ]
                                }
                            ],
                            "name": "水光针"
                        },
                        "post_arr": {
                            "total": 2197,
                            "has_more": 1,
                            "child": {
                                "post": [{
                                        "ip": "221.222.128.152",
                                        "marrow_yn": "0",
                                        "create_time": "1532344058",
                                        "reply_locked_yn": "0",
                                        "ding_cnt": "0",
                                        "score": "0",
                                        "post_video_url": "",
                                        "source": "0",
                                        "del_admin_id": "0",
                                        "locked_yn": "0",
                                        "forbid_uid": "0",
                                        "anonymous": "0",
                                        "lou": "57",
                                        "view_cnt": "11201",
                                        "cover_img": "{\"url\":\"http:\\\/\\\/img2.soyoung.com\\\/tieba\\\/web\\\/20180718\\\/8\\\/ae74372a715d31878af06895ec02c8d4.jpg\",\"attr\":\"1756,2479\"}",
                                        "lou_update_date": "2018-07-04 12:12:13",
                                        "summary": "1.肉毒素兰州衡力2200保妥适48002.超声刀200003.热玛吉200004.下颌角540005.颧弓内推540006.下巴截骨前移400007.自体软骨垫鼻尖300008.半永久纹绣第一次5800半永久纹眉和美瞳线68009.脱发际线220010.水光针第一次500",
                                        "calendar_type": "0",
                                        "post_id": "19431137",
                                        "int_private": "0",
                                        "trans_time": "21小时前",
                                        "weight": "0",
                                        "sys_ver": 1,
                                        "up_cnt": "412",
                                        "sphinx_update": "2018-07-23 19:07:38",
                                        "create_date": "2018-07-04 12:09:27",
                                        "event_id": "0",
                                        "private": "0",
                                        "forbid_short_title": "",
                                        "reward_yn": "1",
                                        "topic": [{
                                            "id": "10053",
                                            "name": "我的美，明码标价"
                                        }],
                                        "mode": "1",
                                        "down_cnt": "0",
                                        "post_video_gif": [],
                                        "post_video_img": "",
                                        "app_id": "42",
                                        "uid": "1876816",
                                        "img_cnt": "0",
                                        "del_uid": "0",
                                        "update_date": "2018-07-23 19:07:38",
                                        "title": "24万哦~回顾下整形史",
                                        "money": "0",
                                        "comment_cnt": "77",
                                        "top_yn": "0",
                                        "display_yn": "1",
                                        "report_yn": "0",
                                        "post_video_img_width": "0",
                                        "videoDuration": "",
                                        "raw_title": "24万哦~回顾下整形史",
                                        "sys": "1",
                                        "post_video_img_height": "0",
                                        "related_id": "0",
                                        "pgc_yn": "0",
                                        "imgs": [{
                                                "w": 1756,
                                                "h": 2479,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180718\/8\/ae74372a715d31878af06895ec02c8d4_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180718\/8\/ae74372a715d31878af06895ec02c8d4.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180718\/8\/ae74372a715d31878af06895ec02c8d4_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180718\/8\/ae74372a715d31878af06895ec02c8d4.jpg"
                                            },
                                            {
                                                "w": 1932,
                                                "h": 2576,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/7\/08c140d51a636382287fdc12df3bc31c_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/7\/08c140d51a636382287fdc12df3bc31c.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/7\/08c140d51a636382287fdc12df3bc31c_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/7\/08c140d51a636382287fdc12df3bc31c.jpg"
                                            },
                                            {
                                                "w": 720,
                                                "h": 960,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/3\/0bbf39da57f29bb2c786d68dfc426814_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/3\/0bbf39da57f29bb2c786d68dfc426814.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/3\/0bbf39da57f29bb2c786d68dfc426814_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/3\/0bbf39da57f29bb2c786d68dfc426814.jpg"
                                            }
                                        ],
                                        "private_uid": "0",
                                        "post_video_yn": "0",
                                        "pgc_img": "",
                                        "waterfall_yn": "0",
                                        "post_type": "2",
                                        "down_time": "0",
                                        "topic_yn": "0",
                                        "user": {
                                            "uid": "1876816",
                                            "user_name": "雅琴Helen",
                                            "institution_type": 0,
                                            "certified_type": "0",
                                            "certified_id": "0",
                                            "level": "14",
                                            "daren_level": "",
                                            "daren_level_text": "",
                                            "avatar": {
                                                "ident": "lnimage",
                                                "zoom": "89%",
                                                "w": 57,
                                                "h": 57,
                                                "u": "http:\/\/tp1.sinaimg.cn\/1828175884\/180\/22835344107\/0"
                                            }
                                        },
                                        "is_favor": 0,
                                        "is_collect": 0,
                                        "is_forbid": 0,
                                        "tags": [{
                                                "id": "445",
                                                "name": "北京同城",
                                                "related_id": "445",
                                                "log": "http:\/\/img2.soyoung.com\/upload\/20160114\/1\/20160114160349796.png",
                                                "team_yn": "1",
                                                "type": "3",
                                                "team_related_id": "1"
                                            },
                                            {
                                                "id": "1500",
                                                "name": "社区活动",
                                                "related_id": "0",
                                                "log": "http:\/\/img2.soyoung.com\/upload\/20180608\/1\/20180608201402528.jpg",
                                                "team_yn": "1",
                                                "type": "4",
                                                "team_related_id": "0"
                                            }
                                        ],
                                        "img_list": [
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180718\/8\/ae74372a715d31878af06895ec02c8d4_301_301.jpg",
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/7\/08c140d51a636382287fdc12df3bc31c_301_301.jpg",
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180712\/3\/0bbf39da57f29bb2c786d68dfc426814_301_301.jpg"
                                        ],
                                        "user_level": "14",
                                        "daren_level": "",
                                        "daren_level_text": "",
                                        "avatar": {
                                            "ident": "lnimage",
                                            "zoom": "89%",
                                            "w": 57,
                                            "h": 57,
                                            "u": "http:\/\/tp1.sinaimg.cn\/1828175884\/180\/22835344107\/0"
                                        },
                                        "certified_type": "0",
                                        "certified_id": "0",
                                        "user_name": "雅琴Helen"
                                    },
                                    {
                                        "int_private": "0",
                                        "lou": "153",
                                        "post_video_gif": [],
                                        "sys_ver": 1,
                                        "calendar_type": "0",
                                        "anonymous": "0",
                                        "post_video_url": "",
                                        "event_id": "0",
                                        "report_yn": "0",
                                        "up_cnt": "117",
                                        "sys": "0",
                                        "create_time": "1532338699",
                                        "topic": [{
                                            "id": "10007",
                                            "name": "你想知道的医美知识都在这"
                                        }],
                                        "view_cnt": "41318",
                                        "reward_yn": "0",
                                        "ip": "111.207.103.106",
                                        "ding_cnt": "0",
                                        "down_time": "0",
                                        "pgc_img": "http:\/\/img2.soyoung.com\/post\/20180427\/4\/20180427143052749.jpg",
                                        "img_cnt": "0",
                                        "weight": "0",
                                        "comment_cnt": "254",
                                        "top_yn": "0",
                                        "sphinx_update": "2018-07-23 17:38:19",
                                        "display_yn": "1",
                                        "down_cnt": "0",
                                        "marrow_yn": "0",
                                        "source": "0",
                                        "summary": "说到补水，在尝试过面膜、护肤品、保养品齐上阵之后，收获的结果却是卵用没有。（摊手）这时候就别忙着心累了，跟着氧气姐的脚步，来了解下我们补水界的南波万——水光针。针对细纹、肤色暗淡、毛孔粗大等问题都可以轻松K.O的水光针还有两个小伙伴—无针水",
                                        "private_uid": "0",
                                        "reply_locked_yn": "0",
                                        "app_id": "0",
                                        "create_date": "2018-01-18 10:38:59",
                                        "post_video_img_width": "0",
                                        "post_video_img_height": "0",
                                        "post_type": "2",
                                        "lou_update_date": "2018-01-18 10:38:59",
                                        "score": "0",
                                        "related_id": "0",
                                        "cover_img": "{\"url\":\"http:\\\/\\\/img2.soyoung.com\\\/tieba\\\/web\\\/20180426\\\/9\\\/20180426205723909.gif\",\"attr\":\"474,237\"}",
                                        "money": "0",
                                        "update_date": "2018-07-23 17:38:19",
                                        "raw_title": "氧姐科普|水光还分这么多种？到底应该怎么选？",
                                        "forbid_uid": "0",
                                        "private": "0",
                                        "del_uid": "0",
                                        "pgc_yn": "1",
                                        "imgs": [{
                                                "w": 720,
                                                "h": 169,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130757367_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130757367.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130757367_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130757367.jpg"
                                            },
                                            {
                                                "w": 720,
                                                "h": 169,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130900770_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130900770.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130900770_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130900770.jpg"
                                            },
                                            {
                                                "w": 720,
                                                "h": 169,
                                                "u": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/3\/20180119130936396_301_301.jpg",
                                                "u_y": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/3\/20180119130936396.jpg",
                                                "u_j": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/3\/20180119130936396_152_152.jpg",
                                                "u_z": "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/3\/20180119130936396.jpg"
                                            }
                                        ],
                                        "trans_time": "23小时前",
                                        "post_id": "16613539",
                                        "mode": "0",
                                        "forbid_short_title": "",
                                        "videoDuration": "",
                                        "waterfall_yn": "0",
                                        "del_admin_id": "0",
                                        "post_video_yn": "0",
                                        "topic_yn": "0",
                                        "title": "氧姐科普|水光还分这么多种？到底应该怎么选？",
                                        "locked_yn": "0",
                                        "uid": "1758136",
                                        "post_video_img": "",
                                        "user": {
                                            "uid": "1758136",
                                            "user_name": "氧气姐",
                                            "institution_type": 0,
                                            "certified_type": "5",
                                            "certified_id": "0",
                                            "level": "20",
                                            "daren_level": "",
                                            "daren_level_text": "",
                                            "avatar": {
                                                "ident": "lnimage",
                                                "zoom": "89%",
                                                "w": 57,
                                                "h": 57,
                                                "u": "http:\/\/img2.soyoung.com\/user\/20180525\/7\/20180525140030398_64_64.jpg"
                                            }
                                        },
                                        "is_favor": 0,
                                        "is_collect": 0,
                                        "is_forbid": 0,
                                        "tags": [{
                                                "id": "445",
                                                "name": "北京同城",
                                                "related_id": "445",
                                                "log": "http:\/\/img2.soyoung.com\/upload\/20160114\/1\/20160114160349796.png",
                                                "team_yn": "1",
                                                "type": "3",
                                                "team_related_id": "1"
                                            },
                                            {
                                                "id": "831",
                                                "name": "护肤",
                                                "related_id": "831",
                                                "log": "http:\/\/img2.soyoung.com\/upload\/20170823\/3\/20170823165632982.jpg",
                                                "team_yn": "1",
                                                "type": "1",
                                                "team_related_id": "10010"
                                            },
                                            {
                                                "id": "1059",
                                                "name": "水光针",
                                                "related_id": "0",
                                                "log": "",
                                                "team_yn": "1",
                                                "type": "10",
                                                "team_related_id": "63"
                                            },
                                            {
                                                "id": "1063",
                                                "name": "整形纯干货",
                                                "related_id": "1063",
                                                "log": "http:\/\/img2.soyoung.com\/upload\/20160612\/5\/20160612180421511.jpg",
                                                "team_yn": "1",
                                                "type": "4",
                                                "team_related_id": "0"
                                            },
                                            {
                                                "id": "1114",
                                                "name": "水光娃娃",
                                                "related_id": "0",
                                                "log": "",
                                                "team_yn": "0",
                                                "type": "10",
                                                "team_related_id": "420"
                                            },
                                            {
                                                "id": "1120",
                                                "name": "无针水光针",
                                                "related_id": "0",
                                                "log": "",
                                                "team_yn": "0",
                                                "type": "10",
                                                "team_related_id": "426"
                                            },
                                            {
                                                "id": "1225",
                                                "name": "氧姐科普",
                                                "related_id": "1225",
                                                "log": "",
                                                "team_yn": "0",
                                                "type": "0",
                                                "team_related_id": "0"
                                            }
                                        ],
                                        "img_list": [
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130757367_301_301.jpg",
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/7\/20180119130900770_301_301.jpg",
                                            "http:\/\/img2.soyoung.com\/tieba\/web\/20180119\/3\/20180119130936396_301_301.jpg"
                                        ],
                                        "user_level": "20",
                                        "daren_level": "",
                                        "daren_level_text": "",
                                        "avatar": {
                                            "ident": "lnimage",
                                            "zoom": "89%",
                                            "w": 57,
                                            "h": 57,
                                            "u": "http:\/\/img2.soyoung.com\/user\/20180525\/7\/20180525140030398_64_64.jpg"
                                        },
                                        "certified_type": "5",
                                        "certified_id": "0",
                                        "user_name": "氧气姐"
                                    }
                                ]
                            }
                        },
                        "keyword": "水光针",
                        "uid": 0,
                        "arrOrder": [
                            "wiki_arr",
                            "product_arr",
                            "diary_arr",
                            "hospital_arr",
                            "doctor_arr",
                            "live_arr",
                            "video_arr",
                            "post_arr",
                            "user_arr"
                        ],
                        "hit_detail": {
                            "card": [{
                                "risk": "1、破皮；2、易感染；3、可能轻微过敏                                                          ",
                                "name": "水光针",
                                "dianping_price": "51899",
                                "effect_duration": "12-24个月",
                                "method_type": "[\"2\"]",
                                "dianping_score": "119",
                                "summary": "",
                                "dianping_cnt": "26",
                                "security": "5",
                                "price_max": "3000",
                                "name_alias": "",
                                "code": "",
                                "industrial_menu2_id": "20063",
                                "create_date": "2013-06-14 15:37:28",
                                "ksl_yn": "1",
                                "post_cnt": "0",
                                "calendar_group_cnt": "14286",
                                "stitches_day": "无",
                                "crowd": "由于皮肤干燥，出现面部皱纹者。\r\n希望拥有童颜者。",
                                "merit": "能短时间内快速补水，提高肌肤保湿锁水能力；\r\n淡化细纹色斑，改善干纹细纹，收缩毛孔，增加皮肤弹力；\r\n改善暗沉粗糙，被称为“玻尿酸拉皮术”。",
                                "order": "0",
                                "is_new": "0",
                                "duration": "30分钟",
                                "saas_item_id": "4",
                                "micro_yn": "2",
                                "menu1_id": "10010",
                                "menu2_id": "0",
                                "anesthesia": "局部麻醉",
                                "defect": "需要刺破皮肤透皮给药，有一定的疼痛感。",
                                "update_date": "2018-07-24 13:37:18",
                                "item_id": "63",
                                "treatment_times": "3-5次",
                                "hot": "1",
                                "calendar_score": "12920",
                                "keywords": "嫩肤水光治疗美白,水光针,美白",
                                "method": "利用非交联透明质酸、肉毒素、胶原蛋白、PRP、DNA（后两者国内尚未获批）直接对皮肤进行注射，能够让面部皮肤水润柔嫩、光泽透亮。\r\n1. 先在注射部位进行局部麻醉。\r\n2. 注射水光针。\r\n3. 在注射部位做镇静的面膜。\r\n",
                                "sbxf_yn": "2",
                                "attention": "5",
                                "complexity": "1",
                                "follow_cnt": "0",
                                "calendar_price": "8272535",
                                "price_type": "1",
                                "industrial_menu1_id": "10001",
                                "laser_skin_yn": "2",
                                "effect_img": "http:\/\/img2.soyoung.com\/item\/2013061415\/20130614153728749.png",
                                "order_cnt": "147378",
                                "method_img": "http:\/\/img2.soyoung.com\/item\/2013061415\/20130614153728220.png",
                                "hospitalization": "2",
                                "effect_img2": "http:\/\/img1.soyoung.com\/item\/20141114\/5\/20141114162433366.jpg",
                                "recover": "刚打完会有针眼，当晚或隔天会自然闭合。\r\n隔天有可能会淤青或是泛红，一般在三天到一周消退。3-7天面部皮肤基本恢复正常，效果开始显现。\r\n\r\n",
                                "operation_type": "3",
                                "product_cnt": "2397",
                                "effect": "1. 皮肤水润透嫩。\r\n2. 皮肤弹性变强。\r\n3. 可拥有富有光泽的童颜肌肤。\r\n",
                                "status": "1",
                                "notice": "1.水光注射施术后，桑拿，运动等诱发发热的运动最好回避。\r\n2.避免吸烟喝酒，那样会给施术带来不好结果。\r\n3.洗脸时用用手稍稍拍打去除脸部水分。\r\n4.注射后的水分摄取很重要，一天2升水的摄取量。\r\n",
                                "price_min": "1000",
                                "price_unit": "元\/次",
                                "item_product_notice": "相关产品:",
                                "item_product_list": [],
                                "tese_notice": "水光针还可定制配方可用于淡斑、收缩毛孔等功效，是补水的利器。",
                                "same_item_list": [{
                                        "item_id": "333",
                                        "name": "水氧活肤",
                                        "summary": "水氧活肤是通过水氧治疗仪，利用强压氧气和水，以小于80微米的分子颗粒形成的喷雾流作用于皮肤，活性水分子和纯氧快速的进入皮肤深层，使得皮肤能够恢复水润状态。除了急救补水之外，水氧活肤还兼具清洁毛孔、消炎、改善肤质的作用。不仅能全面清除毛孔中的深层污垢，使纯氧分子能极大限度的发挥其杀菌作用，如厌氧型痤疮丙酸杆菌和其他有害细菌等；同时也可起到消炎作用，对于净化皮肤组织的代谢环境，祛除痤疮等都具有不错的临床效果。",
                                        "menu1_id": "10010",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "420",
                                        "name": "水光娃娃",
                                        "summary": "水光娃娃(水光注射)是用玻尿酸直接注入到肌肤真皮层，使皮肤水润柔嫩、光泽透亮、真正解决真皮层缺少水分的问题，并且达到恢复弹性及美白提升的作用。",
                                        "menu1_id": "10010",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "426",
                                        "name": "无针水光",
                                        "summary": "无针水光是利用高压射流原理，凭借高速气流（速度达220\/秒亚音速）推动药液，将药液成分以超细、超高速，直线喷出高压射流的方式，在不伤害皮肤细胞的基础上，直接注入皮肤真皮层，调整肌肤活力动态平衡，增加真皮胶原层的厚度，实现明显改善肤质、营养皮肤、控制衰老、短时间内重塑平衡水润肌肤的作用。",
                                        "menu1_id": "10010",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "427",
                                        "name": "种植面膜",
                                        "summary": "种植面膜，是一种活力玻尿酸注射疗法，仿佛把保湿面膜长期放进真皮层内，是将小分子的活力玻尿酸Vital（也叫弹力玻尿酸），以特殊的手法注射种植于真皮层，使之在肌肤内部形成一张天然的保湿锁水网，能补充大量水分，从内到外牢牢锁住肌肤水分，全面保持肌肤丰满水润，改善粗糙皮肤、缺氧性暗哑、气色不佳等一系列皮肤问题，有效提升肌肤质量、延缓皮肤衰老，令肌肤由内至外水嫩粉透、光泽、有弹性。",
                                        "menu1_id": "10010",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "429",
                                        "name": "玻尿酸导入",
                                        "summary": "玻尿酸导入是将玻尿酸等保湿成分，通过超声波以每秒3万次的运动传达到皮肤表面，被表皮、真皮所吸收，使面部肌肉得到舒展、紧缩；吸收的超声波转换成热量，其热效应使生物体组织的温度轻微上升（0.5-1℃），促进新陈代谢；通过仪器的导入功能，使玻尿酸原液的吸收更加充分均匀，改善肌肤因缺水导致的色斑、黄褐斑、皮肤敏感等各种问题。",
                                        "menu1_id": "10010",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "577",
                                        "name": "菲洛嘉",
                                        "summary": "菲洛嘉严格意义来说并不是“水光针”，常说的水光针只是单一含有玻尿酸的产品，而菲洛嘉除了含有玻尿酸外，产品里还含有人体皮肤所含的53+1种营养成分，为肌肤深层补水，同时能补充人体所需营养成分，可有效紧致毛孔，淡化皱纹，恢复弹性，提亮肤色。",
                                        "menu1_id": "0",
                                        "menu2_id": "0"
                                    },
                                    {
                                        "item_id": "718",
                                        "name": "黄金焕肤",
                                        "summary": "黄金焕肤是将含有黄金元素的面膜美容品，通过黄金纳米微粒渗透入皮肤，经纳米化处理后的黄金，更容易被皮肤吸收，让纳米金可以轻松进入人体皮肤，金纯所释放的负离子和人体的正离子，互相呼应，促进组织内淋巴液、血液的流动，使得皮肤的新陈代谢更好，并在皮肤组织内部产生活性，从而使多种微量元素和营养物质不断激活细胞，使细胞呈现年轻化，可明显提升皮肤紧实度，增加皮肤锁水能力，令皮肤白皙、水嫩，色素淡化、细小皱纹消失，肌肤得到完整修复，面部年轻靓丽。",
                                        "menu1_id": "0",
                                        "menu2_id": "0"
                                    }
                                ],
                                "info_type": 1
                            }],
                            "type": 3
                        },
                        "display_summary": 0
                    }
                },
            }
        },
        computed: {
            ...mapState({
                bus: state => state.search.bus,
                keyword: state => state.search.keyword,
                tabIndex: state => search.tabIndex
            }),
            productList() {
                try {
                    return this.result.responseData.product_arr.product;
                } catch (e) {
                    return [];
                }
            },
        },
        components: {
            Product,
            doctor,
            hospital
        },
        methods: {
            $_all_ajax() {
                var keyword = this.$store.state.search.keyWord;
                api.ajaxSearch('searchAll', {
                    keyword
                }).then(res => {
                    Loading.stop();
                }).catch(error => {
                    Loading.stop();
                })
            }
        },
        mounted() {
            Loading.run();
            this.$_all_ajax();
            this.bus.$on('search', (type) => {
                if (type === -1) {
                    Loading.run();
                    this.$_all_ajax();
                } else if (type === 0) {
                    Loading.run();
                    this.$_all_ajax();
                }
            })
        }
    }
</script>
<style scoped>
    
    .itembox {
        background-color: #f3f7f7;
    }
    #SearchAll a.wbottomlink {
        border-top: 1px solid #f0f0f0;
        border-bottom: 1px solid #f0f0f0;
        display: inline-block;
        width: 100%;
        color: #2cc7c5;
        background-color: #fff;
        font-size: 0.26rem;
        color: #2CC7C5;
        text-align: center;
        line-height: 0.9rem;
    }
    #SearchAll .wheadtitle {
        margin-bottom: 0.2rem;
    }
    #SearchAll .wheadtitle h3 {
        color: #777;
        font-size: 0.26rem;
        line-height: 0.8rem;
        padding-left: 0.3rem;
        font-weight: normal;
        background: #fff;
    }
    #SearchAll .doctor-list .itembox {
        border: 1px solid #f0f0f0;
    }
    #SearchAll .doctor-list .itembox .doctor {
        margin-bottom: 0;
    }
    #SearchAll .hospital-list .itembox {
        border: 1px solid #f0f0f0;
    }
    #SearchAll .hospital-list .itembox .hospital {
        margin-bottom: 0;
    }
    #SearchAll .diary-list .itembox:last-child .diary-item {
        margin-bottom: 0;
    }
    #SearchAll .video-list .itembox .video-wraper {
        margin-bottom: 0;
    }
</style>
