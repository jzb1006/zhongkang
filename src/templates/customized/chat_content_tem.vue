<template>
  <div id="chat_content" ref="chat_content">
        <!-- <dropDown :state='hasMore' :isLoading='isBusy' @loadmore="queryChatRecord"></dropDown> -->
        <div class="content" @click="cancel">
            <div :class="{item:value.direction==dir,item1:value.direction!=dir}" v-for="(value,index) in allResult" v-if="value.direction" :key="index">
                <img :src="headimgurl" v-if="value.direction==dir" class="img_right">
                <img :src="otherHeadimgurl" v-if="value.direction!=dir" class="img_left">
                <p :class="{span_right:value.direction==dir,span_left:value.direction!=dir}" v-if="value.message!=''">
                    {{value.message}}
                </p>
                <p :class="{chat_img_right:value.direction==dir,chat_img_left:value.direction!=dir}" v-if="value.chat_photo!=''">
                    <img :src="getChatImg(value.chat_photo)">
                </p>
            </div>
        </div>
  </div>
</template>

<script>
  import api from '@/api/customized'
  import {mapGetters} from 'vuex'
  import Bus from "@/assets/bus.js"
  import dropDown from '@/components/loadMore/drop_down.vue'
  export default {
    name: 'chat_content',
    data(){
        return{
            headimgurl:'',
            otherHeadimgurl:'',
            text:'',
            user_id:'',
            adviser_id:'',
            self:'',
            allResult:[],
            order_sn:'',
            add_show:false,
            // dir:'',
            isBusy:true,
            hasMore:0,
            page:1,
            area:'',
        }
    },
    props:{
        allResult:{
            type:[Array,Object],
            default(){
                return []
            }
        },
        dir:{
            type:String,
            default:'0',
        }
    },
    watch: {
        allResult() {
            this.$nextTick(() => {
                if(this.area=='t'){
                    window.scrollTo(0,200);
                    this.area='';
                }else{
                    window.scrollTo(0,this.$refs.chat_content.offsetHeight);
                }
            })
        },
        // direction:function(newVal,oldVal){
        //     this.dir=newVal;
        //     this.init();
        // }
        // params(newVal,oldVal){
        //     console.log('1:'+newVal);
        //     this.dir=newVal.direction;
        //     this.init();
        // }
    },
    props:{
        // direction:{
        //     type:[Number,String]
        // }
        params:{
            type:[Object,Array]
        }
    },
    computed:{
        ...mapGetters([
            'getUserinfo',
        ]),
        isSend(){
            if(this.text.trim()!=''){
                return true;
            }else{
                return false;
            }
        },
        dir(){
            return this.params.direction;
        }
    },
    methods:{
        getHeadimgurl(argument){
            let headimgurl=((argument.headimgurl!=null)&&(argument.headimgurl!=""))?api.imgUrl()+argument.headimgurl:argument.defaultImg;
            return headimgurl;
        },
        getChatImg(url){
            return api.imgUrl()+url;
        },
        queryChatRecord(){
            this.isBusy=true;
            this.page=this.page+1;
            console.log(this.page);
            this.area='t';
            this.$_queryChatRecord();
        },
        $_queryChatRecord(){
            api.queryChatRecord({'user_id':this.user_id,'adviser_id':this.adviser_id,'order_sn':this.order_sn,'page':this.page,'num':13}).then(res=>{
                console.log(res);
                let data=res.data;
                this.hasMore=data[0]['hasMore'];
                this.allResult=data.concat(this.allResult);
                this.isBusy=false;
            }).catch(err=>{
                console.log(err);
            })
        },
        query(){
            this.page=1;
            this.allResult=[];
            this.$_queryChatRecord();
        },
        clickAdd(data){
            this.add_show=data;
        },
        cancel(){
            this.add_show=false;
        },
        init(){
            this.order_sn=sessionStorage.getItem('order_sn');
            this.user_id=sessionStorage.getItem('user_id');
            this.adviser_id=sessionStorage.getItem('adviser_id');
            if(this.dir==0){
                var uid=this.adviser_id;
            }else if(this.dir==1){
                var uid=this.user_id;
            }
            api.getImgByUserId({'user_id':uid}).then(res=>{
                this.otherHeadimgurl=this.getHeadimgurl(res.data);
            }).catch(err=>{
                console.log(err);
            })

            this.headimgurl=this.getHeadimgurl(this.getUserinfo);

            this.$_queryChatRecord();
        },
    },
    mounted(){
        console.log('a');
        // console.log(this.params);
        this.init();
        Bus.$on('query',()=>{
            this.query();
        })
        // this.dir=this.params.direction;
        // console.log(this.dir);
    },
    components:{
        top,
        dropDown
    }
  }
</script>

<style scoped>
    #chat_content{
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