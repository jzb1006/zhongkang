<template>
    <div id="selectAdviserLevel">
        <select class="select vux-1px" v-model="level" @change="getLevel(level)">
            <option value="41">初级顾问</option>
            <option value="42">中级顾问</option>
            <option value="43">高级顾问</option>
        </select>
    </div>
</template>
<script>
export default {
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
        }
    },
    methods:{
        getLevel(data){
            this.$store.dispatch('changeLevel',data);
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


