<!--  -->
<template>
    <div>
        <!--商品名-->
        <div class="goods_title shrink">
            {{result['goods_name']}} 【{{result['cat_name']}}】【{{result['cat_desc']}}】 {{result['sort_desc']}}
        </div>
        <!--价格-->
        <div class="other shrink">
            <div class="other_money">
                <em><i style="font-size: 0.2rem; padding-right: 4px">￥</i> {{result['pifa_price']}}</em>
                <em class="vip_price">￥ {{result['market_price']}}</em>
            </div>
        </div>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
    import swiper from '@/components/slide/index.vue'
    import api from "../../api/search"
    import Loading from "@/components/decorate/loading.vue";
    export default {
        data() {
            return {
                id: this.$route.query.goods_id,
                ins_id: this.$route.query.ins_id,
                loadinging: true,
                result: [],
                keyword:''
            }
        },
        components: {
            Loading
        },
        methods: {
            $_ajax_product_detail() {
                var self = this;
                api.ajaxProduct({
                    id: this.id,
                    ins_id: this.ins_id
                }).then(res => {
                    if (res.data == '') {
                        alert('你请求的商品不存啊@！')
                        this.$router.back(-1)
                    }
                    self.result = res.data.goodsinfo;
                    self.keyword =  self.result['goods_name']+ self.result['cat_name']+self.result['cat_desc']+self.result['sort_desc'];
                    self.loadinging = false
                }).catch(error => {
                    self.loadinging = false
                    console.log(error);
                })
            },
        },
        destroyed(){
            this.behavior.behavior_data(this.keyword,3);
        },
        mounted() {
            this.$_ajax_product_detail();
        },
    }
</script>
<style scoped>
    .shrink {
        padding: 0 0.2rem;
    }
    .other {
        /* padding: .1rem; */
        overflow: hidden;
    }
        .other {
        /* padding: .1rem; */
        overflow: hidden;
    }
    .other_money {
        text-align: left;
        padding-bottom: .1rem;
        width: 100%;
    }
    .other_money em {
        font-size: 0.4rem;
        color: #ff527f;
        display: inline-block;
        font-style: normal;
    }
    .other_money .vip_price {
        font-size: .3rem;
        color: #333;
    }
    .goods_title {
        padding: 10px 13px 0;
        font-size: 0.3rem;
        color: #000;
    }
</style>