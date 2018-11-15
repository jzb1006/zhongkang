<template>
  <div id="ask">
        <top :params="params"></top>
        <!-- <div class="content">
            <div :class="{item:value.direction==0,item1:!(value.direction==0)}" v-for="(value,index) in allResult" :key="index">
                <img :src="headimgurl" v-if="value.direction==0" :class="{img_right:value.direction==0,img_left:!(value.direction==0)}">
                <img :src="otherHeadimgurl" v-if="!(value.direction==0)" :class="{img_right:value.direction==0,img_left:!(value.direction==0)}">
                <p :class="{span_right:value.direction==0,span_left:!(value.direction==0)}" v-if="value.message!=''">{{value.message}}</p>
                <p :class="{chat_img_right:value.direction==0,chat_img_left:!(value.direction==0)}"><img :src="getChatImg(value.chat_photo[0])" v-if="value.chat_photo[0]!=''"></p>
            </div>
        </div> -->
        <chat :params="params1"></chat>
        <!-- <chat-content :params="params1"></chat-content>
        <chat-foot :params="params1"></chat-foot> -->
  </div>
</template>

<script>
  import top from '@/components/decorate/top.vue'
//   import api from '@/api/customized'
//   import {mapGetters} from 'vuex'
//   import chatContent from  '@/components/customized/chat_content.vue'
//   import chatFoot from '@/components/customized/chat_foot.vue'
//   import chat from '@/components/customized/chat.vue'
  export default {
    name: 'ask',
    data(){
        return{
            // headimgurl:'',
            // otherHeadimgurl:'',
            // text:'',
            // user_id:'',
            // adviser_id:'',
            // self:'',
            // allResult:[],
            // order_sn:'',
            // direction:0,
            params:{
                title:'追问',
            },
            params1:{
                direction:0,
            }
        }
    },
    computed:{
        // ...mapGetters([
        //     'getUserinfo',
        //     'getOtherId'
        // ]),
        // isSend(){
        //     if(this.text.trim()!=''){
        //         return true;
        //     }else{
        //         return false;
        //     }
        // },
        // title(){
        //     if(this.direction==0){
        //         return '追问';
        //     }else{
        //         return '追答';
        //     }
        // }
    },
    methods:{
        // getHeadimgurl(argument){
        //     let headimgurl=((argument.headimgurl!=null)&&(argument.headimgurl!=""))?api.imgUrl()+argument.headimgurl:argument.defaultImg;
        //     return headimgurl;
        // },
        // getChatImg(url){
        //     return api.imgUrl()+url;
        // },
        // queryChatRecord(){
        //     console.log(this.order_sn);
        //     api.queryChatRecord({'user_id':this.user_id,'adviser_id':this.adviser_id,'order_sn':this.order_sn}).then(res=>{
        //         console.log(res);
        //         this.allResult=res.data;
        //     }).catch(err=>{
        //         console.log(err);
        //     })
        // },
        // query(){
        //     this.queryChatRecord();
        // },
        // init(){
        //     this.order_sn=sessionStorage.getItem('order_sn');
        //     console.log(this.order_sn);
        //     this.user_id=sessionStorage.getItem('user_id');
        //     this.adviser_id=sessionStorage.getItem('adviser_id');
        //     // console.log(this.order_sn);
        //     // this.otherID=this.getOtherId;

        //     api.getImgByUserId({'user_id':this.adviser_id}).then(res=>{
        //         console.log(res);
        //         this.otherHeadimgurl=this.getHeadimgurl(res.data);
        //     }).catch(err=>{
        //         console.log(err);
        //     })

        //     this.headimgurl=this.getHeadimgurl(this.getUserinfo);

        //     this.queryChatRecord();
        // },
    },
    mounted(){
        // this.init();
        this.direction=sessionStorage.getItem('direction');
        console.log(this.direction);
    },
    components:{
        top,
        // chatContent,
        // chatFoot,
    }
  }
</script>

<style scoped>
    #ask{
        background:#f0f0f0;
        min-height:100%;
        height:auto;
    }
    .content{
        margin-bottom:1rem;
        padding-bottom:.3rem;

    }
    .item{
        text-align:right;
        padding-right:.2rem;
        padding-top:.2rem;
        /* width:70%; */
    }
    .item1{
        text-align:left;
        padding-left:.2rem;
        padding-top:.2rem;
        /* width:70%; */
    }
    .item::after,.item1::after{
        content:'';
        display:block;
        clear:both;
    }
    .img_left,.img_right{
        width:.8rem;
        height:.8rem;
        /* border-radius:.5rem; */
        /* vertical-align: top; */
        display:block;
        /* width:15%; */
    }
    .img_right{
        float:right;
    }
    .img_left{
        float:left;
    }
    /* .chat_img_right,.chat_img_left{
        text-align:left;
    } */
    .chat_img_right img,.chat_img_left img{
        max-width:2rem;
        max-height:2rem;
    }
    .chat_img_left{
        float:left;
        margin-left:.25rem;
    }
    .chat_img_right{
        float:right;
        margin-right:.25rem;
    }
    .span_left,.span_right{
        font-size:.35rem;
        /* vertical-align: center;
        display:inline-block; */
        background:#fff;
        padding:.2rem;
        color:#000;
        max-width:58%;
        text-align:left;
        line-height:.4rem;
        position: relative;
        border-radius:.1rem;
        min-height: .8rem;
        /* line-height: .8rem; */
        box-sizing: border-box;
        word-wrap:break-word;
        word-break:break-all;
        /* overflow: hidden; */
    }
    .span_right{
        float:right;
        margin-right:.25rem;
        background: #49f777;
    }
    .span_left{
        float:left;
        margin-left:.25rem;
        background: #fff;
    }
    .span_left::after,.span_right::after{
        content: '';
        width: 0;
        height: 0;
        border-width: .15rem;
        border-style: solid;
        position: absolute;
        top:.4rem;
        transform:translateY(-50%);
        /* right:-.4rem; */
        
    }
    .span_right::after{
        right:-.3rem;
        border-color:transparent transparent transparent #49f777 ;
    }
    .span_left::after{
        left:-.3rem;
        border-color:transparent #fff transparent transparent;
    }
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        background:#fff;
        width:100%;
        height:1rem;
        box-sizing:border-box;
    }
    .hei{
        height:5rem;
    }
    .footer .chat{
        position: relative;
        top:5%;
    }
    .footer .add_box{
        position: relative;
        top:20%;
    }
    .voice,.biaoqing,.tianjia{
        display:block;
        float:left;
        width:15%;
        text-align:center;
        font-size:.7rem;
        position:absolute;
        top:50%;
        /* transform:translateY(-50%); */
    }
    .biaoqing{
        left:70%;
    }
    .tianjia{
        left:85%;
    }
    .text{
        border-bottom:1px solid #ccc;
        font-size:.25rem;
        padding:.2rem;
        display:block;
        float:left;
        width:55%;
        box-sizing: border-box;
        position:absolute;
        top:50%;
        left:15%;
        /* transform:translateY(-50%); */
    }
    .huanyuan{
        transform:translateY(-50%);
    }
    .btn{
        display:block;
        float:left;
        width:13%;
        box-sizing: border-box;
        padding:.2rem;
        position:absolute;
        top:50%;
        /* transform:translateY(-50%); */
        left:85%;
        margin-right:2%;
        background: #ff5370;
        color:#fff;
    }
</style>