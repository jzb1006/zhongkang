<template>
    <div id="reply_item">
        <div v-for="(item,index) in result" :key="index" class="vux-1px-b">
            <div class="item vux-1px-b"  @click="showList(index)">
                <span class="pro">方案{{index+1}}</span>
                <i :class="objclass(index)"></i>
            </div>
            <div v-show="WisShow(index)">
                <p class="row">
                    <!-- <span class="left">顾问:</span>
                    <span class="right">{{item.realname}}</span> -->
                    <slot name="adviser" :myname="item.realname"></slot>
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
                    <!-- <div class="box">
                        <p class="imgbox" v-for="(i,index) in item.photo" :key="index">
                            <img :src="url(i)" class="img2">
                        </p>
                    </div> -->
                    <div class="box">
                        <mediaDisplay :filelists="backList(item.photo)" :upshow1=false></mediaDisplay>
                    </div>
                </div>
                <div class="row">
                    <slot name="edit" :myname="item.programme"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import api from './../../api/customized'
  import mediaDisplay from "@/components/upload/media_display";
  import Bus from '@/assets/bus.js'
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
        // props:{
        //     result:{
        //         type:[Object,Array],
        //     }
        // },
        methods:{
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
                this.$router.push({path:'/editProgramme',query:{'order_sn':this.order_sn,'programme':selected_programme}});
            },
            backList(arr){
                let arrImg=[];
                arr.forEach(element => {
                    arrImg.push({url:element,alt:""});
                });
                return arrImg;
            }
        },
        components:{
            mediaDisplay
        },
        mounted(){
            Bus.$on('passProgramme',res=>{
                console.log(res);
                this.result.push(res);
            })
        },
        beforeDestroy(){
            Bus.$off('passProgramme')
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
        min-height: .6rem;
        word-wrap:break-word;
        word-break:break-all;
        overflow: hidden;
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


