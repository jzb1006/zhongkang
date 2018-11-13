<template>
    <div id="viewReply">
        <top :params="params"></top>
        <reply-box :params="params1"></reply-box>
        <!-- <div v-if="result==''">
            <nosearch text="暂无回复"></nosearch>
        </div>
        <reply-item v-else :result="result">
            <template slot="adviser" slot-scope="prop">
                <span class="left">顾问:</span>
                <span class="right">{{prop.myname}}</span>
            </template>
        </reply-item> -->
        <!-- <div v-else v-for="(item,index) in result" :key="index" class="vux-1px-b">
            <div class="item vux-1px-b"  @click="showList(index)">
                <span class="pro">方案{{index+1}}</span>
                <i :class="objclass(index)"></i>
            </div>
            <div v-show="WisShow(index)">
                <p class="row">
                    <span class="left">顾问:</span>
                    <span class="right">{{item.realname}}</span>
                </p>
                <p class="row">
                    <span class="left">方案:</span>
                    <span class="right">
                        <p class="wenben">{{item.programme[0]}}</p>
                        <p class="imgbox" v-for="(i,index) in item.programme.slice(1,item.programme.height)" :key="index">
                            <img :src="url(i)" class="img">
                        </p>
                    </span>
                </p>
                <p class="row">
                    <span class="left">价格:</span>
                    <span class="right">{{item.operation_price}}</span>
                </p>
                <div class="item">
                    <p>案例图:</p> 
                    <div class="box">
                        <p class="imgbox" v-for="(i,index) in item.photo" :key="index">
                            <img :src="url(i)" class="img">
                        </p>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
//   import api from './../../api/customized'
//   import nosearch from "@/components/nosearch/index.vue"
//   import replyItem from './reply_item.vue'
  import replyBox from '@/components/customized/replyBox.vue'
  export default {
    name: 'viewReply',
    data(){
        return{
            // order_sn:'',
            // result:[],
            params:{
                title:'查看回复',
            },
            params1:{
                hasAdviser:true,
                hasEdit:false,
            }
            // count:'',
            // sign:'',
            // selected_programme:'',
            // isShow:[],
        }
    },
    computed:{
       
    },
    methods:{
        // url(i){
        //     return api.imgUrl()+i;
        // },
        // showList(index){
        //     if(this.isShow[index]===''){
        //         this.isShow.splice(index,0,true);
        //     }else{
        //         if(this.isShow[index]===true){
        //             this.isShow.splice(index,1,false);
        //         }else{
        //             this.isShow.splice(index,1,true);
        //         }
        //     }
        // },
        // WisShow(index){
        //     return this.isShow[index];
        // },
        // objclass(index){
        //     if(this.isShow[index]===true){
        //         var xiala=false;
        //     }else{
        //         var xiala=true;
        //     }
        //     return{
        //         'iconfont':true,
        //         'zk-icon-xiala':xiala,
        //         'zk-icon-shangla':!xiala,
        //     }
        // }
    },
    mounted(){
        // this.order_sn=this.$route.params.order_sn;
        // this.order_sn=sessionStorage.getItem('order_sn');
        // api.viewReply({'order_sn':this.order_sn}).then(res=>{
        //     console.log(res);
        //     this.result=res.data;
        // }).catch(err=>{
        //     console.log(err);
        // })
    },
    components:{
        top,
        // nosearch,
        // replyItem,
        replyBox
    }
  }
</script>
<style scoped>
    /* .text{
        width:4rem;
        height:4rem;
    }
    .item{
        position: relative;
        padding:.2rem;
        font-size:.35rem;
    }
    .pro{
        display:inline-block;
        width:92%;
    }
    .sel{
        position:absolute;
        right:.2rem;
    }
    .row{
        padding:.2rem;
        font-size:.35rem;
    }
    .row::after{
        content:'';
        display: block;
        clear:both;
    }
    .left{
        float:left;
        width:22%;
    }
    .right{
        float:left;
        width:60%;
    }
    .wenben{
        width: 100%;
        height: auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
    .prize{
        border:1px solid #ccc;
        padding:.2rem;
    }
    .box::after{
        content:'';
        display:block;
        clear:both;
    }
    .imgbox{
        float:left;
        width:33%;
        margin-top:.2rem;
    }
    .img{
        width:1.8rem;
        height:1.8rem;
    }
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.2rem 0px;
        background: #fff;
    }
    .reply{
        height: 0.6rem;
        font-size: 0.22rem;
        float: right;
        color: #000000;
        line-height: 0.6rem;
        border-radius: 0.04rem;
        text-align: center;
        margin-left: 0.1rem;
        padding: 0.1rem;
        margin-right:0.15rem;
    }
    .isSelected{
        color:#ff5370;
    } */
</style>