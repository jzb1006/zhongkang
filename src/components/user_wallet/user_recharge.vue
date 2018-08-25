<template>
	<div id="recharge">
		<top title="充值"></top>
		<div class="content">
			 <div class="div1">
			        <span class="span">充值金额:</span>
			 </div>
			 <div class="div1">
	               <span class="renminbi"><i class="zk-icon-renminbi1"></i></span>
	        	   <input type="number" v-model="amount" placeholder="输入充值金额" class="input">
			 </div>	
		</div>
		<div class="div2 meone">
		     <input type="button" value="下一步" @click="recharge" :class="classObject">
		</div>
		<div>
			<confirm v-model="show" :title="confirmTitle" @on-confirm="onConfirm"></confirm>
		</div>
		<Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import top from "@/components/decorate/top_back_title.vue"
import Alert from "@/components/decorate/alert.vue";
import { Confirm } from 'vux'
export default {
    name: 'recharge',
    data(){
    	return{
			amount:'',
			show:false,
			confirmTitle:'',
			alertShow:false,
			alerttType:'warn',
            alertText:'',
    	}
    },
    computed:{
		isShow(){
               return this.alertShow;
        },
    	classObject(){
    		return{
    			next:true,
    			toggleColor:this.amount!=''
    		}	
		}
    },
    methods:{
		onConfirm(){
			var value=this.amount;
			var amount=parseFloat(value);	
			var order_sn=new Date().getTime();
			var subject="充值";
			api.ajaxWalletPost('chongzhi',{'WIDout_trade_no':order_sn,'WIDsubject':subject,'WIDtotal_amount':amount})
			.then(res=>{
				if(res.data.error==3){
					alert(res.data.message);
					this.$router.push('/login');
				}else{
					this.$router.go(-1);
				}
			}).catch(error=>{
				console.log(error);
			})
		},
    	recharge(){
    		var value=this.amount;
	    	if(value==""||value==0){
				alert("充值金额不能为空且不能为零");
	        	return false;
	    	}
	    	if(value.indexOf('.')==-1){
	    		if(parseInt(value)>100000){
	    			alert('您输入的金额超过最高额度100000元');
	    			return false;
	        	}
	    	}else{
	        	if(parseInt(value.split('.')[0])>100000){
	        		alert('您输入的金额超过最高额度100000元');
	    			return false;
	        	}else if(value.split('.')[1].length>2){
	        		alert('充值金额精确到分');
	    			return false;
	        	}
			}
			this.confirmTitle=`您即将充值${this.amount}元,确定吗？`;
			this.show=true;
	    	
		},
		dpr() {
			(function(e, l) {
			var c, k, d, f = e.document,
			g = f.documentElement,
			h = l.flexible || (l.flexible = {});
			(function() {
			var a, b = f.querySelector('meta[name="viewport"]');
			c = e.devicePixelRatio || 1;
			a = 1;
			g.setAttribute("data-dpr",0);
			a = "width=device-width, initial-scale=" + a + ", minimum-scale=" + a + ", maximum-scale=" + a + ", user-scalable=no";
			b ? b.setAttribute("content", a) : (b = f.createElement("meta"), b.setAttribute("name", "viewport"), b.setAttribute("content", a), (f.head || g.firstElementChild).appendChild(b))
			})();
			})(window, window.FT || (window.FT = {}));
		}
	},
	mounted(){
		this.dpr();
	},
	components:{
		top,
		Confirm,
		Alert
	}
}
</script>

<style scoped>
	.content{
		/*margin-top:240px;*/
		font-size: 0.3rem;
		border-top:1px solid #ccc;
		border-bottom:1px solid #ccc;
		text-align:left;
	}
	
	.renminbi img{
		width:45px;
		height:45px;
	}
	.div1,.input{
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.3rem;
	}
	.input{
		border: 1px solid #ccc;
	}
	.div2{
		margin-top:0.4rem;
	}
	.next{
		font-size: 0.3rem;
		display:block;
        width:80%;
        margin:0.3rem auto;
        padding:0.15rem 0;
		font-size: 0.3rem;
    }
	.toggleColor{
        background: #ff5370;
        color:#fff;
    }
</style>
