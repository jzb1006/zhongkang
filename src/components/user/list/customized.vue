<template>
<div id="customized">
<user-row :params="params"></user-row>
</div>
    
</template>
<script>
export default {
    data(){
        return {
             params:{
                    
                    link:"/customized",
                    iconClass:"zk-icon-dingzhijiaju",
                    text:'私人定制',
                    // isShow:true,
                    
                },
        }
    }
}
</script>
<style>

</style>
