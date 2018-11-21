<template>
<div id="receipt">
    <router-link :to="{name:'container',query:{id:'53'}}" tag="div">
        <userRowTem :params="params"></userRowTem>
    </router-link>
</div>
</template>
<script>
export default {
    name:'receipt',
    data(){
        return {
             params:{
            
                    link:"/adviserReceipt",
                    iconClass:"zk-icon-dingzhijiaju",
                    text:'顾问接单',
                    // isShow:true,
                    
                },
        }
    }
}
</script>
<style>

</style>
