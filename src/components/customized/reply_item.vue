<template>
    <div id="reply_item">
        <div v-for="(item,index) in result" :key="index" class="vux-1px-b">
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
                <div class="row">
                    <slot name="edit" :myname="item.programme"></slot>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import api from './../../api/customized'
    export default {
        data(){
            return{
                order_sn:'',
                count:'',
                selected_programme:'',
                isShow:{},
            }
        },
        props:{
            result:{
                type:[Object,Array],
            }
        },
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


