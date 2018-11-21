<template>
    <div id="setup_email">
        <router-link :to="{name:'container',query:{id:'40'}}" tag="div" v-if="isShow">
            <userSetupRow :params="params5" ></userSetupRow>
        </router-link>
        <router-link :to="{name:'container',query:{id:'40'}}" class="item vux-1px-b" tag="div" v-else>
            <userSetupRow :params="params6" ></userSetupRow>
        </router-link>
    </div>
</template>
<script>
    import {mapState,mapGetters} from 'vuex'
    import userSetupRow from "@/components/user/row/user_setup_row.vue"
    export default {
        name:'setup_email',
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
                return false;
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


