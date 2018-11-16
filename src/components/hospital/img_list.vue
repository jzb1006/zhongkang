<template>
    <div id="img_list">
       <tab>
            <tab-item :key="index" v-for="(item,index) in tabItems" :selected="index===0" @on-item-click="onItemClick">
               <p ref="item">{{item}}</p>
            </tab-item>
        </tab>
       <preciew :list="album" :isRequesting="isRequesting" :hasMore="hasMore" :isBusy="isBus"></preciew>
       <Alert :Show="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>
<script>
 import {
        mapState
    } from 'vuex'
import preciew from "@/components/decorate/preciew.vue";
import Alert from "@/components/decorate/alert.vue";
import nosearch from "@/components/nosearch/index.vue";
import api from "../../api/hospital";

 import {
        Tab,
        TabItem
    } from 'vux'
    export default {
       components:{
         preciew,
         Alert,
         Tab,
        TabItem,
        nosearch
       },
       data(){
           return{
               ins_id:this.$route.params.ins_id,
               result:[],
               alertShow:false,
               alerttType:'warn',
               alertText:'',
               album:[],
               tabItems:['医院资质','医生资质','荣誉奖项','医院环境'],
               defaultItem:'医院资质',
               isRequesting:false,
               hasMore:0,
               isBus:false,
               page:0
           }
       },
       computed:{
           isShow(){
               return this.alertShow;
           },
            ...mapState({
                bus: state => state.search.bus,
            }),
       },
       methods:{
           $_ajax_licence(name){
               var self = this;
               this.hasMore=1
               this.isBus=true
               api.get_ins_photo({
                   id:this.ins_id,
                   name:name,
                   page:this.page++,
                   num_list:5
               }).then(res=>{
                   if(res.data.data.photo){
                      self.result = self.result.concat(res.data.data.photo);
                   }
                   var errcode = res.data.code;
                   var msg = res.data.msg;
                  
                   if(errcode==1){
                       self.isRequesting=true
                      for (let i = 0; i < self.result.length; i++) {
                                self.album.push({
                                    msrc: api.imgPrifix() + self.result[i]['url'],
                                    src: api.imgPrifix() + self.result[i]['url'],
                                    w: 800,
                                    h: 600
                        })
                     }
                   }else{
                       self.isRequesting=true
                   }
                    self.hasMore = res.data.data.hasMore;
                    console.log(res.data)
                    this.isBus=false;
               }).catch(error=>{
                    this.alertShow = true;
                    this.alertText = error.message;
               })
           },
           onItemClick (index) {
               this. reSearch();
               var item = this.$refs.item[index].innerHTML;
               this.$_ajax_licence(item);
            },
             //重置搜索
            reSearch() {
                this.result = [];
                this.album = [];
                this.hasMore = 0;
                this.isBusy = false;
                this.page = 1;
            },
       },
       mounted(){
           this.reSearch();
           this.$_ajax_licence(this.defaultItem);
           this.bus.$on('LoadMore',()=>{
              this.$_ajax_licence(this.defaultItem);
              console.log("dfg");
           })
       }
    }
</script>
<style>
   #img_list{
           padding: 0.3rem 0.2rem;
   }
    .vux-tab .vux-tab-item {
        font-size: 0.3rem!important;
    }
    .vux-tab-container,
    .vux-tab,
    .vux-tab-wrap {
        height: 0.7rem!important;
    }
    .vux-tab-wrap {
        padding-top: 0.2rem!important;
    }
    .vux-tab .vux-tab-item.vux-tab-selected {
        color: #ff5370!important;
    }
    .vux-tab-ink-bar {
        background-color: #ff5370!important;
    }
    #container {
        position: relative;
    }
    .route {
        height: 1rem;
        line-height: 1rem;
    }
</style>