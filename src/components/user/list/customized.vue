<template>
    <div id="customized">
        <!-- <router-link :to="{name:'container',query:{id:'3'}}" tag="div"> -->
        <router-link :to="{name:'container',query:{id:'43'}}" tag="div">
            <userRowTem :params="params"></userRowTem>
        </router-link>
    </div>
</template>
<script>
export default {
    name:'customized',
    data(){
        return {
             params:{
                    
                    link:"/customized",
                    iconClass:"zk-icon-dingzhijiaju",
                    text:'私人定制',
                    // isShow:true,
                    
                },
        }
    }
}
</script>
<style>

</style>
