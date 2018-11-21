<template>
    <div id="new_programme">
        <div class="add_programme">
            <span class="btn" @click="add_programme">添加方案</span>
        </div>    
        <addProgramme v-show="addNewProgramme" @passProgramme="getProgramme" @hide="hide"></addProgramme>
    </div>
</template>
<script>
import addProgramme from '@/components/adviser/add_programme.vue'
import Bus from '@/assets/bus.js'
export default {
    name:'new_programme',
    data(){
        return{
            addNewProgramme:false,
        }
    },
    methods:{
        hide(){
            this.addNewProgramme=false;
        },
        add_programme(){
            // this.$router.push({path:'/programme',query:{order_sn:this.order_sn}});
            this.addNewProgramme=true;
        },
        getProgramme(data){
            // this.programme.push(data);
            this.addNewProgramme=false;
        }
    },
    mounted(){
        Bus.$on('hide',res=>{
            this.addNewProgramme=false;
        })
    },
    components:{
        addProgramme,
    }
}
</script>
<style scoped>
    .new_programme{
        margin:.2rem;
    }
    .btn{
        padding:.2rem;
        background:#ff5370;
        color:#fff;
        font-size:.3rem;
    }
</style>


