<template>
        <div id="nursing">
            <FBtn v-show="show_btn"></FBtn>
            <div>
                <p class="title">是否预定专家</p>
                <div class="container2">
                    <div class=" border border-dark" :class="{f_active:checkexpert == 0}" @click="sel_expert(0,0)"><p >不预定</p>$<span>0</span>~$<span>0</span></div> 
                    <div class=" border border-dark" v-for="expert in expertList" v-if="pd_expert(expert)" :class="{f_active:checkexpert == expert.expert_id}" @click="sel_expert(expert,expert.expert_id)"><p>预定</p>$<span>{{expert.min_price}}</span>~$<span>{{expert.max_price}}</span></div>
                </div>
            </div>
            <Loading v-show="loadinging"></Loading>
        </div>
</template>
<script>
import FBtn from './FBtn'
import Bus from './../../../../assets/bus.js'
import api from './../../../../api/fang'
import Loading from "@/components/decorate/loading.vue";

export default {
    name:"FExpert",
    data(){
        return {
            tid:"",
            expertList:[],
            checkexpert:null,
            show_btn:false,
            loadinging:true,
        }
    },
    methods:{
        $_ajax_expert:function(){
            var self = this;
            let tid = this.tid;
            api.ajaxSearch("get_expert",{tid:tid}).then(
                res=>{
                    self.expertList = res.data;
                    self.loadinging = false;
                    let check_ids = this.$store.state.fang.check_ids;
                    for(let index in check_ids){
                        if(check_ids[index].num == 8){
                            let id = check_ids[index].id;
                            if(id == "0"){
                                this.sel_expert(0,0);
                            }else{
                                for(let i in this.expertList){
                                    if(this.expertList[i].expert_id == id){
                                        this.$store.dispatch('Is_Sel',true);
                                        this.checkexpert = id;
                                        self.show_btn = true;
                                    }
                                }
                            }
                            
                        }
                    }
                }
            )
            .catch(error=>{
                self.loadinging = false;
            })
        },
        sel_expert:function(expert,index){
            this.show_btn = true;
            this.checkexpert = index;
            let arr = {
                    num:8,
                    id:index,
            }
            this.$store.dispatch('Check_Ids',arr);
            this.$store.dispatch('Is_Sel',true);

            if(index == '0'){
                let arr = {
                        num:7,
                        id:0,
                        name:"不预定专家",
                        min_price:0,
                        max_price:0,
                    }
                    this.$store.dispatch('Price_Data',arr);
            }else{
                let arr1 = {
                        num:7,
                        id:expert.expert_id,
                        name:"预定专家",
                        min_price:expert.min_price,
                        max_price:expert.max_price,
                    }
                    this.$store.dispatch('Price_Data',arr1);
            }
        },
        pd_expert(expert){
            if(expert.expert_id == null){
                return false;
            }else{
                return true;
            }
        }
    },
    components:{
        FBtn,
        Loading
    },
    mounted(){
        this.$store.dispatch('Is_Sel',false);
        Bus.$emit('Content_Type','8');
        Bus.$emit("changeTitle","预定专家");
        this.tid = this.$route.query.tid;
        this.$_ajax_expert();
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
            background-color: rgb(255, 83, 112);
            font-size: .35rem;
            color: #fff;
		}
		#nursing .container2 .border{
			margin: .2rem 0;
			padding:.2rem;
			font-size: .3rem;
            color: rgb(255, 83, 112);
            border-radius: .1rem;
			border:1px solid #72dacf;
		}
		#nursing .container2 .border p{
			font-size: .31rem;
            padding: .1rem 0;
            color: #000;
		}
</style>
