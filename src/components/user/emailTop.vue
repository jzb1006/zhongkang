<template>
	<div id="emailTop">
		<top :params="{
				title:this.title,
			}"></top>
	</div>
</template>

<script>
import top from '@/components/decorate/top.vue'
import {mapState,mapGetters} from 'vuex'
export default {
	name:'emailTop',
	computed:{
		...mapGetters([
			'getUserinfo'
		]),
		title(){
			if(this.getUserinfo.email!=''){
				return '修改邮箱'
			}else{
				return '绑定邮箱'
			}
		},
	},
	components:{
		top,
	}
}
</script>

<style scoped>

</style>