<template>
  <div id="user_register">
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
                <verificationCode :phoneNum="this.username" @inputCode="inputCode"></verificationCode>
          </div>
          <div class="div1">
                <input type="button" value="同意协议并注册"  @click="submit_register" class="input_register">
          </div>
    </div>
    <Alert v-bind:Show.sync="alertShow" :alerttType="alertType" :alertText="alertText"></Alert>

  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import verificationCode from '@/components/common/verification_code.vue'
import { setInterval, clearInterval } from 'timers';
import md5 from 'js-md5';
export default {
    name: 'user_register',
    data(){
    	return {
    		username: '',
            password:'',
            verificationCode:'',
            alertShow:false,
			alertType:'warn',
			alertText:'',
    	}
       
	},
	methods: {
        submit_register(){
            var self=this;
            if(!common.checkPhoneNum(self,this.username)){
                return false;
            }
            if(!common.checkPassword(self,this.password)){
                return false;
            }
            let password=md5(this.password);
            let verificationCode=this.verificationCode;
            let username=this.username;
            
            
            if(!common.checkVerificationCode(self,verificationCode)){
                return false;
            }
            let postData = {
                'mobile_phone':username,
                'password':password,
                'yanzheng':verificationCode,
                'user_rank':'1'
            };
            api.register(postData).then(res=>{
                console.log(res);
                if(res.data.error==0){
                    this.$router.push({name:'container',query:{id:'1'}});
                }else{
                    // alert(res.data.message);
                    this.alertShow=true;
                    this.alertType='warn';
                    this.alertText=res.data.message;
                }
            }).catch(error=>{
                console.log(error);
            })
        },
        inputCode(data){
            this.verificationCode=data;
        }
    },
    components:{
        verificationCode,
    }
}
</script>

<style scoped>
    .content_register{
        width:90%;
        margin:2rem auto;
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
