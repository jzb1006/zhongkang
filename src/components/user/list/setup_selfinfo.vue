<template>
<div id="setup_selfinfo">
    <router-link :to="{name:'container',query:{id:'37'}}" tag="div">
        <userSetupRow :params="params"></userSetupRow>
    </router-link>
</div>
</template>
<script>
export default {
    name:'setup_selfinfo',
    data(){
        return {
            params:{
               link:'/home/userSelfinfo',
                text:'个人信息',
            },
        }
    }
}
</script>
<style>

</style>
