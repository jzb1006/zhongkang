<template>
    <div id="adviserViewReply">
        <top title="查看回复"></top>
        <div v-if="result==''">
            <nosearch text="暂无回复"></nosearch>
        </div>
        <reply-item v-else :result="result">
            <template slot="edit" scope="prop" v-if="isHasEdit">
                <span @click="edit(prop.myname)" class="edit">修改</span>
            </template>
        </reply-item>
        <!-- <div v-else v-for="(item,index) in result" :key="index" class="vux-1px-b">
            <div class="item vux-1px-b" @click="showList(index)">
                方案{{index+1}}
                <span class="sel" @click="edit(item.programme)">修改</span>
            </div>
            <div v-show="index==sign">
                <p class="row">
                    <span class="left">顾问:</span>
                    <span class="right">{{item.realname}}</span>
                </p>
                <p class="row">
                    <span class="left">方案:</span>
                    <span class="right">
                        <p class="wenben">{{item.programme[0]}}</p>
                        <p class="imgbox" v-for="(i,index) in item.programme.slice(1,item.programme.length)" :key="index">
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
        <div id="fill"></div>
        <div class="footer vux-1px-t" v-if="isHasEdit">
            <span class="reply vux-1px" @click="add_programme(result.order_sn)">增加回复</span>
            <!-- <span class="reply vux-1px" @click="edit(result.order_sn)">修改回复</span> -->
        </div>
    </div>
</template>
<script>
  import top from '@/components/decorate/top_back_title.vue'
  import api from './../../api/customized'
  import nosearch from "@/components/nosearch/index.vue"
  import replyItem from '@/components/customized/reply_item.vue'
  export default {
    name: 'adviserViewReply',
    data(){
        return{
            order_sn:'',
            result:[],
            order_status:'',
            isHasEdit:false,
        }
    },
     methods:{
        url(i){
            return api.imgUrl()+i;
        },
        add_programme(order_sn){
            this.$router.push({path:'/customizedReply',query:{'order_sn':this.order_sn}});
        },
        edit(selected_programme){
            this.$router.push({path:'/editProgramme',query:{'order_sn':this.order_sn,'programme':selected_programme}});
        },
        select(programme,index){
            this.count=index;
            this.selected_programme=programme;
        },
        showList(index){
            if(this.sign==index){
                this.sign=-1;
            }else{
                this.sign=index;
            }
        }
    },
    mounted(){
        this.order_sn=this.$route.query.order_sn;
        // this.order_status=sessionStorage.getItem('order_status');
        this.isHasEdit=Number(sessionStorage.getItem('isHasEdit'));
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