<template>
        <div id="FBtn">
        <span v-on:click="changeShow">查看账单</span>
        <transition name="slide-fade">
            <FAcound v-show="fshow"></FAcound>
        </transition>
    </div>
</template>
<script>
import FAcound from './FAcound'
import Bus from './../../../../assets/bus.js'
export default {
    name:'acound',
    data(){
        return{
            fshow: false,
            price_data:[],
        }
    },
    methods:{
        changeShow:function (){
            this.fshow = !this.fshow
            this.price_data = this.$store.state.fang.Price_Data;
            Bus.$emit("toAcount",this.price_data);
            Bus.$emit('Content_Type','9');
        }
    },
    components:{
        FAcound
    },
    mounted(){
        Bus.$on("close",res=>{
            this.fshow = res;
        })
    }
}
</script>

<style scoped>
		#FBtn{
			position: fixed;
			bottom: .5rem;
			right:.2rem;
		}
		#FBtn span{
            display: inline-block;
            margin-bottom: 2.5rem;
            padding: .2rem;
            font-size: .3rem;
            border-radius: .2rem;
            border: 2px solid rgb(255, 83, 112,.7);
		}
</style>


