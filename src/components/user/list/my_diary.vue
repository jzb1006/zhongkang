<template>
<div id="money">
    <router-link :to="{name:'container',query:{id:'16'}}" tag="div">
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
                    link:"",
                    iconClass:"zk-icon-qianbao",
                    text:'我的日志',
                },
        }
    }
}
</script>
<style>

</style>
