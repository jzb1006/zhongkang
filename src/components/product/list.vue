<template>
    <div id="product_list">
        <product :list="result" :con_id="params['product_con_id']"></product>
         <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_index"></LoadMore>
    </div>
</template>
<script>
    import product from '@/templates/product/list.vue'
    import Loading from "@/components/decorate/loading.vue";
    import LoadMore from '@/components/loadMore/index.vue'
    import api from "../../api/home";
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                result: [],
                page: 1,
                num_list: 10,
                hasMore: 0,
                isBusy: false,
                loadinging:true
            }
        },
        components: {
            product,
            LoadMore,
            Loading
        },
        methods: {
            $_ajax_index() {
                this.isBusy = true;
                var self = this;
                api.index({
                    page: this.page++,
                    num_list: this.num_list
                }).then(res => {
                    console.log(res)
                    var result = res.data.data;
                    var error_code = res.data.error_code;
                    if (error_code == 0) {
                        self.hasMore = result.hasMore;
                        if (result.goods) {
                            self.result = self.result.concat(result.goods);
                        }
                    }
                    self.loadinging=false
                    this.isBusy = false;
                }).catch(error => {
                    console.log(error)
                    self.loadinging=false
                })
            }
        },
        mounted() {
            this.$_ajax_index();
        }
    }
</script>
<style scoped>


</style>