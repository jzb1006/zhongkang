<template>
    <div id="price_range">
        <div class="content">
            <div class="include vux-1px">
                <input type="number" class="range" v-model="min" @blur="getMin">
            </div>
            <div class="float">-</div>
            <div class="include vux-1px">
                <input type="number" class="range" v-model="max" @blur="getMax">
            </div>
        </div>
    </div>
</template>

<script>
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
                if(this.min<0){
                    alert('值不能小于0');
                    return false;
                }
                this.$emit('getMin',this.min);
            },
            getMax(){
                if(Number(this.min)>Number(this.max)){
                    alert('最小值不能大于最大值');
                }
                this.$emit('getMax',this.max);
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