<template>
  <div id="detail_item">
        <!-- <div>
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
                        <span class="juli" v-for="(i,index) in result.category" :key="index.id">{{i.name}}</span>
                    </span>
                </p>
                <p class="item" v-show="result.order_sn!=''&&result.order_sn!=null">
                    <span class="left">订单号</span>
                    <span class="right">{{result.order_sn}}</span>
                </p>
                <div class="item1">
                    <p class="l">详细需求:</p>
                    <p class="r t">{{result.detail}}</p>
                </div>
            </div>
            <div class="item1 bottom">
                <p class="l">当前照片:</p>
                <p class="r">
                    <img :src="url(i)" class="img" v-for="(i,index) in result.photo" :key="index">
                </p>
            </div>
            
        </div> -->
        <detailItemTem :result="result"></detailItemTem>
  </div>
</template>
<script>
  import api from '@/api/customized'
  import { mapGetters } from "vuex";
//   import detailItemTem from '@/components/commonTemplete/detail_item_tem.vue';
  export default {
    name: 'detail_item',
    data(){
        return{
            result:[],
        }
    },
    // props:{
    //     result:{
    //         type:[Array,Object]
    //     }
    // },
     computed: {
        ...mapGetters(["getLastName","getAge","getCustomizedDetail","getPhoto"]),
     },
    methods:{
        url(i){
            return api.imgUrl()+i;
        },
        get_order_detail(){
                let detail=this.getCustomizedDetail
                let lastName=this.$store.state.customized.lastName;
                let age=this.$store.state.customized.age
                let level=this.$store.state.customized.level
                let photo=this.getPhoto
                let min=this.$store.state.customized.minPrice
                let max=this.$store.state.customized.maxPrice
                this.result={
                    'lastname':this.getLastName,
                    'age':this.getAge,
                    'level_name':sessionStorage.getItem('level_name'),
                    'money':sessionStorage.getItem('money'),
                    'realname':sessionStorage.getItem('adviser_name'),
                    'detail':detail,
                    'category':JSON.parse(sessionStorage.getItem('operation_category_name')),
                    'photo':photo,
                    // 'order_sn':'',
                    'min_price':sessionStorage.getItem('minPrice'),
                    'max_price':sessionStorage.getItem('maxPrice'),
                    // 'pay_id':this.pay_id,
                    'order_amount':sessionStorage.getItem('price'),
                }
            }
    },
    mounted(){
        this.get_order_detail();
    },
  }
</script>
<style scoped>
    #detailItem{
        font-size:.35rem;
        /* margin-bottom:.8rem; */
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
        /* width:70%; */
        margin-left:30%;
    }
    .juli{
        display: inline-block;
        margin-left:.1rem;
    }
    .item1::after{
        content:'';
        display:block;
        clear:both;
    }
    .item1 .l{
        float:left;
        width:30%;
        padding:.2rem;
        box-sizing: border-box;
    }
    .item1 .r{
        float:right;
        width:70%;
        padding:.2rem;
        box-sizing: border-box;
    }
    .item1 .t{
        word-wrap:break-word;
        word-break:break-all;
        line-height: .4rem;
        text-align:right;
    }
    .imgbox{
        float:left;
        width:33%;
        margin-top:.2rem;
    }
    .img{
        width:1.8rem;
        height:1.8rem;
        margin:.1rem .1rem 0 0;
    }
    .bottom{
        margin-bottom:1.2rem;
    }
</style>