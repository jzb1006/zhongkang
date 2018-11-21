<template>
<div id="money">
    <user-row :params="params"></user-row>
</div>
    
</template>
<script>
export default {
    data(){
        return {
             params:{
                    link:"/home/userWallet",
                    iconClass:"zk-icon-qianbao",
                    text:'我的钱包',
                },
        }
    }
}
</script>
<style>

</style>
