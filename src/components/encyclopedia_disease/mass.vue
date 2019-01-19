<template>
    <div>
        <masst :mass=mass @change_age=change_age></masst>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import masst from "@/templates/encyclopedia_disease/mass.vue"
export default {
    components:{
        masst
    },
    data(){
        return{
            mass:[]
        }
    },
    methods:{
        get_mass(){
            api.ajaxSearch("get_mass").then(res=>{
                this.mass = res.data.mass;
            })
        },
        change_age(index){
            this.$emit('change_age',index);
        }
    },
    mounted(){
        this.get_mass();
    }
}
</script>

<style>

</style>
