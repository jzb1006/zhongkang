<template>
	<div id="FFooter">
		<div class="row">
			<div class="col_6 btn_l" @click="$router.back(-1)" v-show="back">
				<p class="top" >
					<span>上一步</span>
				</p>
			</div>
			<div class="col_6 btn_r" @click="next()" v-show="next1">
				<p class="bottom">
					<span >下一步</span>
				</p>
			</div>
		</div>
	</div>
</template>

<script>
import {mapState} from 'vuex' 
import Bus from './../../assets/bus.js'

export default {
	name:'btn',
	data(){
		return{
			back:false,
			next1:true,
			pageNum:"1",
		}
	},
	computed:{

	},
	methods:{
		next:function(){
			if(this.$store.state.fang.is_sel){
				let content = this.$store.state.fang.contentJump;
				let contentData = this.$store.state.fang.contentData;
				this.$router.push({path: content, query: contentData});
			}else{
				alert("请选择！！");
			}
			
		}
	},
	mounted(){
		Bus.$on("Content_Type",res=>{
			this.pageNum = res;
			if(this.pageNum>1 && this.pageNum<=7){
				this.back = true;
				this.next1 = true;
			}else if(this.pageNum == 1){
				this.back = false;
				this.next1 = true;
			}else if(this.pageNum == 8){
				this.back = true;
				this.next1 = false;
			}else{
				this.back = false;
				this.next1 = false;
			}
		})
	}
}
</script>

<style scoped>
	#FFooter{
		position: fixed;
		bottom: 1.3rem;
		left: 0;
		right: 0;
		padding: .1rem .3rem;
		background-color: #fff;
	}
	#FFooter .row{
		width: 100%;
	}
	#FFooter .row .col_6{
		width: 45%;
		font-size: .4rem;
		padding: .1rem;
		border: 1px solid #72dacf;
		display: flex;
		justify-content: space-around;
	}
	#FFooter .row .btn_l{
		float: left;
	}
	#FFooter .row .btn_r{
		float: right;
	}
</style>


