<template>
  <div id="answer">
        <top title="追答"></top>
        <!-- <div class="content">
            <div :class="{item:value.direction==1,item1:!(value.direction==1)}" v-for="(value,index) in allResult" :key="index">
                <img :src="headimgurl" v-if="value.direction==1" :class="{img_right:value.direction==1,img_left:!(value.direction==1)}">
                <img :src="otherHeadimgurl" v-if="!(value.direction==1)" :class="{img_right:value.direction==1,img_left:!(value.direction==1)}">
                <p :class="{span_right:value.direction==1,span_left:!(value.direction==1)}" v-if="value.message!=''">{{value.message}}</p>
                <p :class="{chat_img_right:value.direction==1,chat_img_left:!(value.direction==1)}"><img :src="getChatImg(value.chat_photo[0])" v-if="value.chat_photo[0]!=''"></p>
            </div>
        </div> -->
        <chatContent :direction=1></chatContent>
        <chatFoot @query="query" :addShow="this.add_show" @clickAdd="clickAdd" :direction=1></chatFoot>
  </div>
</template>

<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from '@/api/customized'
  import {mapGetters} from 'vuex'
  import chatContent from  '@/components/customized/chat_content.vue'
  import chatFoot from '@/components/customized/chat_foot.vue'
  export default {
    name: 'answer',
    data(){
        return{
            headimgurl:'',
            otherHeadimgurl:'',
            text:'',
            user_id:'',
            adviser_id:'',
            self:'',
            result:[
                'maderfuck',
            ],
            otherResult:[
                'fuckmader'
            ],
            allResult:[],
            order_sn:'',
            add_show:false,
        }
    },
    computed:{
        ...mapGetters([
            'getUserinfo',
            'getOtherId'
        ]),
        isSend(){
            if(this.text.trim()!=''){
                return true;
            }else{
                return false;
            }
        },
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
            api.queryChatRecord({'user_id':this.user_id,'adviser_id':this.adviser_id,'order_sn':this.order_sn}).then(res=>{
                console.log(res);
                this.allResult=res.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        query(){
            this.queryChatRecord();
        },
        clickAdd(data){
            this.add_show=data;
        },
        cancel(){
            this.add_show=false;
        },
        init(){
            this.order_sn=sessionStorage.getItem('order_sn');
            this.adviser_id=sessionStorage.getItem('adviser_id');
            this.user_id=sessionStorage.getItem('user_id');

            api.getImgByUserId({'user_id':this.user_id}).then(res=>{
                console.log(res);
                this.otherHeadimgurl=this.getHeadimgurl(res.data);
            }).catch(err=>{
                console.log(err);
            })

            this.headimgurl=this.getHeadimgurl(this.getUserinfo);

            this.queryChatRecord();
        }
    },
    mounted(){
        this.init();
    },
    components:{
        top,
        chatContent,
        chatFoot
    }
  }
</script>

<style scoped>
    #answer{
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
        padding:0 .2rem;
        color:#000;
        max-width:58%;
        text-align:left;
        line-height:.4rem;
        position: relative;
        border-radius:.1rem;
        min-height: .8rem;
        line-height: .8rem;
        box-sizing: border-box;
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
</style>