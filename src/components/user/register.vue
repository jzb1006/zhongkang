<template>
  <div class="register">
    <top title="注册"></top>
    <div class="content_register">
          <div class="div1">
                <span class="span">手机号码:</span><input type="text" v-model="username" class="input" id="mobile" autofocus="autofocus">
          </div>
          <span id="mobileErrorMessage" style="display:none;"></span>
          <div class="div1">
              <span class="span">用户密码:</span><input type="password" v-model="password" class="input">
          </div>
          <span id="passErrorMessage" style="display:none;"></span>
          <div class="div1">
               <input type="text" class="input_code input" v-model="verificationCode" placeholder="手机验证码">
               <input type="button" class="input_code" value="获取验证码" @click="get_yanzhengma('mobile')">
          </div>
          <div class="div1">
                <input  type="button" value="同意协议并注册"  @click="submit_register" class="input_register">
          </div>
    </div>    


  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import top from '@/components/decorate/top_back_title.vue'
export default {
    name: 'register',
    data(){
    	return {
    		username: '',
            password:'',           
            verificationCode:''
    	}
       
	},
	methods: {
        submit_register(){
            let username=this.username;
            let password=this.password;
            let verificationCode=this.verificationCode;
            if(!common.checkPhoneNum(username)){
                return false;
            }
            if(!common.checkPassword(password)){
                return false;
            }
            if(!common.checkVerificationCode(verificationCode)){
                return false;
            }
            let postData = {
                'mobile_phone':username,
                'password':password,
                'yanzheng':verificationCode,
                'user_rank':'1'
            };
            api.ajaxloginPost('register',postData).then(res=>{
                if(res.data.error==0){
                    this.$router.push({path:'/'});
                }else{
                    alert(res.data.message);
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        //获取验证码(手机号码未存在才发送验证码）
        get_yanzhengma(){
            let mobileNum=this.username;
            if(!common.checkPhoneNum(mobileNum)){
                return false;
            }
            common.getVerificationCode(mobileNum);
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .content_register{
        width:90%;
        margin:2.5rem auto;
        font-size: 0.3rem;
        text-align: center;
    }
    .div1{
        margin-bottom:0.3rem;
    }
    .input{
        border:2px solid #ccc;
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        font-size:0.3rem;
    }
    .input_code{
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        font-size:0.3rem;
    }
    .input_register{
        width:76%;
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        border:none;
        border-radius:0.25rem;
        font-size:0.3rem;
    }
</style>
