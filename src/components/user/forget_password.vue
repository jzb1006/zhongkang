<template>
  <div class="password">
    <top title="忘记密码"></top>
    <div class="content">
        <div class="div1">
            <div class="vux-1px include"><input type="text" v-model="phonenum" class="phone" placeholder="手机号码"></div>
        </div>
        <div class="div1">
            <!-- <div class="code">
                <input type="text" class="yan" v-model="verificationCode" placeholder="手机验证码">
                <input type="button" class="get" value="获取验证码" @click="get_yanzhengma_exist">
            </div> -->
            <div class="code">
                <div class="vux-1px include left"><input type="text" class="input yan" placeholder="手机验证码" v-model="code"></div>
                <span class="input get right" @click="get_yanzhengma_exist">获取验证码</span>
                <div class="clear"></div>
            </div>
        </div>
        <div class="div1">
            <input type="button" class="find" value="找回密码" @click="message_verification">
        </div>            
        <div>
            <p class="lose">
                <router-link to="/losephone" class="losephone">手机号丢失?</router-link>
            </p>
        </div>
    </div>
  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import top from '@/components/decorate/top_back_title.vue'
export default {
    name: 'password',
    data(){
    	return {
    		phonenum: '',
            verificationCode:'',
            title:'找回密码'
    	} 
	},
	methods: {
        get_yanzhengma_exist(){
            let mobileNum=this.phonenum;
            if(!common.checkPhoneNum(mobileNum)){
                return false;
            }
            common.getVerificationCode_exit(mobileNum);
        },
        message_verification(){
            let Mobile=this.phonenum;
            let yanzhengma=this.verificationCode;
            if(!common.checkPhoneNum(Mobile)){
                return false;
            }
            if(!common.checkVerificationCode(yanzhengma)){
                return false;
            }
            api.ajaxuserPost('message_verification',{mobile_phone:Mobile,yanzheng:yanzhengma}).then(res=>{
                if(res.data.error==0){
                    this.$router.push('/retrievePassword');
                }else if(res.data.error==2){
                    alert(res.data.message);
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .content{
        margin-top:2.5rem;
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
    .input,.find,.yan,.get{
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
    .yan{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.15rem .15rem .15rem 0;
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
