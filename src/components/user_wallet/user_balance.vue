<template>
	<div id="balance">
		<div class="content">
			<div class="balance">
				<div class="text">余额(元)</div>
				<div class="num">{{money}}</div>
			</div>
            <router-link to="/home/recharge" class="recharge" tag="div">充值</router-link>
            <router-link to="/home/cash" class="cash" tag="div">提现</router-link>            
		</div>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
export default {
    name: 'balance',
    data(){
    	return{
    		money:'',
            title:'余额'
    	}
    },
    methods:{
        getBalance(){
            api.getBalance().then(res=>{
                this.money=res.data.user_money;
            }).catch(error=>{
                console.log(error);
            })
        },
    },
    beforeRouteEnter(to,from,next){
        next(vm=>{
            vm.getBalance();
        })
    },

}
</script>

<style scoped>
    .content{
        font-size: 0.3rem;
        width: 100%;
    }
    .balance{
        margin: 0.25rem;
        background:#fff;
        height: 2.5rem;
        padding: 0.4rem 0.5rem;
        box-sizing: border-box;
        border-radius:.2rem;
    }
    .num{
        margin-top:.4rem;
        font-size:.8rem;
    }
    .recharge,.cash{
        border: 1px solid #ccc;
        margin: 0 0.25rem 0.25rem;
        padding: 0.25rem 0.15rem;
    }
    .recharge{
        background: #ff5370;
        color:#fff;
    }
</style>
