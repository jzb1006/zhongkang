<template>
    <div id="scan">
        <!-- 头部 -->
        <top title="扫码页面"></top>
        <!-- 商品的详情 -->
        <panelOrder :path="order_info['goods_thumb']" :title="order_info['goods_name']" :price="order_info['pifa_price']" :totalPricePanelShow="datePanel" :datePanelShow="datePanel" :borderShow="borderShow">
        </panelOrder>
        <!-- 医院和医生 -->
        <group>
            <cell :title="ins_info['name']" value="详情" is-link></cell>
            <cell :title="doc_info['name']" value="详情" is-link></cell>
        </group>
        <!-- 订单单号与时间 -->
        <group class="border">
            <cell-form-preview :list="order_sn_list"></cell-form-preview>
        </group>
        <!-- 订单金额详情 -->
        <group class="border">
            <cell-form-preview :list="order_price_list"></cell-form-preview>
        </group>
        <!-- 订单状态 -->
        <group class="border">
            <cell-form-preview :list="order_status"></cell-form-preview>
        </group>
        <!-- 提交按钮 -->
        <div style="padding: 1rem 0.1rem;">
            <x-button type="primary" v-if="orderAndPay==51" @click.native="$_check_scan()">确认扫码</x-button>
        </div>
        <!-- 订单操作 -->
        <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
        <!-- 没有找打商品的时候显示 -->
        <nosearch v-show="isRequesting" :text="text"></nosearch>
    </div>
</template>
<script>
    import api from "../../api/order";
    import top from "@/components/decorate/top_back_title.vue";
    import Alert from "@/components/decorate/alert.vue";
    import panelOrder from "@/components/order/panel_order.vue";
    import nosearch from "@/components/nosearch/index.vue";
    import {
        Group,
        Cell,
        CellFormPreview,
        XButton,
    } from 'vux'
    export default {
        data() {
            return {
                order_sn: this.$route.params.order_sn,
                alerttType: 'warn',
                alertText: '',
                alertShow: false,
                isRequesting: false,
                text: '',
                ins_info: [],
                doc_info: [],
                order_info: [],
                datePanel: false,
                borderShow: true,
                order_sn_list: [],
                order_price_list: [],
                order_status: [],
                orderAndPay: '',
            }
        },
        computed: {
            isShow() {
                try {
                    return this.alertShow;
                } catch (e) {
                    return false;
                }
            }
        },
        components: {
            top,
            Alert,
            nosearch,
            panelOrder,
            Group,
            Cell,
            CellFormPreview,
            XButton,
        },
        methods: {
            $_ajax_scan() {
                var self = this;
                api.scan({
                    order_sn: this.order_sn
                }).then(res => {
                    console.log(res)
                    var result = res.data;
                    var msg = result.msg;
                    var errcode = result.error_code;
                    var data = result.data;
                    if (errcode == 1) {
                        self.alertText = msg
                        self.alertShow = true
                        self.isRequesting = true
                        self.text = msg
                    } else if (errcode == 88) {
                        self.$router.push({
                            name: 'login'
                        })
                    } else if (errcode == 2) {
                        //  self.$router.push({
                        //     name: 'login'
                        // })
                        console.log('进入详情');
                    } else {
                        if (data != '') {
                            self.ins_info = data.ins_info
                            self.doc_info = data.doc_info
                            self.order_info = data.order_info
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
                            self.order_status = [{
                                label: '订单状态',
                                value: data.op
                            }];
                            self.orderAndPay = data.order_status
                        }
                    }
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
            },
            $_check_scan() {
                var self = this;
                api.checkScan({
                    order_sn: this.order_sn
                }).then(res => {
                    var result = res.data;
                    var msg = result.errorMsg;
                    var errcode = result.errorCode;
                    if(errcode==6){
                        self.alertText = msg
                        self.alertShow = true
                        self.alerttType = 'success'
                        this.$_ajax_scan();
                    }else{
                        self.alertText = msg
                        self.alertShow = true
                        this.$_ajax_scan();
                    }
                    // console.log(res);
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
        },
        mounted() {
            this.$_ajax_scan();
        }
    }
</script>
<style>
  
    .weui-cell {
        padding-top: 0.2rem!important;
        padding-bottom: 0.2rem!important;
    }
    .weui-cells {
        margin-top: 0!important;
        line-height: 0.3rem!important;
        font-size: 0.3rem!important;
    }
    .weui-btn {
        font-size: 0.3rem!important;
    }
    .weui-btn_primary {
        background-color: #ff5370!important;
    }
</style>