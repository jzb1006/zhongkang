<template>
  <div id="detailItem">
        <div>
            <div class="item vux-1px-b">
                <span class="left">订单金额</span>
                <span class="right">{{result.order_amount}}</span>
            </div>
            <div class="vux-1px-b">
                <p class="item">
                    <span class="left">年龄</span>
                    <span class="right">{{result.age}}</span>
                </p>
                <p class="item">
                    <span class="left">姓氏</span>
                    <span class="right">{{result.lastname}}</span>
                </p>
                <p class="item">
                    <span class="left">预算区间</span>
                    <span class="right">{{result.min_price}}-{{result.max_price}}元</span>
                </p>
                <p class="item">
                    <span class="left">顾问级别</span>
                    <span class="right">{{result.level_name}}</span>
                </p>
                <p class="item">
                    <span class="left">顾问</span>
                    <span class="right">{{result.realname}}</span>
                </p>
                <p class="item">
                    <span class="left">手术类别</span>
                    <span class="right">
                        <span class="juli" v-for="(i,index) in result.category" :key="index">{{i}}</span>
                    </span>
                </p>
                <p class="item" v-show="result.order_sn!=''&&result.order_sn!=null">
                    <span class="left">订单号</span>
                    <span class="right">{{result.order_sn}}</span>
                </p>
                <p class="item">
                    <span class="left">详细需求</span>
                    <span class="right">{{result.detail}}</span>
                </p>
            </div>
            <div class="item bottom">
                <p>当前照片:</p>
                <p class="imgbox" v-for="(i,index) in result.photo" :key="index">
                    <img :src="url(i)" class="img">
                </p>
            </div>
             <!--
            <p>姓氏:{{result.lastname}}</p>
            <p>预算区间:{{result.money}}</p>
            <p>顾问级别:{{result.level_name}}</p>
            <p>顾问:{{result.realname}}</p>-->
            <br>
            <!-- <p>手术类别:
                <span v-for="(i,index) in result.category" :key="index">{{i}}</span>
            </p> -->
            
        </div>
  </div>
</template>
<script>
  import api from '@/api/customized'
  export default {
    name: 'detailItem',
    props:{
        result:{
            type:[Array,Object]
        }
    },
    methods:{
        url(i){
            return api.imgUrl()+i;
        },
    },
  }
</script>
<style scoped>
    #detailItem{
        font-size:.35rem;
        margin-bottom:1rem;
    }
    .item{
        position: relative;
        padding:.2rem;
    }
    .left{

    }
    .right{
        position:absolute;
        right:.2rem;
    }
    .juli{
        display: inline-block;
        margin-left:.1rem;
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
    .bottom{
        margin-bottom:1.2rem;
    }
</style>