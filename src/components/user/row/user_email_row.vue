<template>
    <div id="user_email_row">
        <userSetupRow :params="params5" v-if="isShow"></userSetupRow>
        <userSetupRow :params="params6" v-else></userSetupRow>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import userSetupRow from "@/components/user/row/user_setup_row.vue"
    export default {
        name:'user_email_row',
        computed:{
            ...mapGetters([
                'getUserinfo'
            ]),
            isShow(){
                if(this.getUserinfo.email!=''&&this.getUserinfo.email!=null){
                    return true;
                }else{
                    return false;
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
            userSetupRow
        }
    }
</script>
<style scoped>

</style>


