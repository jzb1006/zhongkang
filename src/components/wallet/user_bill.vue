<template>
	<div id="bill">
		
		<!-- <div class="content_bill"> -->
		    <!-- <div class="head">
		        <div class="type">
		             <span class="span">交易类型:</span>
		             <select class="select" v-model="typeValue">
		                <option value="0">请选择</option>
		                <option value="1">账号余额提现</option>
		                <option value="2">支付宝支付</option>
		                <option value="3">微信支付</option>
		                <option value="4">充值</option>
		            </select>
		        </div>
		        <div class="btngroup">
		            <input type="button" class="button" value="近1周" @click="fn(0)">
		            <input type="button" class="button" value="近1月" @click="fn(1)">
		            <input type="button" class="button" value="近3月" @click="fn(2)">
		            <input type="button" class="button" value="近1年" @click="fn(3)">
		        </div>
				<group>
					<calendar title="起始日期:" v-model="timeStart" disable-future></calendar>
				</group>
				<group>
					<calendar title="终止日期:" v-model="timeStop" disable-future></calendar>
				</group>
		        
		        <div class="query">
		             <input type="button" @click="select" value="查询" class="search" />
		    	</div>
		    </div> -->
			<Loading v-show="loadinging"></Loading>
			<billQueryTem :timeStart=timeStart :timeStop=timeStop @query=queryBill></billQueryTem>
			<billListTem :result="result" :headinfo="headinfo"></billListTem>
			<LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query" class="bg"></LoadMore>
		    <!-- <div class="billrecord" v-if="income!=0||cost!=0">
		    	<div class="top vux-1px-b">
		    		<span>{{start}}至{{stop}}</span>
	                <span>总收入{{income}}</span>
	                <span>总支出{{cost}}</span>
		    	</div>
		    	<billitem v-if="r.order_sn!=''&&r.order_sn!=null" v-for="r in result" v-bind:item="r" v-bind:key="r.order_sn"></billitem>
		    	<LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query" class="bg"></LoadMore>
		    </div>
			<div v-else>
		    		<nosearch text="该时间段内没有账单记录" class="nosearch"></nosearch>
		    </div> -->
		<!-- </div> -->
  	</div>
</template> 

<script>
import api from "../../api/wallet"
import common from "../../widget/lib/user"
import billitem from '@/components/wallet/bill_item.vue'
import LoadMore from '@/components/loadMore/index.vue'
import Loading from "@/components/decorate/loading.vue";
import nosearch from "@/components/nosearch/index.vue";
import { Calendar,Group } from 'vux'

export default {
    name: 'bill',
    data(){
    	return {
    		timeStart:'',
    		timeStop:'',
    		typeValue:'0',
    		result:[],
    		income:'',
    		cost:'',
    		count:0,
    		listnum:'10',
    		hasMore: 0,
            isBusy: false,
			isShow:false,
			loadinging:true
    	} 
	},
	computed:{
		start(){
			let timeStart=this.timeStart;
			var date = new Date(timeStart);
			return common.formatDate(date);
		},
		stop(){
			let timeStop=this.timeStop;
			var date=new Date(timeStop);
			return common.formatDate(date);
		},
		headinfo(){
			return {
				cost:this.cost,
				income:this.income,
				start:this.start,
				stop:this.stop
			}
		}
	},
	methods:{
		fn(x){
			switch(x){
				case 0:
	              	this.timeStart=this.getdate(-6);
	              	this.select();
	                break;
	    		 case 1:
	    		    this.timeStart=this.getBeforeMonth(-1);
	    		    this.select();
	                break;
	    		 case 2:
	    		    this.timeStart=this.getBeforeMonth(-3);
	    		    this.select();
	    			break;
	    		case 3:
	    			this.timeStart=this.getBeforeYear(-1);
	    			this.select();
	    		    break;
			}
		},
		//获取日期,参数x为正值表示x天之后,为负值表示几天之前,为0表示当前日期,参数默认值为0
		getdate:function(x=0){
	    	let date = new Date();
	    	date.setDate(date.getDate()+x);
	        return common.formatDate(date);
	    },
        // 几个月之前
        getBeforeMonth(x){
        	let date = new Date();
        	date.setMonth(date.getMonth()+x);
	        return common.formatDate(date);
        },
        //几年之前
        getBeforeYear(x){
        	let date = new Date(); 
        	date.setFullYear(date.getFullYear()+x);
	        return common.formatDate(date);
        },
        query(){
        	this.count=this.count+1;
        	let count=this.count;
        	let listnum=this.listnum;
			let postData={'typeValue':this.typeValue,'timeStart':this.timeStart,'timeStop':this.timeStop,'num':listnum,'page':count};
			// let postData=data;
        	this.isBusy = true;
	        api.select_bill(postData).then(res=>{
				console.log(res);
	        	let data=res.data;
	        	this.result = this.result.concat(data);
	        	if(data[0].income){
	        		this.income=data[0].income;
	        	}
	        	if(data[0].cost){
	        		this.cost=data[0].cost;
	        	}
	        	this.hasMore = data[0].hasMore;
				this.isBusy=false;
				this.loadinging=false;
	        }).catch(error=>{
	            console.log(error);
	        })
        },
        select(){
        	this.count=0;
        	this.result=[];
        	this.query();
		},
		queryBill(data){
			this.timeStart=data.timeStart;
			this.timeStop=data.timeStop;
			this.typeValue=data.typeValue;
			this.select();
		}
	},
	mounted(){
        this.timeStart=this.getdate(-6);
        this.timeStop=this.getdate();
        this.query();
	},
	components:{
		top,
		billitem,
		LoadMore,
		Calendar,
		Group,
		Loading,
		nosearch
	}
}
</script>
<style>
@import url("./../../assets/css/calandar.css");
.weui-cells {
    padding: .4rem .2rem!important;
}
</style>
<style scoped>
	#bill{
		background:#f0f0f0;
	}
	.content_bill{
		font-size: .33rem;
		text-align: center;
	}
	.head{
		padding-bottom:0.3rem;
	}
	.span{
		padding-top:0.2rem;
        padding-left:0.1rem;
		float:left;
		font-size:.3rem;
		width:35%;
		box-sizing: border-box;
	}
	.btngroup{
		margin:.2rem 0;
	}
	.button{
		border:1px solid red;
		background: #fff;
		color:#ff5370;;
		padding:.1rem .2rem;
		font-size:.3rem;
		border-radius:.1rem;
		margin-right:.15rem;
	}
	.select{
		float:right;
		width:65%;
		padding:0.1rem 0 0.1rem 0.1rem;
		box-sizing: border-box;
		font-size:.25rem;
	}
	.select option{
		font-size:.15rem;
	}
	.type{
		margin-top:0.1rem;
		padding-right:0.5rem;
		padding-top:0.1rem;
		padding-bottom:0.1rem;
		background:#fff;
	}
	.type:after{
		content:'';
		display: block;
		clear: both;
	}
	.div1{
		padding-top:.05rem;
		padding-bottom:0.1rem;
	}
	.top{
		padding-top:.4rem;
		padding-bottom:.4rem;
		background:#fff;
		/* border-bottom: 1px solid #ccc; */
	}
	.search{
		width:80%;
		margin:.1rem;
		padding:.15rem 0;
		font-size:0.3rem;
		border-radius: 0.15rem;
		background: #ff5370;
        color:#fff;
	}
	.bg{
		background:#fff;
	}
	.nosearch{
		position: relative;
		top:-50%;
	}
</style>

