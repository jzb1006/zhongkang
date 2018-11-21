<template>
    <div>
        <orderDetailT @changeOrderStatus=changeOrderStatus :params=params :orderDetailInfo=orderDetailInfo></orderDetailT>
    </div>
</template>

<script>
import api from "@/api/order";
import orderDetailT from "@/templates/order/order_detail";
import { mixin } from "@/assets/js/mixins.js";
export default {
    components: {
        orderDetailT
    },
    mixins: [mixin],
    data() {
        return {
            orderDetailInfo: {},

            order_info: [],
            ins_info: [],
            doc_info: [],
            order_status: [],
            order_action: [],
            order_img_list: [],
            order_QR: "",
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
            alerttType: "success",
            alertText: ""
        };
    },
    methods: {
        changeOrderStatus(){
            this. $_ajax_order_detail();
        },
        date(value) {
            if (!value) return "";
            var date = new Date(value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + "-";
            var M =
                (date.getMonth() + 1 < 10
                    ? "0" + (date.getMonth() + 1)
                    : date.getMonth() + 1) + "-";
            var D = date.getDate() + " ";
            var h = date.getHours() + ":";
            var m = date.getMinutes() + ":";
            var s = date.getSeconds();
            return Y + M + D + h + m + s;
        },
        $_ajax_order_detail() {
            var self = this;
            api
                .get_order_detail({
                    order_sn: this.$route.query.orderSn
                })
                .then(res => {
                    var result = res.data.data;

                    self.order_info = result.orderinfo;
                    self.ins_info = result.ins_info;
                    self.doc_info = result.doc_info;
                    self.order_status = [
                        {
                            label: "订单状态",
                            value: result.op
                        }
                    ];
                    if (result.new_action != "") {
                        self.order_action = [
                            {
                                label: "操作者",
                                value: result.new_action[0]["action_user"]
                            },
                            {
                                label: "操作时间",
                                value: result.new_action[0]["log_time"]
                            },
                            {
                                label: "订单状态",
                                value: result.new_action[0]["order_status"]
                            },
                            {
                                label: "付款状态",
                                value: result.new_action[0]["pay_status"]
                            },
                            {
                                label: "备注",
                                value: result.new_action[0]["action_note"]
                            },
                            {
                                label: "记录",
                                value: result.new_action[0]["order_action"]
                            }
                        ];
                        if (result.new_action[0]["evidence_img"] != null) {
                            var imgUrl = result.new_action[0][
                                "evidence_img"
                            ].split(",");
                            for (let i = 0; i < imgUrl.length; i++) {
                                self.order_img_list.push({
                                    msrc: api.imgUrl() + imgUrl[i],
                                    src: api.imgUrl() + imgUrl[i],
                                    w: 800,
                                    h: 400
                                });
                            }
                        }
                    }
                    self.order_QR = result.order_QR;
                    self.goods_info = result.goods_info;
                    self.order_price_list = [
                        {
                            label: "订单金额",
                            value:
                                self.order_info["deposit_price"] +
                                " X " +
                                self.order_info["goods_number"] +
                                " = " +
                                self.order_info["order_amount"]
                        },
                        {
                            label: "到院支付",
                            value:
                                self.order_info["goods_amount"] -
                                self.order_info["order_amount"] +
                                ".00"
                        },
                        {
                            label: "支付方式",
                            value: self.order_info["pay_name"]
                        }
                    ];
                    self.order_sn_list = [
                        {
                            label: "下单时间",
                            value: self.date(self.order_info["add_time"])
                        },
                        {
                            label: "订单号",
                            value: self.order_info["order_sn"]
                        }
                    ];
                    self.order_btn = result.order_action;

                    self.orderDetailInfo = {
                        order_btn: this.order_btn,
                        order_sn_list: this.order_sn_list,
                        order_price_list: this.order_price_list,
                        goods_info: this.goods_info,
                        order_QR: this.order_QR,
                        order_img_list: this.order_img_list,
                        order_action: this.order_action,
                        order_status: this.order_status,
                        order_info: this.order_info,
                        ins_info: this.ins_info,
                        doc_info: this.doc_info
                    };
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    mounted() {
        this.$_ajax_order_detail();
    }
};
</script>

<style>
</style>
