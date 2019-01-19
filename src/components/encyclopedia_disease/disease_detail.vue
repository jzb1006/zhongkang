<template>
    <div>
        <diseaseDetailt :disease_detail=disease_detail></diseaseDetailt>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import diseaseDetailt from "@/templates/encyclopedia_disease/disease_detail.vue"
export default {
    components:{
        diseaseDetailt
    },
    data(){
        return{
            disease_id:"",
            disease_detail:""
        }
    },
    methods:{
        get_disease(){
            var self = this;
            api.ajaxSearch("get_disease",{disease_id:this.disease_id}).then(res=>{
                self.disease_detail = res.data.disease;
            })
        }
    },
    mounted(){
        this.disease_id = this.$route.query.disease_id;
        this.get_disease();
    }
}
</script>

<style>

</style>
