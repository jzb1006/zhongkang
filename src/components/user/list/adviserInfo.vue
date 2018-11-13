<template>
    <div id="adviserInfo">
        <user-row :params="params"></user-row>
    </div>
</template>
<script>
export default {
    data(){
        return {
            params:{
                link:"/adviserAuthentication",
                iconClass:"zk-icon-dingzhijiaju",
                text:'顾问资料',
            },
        }
    }
}
</script>
<style>

</style>
