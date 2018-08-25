<template>
  <div class="userlogin">
    <top title="登录"></top>
    <div class="content_login">
         <div class="text">
                <div class="vux-1px include"><input  placeholder="手机/邮箱" type="text" v-model="username" class="input"></div>
         </div>
         <div class="text">
                <div class="vux-1px include"><input placeholder="请输入密码" type="password" v-model="password" class="input"></div>
         </div>
         <div class="text">
               <input value="登录" type="button" @click="submit_login" class="login">
         </div>
         <div class="text">
                <router-link to="/register" class="reg">新用户注册?</router-link>
                <router-link to="/forgetPassword" class="reg">忘记密码?</router-link>
         </div>
    </div>         


  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import top from '@/components/decorate/top_back_title.vue'
export default {
    name: 'userlogin',
    data(){
        return {
            username: '',
            password:'',
            backToPrevious:true
        } 
    },
    methods: {
        submit_login(){
            let username=this.username;
            let password=this.password;
            if(!common.checkPhoneNum(username)){
                return false;
            }
            if(!common.checkPassword(password)){
                return false;
            }
            let postData = {
                'username':username,
                'password':password
            };
            api.ajaxloginPost('login',postData).then(res=>{
                if(res.data.error==0){
                    if(this.backToPrevious){
                        this.$router.go(-1);
                    }else{
                        this.$router.push('/');
                        this.backToPrevious=true;
                    }
                    
                }else{
                    alert(res.data.message);
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        register(){
            this.$router.push({path:'/register'});
        }
    },
    mounted(){
        if(this.$route.query.BackToPrevious==false){

            this.backToPrevious=this.$route.query.BackToPrevious;
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .content_login{
        width:90%;
        margin:2.5rem auto;
        font-size: 0.35rem;
        text-align: center;
    }
    .text{
        margin-bottom:0.3rem;
    }
    .include{
		width:60%;
		padding:0.2rem;
		font-size: 0.3rem;
        margin:0 auto;
	}
    .input{
        position: relative;
        z-index:100;
        display:block;
        width:100%;
        box-sizing: border-box;
        font-size: 0.3rem;
        margin:0 auto;
    }
    .login{
        width:65%;
        font-size: 0.3rem;
        padding:0.2rem 0.2rem 0.2rem 0.1rem;
        border:none;
        border-radius:0.2rem;
        background: #ff5370;
		color:#fff;
    }
    .reg{
        text-decoration:none;
        color:#ff5370;
        font-size:0.3rem;
    }
</style>
