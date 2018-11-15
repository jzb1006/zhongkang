<template>
    <div id="adviserViewReply">
        <top :params="params"></top>
        <reply-box :params="params1"></reply-box>
        <add-reply></add-reply>
        <div id="fill"></div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top.vue'
  import api from './../../api/customized'
  import nosearch from "@/components/nosearch/index.vue"
  import replyItem from '@/components/customized/reply_item.vue'
  import replyBox from '@/components/customized/reply_box.vue'
  import addReply from '@/components/adviser/add_reply.vue'
  import {mapGetters} from 'vuex'
  export default {
    name: 'adviserViewReply',
    data(){
        return{
            order_sn:'',
            result:[],
            order_status:'',
            isHasEdit:false,
            params:{
                title:'查看回复',
            },
            
        }
    },
    computed:{
        params1(){
            return{
                hasAdviser:true,
                hasEdit:true,
            }
        },
        ...mapGetters([
            'getOrderSn'
        ]),
    },
    methods:{
        // url(i){
        //     return api.imgUrl()+i;
        // },
        // add_programme(order_sn){
        //     this.$router.push({path:'/customizedReply',query:{'order_sn':this.order_sn}});
        // },
        // edit(selected_programme){
        //     this.$router.push({path:'/editProgramme',query:{'order_sn':this.order_sn,'programme':selected_programme}});
        // },
        // select(programme,index){
        //     this.count=index;
        //     this.selected_programme=programme;
        // },
        // showList(index){
        //     if(this.sign==index){
        //         this.sign=-1;
        //     }else{
        //         this.sign=index;
        //     }
        // }
    },
    mounted(){
        this.order_sn=this.getOrderSn;
        // this.order_status=sessionStorage.getItem('order_status');
        // this.isHasEdit=Number(sessionStorage.getItem('isHasEdit'));
        api.viewReply({'order_sn':this.order_sn}).then(res=>{
            console.log(res);
            this.result=res.data;
        }).catch(err=>{
            console.log(err);
        })
    },
    components:{
        top,
        nosearch,
        replyItem,
        replyBox,
        addReply,
    }
  }
</script>
<style scoped>
    .text{
        width:4rem;
        height:4rem;
    }
    .item{
        position: relative;
        padding:.2rem;
        font-size:.35rem;
    }
    .edit{
        /* position:absolute;
        right:.2rem; */
        background:#ff5370;
        color:#fff;
        padding:.05rem .15rem;
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
    }
</style>