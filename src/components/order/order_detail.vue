<template>
    <div id="order_detail">
        <!-- 头部 -->
        <!-- <top title="订单详情"></top> -->
        <!-- 商品的详情 -->
        <panelOrder :path="goods_info['goods_thumb']" :title="goods_info['goods_name']" :price="goods_info['pifa_price']" :totalPricePanelShow="datePanel" :datePanelShow="datePanel" :borderShow="borderShow">
        </panelOrder>
        <!-- 医院和医生 -->
        <group>
            <cell :title="ins_info['name']" value="详情" is-link :link="{name:'hospitalDetail',params:{ins_id:ins_info['id']}}"></cell>
            <cell :title="doc_info['name']" value="详情" is-link :link="{name:'doctorDetail',params:{doc_id:doc_info['id'],ins_id:ins_info['id']}}"></cell>
            <x-switch v-model="QRshow" :title="'二维码'"></x-switch>
            <x-switch v-model="actionShow" :title="'订单操作记录'"></x-switch>
        </group>
        <!-- 订单单号与时间 -->
        <group class="vux-1px-b">
            <cell-form-preview :list="order_sn_list"></cell-form-preview>
        </group>
        <!-- 订单金额详情 -->
        <group class="vux-1px-b">
            <cell-form-preview :list="order_price_list"></cell-form-preview>
        </group>
        <!-- 订单状态 -->
        <group class="vux-1px-b">
            <cell-form-preview :list="order_status"></cell-form-preview>
        </group>
        <!-- 实际付款 -->
        <group>
            <div class="truePrice">
                <p>实付款：<span>￥{{order_info['order_amount']}}</span></p>
            </div>
        </group>
         <div id="fill"></div>
        <!-- 底部 -->
        <div class="foot vux-1px-t">
            <div :key="indexs" v-for="(items,indexs) in order_btn['button_text']">
                <div v-if="items['type']==0">
                  <div class="btn"  @click="change_action(items['name'],order_btn['order_sn'],order_btn['status'],items['text'])">{{items['text']}}</div>
                </div>
                <div v-else-if="items['type']==1">
                    <router-link v-if="items['route'] == 'applyRefund' " :to="{name:'applyRefund',params:{tt:'tuikuan',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="btn">{{items['text']}}</div>
                    </router-link>
                    <router-link v-if="items['route'] == 'appeal' " :to="{name:'appeal',params:{tt:'shensu',oid:order_btn['order_sn'],status:order_btn['status']}}">
                        <div class="btn">{{items['text']}}</div>
                    </router-link>
                    <div class="btn" v-if="items['route'] == 'pay' " @click="fastpay(order_btn['order_sn'])">{{items['text']}}</div>
                </div>
            </div>
        </div>
       
        <!-- 弹出框 -->
        <!-- 二维码 -->
        <div>
            <x-dialog v-model="QRshow" class="dialog-demo">
                <div class="img-box">
                    <!-- <img :src="order_QR" style="max-width:100%"> -->
                    <qrcode :value="'http://192.168.0.117:8080/#/scanQR/'+order_QR" type="canvas" style="max-width:100%;padding: 0.6rem;" class="QRcode"></qrcode>
                </div>
                <div @click="QRshow=false">
                    <span class="vux-close"></span>
                </div>
            </x-dialog>
        </div>
        <!-- 订单操作记录 -->
        <div>
            <popup v-model="actionShow" position="bottom">
                <orderAction :orderAction="order_action" :imgList="order_img_list"></orderAction>
            </popup>
        </div>
        <!-- 订单操作 -->
        <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
        <!-- 弹出框 -->
    </div>
