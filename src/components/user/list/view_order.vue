<template>
<div id="view_order">
    <router-link :to="{name:'container',query:{id:'55'}}" tag="div">
        <userRowTem :params="params"></userRowTem>
    </router-link>
</div>
    
</template>
<script>
export default {
    name:'view_order',
    data(){
        return {
             params:{
                    
                    link:"/replyOrder",
                    iconClass:"zk-icon-dingzhijiaju",
                    text:'顾问查看已接订单',
                    // isShow:true,
                    
                },
        }
    }
}
</script>
<style>

</style>
