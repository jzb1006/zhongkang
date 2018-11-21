<!--  -->
<template>
    <div>
        <addFoot 
        :deposit_price="result.deposit_price" 
        :to_hospital_price="result.pifa_price-result.deposit_price"
        :result="result"
        :login_con_id="9"
        :card_con_id="params['card_con_id']"
        ></addFoot>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
    import addFoot from '@/templates/product/add_foot.vue'
    import api from "../../api/search"
    import Loading from "@/components/decorate/loading.vue";
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                id: this.$route.query.goods_id,
                ins_id: this.$route.query.ins_id,
                result: [],
                loadinging: true
            }
        },
        components: {
            addFoot,
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
                     self.loadinging=false
                }).catch(error => {
                     self.loadinging=false
                    console.log(error);
                })
            },
        },
        mounted() {
            this.$_ajax_product_detail();
        },
    }
</script>
<style scoped>

</style>