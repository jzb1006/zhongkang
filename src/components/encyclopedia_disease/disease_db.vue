<template>
    <div>
        <diseaseDbt :disease_db=disease_db></diseaseDbt>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import diseaseDbt from "@/templates/encyclopedia_disease/disease_db.vue"
export default {
    components:{
        diseaseDbt
    },
    data(){
        return{
            disease_db:{}
        }
    },
    methods:{
        get_disease_db(){
            var self = this;
            api.ajaxSearch("get_disease_db").then(res=>{
                self.disease_db = {
                    department:res.data.department.department,
                    // department_disease:res.data.department_disease.department_disease,
                    mass:res.data.mass.mass,
                    // mass_disease:res.data.mass_disease.mass_disease,
                }
            })
        }
    },
    mounted(){
        this.get_disease_db();
    }
}
</script>

<style>

</style>
