<template>
  <div class="password">
    <top :params="{title:'忘记密码'}"></top>
    <forget-password></forget-password>
    <!-- <div class="content">
        <div class="div1">
            <div class="vux-1px include"><input type="text" v-model="phonenum" class="phone" placeholder="手机号码"></div>
        </div>
        <div class="div1">
            <div class="code">
                <verification-code :exist="true" :phoneNum="this.phonenum" @inputCode="inputCode"></verification-code>
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
    </div> -->
  </div>
</template>

<script>
// import api from '../../api/user'
// import common from '../../widget/lib/user'
import top from '@/components/decorate/top.vue'
// import verificationCode from '@/components/common/verificationCode.vue'
import forgetPassword from '@/components/user/forgetPassword.vue'
export default {
    name: 'password',
    // data(){
    // 	return {
    // 		phonenum: '',
    //         verificationCode:'',
    //         title:'找回密码',
    // 	} 
	// },
	// methods: {
    //     message_verification(){
    //         let Mobile=this.phonenum;
    //         let yanzhengma=this.verificationCode;
    //         console.log(yanzhengma);
    //         if(!common.checkPhoneNum(Mobile)){
    //             return false;
    //         }
    //         if(!common.checkVerificationCode(yanzhengma)){
    //             return false;
    //         }
    //         api.ajaxuserPost('message_verification',{mobile_phone:Mobile,yanzheng:yanzhengma}).then(res=>{
    //             if(res.data.error==0){
    //                 this.$router.push('/retrievePassword');
    //             }else if(res.data.error==2){
    //                 alert(res.data.message);
    //             }
    //         }).catch(error=>{
    //             console.log(error);
    //         })
    //     },
    //     inputCode(data){
    //         this.verificationCode=data;
    //     }
    // },
    components:{
        top,
        // verificationCode,
        forgetPassword,
    }
}
</script>

<style scoped>
    /* .content{
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
    } */
</style>
