<template>
    <div id="disease" name="disease">
        <topBackTitle :params="params"></topBackTitle>
        <div class="probability_disease">
            <p class="title">可能的患病结果</p>
            <div class="disease_list" v-if="match_diseases_length">
                <div class="disease" v-for="(disease,index) in match_diseases" :key="index" @click="sel_disease(disease.id)">
                    <p class="disease_name">{{disease.disease_name}}</p>
                    <p class="precent">{{calculate_precent(disease.id)}}%</p>
                    <span class="right zk-icon-more"></span>
                    <box gap="0.3rem 0.6rem .3rem .3rem">
                        <x-progress :percent="calculate_precent(disease.id)" :show-cancel="false"></x-progress>
                    </box>
                </div>
            </div>
            <div class="kong" v-else>
                <span>匹配结果为空</span>
            </div>
            <div class="scoring">
                <span @click="show_scoring()">评分</span>
                <div v-transfer-dom>
                  <confirm v-model="is_scoring_show"
                  show-input
                  ref="confirm"
                  title="请打分"
                  placeholder="60分及格,满分100分"
                  :input-attrs="{type:'number',min:0,max:100}"
                  @on-cancel="onCancel"
                  @on-confirm="onConfirm"
                  @on-show="onShow"
                  @on-hide="onHide">
                  </confirm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "@/api/fang";
import { Confirm, XProgress, Box,TransferDomDirective as TransferDom } from 'vux'
export default {
    directives: {
        TransferDom
    },
    components: {
        XProgress,
        Box,
        Confirm
    },
    props:{
        match_data:{
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
            is_scoring_show:false,
            match_diseases_length:0,
            match_diseases:[],
            symptom_ids:[],
            percent:15.6,
            parcent_arr:[],
            total:0,
            score:0,
        }
    },
    watch:{
        match_data(val,oldVal){
            this.match_diseases = val.match_diseases;
            this.parcent_arr = val.parcent_arr;
            this.total = val.total;
            this.match_diseases_length = val.match_diseases.length;
        }
    },
    methods:{
        onCancel(){
            // console.log('on Cancel;');
        },  
        onHide () {
            // console.log('on hide');
        },
        onShow () {
          this.$refs.confirm.setInputValue('0')
        },
        onConfirm (value) {
          this.$refs.confirm.setInputValue('')
          this.score = value;
          if(value > 100){
            this.score = 100;
          }
          if(value < 0){
            this.score = 0;
          }
          this.add_record();
        },
        show_scoring(){
            this.is_scoring_show = true;
        },
        sel_disease(index){
            this.$router.push({name:'container',query:{id:this.params.disease_list_id,disease_id:index}});
        },
        calculate_precent(id){
            for(let index in this.parcent_arr){
                if(this.parcent_arr[index].id == id){
                    return (this.parcent_arr[index].count/this.total)*100 > 85 ? 85 :Math.floor((this.parcent_arr[index].count/this.total)*100);
                }
            }
        },
        //添加咨询记录
        add_record(){
            let obj = this.$route.query;
            obj = Object.assign({},obj,{score:this.score});
            var self = this;
            api.ajaxPost("add_guide_record",obj).then(res => {
                console.log(res);
            })
        }
    },
    mounted(){

    }
}
</script>
<style>
    .vux-x-dialog .weui-dialog{
        max-width: 6rem!important;
    }
    .weui-dialog .weui-dialog__hd{
        padding: 0!important;
    }
    .vux-prompt{
        padding: 0!important;
    }
</style>

<style scoped>

    #disease .about_symptom{
        font-size: .35rem;
        margin: .1rem;
        padding:.2rem .3rem;
        border: 1px solid #ccc;
    }
    #disease .about_symptom .ensure{
        text-align: right;
        color: #fff;
        padding-bottom: .2rem;
        border-bottom: 1px solid #aaa;
    }
    #disease .about_symptom .ensure span{
        font-size: .25rem;
        padding: .1rem .2rem;
        background-color: rgb(47, 73, 80);
    }
    #disease .about_symptom .symptoms{
        padding-top: .1rem;
    }
    #disease .about_symptom .symptoms .symptom{
        display: inline-block;
        color: #000;
        margin:0 .3rem .1rem 0;
        padding: .1rem .2rem;
        border: 1px solid #aaa;
    }
    #disease .about_symptom .symptoms .active{
        color: #fff;
        background-color: rgb(255, 83, 112);
    }
    #disease .probability_disease .title{
        font-size: .35rem;
        font-weight: 550;
        padding: .3rem;
    }
    #disease .probability_disease .kong{
        text-align:center;
        height:1rem;
        line-height:1rem;
        margin:0 .3rem .3rem;
        padding:.2rem;
        font-size:.4rem;
        border-radius:.3rem;
        background-color:#aaa;
    }
    #disease .probability_disease .kong span{
        font-size:.4rem;
        font-weight:550;
        color:#fff;
    }
    #disease .probability_disease .disease_list .disease{
        position: relative;
        font-size: .35rem;
        padding: .3rem 0;
    }
    #disease .probability_disease .disease_list .disease p.disease_name{
        position: absolute;
        top: .1rem;
        left: .3rem;
        margin-bottom: .3rem;
    }
    #disease .probability_disease .disease_list .disease p.precent{
        position: absolute;
        top: .2rem;
        right: .5rem;
        font-size: .25rem;
        color: #ccc;
    }
    #disease .probability_disease .disease_list .disease .right{
        position: absolute;
        top: .2rem;
        right: 0;
        font-size: .5rem;
    }
    #disease .probability_disease .scoring{
        font-size: .3rem;
        margin-left: .3rem;
    }
    #disease .probability_disease .scoring span{
        font-size: .3rem;
        color: #fff;
        margin-top: .3rem;
        padding: .1rem .3rem;
        border: 1px solid #000;
        border-radius: .2rem;
        background-color: #e85050;
    }
</style>
