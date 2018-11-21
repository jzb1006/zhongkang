<template>
    <div id="wallet_tab">
        <tab class="nav">
            <tab-item selected @on-item-click="change(0)">
                <p class="route">余额</p>
            </tab-item>
            <tab-item @on-item-click="change(1)">
                <p class="route">银行卡</p>
            </tab-item >
            <tab-item @on-item-click="change(2)">
                <p class="route">账单</p>
            </tab-item>
        </tab>
        <!-- <router-view></router-view> -->
        <balance v-show="index==0"></balance>
        <bank v-show="index==1"></bank>
        <bill v-show="index==2"></bill>
    </div>
</template>

<script>
import {Tab,TabItem} from 'vux'
export default {
    name: 'wallet_tab',
    data(){
        return {
            index:'0',
        }
    },
    methods:{
        change(arg){
            this.index=arg;
        },
        toBalance(){
            this.$router.replace('/home/balance');
        },     
        toBank(){
            this.$router.replace('/home/bank');
        },
        toBill(){
            this.$router.replace('/bill');
        }
    },
    components:{
        Tab,
        TabItem,
    }
}
</script>
<style>
    /* .vux-tab .vux-tab-item {
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
    } */
</style>
<style scoped>
    #wallet_tab{
        background:#f0f0f0;
    }
    .wallet_content{
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .nav{
        margin-bottom:.2                                                                                                                                                                                         rem;
    }
    .span{
        display:inline-block;
        width:32%;
    }
</style>