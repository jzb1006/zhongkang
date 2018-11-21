<template>
    <user-row :params="params"></user-row>
</template>
<script>
export default {
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
