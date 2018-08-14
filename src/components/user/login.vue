<template>
    <div id="login">
        <div><span>账户：</span><input type="text" v-model="user_name"></div>
         <div><span>账户：</span><input type="text" v-model="password"></div>
         <button @click="$_ajax_login()">登陆</button>
    </div>
</template>
<script>
import login_api from '../../api/user/login.js';
export default {
    data(){
        return{
            user_name:'',
            password:''
        }
    },
    methods:{
        $_ajax_login(){
            var self = this;
            login_api.login({
                 'username':this.user_name,
                 'password':this.password
            }).then(res=>{
                var result = res.data;
                var code  = result.errorCode;
                var msg = result.msg;
                if(code==1){
                   self.$router.back(-1);
                }
            }).catch(error=>{ 
               console.log(error);
            })
        }
    }
}
</script>
<style>
    
</style>