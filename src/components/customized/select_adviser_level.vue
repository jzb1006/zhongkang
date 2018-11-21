<template>
    <div id="select_adviser_level">
        <select class="select vux-1px" v-model="level" @change="getLevel(level)">
            <option value="41">初级顾问</option>
            <option value="42">中级顾问</option>
            <option value="43">高级顾问</option>
        </select>
    </div>
</template>
<script>
import Bus from "@/assets/bus.js";
export default {
    name:'select_adviser_level',
    data(){
        return{
            level:41,
        }
    },
    watch:{
        params(newVal,oldVal){
            this.level=newVal.level;
        }
    },
    // computed:{
    //     level(){
    //         return this.params.level
    //     }
    // },
    props:{
        params:{
            type:[Object],
            default(){
                return {};
            }
        }
    },
    methods:{
        getLevel(data){
            // this.$store.dispatch('changeLevel',data);
            this.$emit('getLevel',data);
            Bus.$emit('getLevel',data)
        },
    }
}
</script>
<style scoped>
    .select{
        width:64%;
        padding:.1rem;
        box-sizing: border-box;
        position: absolute;
        top:50%;
        transform: translateY(-50%);
    }
</style>


