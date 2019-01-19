<template>
    <div>
        <symptomt :symptom_data=symptom_data :params=params></symptomt>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import symptomt from "@/templates/encyclopedia_disease/symptom.vue"
export default {
    mixins: [mixin],
    data(){
        return{
            symptom_data:{}
        }
    },
    components:{
        symptomt
    },
    methods:{
        get_symptom_list(){
            var self = this;
            api.ajaxSearch("get_symptom_list").then(res => {
                self.symptom_data = {
                    symptom_position:res.data.symptom_position,
                    symptom:res.data.symptom
                }
            })
        }
    },
    mounted(){
        this.get_symptom_list();
    }
}
</script>

<style>

</style>
