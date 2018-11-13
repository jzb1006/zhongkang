<template>
    <div id="replyBox">
        <div v-if="result==''">
            <nosearch text="暂无回复"></nosearch>
        </div>
        <div v-else v-for="(item,index) in result" :key="index" class="vux-1px-b">
            <div class="item vux-1px-b"  @click="showList(index)">
                <span class="pro">方案{{index+1}}</span>
                <i :class="objclass(index)"></i>
            </div>
            <div v-show="WisShow(index)">
                <p class="row" v-if="params.hasAdviser">
                    <span class="left">顾问:</span>
                    <span class="right">{{item.realname}}</span>
                    <!-- <slot name="adviser" :myname="item.realname"></slot> -->
                </p>
                <div class="row">
                    <div class="left">方案:</div>
                    <div class="right">
                        <p class="wenben">{{item.programme[0]}}</p>
                        <div class="imgbox" v-for="(i,index) in item.programme.slice(1,item.programme.height)" :key="index">
                            <img :src="url(i)" class="img2">
                        </div>
                        <!-- <div class="box">
                            <mediaDisplay :filelists="backList(item.programme.slice(1,item.programme.height))" :upshow1=false></mediaDisplay>
                        </div> -->
                    </div>
                </div>
                <p class="row">
                    <span class="left">价格:</span>
                    <span class="right">{{item.operation_price}}</span>
                </p>
                <div class="item">
                    <p>案例图:</p> 
                    <div class="box">
                        <p class="imgbox" v-for="(i,index) in item.photo" :key="index">
                            <img :src="url(i)" class="img2">
                        </p>
                    </div>
                    <!-- <div class="box"> -->
                        <!-- <mediaDisplay :filelists="backList(item.photo)" :upshow1=false></mediaDisplay> -->
                    <!-- </div> -->
                </div>
                <div class="row" v-if="params.hasEdit">
                    <!-- <slot name="edit" :myname="item.programme"></slot> -->
                    <span @click="edit(item.programme)" class="edit">修改</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import api from './../../api/customized'
  import mediaDisplay from "@/components/upload/media_display";
  import nosearch from "@/components/nosearch/index.vue"
  import {mapGetters} from 'vuex'
    export default {
        data(){
            return{
                order_sn:'',
                count:'',
                selected_programme:'',
                isShow:{},
                result:[],
            }
        },
        computed:{
            ...mapGetters([
                'getOrderSn',
            ]),
        },
        props:{
            params:{
                type:[Object,Array],
            }
        },
        methods:{
            get_reply(){
                api.viewReply({'order_sn':this.getOrderSn}).then(res=>{
                    console.log(res);
                    this.result=res.data;
                }).catch(err=>{
                    console.log(err);
                })
            },
            url(i){
                return api.imgUrl()+i;
            },
            showList(index){
                // if(this.isShow[index]===''){
                //     this.isShow.splice(index,0,true);
                // }else{
                //     if(this.isShow[index]===true){
                //         this.isShow.splice(index,1,false);
                //     }else{
                //         this.isShow.splice(index,1,true);
                //     }
                // }
                if(this.isShow[index]===''){
                    this.$set(this.isShow,index,true);
                }else{
                    if(this.isShow[index]===true){
                        this.$set(this.isShow,index,false);
                    }else{
                        this.$set(this.isShow,index,true);
                    }
                }
            },
            WisShow(index){
                return this.isShow[index];
            },
            objclass(index){
                if(this.isShow[index]===true){
                    var xiala=false;
                }else{
                    var xiala=true;
                }
                return{
                    'iconfont':true,
                    'zk-icon-xiala':xiala,
                    'zk-icon-shangla':!xiala,
                }
            },
            edit(selected_programme){
                console.log(selected_programme);
                this.$router.push({path:'/editProgramme',query:{'order_sn':this.getOrderSn,'programme':selected_programme}});
            },
            backList(arr){
                let arrImg=[];
                console.log(arr);
                arr.forEach(element => {
                    arrImg.push({url:element,alt:""});
                });
                return arrImg;
            }
        },
        mounted(){
            this.get_reply();
        },
        components:{
            mediaDisplay,
            nosearch
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
        height:auto;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
    }
    .edit{
        /* position:absolute;
        right:.2rem; */
        background:#ff5370;
        color:#fff;
        padding:.05rem .15rem;
    }
    .prize{
        border:1px solid #ccc;
        padding:.2rem;
    }
    .box{
        margin-top:.1rem;
    }
    .box::after{
        content:'';
        display:block;
        clear:both;
    }
    .imgbox{
        /* float:left; */
        display: inline-block;
        width:50%;
        margin-top:.2rem;
    }
    .img2{
        width:1.8rem;
        height:1.8rem;
    }
    /* .img1 {
        width: 100% !important;
        min-height: 100% !important;
        height: 100% !important;
    } */
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


