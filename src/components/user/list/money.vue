<template>
<div id="money">
    <router-link :to="{name:'container',query:{id:'48'}}" tag="div">
        <userRowTem :params="params"></userRowTem>
    </router-link>
</div>
    
</template>
<script>
export default {
    name:'money',
    data(){
        return {
             params:{
                    link:"/home/userWallet",
                    iconClass:"zk-icon-qianbao",
                    text:'我的钱包',
                },
        }
    }
}
</script>
<style>

</style>