</template>
<script>
    // import top from "@/components/decorate/top_back_title.vue";
    import orderAction from "@/components/order/order_action.vue";
    import panelOrder from "@/components/order/panel_order.vue";
    import Alert from "@/components/decorate/alert.vue";
    import api from "../../api/order";
    import goodsPay from "../../api/goods";
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
    export default {
        data() {
            return {
                order_info: [],
                ins_info: [],
                doc_info: [],
                order_status: [],
                order_action: [],
                order_img_list: [],
                order_QR: '',
                goods_info: [],
                datePanel: false,
                totalPricePanelShow: false,
                borderShow: false,
                order_sn_list: [],
                order_price_list: [],
                QRshow: false,
                actionShow: false,
                order_btn: [],
                changeShow: false,
                alerttType: 'success',
                alertText: ''
            }
        },
        computed:{
          isShow(){
              try {
                    return this.changeShow;
                } catch (e) {
                    return false;
                }
          },
          
        },
        components: {
            // top,
            panelOrder,
            Group,
            Cell,
            CellFormPreview,
            XSwitch,
            XDialog,
            XButton,
            Qrcode,
            Popup,
            orderAction,
            Alert
        },
        methods: {
            $_ajax_order_detail() {
                var self = this;
                api.get_order_detail({
                    'order_sn': this.$route.params.orderSn
                }).then(res => {
                    console.log(res);
                    var result = res.data.data;
                    self.order_info = result.orderinfo;
                    self.ins_info = result.ins_info;
                    self.doc_info = result.doc_info;
                    self.order_status = [{
                        label: '订单状态',
                        value: result.op
                    }];
                    if (result.new_action != '') {
                        self.order_action = [{
                                label: '操作者',
                                value: result.new_action[0]['action_user']
                            }, {
                                label: '操作时间',
                                value: result.new_action[0]['log_time']
                            }, {
                                label: '订单状态',
                                value: result.new_action[0]['order_status']
                            },
                            {
                                label: '付款状态',
                                value: result.new_action[0]['pay_status']
                            },
                            {
                                label: '备注',
                                value: result.new_action[0]['action_note']
                            },
                            {
                                label: '记录',
                                value: result.new_action[0]['order_action']
                            },
                        ];
                        if (result.new_action[0]['evidence_img'] != null) {
                            var imgUrl = result.new_action[0]['evidence_img'].split(',');
                            for (let i = 0; i < imgUrl.length; i++) {
                                self.order_img_list.push({
                                    msrc: api.imgUrl() + imgUrl[i],
                                    src: api.imgUrl() + imgUrl[i],
                                    w: 800,
                                    h: 400
                                })
                            }
                        }
                    }
                    self.order_QR = result.order_QR;
                    self.goods_info = result.goods_info;
                    self.order_price_list = [{
                            label: '订单金额',
                            value: self.order_info['deposit_price'] + ' X ' + self.order_info['goods_number'] + ' = ' + self.order_info['order_amount']
                        },
                        {
                            label: '到院支付',
                            value: self.order_info['goods_amount'] - self.order_info['order_amount'] + '.00'
                        },
                        {
                            label: '支付方式',
                            value: self.order_info['pay_name']
                        }
                    ];
                    self.order_sn_list = [{
                            label: '下单时间',
                            value: self.date(self.order_info['add_time'])
                        },
                        {
                            label: '订单号',
                            value: self.order_info['order_sn']
                        },
                    ];
                    self.order_btn = result.order_action;
                }).catch(error => {
                    console.log(error)
                })
            },
            date(value) {
                if (!value) return '';
                var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y + M + D + h + m + s;
            },
            change_action(action_name,order_sn, status, order_avtion) {
                var self = this;
                var action_name = action_name;
                var order_id = order_sn;
                var status = status;
                var order_avtion = order_avtion;
                api.refund({
                    'id': order_id,
                    'type': action_name,
                    'status': status,
                    'order_avtion': order_avtion
                }).then(res => {
                    var msg = res.data.msg;
                    var errcode = res.data.error;
                    self.changeShow = true
                    self.alertText = msg
                    if (errcode == 0) {
                        self.alerttType = 'warn'
                    }
                    self.$_ajax_order_detail()
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            },
            fastpay(oid) {
                 var self = this;
                goodsPay.fastpay({
                    'oid': oid,
                }).then(res => {
                    var result = res.data;
                    var code = result.error_code;
                    var msg = result.msg;
                    self.changeShow = true
                    self.alertText = msg
                    if (code == 1) {
                        self.alerttType = 'warn'
                    }
                    self.$_ajax_order_detail()
                    console.log(res);
                }).catch(error => {
                    console.log(error);
                })
            }
        
        },
        filters: {
            date(value) {
                if (!value) return '';
                var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
                var Y = date.getFullYear() + '-';
                var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
                var D = date.getDate() + ' ';
                var h = date.getHours() + ':';
                var m = date.getMinutes() + ':';
                var s = date.getSeconds();
                return Y + M + D + h + m + s;
            }
        },
        mounted() {
            this.$_ajax_order_detail();
        }
    }
</script>
<style lang="less">
    @import '~vux/src/styles/close';
    
    .weui-switch:before,
    .weui-switch-cp__box:before {
        background-color: #ff5370!important;
    }
    .weui-cell {
        padding-top: 0.2rem!important;
        padding-bottom: 0.2rem!important;
    }
    .QRcode canvas {
        width: 4rem!important;
        height: 4rem!important;
    }
    .weui-cells {
        margin-top: 0!important;
        line-height: 0.3rem!important;
        font-size: 0.3rem!important;
    }
    .dialog-demo {
        .weui-dialog {
            border-radius: 8px;
            padding-bottom: 8px;
            max-width: 100%;
        }
        .dialog-title {
            line-height: 30px;
            color: #666;
        }
        .img-box {
            overflow: hidden;
        }
        .vux-close {
            margin-top: 8px;
            margin-bottom: 8px;
            width: 0.5rem;
            height: 0.5rem;
        }
        
       
    }
    .truePrice {
        text-align: right;
        padding: 0.5rem 0.14rem;
    }
    .truePrice span {
        color: #ff5370;
        font-size: 0.4rem;
    }
    .foot {
        position: fixed;
        bottom: 0;
        width: 100%;
        padding: 0.2rem 0px;
        left: 0;
        background: #fff;
        .btn {
            height: 0.6rem;
            font-size: 0.22rem;
            float: right;
            color: #000000;
            border: 1px solid #999;
            line-height: 0.6rem;
            border-radius: 0.04rem;
            text-align: center;
            margin-left: 0.1rem;
            padding: 0.05rem;
        }
    }
    .foot div:last-child {
        margin-right: 0.15rem
    }
</style>