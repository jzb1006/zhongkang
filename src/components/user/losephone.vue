<template>
  <div class="losephone">
    <top title="丢失手机号"></top>
    <div class="content">
         <div class="div1">
                <input type="text" class="email" placeholder="邮箱" v-model="email">
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
import top from '@/components/decorate/top_back_title.vue'
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
            api.ajaxloginPost('email_verification',{email:Email,url:url}).then(res=>{
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
        top
    }
}
</script>

<style scoped>
    .content{
        margin-top:2.5rem;
        font-size: 0.3rem;
        text-align:center;
    }
    .email,.complete{
        width:70%;
        margin:0 auto;
    }
    .div1{
        margin-bottom:0.4rem;
    }
    .email{
        border: 2px solid #ccc;
        padding:0.25rem;
        box-sizing:border-box;
        font-size:0.3rem;
    }
    .complete{
        /* width:30%; */
        padding:0.25rem;
        font-size:0.3rem;
        background:rgb(10, 153, 146);
        color:#fff;
        border-radius:.2rem;
    }
</style>
