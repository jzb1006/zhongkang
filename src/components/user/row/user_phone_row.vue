<template>
    <div id="user_phone_row">
        <userSetupRow :params="params2" v-if="isShow"></userSetupRow>
        <userSetupRow :params="params3" v-else></userSetupRow>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import userSetupRow from "@/components/user/row/user_setup_row.vue"
    export default {
        name:'user_phone_row',
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


