<template>
	<div id="user_recharge">
		<top title="充值"></top>
		<recharge></recharge>
		<!-- <div class="content vux-1px-b">
			 <div class="text">
			        <span class="span">充值金额:</span>
			 </div>
			 <div class="div1">
	               <span class="renminbi"><i class="zk-icon-renminbi1"></i></span>
	        	   <div class="vux-1px include"><input type="number" v-model="amount" placeholder="输入充值金额" class="input"></div>
				   <div class="clear"></div>
			 </div>	
		</div>
		<div class="div2 meone">
		     <input type="button" value="下一步" @click="recharge" :class="classObject">
		</div>
		<div>
			<confirm v-model="show" :title="confirmTitle" @on-confirm="onConfirm"></confirm>
		</div>
		<Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert> -->
  	</div>
</template> 

<script>
// import api from "../../api/wallet"
import top from "@/components/decorate/top_back_title.vue"
// import Alert from "@/components/decorate/alert.vue"
import recharge from "@/components/wallet/recharge.vue"
// import { Confirm } from 'vux'
export default {
    name: 'user_recharge',
    // data(){
    // 	return{
	// 		amount:'',
	// 		show:false,
	// 		confirmTitle:'',
	// 		alertShow:false,
	// 		alerttType:'warn',
    //         alertText:'',
    // 	}
    // },
    // computed:{
	// 	isShow(){
    //            return this.alertShow;
    //     },
    // 	classObject(){
    // 		return{
    // 			next:true,
    // 			toggleColor:this.amount!=''
    // 		}	
	// 	}
    // },
    // methods:{
	// 	onConfirm(){
	// 		var value=this.amount;
	// 		var amount=parseFloat(value);	
	// 		var order_sn=new Date().getTime();
	// 		var subject="充值";
	// 		api.ajaxWalletPost('chongzhi',{'WIDout_trade_no':order_sn,'WIDsubject':subject,'WIDtotal_amount':amount})
	// 		.then(res=>{
	// 			if(res.data.error==3){
	// 				alert(res.data.message);
	// 				this.$router.push('/login');
	// 			}else{
	// 				this.$router.go(-1);
	// 			}
	// 		}).catch(error=>{
	// 			console.log(error);
	// 		})
	// 	},
    // 	recharge(){
    // 		var value=this.amount;
	//     	if(value==""||value==0){
	// 			alert("充值金额不能为空且不能为零");
	//         	return false;
	//     	}
	//     	if(value.indexOf('.')==-1){
	//     		if(parseInt(value)>100000){
	//     			alert('您输入的金额超过最高额度100000元');
	//     			return false;
	//         	}
	//     	}else{
	//         	if(parseInt(value.split('.')[0])>100000){
	//         		alert('您输入的金额超过最高额度100000元');
	//     			return false;
	//         	}else if(value.split('.')[1].length>2){
	//         		alert('充值金额精确到分');
	//     			return false;
	//         	}
	// 		}
	// 		this.confirmTitle=`您即将充值${this.amount}元,确定吗？`;
	// 		this.show=true;
	    	
	// 	},
	// 	dpr() {
	// 		(function(e, l) {
	// 		var c, k, d, f = e.document,
	// 		g = f.documentElement,
	// 		h = l.flexible || (l.flexible = {});
	// 		(function() {
	// 		var a, b = f.querySelector('meta[name="viewport"]');
	// 		c = e.devicePixelRatio || 1;
	// 		a = 1;
	// 		g.setAttribute("data-dpr",0);
	// 		a = "width=device-width, initial-scale=" + a + ", minimum-scale=" + a + ", maximum-scale=" + a + ", user-scalable=no";
	// 		b ? b.setAttribute("content", a) : (b = f.createElement("meta"), b.setAttribute("name", "viewport"), b.setAttribute("content", a), (f.head || g.firstElementChild).appendChild(b))
	// 		})();
	// 		})(window, window.FT || (window.FT = {}));
	// 	}
	// },
	// mounted(){
	// 	this.dpr();
	// },
	components:{
		top,
		// Confirm,
		// Alert,
		recharge,
	}
}
</script>

<style scoped>
	.content{
		font-size: .3rem;
		text-align:left;
	}
	.renminbi{
		float:left;
		width:10%;
		box-sizing: border-box;
		line-height: .6rem;
	}
	.include{
		width:80%;
		float:left;
		padding:.2rem;
		box-sizing: border-box;
		font-size: .3rem;
	}
	.clear{
		content:"";
		display:block;
		clear:both;
	}
	.input{
		font-size: .3rem;
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
	}
	.text{
		padding:.25rem .25rem .25rem .15rem;
		font-size: .3rem;
	}
	.div1{
		padding:.25rem .25rem .6rem .15rem;
		font-size: .3rem;
		position: relative;
		height:.6rem;
	}
	.div2{
		margin-top:.4rem;
	}
	.next{
		font-size: .3rem;
		display:block;
        width:60%;
        margin:.3rem auto;
        padding:.2rem 0;
		font-size: .3rem;
    }
	.toggleColor{
        background: #ff5370;
        color:#fff;
    }
</style>
