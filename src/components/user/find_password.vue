<template>
  <div id="find_password">
    <div class="content">
         <div class="div1">
                <input type="password" class="input" placeholder="请输入新密码" v-model="newpass">
         </div>
         <div class="div1">
               <input type="button" class="complete" value="完成" @click="findpass">
         </div>      
    </div>
    <Alert v-bind:Show.sync="alertShow" :alerttType="alertType" :alertText="alertText"></Alert>
  </div>
</template>

<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
import md5 from 'js-md5';
export default {
    name: 'find_password',
    data(){
    	return {
            newpass:'',
            alertShow:false,
			alertType:'warn',
			alertText:'',
    	}
       
	},
	methods: {
        findpass(){
            let password=this.newpass;
            let reg=/^[0-9a-zA-Z]{6,12}$/;
            if(password==''){
                // alert('新密码不能为空');
                this.alertShow=true;
                this.alertType='warn';
                this.alertText='新密码不能为空';
                return false;
            }   
            if(!reg.test(password)){
                // alert('密码应为6-12位的字母或数字');
                this.alertShow=true;
                this.alertType='warn';
                this.alertText='密码应为6-12位的字母或数字';
                return false;
            }
            api.findPass({new_password:md5(password)}).then(res=>{
                if(res.data.error==0){
                    // alert(res.data.message+'请重新登录');
                    this.alertShow=true;
                    this.alertType='success';
                    this.alertText=`${res.data.message}请重新登录`;
                    setTimeout(()=>{
                        this.$router.push({name:'container',query:{id:'28'}});
                        this.$store.dispatch('changeIsBackToPrevious',false);
                    },2000)
                    
                }else{
                    this.alertShow=true;
                    this.alertType='success';
                    this.alertText=res.data.message;
                    // alert(res.data.message);
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
        margin-top:2rem;
        font-size: 0.3rem;
        text-align: center;
    }
    .div1{
        margin-bottom:0.4rem;
    }
    .input{
        border:1px solid #ccc;
        padding:0.25rem;
        font-size:0.3rem;
    }
    .complete{
        width:30%;
        padding:0.25rem;
        font-size:0.3rem;
        background: #ff5370;
        color:#fff;
        border-radius:.2rem;
    }
</style>
