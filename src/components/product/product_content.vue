<!--  -->
<template>
    <div>
        <ProductContrnt 
        :goods_desc="result.goods_desc" 
        :route_link="'container'"
        :cid="cid"
        :route_params="{id:params['diary_con_id'],cid:cid}"
        :number="2"
        ></ProductContrnt>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
    import ProductContrnt from '@/templates/product/product_content.vue'
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
                cid:'',
                loadinging: true
            }
        },
        components: {
            ProductContrnt,
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
                     self.cid = res.data.goodsinfo.cat_id;
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