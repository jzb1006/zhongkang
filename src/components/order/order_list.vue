<template>
    <div id="order_list">
        <top title="订单列表"></top>
        <tab>
            <tab-item :selected="selected === 0" @on-item-click="onItemClick(0)">
                <p class="route">全部订单</p>
            </tab-item>
            <tab-item :selected="selected === 1" @on-item-click="onItemClick(1)">
                <p class="route">未付款</p>
            </tab-item >
            <tab-item :selected="selected === 2" @on-item-click="onItemClick(2)">
                <p class="route">已付款</p>
            </tab-item>
        </tab>
        <div id="container">
            <orderItem v-if="list.length != 0" :list="list"></orderItem>
            <emptyOrder v-else v-show="isRequesting"></emptyOrder>
            <LoadMore :state='hasMore' :isLoading='isBusy' v-if="list.length > 0" @loadmore="$_ajax_order(currentItem)"></LoadMore>

            <Loading v-show="loadinging"></Loading>
            <Alert :Show="warnShow" :alerttType="alerttType" :alertText="alertText"></Alert>
            <div id="fill"></div>
        </div>
    </div>
</template>
<script>
    import loginApi from "../../api/user/login.js";
    import api from "../../api/order";
    import orderItem from "@/components/order/order_item.vue";
    import top from "@/components/decorate/top_back_title.vue";
    import Loading from "@/components/decorate/loading.vue";
    import Alert from "@/components/decorate/alert.vue";
    import LoadMore from '@/components/loadMore/index.vue';
    import emptyOrder from "@/components/order/empty_order_list.vue";
    import {
        Tab,
        TabItem
    } from 'vux'
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
                selected:this.$route.query.index
            }
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
            $_ajax_check_loging() {
                var self = this;
                loginApi.checkLogin().then(res => {
                    var errcode = res.data.error_code;
                    if (errcode == 88) {
                        self.$router.push({
                            name: 'login'
                        })
                        return false;
                    }
                })
            },
            $_ajax_order(type) {
                var self = this;
                this.isBusy = true;
                this.isRequesting = false;
                //  this.hasMore = 1;
                api.get_order_list({
                        num: 5,
                        index: type,
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
            onItemClick(type){
                console.log(type);
                this.currentItem = type;
                this.resetSearch();
                this.$_ajax_order(this.currentItem);
            },
            resetSearch(){
                this.list=[]
                this.loadinging=true
                this.page= 0
                this.hasMore= 0
                this.isBusy=false
                this.isRequesting=true

            }

        },
        components: {
            Tab,
            TabItem,
            top,
            orderItem,
            Loading,
            Alert,
            LoadMore,
            emptyOrder
        },
        mounted() {
            this.$_ajax_check_loging();
            this.loadinging = true;
            this.$_ajax_order(this.currentItem);
        },
    }
</script>
<style>
   
    .vux-tab .vux-tab-item {
        font-size: 0.3rem!important;
    }
    .vux-tab-container,
    .vux-tab,
    .vux-tab-wrap {
        height: 1rem!important;
    }
    .vux-tab-wrap {
        padding-top: 0.2rem!important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
    .vux-tab-ink-bar {
        background-color: #ff5370!important;
    }
    #container {
        position: relative;
    }
    .route {
        height: 1rem;
        line-height: 1rem;
    }
</style>