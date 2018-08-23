<template>
    <div id="wallet">
          <top title="钱包"></top>
          <tab>
            <tab-item selected @on-item-click="toBalance">
                <p class="route">余额</p>
            </tab-item>
            <tab-item @on-item-click="toBank">
                <p class="route">银行卡</p>
            </tab-item >
            <tab-item @on-item-click="toBill">
                <p class="route">账单</p>
            </tab-item>
        </tab>
          <router-view></router-view>
    </div>
</template>

<script>
import common from "../../widget/lib/user"
import top from '@/components/decorate/top_back_title.vue'
import {
        Tab,
        TabItem
    } from 'vux'
export default {
    name: 'wallet',
    methods:{
        toBalance(){
            // common.checkLogin(this,'/home/balance');
            this.$router.replace('/home/balance');
        },     
        toBank(){
            this.$router.replace('/home/bank');
            // common.checkLogin(this,'/home/bank');
        },
        toBill(){
            this.$router.replace('/bill');
            // common.checkLogin(this,'/bill');
        }
    },
    components:{
        top,
        Tab,
        TabItem,
    }
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
<style scoped>
    #wallet{
        background:#f0f0f0;
    }
    .wallet_content{
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .span{
        display:inline-block;
        width:32%;
    }
</style>