<template>
  <div class="register">
    <top title="注册"></top>
    <div class="content_register">
          <div class="div1">
                <div class="span">手机号码:</div>
                <div class="vux-1px include input_right"><input type="text" v-model="username" class="input" id="mobile" autofocus="autofocus"></div>
                <div class="clear"></div>
          </div>
          <span id="mobileErrorMessage" style="display:none;"></span>
          <div class="div1">
              <div class="span">用户密码:</div>
              <div class="vux-1px include input_right"><input type="password" v-model="password" class="input"></div>
              <div class="clear"></div>
          </div>
          <span id="passErrorMessage" style="display:none;"></span>
          <div class="div1">
               <!-- <input type="text" class="input_code input" v-model="verificationCode" placeholder="手机验证码">
               <input type="button" class="input_code" value="获取验证码" @click="get_yanzhengma('mobile')"> -->
               <div class="code">
					<div class="vux-1px include left"><input type="text" class="input yan" placeholder="手机验证码" v-model="verificationCode"></div>
					<span class="input get right" @click="get_yanzhengma">获取验证码</span>
					<div class="clear"></div>
				</div>
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
        margin:0 .5rem .3rem;
        height:1rem;
    }
    .span{
        float:left;
        width:30%;
        box-sizing:border-box;
        line-height:1rem;
    }
    .include{
		width:70%;
        margin:0 auto;
		padding:.1rem;
	}
    .input{
        position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
    }
    .input_right{
        float:right;
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        font-size:0.3rem;
        width:70%;
        box-sizing: border-box;
    }
    .input_code{
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        font-size:0.3rem;
    }
    .input_register{
        width:76%;
        padding:0.25rem 0.25rem 0.25rem 0.15rem;
        border:none;
        border-radius:.2rem;
        font-size:0.3rem;
        background: #ff5370;
		color:#fff;
    }
    .yan{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.15rem .15rem .15rem 0;
        font-size:.3rem;
	}
	.get{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.27rem 0;
		background: #ff5370;
        color:#fff;
	}
    .left{
        padding:0.1rem;
        float:left;
        width:65%;
        box-sizing:border-box;
    }
    .right{
        float:left;
        width:35%;
		box-sizing:border-box;
    }
	.clear{
        content:'';
        display:block;
        clear:both;
    }
</style>
