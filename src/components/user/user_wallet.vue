<template>
    <div id="wallet">
          <top title="钱包"></top>
          <tab>
            <tab-item selected @on-item-click="toBalance">
                <p>余额</p>
            </tab-item>
            <tab-item @on-item-click="toBank">
                <p>银行卡</p>
            </tab-item >
            <tab-item @on-item-click="toBill">
                <p>账单</p>
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
            common.checkLogin(this,'/home/balance');
        },     
        toBank(){
            common.checkLogin(this,'/home/bank');
        },
        toBill(){
            common.checkLogin(this,'/bill');
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
.vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
</style>
<style scoped>
    .wallet_content{
        background-color: #ccf;
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