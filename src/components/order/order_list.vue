<template>
    <div id="order_list">
        <top title="订单列表"></top>
        <tab>
            <tab-item selected>
                <router-link to="/orderList/All" tag="div" class="route">全部订单</router-link>
            </tab-item>
            <tab-item>
                <router-link to="/orderList/PayNo" tag="li" class="route">未付款</router-link>
            </tab-item>
            <tab-item>
                <router-link to="/orderList/PayYes" tag="li" class="route">已付款</router-link>
            </tab-item>
        </tab>
        <div id="container">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
import api from "../../api/user/login.js";
    import top from "@/components/decorate/top_back_title.vue";
    import {
        Tab,
        TabItem
    } from 'vux'
    export default {
        methods: {
            onItemClick() {
                console.log("s")
            }
        },
        methods:{
            $_ajax_check_loging(){
                api.checkLogin().then(res=>{
                    var errcode = res.data.error_code;
                        if(errcode==88){
                             self.$router.push({
                                name: 'login'
                            })
                            return false;
                        }
                })
            }
        },
        components: {
            Tab,
            TabItem,
            top
        }
    }
</script>
<style>
    @import "../../assets/css/Base.css";
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