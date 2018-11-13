<template>
    <div id="adviserAuthenticationState">
        <authentication-state v-if="is_authentication"></authentication-state>
        <adviser-authentication v-else></adviser-authentication>
    </div>    
</template>

<script>
    import api from "../../api/customized"
    import adviserAuthentication from '@/components/adviser/adviserAuthentication'
    import authenticationState from '@/components/adviser/authenticationState'
    export default{
        name:'adviserAuthenticationState',
        data(){
            return{
                is_authentication:false,
            }
        },
        methods:{
            //查看认证状态
            query_authentication_state(){
                api.query_authentication_state().then(res=>{
                    console.log(res);
                    if(res.data.error_code==1){
                        console.log('c');
                        this.is_authentication=true;
                        this.is_check=res.data.msg;
                    }else{
                        console.log('b');
                        this.is_authentication=false;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
        },
        mounted(){
            this.query_authentication_state();
        },
        components:{
            adviserAuthentication,
            authenticationState,
        }
    }
</script>
<style scoped>
    
</style>