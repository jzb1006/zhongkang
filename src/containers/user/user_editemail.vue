<template>
	<div id="email">
		<emailTop></emailTop>
		<modifyEmail></modifyEmail>
	</div>
</template>

<script>
// import top from '@/components/decorate/top.vue'
import emailTop from '@/components/user/email_top'
import modifyEmail from '@/components/user/modify_email'
// import {mapState,mapGetters} from 'vuex'
export default {
	name:'email',
	data(){
		return{
			email:'',
			// params:{
			// 	title:this.title
			// }
		}
	},
	computed:{
		// ...mapGetters([
		// 	'getUserinfo'
		// ]),
		// title(){
		// 	if(this.getUserinfo.email!=''){
		// 		return '修改邮箱';
		// 	}else{
		// 		return '绑定邮箱';
		// 	}
		// },
		// params(){
		// 	return{
		// 		title:this.title,
		// 	}
		// }
	},
	components:{
		// top,
		emailTop,
		modifyEmail,
	}
}
</script>

<style scoped>

</style>