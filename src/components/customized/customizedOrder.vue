<template>
    <div id="customizedOrder">
        <top :title="title"></top>
         <div v-if="result==''">
            <nosearch text="您的定制订单为空"></nosearch>
        </div>
        <div v-else class="content">
            <order-item v-for="(value,index) in result" :key="index" :item=value class="item" @click.native="detail(value.order_sn)"></order-item>
        </div>
        <div id="fill"></div>
    </div>

</template>
<script>
    import api from "../../api/customized"
    import top from "@/components/decorate/top_back_title.vue"
    import orderItem from '@/components/customized/orderItem'
    import nosearch from "@/components/nosearch/index.vue"
    export default {
        name:'customizedOrder',
        data(){
            return{
                title:'定制订单',
                result:[]
            }
        },
        methods:{
            url(i){
                return api.imgUrl()+i;
            },
            detail(order_sn){
                this.$store.dispatch('changeOrderSn',order_sn);
                // this.$router.push({name:'customizedOrderDetail'});
                this.$router.push('/customizedOrderDetail');
            }
        },
        mounted(){
            api.queryCustomizedOrder()
            .then(res=>{
                console.log(res);
                this.result=res.data;
            })
            .catch(err=>{
                console.log(err);
            })
        },
        components:{
            top,
            nosearch,
            orderItem
        }
    }
</script>
<style scoped>
    #customizedOrder{
        background:#f0f0f0; 
        min-height:100%;
        height:auto;
    }
    .item{
        margin-bottom:.15rem;
        background:#fff;
        font-size:.35rem;
    } 
    .img{
        width:1rem;
        height:1rem;
    }
</style>