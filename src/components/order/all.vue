<template>
    <div id="all">
        <div v-if="list.length != 0">
            <div v-for="(item,index) in list" :key="index">
             <router-link  :to="{ name: 'orderDetail', params: { orderSn: item['order_sn'] }}" tag="div">
                <panelOrder :date="item['add_time']" :status="item['status']" :path="item['goods_thumb']" :title="item['goods_name']" :price="item['total_fee']" :goodsNumber="item['goods_number']" :totalPrice="item['order_amount']">
                </panelOrder>
             </router-link>
            </div>
        </div>
        <emptyOrder v-else v-show="isRequesting"></emptyOrder>
        <Loading v-show="loadinging"></Loading>
        <Alert :Show="warnShow" :alerttType="alerttType" :alertText="alertText"></Alert>
        <LoadMore :state='hasMore' :isLoading='isBusy' v-if="list.length > 0" @loadmore="$_ajax_order_all"></LoadMore>
    </div>
</template>
<script>
    import api from "../../api/order";
    import panelOrder from "@/components/order/panel_order.vue";
    import Loading from "@/components/decorate/loading.vue";
    import Alert from "@/components/decorate/alert.vue";
    import LoadMore from '@/components/loadMore/index.vue';
    import emptyOrder from "@/components/order/empty_order_list.vue";
    export default {
        data() {
            return {
                list: [],
                loadinging: true,
                Type: 'warn',
                Show: false,
                text: '',
                page: 0,
                hasMore: 0,
                isBusy: false,
                isRequesting: true,
            };
        },
        computed: {
            warnShow() {
                return this.Show;
            },
            alerttType() {
                return this.Type;
            },
            alertText() {
                return this.text;
            }
        },
        methods: {
            $_ajax_order_all() {
                var self = this;
                this.isBusy = true;
                this.isRequesting = false;
                //  this.hasMore = 1;
                api.get_order_list({
                        num: 5,
                        index: 0,
                        page: this.page++
                    })
                    .then(res => {
                        // self.list = res.data;
                        self.hasMore = res.data.data.hasMore;
                        if (res.data.data.orderList) {
                            self.list = self.list.concat(res.data.data.orderList);
                        }
                        console.log(res);
                        this.loadinging = false;
                        this.isBusy = false;
                        this.isRequesting = true;
                    })
                    .catch(error => {
                        console.log(error);
                        this.Show = true;
                        this.text = error.message;
                        this.loadinging = false;
                        this.isBusy = false;
                        this.isRequesting = true;
                    });
            },
        },
        components: {
            panelOrder,
            Loading,
            Alert,
            LoadMore,
            emptyOrder
        },
        mounted() {
            this.loadinging = true;
            this.$_ajax_order_all();
        }
    };
</script>
<style>
    #all {
        background: #e5e5e5;
    }
</style>