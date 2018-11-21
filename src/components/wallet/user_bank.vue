<template>
	<div id="user_bank">
        <bankTem :result=result @update="updateBankList"></bankTem>
  	</div>
</template> 

<script>
import api from "../../api/wallet"
export default {
    name: 'user_bank',
    data(){
    	return{
    		result:[],
    	}
    },
    methods:{
        getBankList(){
            api.getBankList().then(res=>{
                this.result=res.data;
            }).catch(error=>{
                console.log(error);
            })
        },
        updateBankList(){
            this.getBankList()
        }
    },
    mounted(){
        this.getBankList();
    }
}
</script>

<style scoped>
    
</style>
