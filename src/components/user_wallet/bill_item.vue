<template>
	<div id="billItem">
		<div class="box" @click="detail(item.order_sn)">
			<div class="left">
				<p class="desc">{{item.changedesc}}</p>
				<p class="time">{{item.thismonth}}</p>
			</div>
			<div class="right">{{item.money}}</div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'billItem',
		props:{
			item:{
				type:[Object,Array],
				required:true
			}
		},
		methods:{
			detail(sn){
				this.$router.push({path:'/home/billDetail',query:{order_sn:sn}});
			}
		}
	}
</script>

<style scoped>
	.box{
		border-bottom:2px solid #ccc;
		padding:0.2rem;
	}
	.box:after{
		content:'';
		display: block;
		clear:both;
	}
	.left{
		float:left;
		width:60%;
		text-align: left;
	}
	.right{
		float:right;
		width:40%;
		text-align: right;
	}
	.desc,.time{
		padding-bottom: .1rem;
	}
</style>