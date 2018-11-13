<template>
	<div id="phone">
		<!-- <top :params="{
				title:this.title,
			}"></top> -->
		<phone-top></phone-top>
		<show-phone></show-phone>
		<modify-phone></modify-phone>
	</div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import {mapState,mapGetters} from 'vuex'
import showPhone from '@/components/user/showPhone.vue'
import modifyPhone from '@/components/user/modifyPhone.vue'
import phoneTop from '@/components/user/phoneTop.vue'
export default {
	name:'phone',
	// computed:{
	// 	...mapGetters([
	// 		'getUserinfo'
	// 	]),
	// 	title(){
	// 		if(this.getUserinfo.mobile_phone!=''){
	// 			return '修改手机号'
	// 		}else{
	// 			return '绑定手机号'
	// 		}
	// 	},
	// },
	components:{
		phoneTop,
		showPhone,
		modifyPhone,
	}
}
</script>

<style scoped>

</style>