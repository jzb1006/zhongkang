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
		     <!-- <input type="button" value="下一步" @click="recharge" :class="classObject"> -->
			 <a @click="jump" href="javascript:;" target="_black" :class="classObject">下一步</a>
			 <!-- <a href="http://192.168.0.108/m/pay.php?action=pay&pay_id=3&order_sn=12345654443&subject=充值&order_amount=4" target="_black">下一步</a> -->
			 
		</div>
  	</div>
</template> 

<script>
import api from "../../api/pay"
import top from "@/components/decorate/top_back_title.vue";
export default {
    name: 'recharge',
    data(){
    	return{
			amount:'',
			i:1000000
			// order_sn:'11111222'
    	}
    },
    computed:{
    	classObject(){
    		return{
    			next:true,
    			toggleColor:this.amount!=''
    		}	
    	}
    },
    methods:{
		jump(){
			var timestamp = (new Date()).getTime();
			console.log(timestamp);
			// this.i=this.i+1;
			window.location.href="http://192.168.0.108/m/pay.php?action=pay&pay_id=3&order_sn="+timestamp+"&subject=充值&order_amount="+this.amount;
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
	    	var amount=parseFloat(value);	
	    	if(window.confirm('您充值的金额为'+amount+'元,确定吗？')){
	    		var order_sn=new Date().getTime();
	        	var subject="充值";
	            api.ajaxPay({'pay_id':'3','order_sn':order_sn,'subject':subject,'order_amount':amount}).then(res=>{
	            	// if(res.data.error==3){
	            	// 	alert(res.data.message);
	            	// 	this.$router.push('/login');
	            	// }else{
	            	// 	this.$router.go(-1);
					// }
					// console.log('s');
					console.log(res.data);
	            	
	            }).catch(error=>{
	            	console.log(error);
	            })
	            return true;
	         }else{
	            return false;
	         }
		},
		recharge_two(){
			 this.$router.push('/home/balance');
		}
	},
	mounted(){
		var timestamp = (new Date()).getTime();
		console.log(this.i);
	},
	components:{
		top
	}
}
</script>

<style scoped>
	/* .content{ */
		/*margin-top:240px;*/
		/* font-size: 0.3rem;
		border-top:2px solid #ccc;
		border-bottom:2px solid #ccc;
		text-align:left;
	}
	.renminbi img{
		width:45px;
		height:45px;
	}
	.div1,.input{
		padding:0.25rem 0.25rem 0.25rem 0.15rem;
		font-size: 0.35rem;
	}
	.input{
		border: 2px solid #ccc;
	}
	.div2{
		margin-top:0.4rem;
	}

	.next{
		font-size: 0.3rem;
		display:block;
        width:80%;
        border:2px solid #ccc;
        margin:0.3rem auto;
        padding:0.25rem 0;
		font-size: 0.35rem;
    }

	.toggleColor{
        background-color:#32CD32;
        color:#fff;
    } */
	.content{
		/*margin-top:240px;*/
		font-size: 0.3rem;
		border-top:2px solid #ccc;
		border-bottom:2px solid #ccc;
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
		border: 1px solid #ccc;
		background: #ccc;
		font-size: 0.3rem;
		display:block;
        width:60%;
        margin:0.3rem auto;
        padding:0.15rem .15rem;
		font-size: 0.3rem;
    }
	.toggleColor{
        background: #ff5370;
        color:#fff;
    }
</style>
