<template>
        <div id="nursing">
            <p class="title">选择护理方式</p>
            <div class="container2">
                <div class="border" @click="sel_nursing(0,0)" :class="{f_active:checknursing == 0}"><p>自身护理</p>$<span>0</span>~$<span>0</span></div>
                <div class="border" v-for="nursing in nursingList"  v-if="nursing" @click="sel_nursing(nursing,nursing.nursing_id)" :class="{f_active:checknursing == nursing.nursing_id}">
                    <p>{{nursing.nursing_name}}</p>$<span>{{nursing.min_price}}</span>~$<span>{{nursing.max_price}}</span></div>
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
            nursingList:[],
            checknursing:null,
        }
    },
    methods:{
        $_ajax_nursing:function(){
            var self = this;
            var treat_id = this.tid;
            api.ajaxSearch("get_nursing",{tid:treat_id}).then(
                res=>{
                    
                    self.nursingList = res.data;
                    console.log(res.data);
                    Loading.stop();
                    let check_ids = this.$store.state.fang.check_ids;
                    for(let index in check_ids){
                        if(check_ids[index].num == 6){
                            let id = check_ids[index].id;
                            if(id == "0"){
                                this.$store.dispatch('Is_Sel',true);
                                this.checknursing = 0;
                            }else{
                                for(let i in this.nursingList){
                                    if(this.nursingList[i].nursing_id == id){
                                        this.$store.dispatch('Is_Sel',true);
                                        this.checknursing = id;
                                    }
                                }
                            }
                            
                        }
                    }
                }
            )
        },
        sel_nursing:function(nursing,index){
                this.checknursing = index;
                let arr = {
                    num:6,
                    id:index,
                }
                this.$store.dispatch('Check_Ids',arr);
                this.$store.dispatch('Is_Sel',true);
                
                if(index == 0){
                    let arr = {
                        num:5,
                        id:0,
                        name:"自身护理",
                        min_price:0,
                        max_price:0,
                    }
                    this.$store.dispatch('Price_Data',arr);
                }else{
                    let arr = {
                        num:5,
                        id:nursing.nursing_id,
                        name:nursing.nursing_name,
                        min_price:nursing.min_price,
                        max_price:nursing.max_price,
                    }
                    this.$store.dispatch('Price_Data',arr);
                }
        },
    },
    mounted(){
        Loading.run();
        this.$store.dispatch('Is_Sel',false);
        Bus.$emit('Content_Type','6');
        this.$store.dispatch('Content_Jump','/FMain/FOther/FHospital');
        this.tid = this.$route.query.tid;
        Bus.$emit("changeTitle","选择护理方式");
        this.$_ajax_nursing();
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
