<!--  -->
<template>
    <div class="recommend_box">
        <div class="box-ls border-bot" id="tpl-1">
            <product v-if="goods_list.length!=0" 
            :list="goods_list" 
            :route_link="product_link" 
            :con_id="product_con_id"></product>
            <router-link :to="{name:routeLink,query:router_params}">
                <div class="footer border-top">
                    查看全部{{goods_total}}个商品
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import product from '@/templates/product/list.vue'
    export default {
        name: 'product_box',
        data() {
            return {};
        },
        props: {
            goods_list: {
                type: Array,
                default () {
                    return []
                }
            },
            router_params: {
                type: Object,
                default () {
                    return {}
                }
            },
            routeLink:{
               type:String,
               default:''
            },
            goods_total: {
                type: Number,
                default: 0
            },
            product_link:{
                type:String,
               default:''
            },
            product_con_id:{
                type:String,
               default:''
            }
        },
        components: {
            product
        },
        methods: {},
        mounted() {},
    }
</script>
<style scoped>
    .recommend-box .title {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.36rem;
        color: #333;
        padding: 0 0.30rem;
    }
    .recommend-box {
        padding-top: 0.40rem;
    }
    .recommend-box .box-ls ul {
        overflow: hidden;
        padding: 0 0.30rem;
    }
    .recommend-box .box-ls .part {
        padding: 0.30rem 0;
    }
    .recommend-box .box-ls img {
        width: 1.52rem;
        height: 1.52rem;
        margin-right: 0.30rem;
        border-radius: 0.08rem;
    }
    .recommend-box .box-ls .son-box {
        position: relative;
    }
    .layout-box .son-box {
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;
        width: 100%;
        position: relative;
    }
    .recommend-box .box-ls .tit {
        color: #333;
        font-size: 0.30rem;
        line-height: 0.36rem;
    }
    .recommend-box .box-ls .text {
        position: absolute;
        bottom: 0.44rem;
        left: 0;
        color: #777;
        font-size: 0.24rem;
    }
    .recommend-box .box-ls .bot {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        font-size: 0.24rem;
        color: #ff4c6e;
    }
    .recommend-box .box-ls .bot .fr {
        color: #777;
        line-height: 0.40rem;
    }
    .footer {
        height: 1.00rem;
        line-height: 1.00rem;
        font-size: 0.30rem;
        color: #2cc7c5;
        letter-spacing: 0;
        text-align: center;
        display: block;
    }
    .recommend-box .border-top {
        position: relative;
    }
</style>