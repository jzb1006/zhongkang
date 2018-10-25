<template>
  <div id="ask">
        <top title="追问"></top>
        <div class="content">
            <!-- <div class="item" v-for="(item) in result" :key="item">
                <span class="span_right">{{item}}</span>
                <img :src="headimgurl" class="img">
            </div>
            <div class="item1" v-for="(item) in otherResult" :key="item">
                <img :src="otherHeadimgurl" class="img">
                <span class="span_left">{{item}}</span>
            </div> -->
            <div :class="{item:value.direction==0,item1:!(value.direction==0)}" v-for="(value,index) in allResult" :key="index">
                <img :src="headimgurl" v-if="value.direction==0" :class="{img_right:value.direction==0,img_left:!(value.direction==0)}">
                <img :src="otherHeadimgurl" v-if="!(value.direction==0)" :class="{img_right:value.direction==0,img_left:!(value.direction==0)}">
                <p :class="{span_right:value.direction==0,span_left:!(value.direction==0)}">{{value.message}}</p>
            </div>
        </div>
        <div class="footer">
            <span class="zk-icon-yuyin icon voice"></span>
            <input type="text" class="text" v-model="text" @keyup.enter="send">
            <span class="zk-icon-biaoqing icon biaoqing"></span>
            <span class="zk-icon-tianjia icon tianjia" v-show="!isSend" @click="add"></span>
            <input type="button" class="btn" value="发送" v-show="isSend" @click="send">

            <div class="add_box" v-show="add_show">
                <p>相册</p>
            </div>
        </div>
  </div>
</template>

<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from '@/api/customized'
  import {mapGetters} from 'vuex'
  export default {
    name: 'ask',
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
        send(){
            // this.text='';
            if(this.text.trim()==''){
                return false;
            }

            // this.allResult.push(this.text);
            let postdata={
                'user_id':this.user_id,
                'adviser_id':this.adviser_id,
                'message':this.text,
                'add_time':new Date().getTime(),
                'order_sn':this.order_sn
            }
            api.saveUserChat(postdata).then(res=>{
                console.log(res);
                this.text='';
                this.queryChatRecord();
                // this.link();
            }).catch(err=>{
                console.log(err);
            })
        },
        queryChatRecord(){
            console.log(this.order_sn);
            api.queryChatRecord({'user_id':this.user_id,'adviser_id':this.adviser_id,'order_sn':this.order_sn}).then(res=>{
                console.log(res);
                this.allResult=res.data;
            }).catch(err=>{
                console.log(err);
            })
        },
        add(){
            this.add_show=!this.add_show;
        }
    },
    mounted(){

        this.order_sn=this.$route.params.order_sn;
        this.user_id=this.$route.params.user_id;
        this.adviser_id=this.$route.params.adviser_id;
        console.log(this.order_sn);
        this.otherID=this.getOtherId;

        api.getImgByUserId({'user_id':this.adviser_id}).then(res=>{
            console.log(res);
            this.otherHeadimgurl=this.getHeadimgurl(res.data);
        }).catch(err=>{
            console.log(err);
        })

        this.headimgurl=this.getHeadimgurl(this.getUserinfo);

        this.queryChatRecord();
        // this.link();
    },
    components:{
        top
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
    .footer{
        position:fixed;
        bottom:0;
        left:0;
        background:#fff;
        width:100%;
        height:1rem;
        box-sizing:border-box;
    }
    .voice,.biaoqing,.tianjia{
        display:block;
        float:left;
        width:15%;
        text-align:center;
        font-size:.7rem;
        position:absolute;
        top:50%;
        transform:translateY(-50%);
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
        transform:translateY(-50%);
        left:85%;
        margin-right:2%;
        background: #ff5370;
        color:#fff;
    }
</style>