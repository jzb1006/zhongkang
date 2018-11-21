<template>
<div id="setup_password">
    <router-link :to="{name:'container',query:{id:'39'}}" tag="div">
        <userSetupRow :params="params"></userSetupRow>
    </router-link>
</div>
</template>
<script>
export default {
    name:'setup_password',
    data(){
        return {
            params:{
                link:'/home/userEditpassword',
                text:'修改密码',
            },
        }
    }
}
</script>
<style>

</style>
