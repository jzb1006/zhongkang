<template>
<div id="setupSelfinfo">
    <user-setup-row :params="params"></user-setup-row>
</div>
</template>
<script>
export default {
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
