<template>
    <div id="bank">
        <top title="选择银行卡"></top>
        <div class="content">
            <div v-for="item in result" @click="chooseBank(item.bankname)" class="item">
                <p class="row">{{item.bankname}}</p>
                <p class="row">{{item.banksn}}</p>
            </div>
        </div>
        <div class="add">
             <router-link to="/home/addBank" class="addBank">添加银行卡</router-link>
        </div>
    </div>
</template> 

<script>
import api from "../../api/user"
import top from "@/components/decorate/top_back_title.vue";
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'bank',
    data(){
        return{
            result:''
        }
    },
    methods:{
        chooseBank(argument){
            // this.bus.$emit('chooseBank',argument);
            this.$store.dispatch('changeBank',argument);
            this.$router.back(-1);
        }
    },
    computed:{
        ...mapState({
            bus:state=>state.user.bus
        }),
    },
    mounted(){
        api.ajaxWalletGet('bank').then(res=>{
            this.result=res.data;
        }).catch(error=>{
            console.log(error);
        })
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .content{
        margin-top:0.2rem;
        font-size: 0.35rem;
    }
    .item{
        background-color:#eef;
        border-bottom:3px solid #ccc;
        padding:0.1rem;
    }
    .add{
        /*padding:0.1rem;*/
        font-size: 0.35rem;
        

    }
    .addBank{
        display: inline-block;
        margin:0.2rem;
        padding:0.2rem;
        /*border: 1px solid #ccc;*/
        background: #32CD32;
        color:#fff;
    }
    .row{
        text-align:left;
        padding:0.1rem;
    }
</style>

