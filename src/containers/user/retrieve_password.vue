<template>
  <div class="findpass">
    <top :params="{title:'找回密码'}"></top>
    <findPassword></findPassword>
    <!-- <div class="content">
         <div class="div1">
                <input type="password" class="input" placeholder="请输入新密码" v-model="newpass">
         </div>
         <div class="div1">
               <input type="button" class="complete" value="完成" @click="findpass">
         </div>      
    </div>   -->
  </div>
</template>

<script>
// import api from '../../api/user'
// import common from '../../widget/lib/user'
import top from '@/components/decorate/top.vue'
import findPassword from '@/components/user/find_password.vue'
// import md5 from 'js-md5';
export default {
    name: 'findpass',
    // data(){
    // 	return {
    // 		newpass:''
    // 	}
       
	// },
	methods: {
        // findpass(){
        //     let password=this.newpass;
        //     let reg=/^[0-9a-zA-Z]{6,12}$/;
        //     if(password==''){
        //         alert('新密码不能为空');
        //         return false;
        //     }   
        //     if(!reg.test(password)){
        //         alert('密码应为6-12位的字母或数字');
        //         return false;
        //     }
        //     api.findPass({new_password:md5(password)}).then(res=>{
        //         if(res.data.error==0){
        //             alert(res.data.message+'请重新登录');
        //             this.$router.push({path:'/login',query:{BackToPrevious:false}});
        //         }else{
        //             alert(res.data.message);
        //         }
        //     }).catch(error=>{
        //         console.log(error);
        //     })
           
        // }
    },
    components:{
        top,
        findPassword
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
    } */
</style>
