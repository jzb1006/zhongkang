<template>
<div id="receipt">
    <user-row :params="params"></user-row>
</div>
</template>
<script>
export default {
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
