<template>
    <div id="setup">
        <top :params=params></top>
        <!-- <setup-con></setup-con> -->
        <user-setup-row :params="params1"></user-setup-row>

        <user-phone-row></user-phone-row>
        
        <user-setup-row :params="params4"></user-setup-row>

        <user-email-row></user-email-row>
        <!-- <user-setup-row :params="params5"></user-setup-row>
        <user-setup-row :params="params6"></user-setup-row> -->
        <logout></logout>
    </div>
</template>

<script>
import top from "@/components/decorate/top.vue";
// import setupCon from "@/components/user/setupCon.vue"
import logout from "@/components/user/logout.vue"
import userSetupRow from "@/components/user/row/userSetupRow.vue"
import userPhoneRow from "@/components/user/row/userPhoneRow.vue"
import userEmailRow from "@/components/user/row/userEmailRow.vue"
// import {mapState,mapGetters} from 'vuex'
export default {
    name: 'setup',
    data(){
        return {
            params:{
                title:'设置',
            }
        }
    },
    computed:{
        // ...mapGetters([
        //   'getUserinfo'
        // ]),
        params1(){
            return {
                link:'/home/userSelfinfo',
                text:'个人信息',
                // isShow:true,
            }
        },
        params2(){
            return {
                link:'/home/userEditphone',
                text:'修改手机号',
                // isShow:this.getUserinfo.mobile_phone!='',
            }
        },
        params3(){
            return {
                link:'/home/userEditphone',
                text:'绑定手机号',
                // isShow:this.getUserinfo.mobile_phone=='',
            }
        },
        params4(){
            return {
                link:'/home/userEditpassword',
                text:'修改密码',
                // isShow:true,
            }
        },
        params5(){
            return {
                link:'/home/userEditemail',
                text:'修改邮箱',
                // isShow:this.getUserinfo.email!=''&&this.getUserinfo.email!=null,
            }
        },
        params6(){
            return {
                link:'/home/userEditemail',
                text:'绑定邮箱',
                // isShow:!(this.getUserinfo.email!=''&&this.getUserinfo.email!=null),
                // isShow:this.getUserinfo.demail==''||this.getUserinfo.email==null,
            }
        },
    },
    components:{
        top,
        // setupCon,
        logout,
        userSetupRow,
        userPhoneRow,
        userEmailRow
    }
}
</script>

<style scoped>
#setup{
    background:#f0f0f0;
    font-size:.32rem;
}
</style>
