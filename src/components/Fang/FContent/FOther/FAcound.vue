<template>
	<div id="FAcount" v-show="acount">
		<button type="button" class="close" aria-label="Close" @click="close()">
			<i class="zk-icon-guanbi"></i>
		</button>
		<p class="title"><span>模拟账单</span></p>
		<ul class="list_acount">
		  <li class="li_acount" v-for="acount1 in aountlist">
				<p class="name">{{acount1.name}}</p>
				<p class="price">￥<span>{{acount1.min_price}}</span>~￥<span>{{acount1.max_price}}</span></p>
		  </li>
		</ul>
		<div class="bottom">
				<p class="total_title">总费用：</p>

				<p class="total_price text-danger">￥<span>{{totalMinAcount}}</span>~￥<span>{{totalMaxAcount}}</span></p>
		  </div>
		<p class="tip">(*当前价格仅供参考，实际价格以各医院为准！)</p>
	</div>
</template>

<script>
import Bus from './../../../../assets/bus.js'
export default{
    name:"ffooter",
    data(){
        return {
			acount:false,
			aountlist:[],
			totalMinAcount:0,
			totalMaxAcount:0,
        }
	},
	methods:{
		close(){
			Bus.$emit('close',false);
			Bus.$emit('Content_Type',8);
		}
	},
	mounted(){
		Bus.$on("toAcount",res=>{
			this.aountlist = res;
			
			for(let index in res){
				this.totalMinAcount += parseInt(res[index].min_price);
				this.totalMaxAcount += parseInt(res[index].max_price);
			}
		})
	}
}
</script>
<style scoped>
		#FAcount{
			position: fixed;
			left: .3rem;
			right: .3rem;
			bottom: 2rem;
			font-size: .4rem;
			background-color: #72dacf;
			padding:.2rem;
			border-top-left-radius: .3rem;
			border-top-right-radius: .3rem;
		}
		#FAcount button{
			float: right;
			border-radius: .3rem;
		}
		#FAcount p.title{
			text-align: center;
			font-size: .4rem;
			margin-bottom: .3rem;
		}
		#FAcount .list_acount {
			height: 7rem;
			overflow-x: hidden;
		}
		#FAcount .list_acount .li_acount{
			margin-bottom: .3rem;
			padding: .2rem;
			border-radius: .2rem;
			border: 1px solid #000;
			background-color: #fff;
		}
		#FAcount .list_acount .li_acount p.name{
			font-size: .4rem;
		}
		#FAcount .list_acount .li_acount p.price{
			font-size: .35rem;
			text-align: right;
		}
		#FAcount .bottom {
			padding: .2rem 0;
			border-top: 1px solid #000;
			border-bottom: 1px solid #000;
		}
		#FAcount .bottom .total_title{
			font-size: .4rem;
		}
		#FAcount .bottom .total_price{
			font-size: .35rem;
			text-align: right;
		}
		#FAcount .tip{
			margin-top: .2rem;
			color: red;
			font-size: .35rem;
			line-height: .4rem;
		}
</style>




