<template>
    <div id="FResource">
        <div class="resource" v-for="(resource,$index) in resources" >
                <span @click="selectStyle(resource,resource.resource_area)" :class="{'f_active':checkresource == resource.resource_area}">
                    {{resource.resource_name}}
                </span>
        </div>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import Vue from 'vue'
import api from './../../../api/fang'
import Bus from './../../../assets/bus.js'
import Loading from "@/components/decorate/loading.vue";

export default {
    name:"FResource",
    data(){
        return {
            resources:[],
            treat_id:"",
            r_area:"",
            checkresource:null,
            loadinging:true,
        }
    },
    methods:{
        $_ajax_resource:function(){
            var self = this;
            let treat_id = this.treat_id;
            api.ajaxSearch("get_resources",{tid:treat_id}).then(
                res=>{
                    console.log( res.data);
                    self.resources = res.data;
                    self.loadinging = false;
                    let check_ids = this.$store.state.fang.check_ids;
                    // console.log(check_ids);
                    
                    for(let index in check_ids){
                        if(check_ids[index].num == 3){
                            let id = check_ids[index].id;
                            for(let i in self.resources){
                                if(self.resources[i].resource_area == id){
                                    this.$store.dispatch('Is_Sel',true);
                                    self.checkresource = id;
                                    this.addData(id);
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
        selectStyle:function(resource,index){
            this.checkresource = index;
            this.r_area = index;
            let arr = {
                num:3,
                id:this.r_area,
            }
            this.$store.dispatch('Check_Ids',arr);
            this.$store.dispatch('Is_Sel',true);
            this.addData(index);
        },
        addData:function(id){
            let arr = {
                tid:this.treat_id,
                r_area:id,
            }
            this.$store.dispatch('Content_Data',arr);
        }
    },
    components:{
        Loading
    },
    mounted(){
        this.$store.dispatch('Is_Sel',false);
        Bus.$emit('Content_Type','3');
        this.$store.dispatch('Content_Jump','FBrand');
        this.treat_id = this.$route.query.tid;
        Bus.$emit("changeTitle","选择产品来源")
        this.$_ajax_resource();
        // console.log(this.$route.query.tid);
    }
}
</script>

<style scoped>
    #FResource{
        margin: 2rem 0;
    }
    #FResource .resource{
        margin: .3rem 0;
        text-align: center;
    }
    #FResource .resource  span{
        display: inline-block;
        font-size: .4rem;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        color: rgb(255, 83, 112);
        border: 1px solid #72dacf;
        border-radius: 50%;
     }

    #FResource .resource  .f_active{
        background-color: rgb(255, 83, 112,.8);
        color: #fff;
     }
</style>
