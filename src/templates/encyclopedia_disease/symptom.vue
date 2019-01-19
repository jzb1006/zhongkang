<template>
    <div id="symptom">
        <div class="symptom" v-if="symptom_status">
            <div class="symptom_header">
                <span class="back zk-icon-back" @click="back()"></span>
                <p class="edit">症状列表</p>
            </div>
            <div class="position_symptom clearfix">
                <div class="sel_symptom_position" :style="{height:w_height+'px'}"> 
                    <div v-for="(sym,index) in symptom_position" :key="index" class="symptom_position_wrapper" :class="{active:sel_symptom_position == index}" @click="sel_symptom_position_index(index)">
                        <div class="icon">
                            <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1175099016,3725260152&fm=26&gp=0.jpg" alt="">
                        </div>
                        <p>{{sym.symptom_position_name}}</p>
                    </div>
                </div>
                <div class="sel_symptom" :style="{height:w_height+'px'}">
                        <p class="symptom" v-for="(symptom,index) in symptoms" :key="index" v-show="sel_symptom_position == symptom.symptom_position_id">
                            <router-link :to="{name:'container',query:{id:params.diseaseAbout_id,symptom_id:symptom.id}}">
                                <span>{{symptom.symptom_name}}</span>
                            </router-link>
                        </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        symptom_data:{
            default:function(){
                return {}
            }
        },
        params:{
            default:function(){
                return {}
            }
        }
    },
    data(){
        return{
            symptom_ids:[],
            mass_ids:[],
            mass_sex:"0",
            w_height:812,
            symptom_status:true,
            sel_symptom_position:"0",
            symptoms:[
                {
                    id:1,
                    symptom_position_id:1,
                    name:"吃的太多"
                },
                {
                    id:1,
                    symptom_position_id:1,
                    name:"出汗过多"
                },
                {
                    id:1,
                    symptom_position_id:1,
                    name:"癫痫发作"
                },
                {
                    id:1,
                    symptom_position_id:1,
                    name:"发热"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"乏力"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"肥胖"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"关节疼痛"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"全身无力"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"手脚冰凉"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"睡眠不好"
                },{
                    id:1,
                    symptom_position_id:1,
                    name:"抑郁"
                }
            ],
            symptom_position:[
                {
                    id:"1",
                    name:"全身症状",
                    url:"zk-icon-ys"
                },
                {
                    id:"2",
                    name:"头部",
                    url:"zk-icon-ys"
                },
                {
                    id:"3",
                    name:"喉颈部",
                    url:"zk-icon-ys"
                },
                {
                    id:"4",
                    name:"胸部",
                    url:"zk-icon-ys"
                },
                {
                    id:"5",
                    name:"四肢",
                    url:"zk-icon-ys"
                },
                {
                    id:"6",
                    name:"腹部",
                    url:"zk-icon-ys"
                },
                {
                    id:"7",
                    name:"骨盆",
                    url:"zk-icon-ys"
                },
                {
                    id:"8",
                    name:"腰背部",
                    url:"zk-icon-ys"
                },
                {
                    id:"9",
                    name:"臀部",
                    url:"zk-icon-ys"
                }
            ]
        }
    },
    watch:{
        symptom_data(val,oldVal){
            this.symptom_position = val.symptom_position;
            this.symptoms = val.symptom;
        }
    },
    methods:{ 
        sel_symptom_position_index(index){
            this.sel_symptom_position = index;
        },
        back(){
            this.$router.go(-1);
        }
    },
    created(){
        let html_size = document.getElementsByTagName('html')[0].style.fontSize;
        this.w_height = window.screen.height - parseInt(html_size);
    }
}
</script>

<style scoped>
    #symptom{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #fff;
        z-index: 501;
    }
    #symptom .symptom_header{
        font-size: .35rem;
        color: #fff;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: rgb(255, 83, 112);
    }

    #symptom .symptom_header .back{
        float: left;
        font-size: .5rem;
    }
    #symptom .symptom_header .next{
        position: absolute;
        top: 0;
        right: .3rem;
        color: aqua;
        font-size: .3rem;
    }
    #symptom .position_symptom {
        font-size: .35rem;
    }
    #symptom .position_symptom .sel_symptom_position{
        float: left;
        width: 25%;
        height: 762px;
        overflow-y: scroll;
    }
    #symptom .position_symptom .sel_symptom_position .symptom_position_wrapper{
        height: 1.7rem;
        padding-top: .25rem;
        text-align: center;
        background-color: #eee;
    }
    #symptom .position_symptom .sel_symptom_position .symptom_position_wrapper p{
        font-size: .27rem;
    }
    #symptom .position_symptom .sel_symptom_position .symptom_position_wrapper .icon{
        width: 1rem;
        height: 1rem;
        font-size: 1rem;
        display: inline-block;
        overflow: hidden;
    }
    #symptom .position_symptom .sel_symptom_position .symptom_position_wrapper .icon img{
        width: 100%;
    }
    #symptom .position_symptom .sel_symptom_position .active{
        border-right: 0px;
        border-left: .1rem solid rgb(255, 83, 112);
        background-color: #fff;
    }
    #symptom .position_symptom .sel_symptom{
        float: right;
        width: 72%;
        height: 762px;
        overflow-y: scroll;       
    }
    #symptom .position_symptom .sel_symptom .symptom{
        padding: .3rem;
        border-bottom: 1px solid #ccc;
    }
</style>
