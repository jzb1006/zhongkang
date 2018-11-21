<template>
    <div id="adviser_info">
        <router-link :to="{name:'container',query:{id:'41'}}" tag="div">
            <userRowTem :params="params"></userRowTem>
        </router-link>
    </div>
</template>
<script>
export default {
    name:'adviser_info',
    data(){
        return {
            params:{
                link:"/adviserAuthentication",
                iconClass:"zk-icon-dingzhijiaju",
                text:'顾问资料',
            },
        }
    }
}
</script>
<style>

</style>
