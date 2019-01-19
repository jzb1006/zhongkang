<template>
    <div>
        <symptomAboutt :symptom=symptom :params=params></symptomAboutt>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import symptomAboutt from "@/templates/encyclopedia_disease/symptom_about.vue"
export default {
    mixins:[mixin],
    components:{
        symptomAboutt
    },
    data(){
        return{
            symptom:[],
            symptom_id:"",
        }
    },
    methods:{
        get_about_symptom(){
            var self = this;
            api.ajaxSearch("get_symptom_about",{symptom_id:this.symptom_id}).then(res => {
                self.symptom = res.data.symptom;
            })
        }
    },
    mounted(){
        this.symptom_id = this.$route.query.symptom_id;
        this.get_about_symptom();
    }
}
</script>

<style>

</style>
