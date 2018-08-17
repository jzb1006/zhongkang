<template>
	<div id="email">
		<top v-bind:title="title"></top>
		<div class="email">
		     <input type="text" class="edit" v-model="email">
		</div>
		<div class="div2">
		     <input type="button" class="save" value="保存" @click="editEmail">
		</div>
	</div>
</template>

<script>
import api from "../../api/user";
import common from "../../widget/lib/user"
import top from '@/components/decorate/top_back_title.vue'
import {mapState,mapGetters} from 'vuex'
export default {
	name:'email',
	data(){
		return{
			email:''
		}
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
	     	api.ajaxSetupPost('edit_email',{'Email':email}).then(res=>{
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
		}
	},
	mounted(){
		this.email=this.getUserinfo.email;
	},
	components:{
		top
	}
}
</script>

<style scoped>
	.email,.div2{
		margin-top:1rem;
		font-size: 0.3rem;
		text-align: center;
	}
	.edit{
		width:70%;
		border: 2px solid #ccc;
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.35rem;
	}
	.div2{
		margin-top:0.25rem;
	}
	.save{
		width:30%;
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.35rem;
	}
</style>