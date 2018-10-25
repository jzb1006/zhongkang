<template>
    <div id="orderItem">
        <!-- <router-link :to="{name:'customizedOrderDetail',params:{order_sn:item.order_sn}}"> -->
            <div class="time">
                <span class="l">{{item.update_time}}</span>
                <span class="status">{{item.status}}</span>
            </div>
            <div class="container vux-1px-tb">
                <div class="images">
                    <img :src="url(item.photo[0])" class="img">
                </div>
                <div class="desc">
                    <p>
                        <span v-for="(i,index) in item.category" :key="index" class="span">{{i}}</span>
                    </p>
                    <p>{{item.lastname}}女士</p>
                </div>
            </div>
        <!-- </router-link> -->
    </div>
</template>

<script>
    import api from "../../api/customized"
    import top from "@/components/decorate/top_back_title.vue"
    export default {
        name:'orderItem',
        data(){
            return{

            }
        },
        props:{
            item:{
                type:[Object,Array]
            }
        },
        methods:{
            url(i){
                return api.imgUrl()+i;
            }
        },
        mounted(){
            // api.queryCustomizedOrder()
            // .then(res=>{
            //     console.log(res.data);
            //     this.result=res.data;
            // })
            // .catch(err=>{
            //     console.log(err);
            // })
        },
        components:{
            top,
        }
    }
</script>

<style scoped>
    #orderItem{
        padding:.2rem .3rem;
    }
    .time{
        padding-bottom:.2rem;
        font-size:.25rem;
    }
    .time::after{
        content:'';
        display:block;
        clear:both;
    }
    .time .l{
        float:left;
    }
    .status{
        float:right;
        color: #ff5370;
    }
    .container{
        padding:.2rem 0;
        height:1.2rem;
    }
    .container::after{
        content:'';
        display:block;
        clear:both;
    }
    .images{
        float:left;
        width:1.2rem;
    }
    .desc{
        float:left;
        width:60%;
    }
     .img{
        width:1rem;
        height:1rem;
        /* vertical-align: top; */
    }
    
    .span{
        vertical-align: top;
        display:inline-block;
        margin:0 .1rem .1rem 0;
    }
</style>