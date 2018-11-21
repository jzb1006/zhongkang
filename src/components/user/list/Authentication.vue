<template>
    <router-link :to="{name:'container',query:{id:'42'}}" tag="div">
        <userRowTem :params="params"></userRowTem>
    </router-link>
</template>
<script>
export default {
    name:'authentication',
    data(){
        return {
             params:{
                    link:"/adviserAuthenticationState",
                    iconClass:"zk-icon-approve",
                    text:'顾问认证',
                    // isShow:true,
                },
        }
    }
}
</script>
<style>

</style>
