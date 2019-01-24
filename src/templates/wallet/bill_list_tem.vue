<template>
	<div id="bill_list_tem">
		<!-- <Loading v-show="loadinging"></Loading> -->
		<div class="content_bill">
		    <div class="billrecord" v-if="headinfo.income!=0||headinfo.cost!=0">
		    	<div class="top vux-1px-b">
		    		<span>{{headinfo.start}}至{{headinfo.stop}}</span>
	                <span>总收入{{headinfo.income}}</span>
	                <span>总支出{{headinfo.cost}}</span>
		    	</div>
		    	<!-- <billitem :result="result"></billitem> -->
		    	<billitem v-if="r.order_sn!=''&&r.order_sn!=null" v-for="(r,index) in result" v-bind:item="r" :key="index"></billitem>
		    	<!-- <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="query" class="bg"></LoadMore> -->
		    </div>
			<div v-else>
		    		<nosearch text="该时间段内没有账单记录" class="nosearch"></nosearch>
		    </div>
		</div>
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
    name: 'bill_list_tem',
    data(){
    	return {
    		timeStart:'',
    		timeStop:'',
    		typeValue:'0',
    		// result:[],
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
    props:{
        result:{
            type:Array,
            default(){
                return []
            }
        },
        headinfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
	computed:{
		// start(){
		// 	let timeStart=this.timeStart;
		// 	var date = new Date(timeStart);
		// 	return common.formatDate(date);
		// },
		// stop(){
		// 	let timeStop=this.timeStop;
		// 	var date=new Date(timeStop);
		// 	return common.formatDate(date);
		// }
	},
	methods:{
		// fn(x){
		// 	switch(x){
		// 		case 0:
	    //           	this.timeStart=this.getdate(-6);
	    //           	this.select();
	    //             break;
	    // 		 case 1:
	    // 		    this.timeStart=this.getBeforeMonth(-1);
	    // 		    this.select();
	    //             break;
	    // 		 case 2:
	    // 		    this.timeStart=this.getBeforeMonth(-3);
	    // 		    this.select();
	    // 			break;
	    // 		case 3:
	    // 			this.timeStart=this.getBeforeYear(-1);
	    // 			this.select();
	    // 		    break;
		// 	}
		// },
		//获取日期,参数x为正值表示x天之后,为负值表示几天之前,为0表示当前日期,参数默认值为0
		// getdate:function(x=0){
	    // 	let date = new Date();
	    // 	date.setDate(date.getDate()+x);
	    //     return common.formatDate(date);
	    // },
        // // 几个月之前
        // getBeforeMonth(x){
        // 	let date = new Date();
        // 	date.setMonth(date.getMonth()+x);
	    //     return common.formatDate(date);
        // },
        // //几年之前
        // getBeforeYear(x){
        // 	let date = new Date(); 
        // 	date.setFullYear(date.getFullYear()+x);
	    //     return common.formatDate(date);
        // },
        // query(){
        // 	this.count=this.count+1;
        // 	let count=this.count;
        // 	let listnum=this.listnum;
        // 	let postData={'typeValue':this.typeValue,'timeStart':this.timeStart,'timeStop':this.timeStop,'num':listnum,'page':count};
        // 	this.isBusy = true;
	    //     api.select_bill(postData).then(res=>{
		// 		console.log(res);
	    //     	let data=res.data;
	    //     	this.result = this.result.concat(data);
	    //     	if(data[0].income){
	    //     		this.income=data[0].income;
	    //     	}
	    //     	if(data[0].cost){
	    //     		this.cost=data[0].cost;
	    //     	}
	    //     	this.hasMore = data[0].hasMore;
		// 		this.isBusy=false;
		// 		this.loadinging=false;
	    //     }).catch(error=>{
	    //         console.log(error);
	    //     })
        // },
        // select(){
        // 	this.count=0;
        // 	this.result=[];
        // 	this.query();
        // }
	},
	created(){
        // this.timeStart=this.getdate(-6);
        // this.timeStop=this.getdate();
        // this.query();
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
/* @import url("./../../assets/css/calandar.css"); */
#bill_list_tem .weui-cells {
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

