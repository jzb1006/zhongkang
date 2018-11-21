<template>
    <router-link :to="{name:'container',query:{id:'44'}}" tag="div">
        <userRowTem :params="params"></userRowTem>
    </router-link>
</template>
<script>
export default {
    name:'cus_order',
    data(){
        return {
            params:{
                link:"/customizedOrder",
                iconClass:"zk-icon-icon-",
                text:'定制订单',
                // isShow:true,
            },
        }
    }
}
</script>
<style>

</style>
