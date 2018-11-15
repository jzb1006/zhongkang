<template>
    <div id="setupPhone">
        <user-setup-row :params="params2" v-if="isShow"></user-setup-row>
        <user-setup-row :params="params3" v-else></user-setup-row>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import userSetupRow from "@/components/user/row/userSetupRow.vue"
    export default {
        computed:{
            ...mapGetters([
                'getUserinfo'
            ]),
            isShow(){
                if(this.getUserinfo.mobile_phone!=''){
                    return true;
                }else{
                    return false;
                }
            },
            params2(){
                return {
                    link:'/home/userEditphone',
                    text:'修改手机号',
                }
            },
            params3(){
                return {
                    link:'/home/userEditphone',
                    text:'绑定手机号',
                }
            },
        },
        components:{
            userSetupRow
        }
    }
</script>
<style scoped>

</style>


