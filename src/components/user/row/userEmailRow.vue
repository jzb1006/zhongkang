<template>
    <div id="userEmailRow">
        <user-setup-row :params="params5" v-if="isShow"></user-setup-row>
        <user-setup-row :params="params6" v-else></user-setup-row>
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


