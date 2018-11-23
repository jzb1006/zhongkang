<template>
<div id="money">
    <!-- <router-link :to="{name:'container',query:{id:'48'}}" tag="div"> -->
        <div @click="toMoney">
            <userRowTem :params="params"></userRowTem>
        </div>
    <!-- </router-link> -->
</div>
    
</template>
<script>
import {login_mixin} from '@/assets/js/mixins.js'
export default {
    name:'money',
    mixins:[login_mixin],
    data(){
        return {
            params:{
                link:"/home/userWallet",
                iconClass:"zk-icon-qianbao",
                text:'我的钱包',
            },
        }
    },
    methods:{
        toMoney(){
            this.checkLogin({id:'48'})
        }
    }
}
</script>
<style>

</style>
