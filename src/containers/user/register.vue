<template>
  <div id="register">
    <top :params="{title:'注册'}"></top>
    <userRegister></userRegister>
  </div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import userRegister from '@/components/user/user_register.vue'
export default {
    name: 'register',
    // data(){
    // 	return {
    // 		username: '',
    //         password:'',           
    //         verificationCode:'',
    // 	}
       
	// },
	// methods: {
    //     submit_register(){
    //         if(!common.checkPassword(this.password)){
    //             return false;
    //         }
    //         let password=md5(this.password);
    //         let verificationCode=this.verificationCode;
    //         let username=this.username;
    //         if(!common.checkPhoneNum(username)){
    //             return false;
    //         }
            
    //         if(!common.checkVerificationCode(verificationCode)){
    //             return false;
    //         }
    //         let postData = {
    //             'mobile_phone':username,
    //             'password':password,
    //             'yanzheng':verificationCode,
    //             'user_rank':'1'
    //         };
    //         api.register(postData).then(res=>{
    //             console.log(res);
    //             if(res.data.error==0){
    //                 this.$router.push({path:'/'});
    //             }else{
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
        userRegister
    }
}
</script>

<style scoped>
    /* .content_register{
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
    .right{
        float:left;
        width:35%;
		box-sizing:border-box;
    }
	.clear{
        content:'';
        display:block;
        clear:both;
    } */
</style>
