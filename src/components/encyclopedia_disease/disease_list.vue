<template>
    <div>
        <diseaseListt :disease_list=disease_list :params=params></diseaseListt>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import diseaseListt from "@/templates/encyclopedia_disease/disease_list.vue"
export default {
    mixins:[mixin],
    components:{
        diseaseListt
    },
    data(){
        return{
            disease_id:"",
            disease_list:[]
        }
    },
    methods:{
        get_disease_list(){
            var self = this;
            api.ajaxSearch("get_disease",{disease_id:this.disease_id}).then(res=>{
                self.disease_list = res.data.disease;
            })
        }
    },
    mounted(){
        this.disease_id = this.$route.query.disease_id;
        this.get_disease_list();
    }
}
</script>

<style>

</style>
