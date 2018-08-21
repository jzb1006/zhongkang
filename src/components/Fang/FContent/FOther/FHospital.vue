<template>
         <!-- <div class="nursing">
            <p class="bg-dark p-2 text-white">选择病床类型</p>
            <div class="container2">
                <div class="border border-dark" v-for="bed in bedList" v-if="bed" :class="{active:checkhospital == bed.bed_type}" @click="sel_bed(bed,bed.bed_type)">
                    <p>{{bed.bed_name}}</p>
                    $<span>{{bed.min_price}}</span>~$<span>{{bed.max_price}}</span>
                </div>
                <div class="border border-dark" :class="{active:checkhospital == 0}" v-else @click="sel_bed(0,0)">
                    <p>不用住院</p>
                </div>
            </div>
        </div> -->
        	<div id="nursing">
            <p class="title">选择病床类型</p>
            <div class="container2">
                <div class="border" v-for="bed in bedList" v-if="bed" :class="{active:checkhospital == bed.bed_type}" @click="sel_bed(bed,bed.bed_type)">
                    <p>{{bed.bed_name}}</p>
                    $<span>{{bed.min_price}}</span>~$<span>{{bed.max_price}}</span>
                </div>
                <div class="border" :class="{active:checkhospital == 0}" v-else @click="sel_bed(0,0)">
                    <p>不用住院</p>
                </div>
            </div>
        </div>
</template>

<script>
import Bus from './../../../../assets/bus.js'
import api from './../../../../api/fang'
import Loading from './../../Fang/../../../widget/loading'

export default {
   data(){
       return{
           tid:"",
           bedList:[],
           checkhospital:null,
       }
   },
   methods:{
       $_ajax_hospital:function(){
           var self = this;
           let tid = this.tid;
           api.ajaxSearch('get_hospital',{tid:tid}).then(
               res=>{
                    self.bedList = res.data;
                    Loading.stop();
                    let check_ids = this.$store.state.fang.check_ids;
                    for(let index in check_ids){
                        if(check_ids[index].num == 7){
                            let id = check_ids[index].id;
                            if(id == 0){
                                this.$store.dispatch('Is_Sel',true);
                                this.checkhospital = 0;
                            }else{
                                for(let i in this.bedList){
                                    if(this.bedList[i].bed_type == id){
                                        this.$store.dispatch('Is_Sel',true);
                                        this.checkhospital = id;
                                    }
                                }
                            }

                            
                            
                        }
                    }
               }
           )
       },
       sel_bed:function(bed,index){
           this.checkhospital = index;
           let arr = {
                    num:7,
                    id:index,
                }
            this.$store.dispatch('Check_Ids',arr);
            this.$store.dispatch('Is_Sel',true);
           
            if(index == '0'){
                let arr = {
                    num:6,
                    id:bed.in_hospital_id,
                    name:"住院（不住院）",
                    min_price:0,
                    max_price:0,
                }
                this.$store.dispatch('Price_Data',arr);
            }else{
                let arr = {
                    num:6,
                    id:bed.in_hospital_id,
                    name:bed.bed_name,
                    min_price:bed.min_price,
                    max_price:bed.max_price,
                }
                this.$store.dispatch('Price_Data',arr);
            }
           
       }
   },
    mounted(){
        Loading.run();
        this.$store.dispatch('Is_Sel',false);
        Bus.$emit('Content_Type','7');
        this.$store.dispatch('Content_Jump','/FMain/FOther/FExpert');
        Bus.$emit("changeTitle","选择病房");
        this.tid = this.$route.query.tid;
        this.$_ajax_hospital();
    }
}
</script>


<style scoped>
         #nursing{
			margin:2rem .3rem .3rem .3rem;
		}
		#nursing p.title{
			text-align: center;
            padding: .2rem 0;
            background-color: #72dacf;
            font-size: .35rem;
            color: #fff;
		}
		#nursing .container2 .border{
			margin: .2rem 0;
			padding:.2rem;
			font-size: .3rem;
            border-radius: .2rem;
			border:1px solid #72dacf;
		}
		#nursing .container2 .border p{
			font-size: .4rem;
            padding: .1rem;
		}
</style>