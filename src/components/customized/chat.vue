<template>
    <div id="chat">
        <chatContent :params=params></chatContent>
        <chatFoot :params="params"></chatFoot>
    </div>
</template>
<script>
export default {
    name:'chat',
    props:{
        params:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    data(){
        return {
            // params:{
            //     direction:0
            // },
        }
    }
}
</script>
<style scoped>

</style>


