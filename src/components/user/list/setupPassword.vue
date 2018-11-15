<template>
<div id="setupPassword">
    <user-setup-row :params="params"></user-setup-row>
</div>
</template>
<script>
export default {
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
