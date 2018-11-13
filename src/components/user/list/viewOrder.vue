<template>
<div id="viewOrder">
<user-row :params="params"></user-row>
</div>
    
</template>
<script>
export default {
    data(){
        return {
             params:{
                    
                    link:"/replyOrder",
                    iconClass:"zk-icon-dingzhijiaju",
                    text:'顾问查看已接订单',
                    // isShow:true,
                    
                },
        }
    }
}
</script>
<style>

</style>
