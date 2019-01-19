<template>
    <div>
        <matchDiseaset :match_data=match_data :params=params></matchDiseaset>
    </div>
</template>

<script>
import api from "@/api/fang";
import { mixin } from "@/assets/js/mixins.js";
import matchDiseaset from "@/templates/encyclopedia_disease/match_disease.vue"
export default {
    mixins:[mixin],
    components:{
        matchDiseaset
    },
    data(){
        return{
            match_data:{},
            symptom_ids:"",
            mass_id:"",
            match_diseases:[],
            sex:"",
            parcent_arr:[],
            total:0,
        }
    },
    methods:{
        match_disease(){
            var self = this;
            api.ajaxSearch("match_disease",{symptom_ids:this.symptom_ids,mass_id:this.mass_id,sex:this.sex}).then(res=>{
                self.match_diseases = res.data.match_disease;
                
                for(let index in self.match_diseases){
                    let counts = 0;
                    let level = self.match_diseases[index].common_level;
                    if (level == 0 || level == 1) {
                        counts = self.addNum(parseInt(self.match_diseases[index].counts),0.8);
                    }else{
                        if(self.match_diseases[index].counts > 0)
                        counts = self.minusNum(parseInt(self.match_diseases[index].counts),0.8);
                    }

                    self.parcent_arr.push({id:self.match_diseases[index].id,count:counts})
                    self.total = self.total + counts;
                }

                self.match_data = {
                    match_diseases:self.match_diseases,
                    parcent_arr:self.parcent_arr,
                    total:self.total
                }
            })
        },
        addNum (num1, num2) {
             var sq1,sq2,m;
             try {
              sq1 = num1.toString().split(".")[1].length;
              console.log(sq1);
             }
             catch (e) {
              sq1 = 0;
             }
             try {
              sq2 = num2.toString().split(".")[1].length;
              console.log(sq2);
             }
             catch (e) {
              sq2 = 0;
             }
             m = Math.pow(10,Math.max(sq1, sq2));
             return (num1 * m + num2 * m) / m;
        },
        minusNum (num1, num2) {
             var sq1,sq2,m;
             try {
              sq1 = num1.toString().split(".")[1].length;
             }
             catch (e) {
              sq1 = 0;
             }
             try {
              sq2 = num2.toString().split(".")[1].length;
             }
             catch (e) {
              sq2 = 0;
             }
             m = Math.pow(10,Math.max(sq1, sq2));
             return (num1 * m - num2 * m) / m;
        }

    },
    mounted(){
        this.symptom_ids = this.$route.query.symptom_ids;
        this.mass_id = this.$route.query.mass_id;
        this.sex = this.$route.query.sex;
        this.match_disease();
    }
}
</script>

<style>

</style>
