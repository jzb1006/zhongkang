<template>
	<div id="user_balance">
        <balanceTem :money="money"></balanceTem>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
export default {
    name: 'user_balance',
    data(){
    	return{
    		money:'',
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
    mounted(){
        this.getBalance();
    }
}
</script>

<style scoped>
    
</style>
