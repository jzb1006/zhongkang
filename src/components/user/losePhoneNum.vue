<template>
  <div id="losePhoneNum">
    <div class="content">
         <div class="div1">
                <div class="vux-1px include"><input type="text" class="email" placeholder="邮箱" v-model="email"></div>
         </div>
         <div class="div1">
               <input type="button" class="complete" value="找回密码"  id="submit" @click="email_verification">
         </div>           
    </div>
  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
export default {
    name: 'losephone',
    data(){
    	return {
    		email: ''
    	}
       
	},
	methods: {
        email_verification(){
            let Email=this.email;
            let url=api.imgUrl()+"m/dist/#/retrievePassword";
            const reg_email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
            if(Email==''){
                alert('邮箱不能为空');
                return false;
            }
            if(!reg_email.test(Email)){
                alert('邮箱格式不正确');
                return false;
            }
            api.email_verification({email:Email,url:url}).then(res=>{
                if(res.data==''){
                    alert('发送失败');
                    return false;
                }
                if(res.data.error==1){
                    alert(res.data.message);
                    // this.$router.push('/retrievePassword');
                }else{
                    alert(res.data.message);
                }
            }).catch(error=>{
                console.log(error);
            })       
        }
    },
    components:{

    }
}
</script>

<style scoped>
    .content{
        margin-top:2.5rem;
        font-size: 0.3rem;
        text-align:center;
    }
    .div1{
        margin-bottom:0.4rem;
    }
    .include{
		width:60%;
		padding:.2rem;
		font-size: .3rem;
		margin:0 auto;
	}
    .email{
        width:100%;
		font-size: 0.3rem;
		position: relative;
        z-index:100;
        display:block;
        box-sizing:border-box;
    }
    .complete{
        /* width:30%; */
        width:40%;
        margin:0 auto;
        padding:.2rem;
        font-size:0.3rem;
        background: #ff5370;
		color:#fff;
        border-radius:.2rem;
    }
</style>
