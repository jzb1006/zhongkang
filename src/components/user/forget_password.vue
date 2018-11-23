<template>
  <div id="forget_password">
    <div class="content">
        <div class="div1">
            <div class="vux-1px include"><input type="text" v-model="phonenum" class="phone" placeholder="手机号码"></div>
        </div>
        <div class="div1">
            <div class="code">
                <verificationCode :exist="true" :phoneNum="this.phonenum" @inputCode="inputCode"></verificationCode>
            </div>
        </div>
        <div class="div1">
            <input type="button" class="find" value="找回密码" @click="message_verification">
        </div>            
        <div>
            <p class="lose">
                <router-link :to="{name:'container',query:{id:'31'}}" class="losephone">手机号丢失?</router-link>
            </p>
        </div>
    </div>
    <Alert v-bind:Show.sync="alertShow" :alerttType="alertType" :alertText="alertText"></Alert>
  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import verificationCode from '@/components/common/verification_code.vue'
export default {
    name: 'forget_password',
    data(){
    	return {
    		phonenum: '',
            verificationCode:'',
            title:'找回密码',
            alertShow:false,
			alertType:'warn',
			alertText:'',
    	} 
	},
	methods: {
        message_verification(){
            let Mobile=this.phonenum;
            let yanzhengma=this.verificationCode;
            console.log(yanzhengma);
            var self=this;
            if(!common.checkPhoneNum(self,Mobile)){
                return false;
            }
            if(!common.checkVerificationCode(self,yanzhengma)){
                return false;
            }
            api.ajaxuserPost('message_verification',{mobile_phone:Mobile,yanzheng:yanzhengma}).then(res=>{
                if(res.data.error==0){
                    this.$router.push({name:'container',query:{id:'32'}});
                }else if(res.data.error==2){
                    this.alertShow=true;
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
        top,
        verificationCode,
    }
}
</script>

<style scoped>
    .content{
        margin-top:2rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .div1{
        margin-bottom:0.4rem;
    }
    .lose,.find,.code{
        width:70%;
        margin:0 auto;
    }
    .include{
		width:70%;
        margin:0 auto;
		padding:.1rem;
        box-sizing: border-box;
	}
    .phone{
        position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
        padding:.15rem .15rem .15rem 0;;
        box-sizing: border-box;
    }
    .find{
        padding:0.25rem 0.12rem;
        font-size:0.3rem;
        box-sizing: border-box;
    }
    .find{
       background: #ff5370;
		color:#fff;
        border-radius:.2rem;
    }
    .losephone{
        text-decoration:none;
        color:#ff5370;
        font-size:0.3rem;
    }
</style>
