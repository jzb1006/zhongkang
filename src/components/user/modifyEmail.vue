<template>
	<div id="modifyEmail">
		<div class="email">
			<div class="left">电子邮箱:</div>
		    <div class="vux-1px include right"><input type="text" class="edit" v-model="email"></div>
		</div>
		<div class="div2">
		     <input type="button" class="save" value="保存" @click="editEmail">
		</div>
	</div>
</template>

<script>
import api from "../../api/setup";
import common from "../../widget/lib/user"
import {mapState,mapGetters} from 'vuex'
export default {
	name:'email',
	data(){
		return{
			email:''
		}
	},
	computed:{
		...mapGetters([
			'getUserinfo'
		]),
		title(){
			if(this.getUserinfo.email!=''){
				return '修改邮箱';
			}else{
				return '绑定邮箱';
			}
		},
	},
	methods:{
		editEmail(){
			let email=this.email;
			let reg_email=/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
			if(email==''){
				alert('邮箱不能为空');
				return false;
			}
	     	if(!reg_email.test(email)){
	     		alert('邮箱格式不正确');
	     		return false;
	     	}
			api.edit_email({'Email':email}).then(res=>{
	     		if(res.data.error==3){
	     			alert(res.data.message);
	     			this.$router.push('/login');
	     		}else if(res.data.error==0){
	     			this.getUserinfo.email=email;
	                this.$store.dispatch('changeUserinfo',this.getUserinfo);
	                this.$router.push({path:'/home/userSetup'});
	     		}else{
	     			alert(res.data.message);
	     		}
	     		
	     	}).catch(error=>{
	     		console.log(error);
			})
		}
	},
	mounted(){
		this.email=this.getUserinfo.email;
	},
}
</script>

<style scoped>
	.email,.div2{
		margin-top:1rem;
		font-size: 0.3rem;
		text-align: center;
	}
	.email::after{
		content:'';
		display: block;
		clear:both;
	}
	.email .left{
		float:left;
		width:30%;
		padding:.2rem;
		box-sizing: border-box;
	}
	.email .right{
		float:left;
		width:60%;
	}
	.include{
		width:60%;
		padding:0.2rem;
		font-size: 0.3rem;
		margin:0 auto;
	}
	.edit{
		width:70%;
		font-size: 0.3rem;
		position: relative;
        z-index:100;
        display:block;
        width:96%;
	}
	.div2{
		margin-top:0.25rem;
	}
	.save{
		width:50%;
		padding:.2rem;
		font-size: .3rem;
		background: #ff5370;
		color:#fff;
		border-radius:.2rem;
	}
</style>