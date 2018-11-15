<template>
    <user-row :params="params"></user-row>
</template>
<script>
export default {
    data(){
        return {
             params:{
                        link:"/customizedOrder",
                        iconClass:"zk-icon-icon-",
                        text:'定制订单',
                    // isShow:true,
                },
        }
    }
}
</script>
<style>

</style>
