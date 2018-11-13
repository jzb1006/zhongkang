<template>
  <div class="userlogin">
    <top :params="{title:'登录'}"></top>
    <user-login></user-login>
    <!-- <div class="content_login">
         <div class="text">
                <div class="vux-1px include"><input  placeholder="手机/邮箱" type="text" v-model="username" class="input"></div>
         </div>
         <div class="text">
                <div class="vux-1px include"><input placeholder="请输入密码" type="password" v-model="password" class="input"></div>
         </div>
         <div class="text" v-if="input_code">
            <div class="code">
                <verification-code :exist="true" :phoneNum="this.username" @inputCode="inputCode"></verification-code>
            </div>
        </div>
         <div class="text">
               <input value="登录" type="button" @click="submit_login" class="login">
         </div>
         <div class="text">
                <router-link to="/register" class="reg">新用户注册?</router-link>
                <router-link to="/forgetPassword" class="reg">忘记密码?</router-link>
         </div>
    </div> -->


  </div>
</template>

<script>
// import api from '../../api/user'
// import common from '../../widget/lib/user'
import top from '@/components/decorate/top.vue'
import userLogin from '@/components/user/userLogin.vue'
// import verificationCode from '@/components/common/verificationCode.vue'
// import md5 from 'js-md5';
export default {
    name: 'userlogin',
    // data(){
    //     return {
    //         username: '',
    //         password:'',
    //         backToPrevious:true,
    //         input_code:false,
    //         code:'',
    //     } 
    // },
    // methods: {
    //     submit_login(){
    //         let username=this.username;
    //         let password=this.password;
    //         let code=this.code;
    //         if(!common.checkPhoneNum(username)){
    //             return false;
    //         }
    //         if(!common.checkPassword(password)){
    //             return false;
    //         }
    //         let postData = {
    //             'username':username,
    //             'password':md5(password),
    //             'vifcode':code,
    //         };
    //         api.login(postData).then(res=>{
    //             console.log(res);
    //             if(res.data.error_code==1){
    //                 if(this.backToPrevious){
    //                     this.$router.go(-1);
    //                 }else{
    //                     this.$router.push('/');
    //                     this.backToPrevious=true;
    //                 }
    //                 api.user_center().then(res=>{
    //                     console.log(res);
    //                     let data=res.data;
    //                     this.$store.dispatch('changeUserinfo',data);
    //                 }).catch(error=>{
    //                     console.log(error);
    //                 })
    //                 this.loginSuccessToApp(username,md5(password));
    //             }else if(res.data.error_code==2){
    //                 alert(res.data.msg);
    //                 // this.$router.push('/frequentLogin');
    //                 this.input_code=true;
                    
    //             }else{
    //                 alert(res.data.msg);
    //             }
    //         }).catch(error=>{
    //             console.log(error);
    //         })
    //     },
    //     loginSuccessToApp(username,password){
    //         //调用Android的方法启动相册
    //         alert('hello');
    //         window.network.loginSuccessToApp(username,password);
    //     },
    //     register(){
    //         this.$router.push({path:'/register'});
    //     },
    //     get_yanzhengma(){
    //         let mobileNum=this.username;
    //         var self=this;
    //         if(!common.checkPhoneNum(mobileNum)){
    //             return false;
    //         }
    //         common.getVerificationCode_exit(mobileNum,self);
    //     },
    //     inputCode(data){
    //         this.code=data;
    //     }
    // },
    // mounted(){
    //     if(this.$route.query.BackToPrevious==false){

    //         this.backToPrevious=this.$route.query.BackToPrevious;
    //     }
    // },
    components:{
        top,
        // verificationCode,
        userLogin
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
		width:65%;
		padding:0.2rem;
		font-size: 0.3rem;
        margin:0 auto;
        box-sizing: border-box;
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


    .code{
		width:65%;
		/* padding:0.2rem; */
		font-size: 0.3rem;
        margin:0 auto;
        
	}
    .include1{
		width:70%;
        margin:0 auto;
		padding:.1rem;
	}
</style>
