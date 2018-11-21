<template>
    <div id="price_range">
        <div class="content">
            <div class="include vux-1px">
                <input type="number" class="range" v-model="min" @blur="getMin" @keyup="check(min,$event)">
            </div>
            <div class="float">-</div>
            <div class="include vux-1px">
                <input type="number" class="range" v-model="max" @blur="getMax" @keyup="check(max,$event)">
            </div>
        </div>
    </div>
</template>

<script>
    import Bus from '@/assets/bus.js'
    export default {
        name:'price_range',
        data(){
            return{
                min:'',
                max:'',
            }
        },
        methods:{
            getMin(){
                this.$emit('getMin',Number(this.min));
                Bus.$emit('getMin',Number(this.min));
            },
            getMax(){
                this.$emit('getMax',Number(this.max));
                Bus.$emit('getMax',Number(this.max));
            },
            check(value,event){
                event.target.value = event.target.value.replace(/\-/g,""); 
            }
        }
    }
</script>

<style scoped>
    .content{
        height:.8rem;
    }
    .content::after{
        content:'';
        display:block;
        clear:both;
    }
    .float{
        float:left;
        width:10%;
        line-height:.8rem;
        text-align: center;
        /* width:10%; */
    }
    .include{
        line-height:.8rem;
        width:40%;
        float:left;
        padding:.1rem;
        box-sizing: border-box;
        top:50%;
        transform: translateY(-50%);
	}
	.range{
		position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
		box-sizing: border-box;
        font-size: .3rem;
    }
</style>