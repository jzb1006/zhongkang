<template>
    <div id="product_list">
        <product :list="result" :con_id="params['product_con_id']"></product>
         <Loading v-show="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_index"></LoadMore>
         <Alert :Show="isShow" :alerttType="'warn'" :alertText="alertText"></Alert>
    </div>
</template>
<script>
    import product from '@/templates/product/list.vue'
    import Loading from "@/components/decorate/loading.vue";
    import LoadMore from '@/components/loadMore/index.vue'
    import api from "@/api/home";
   import { mixin } from "@/assets/js/mixins";

    export default {
    mixins: [mixin],

        data() {
            return {
                result: [],
                page: 1,
                num_list: this.params['number'],
                // num_list: 1,
                is_more:this.params['is_more']||1,
                hasMore: 0,
                isBusy: false,
                loadinging:true,
                 alertText: '获取数据失败',
                isShow:false
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
                    num_list: parseInt(this.num_list)
                }).then(res => {
                    var result = res.data.data;
                    var error_code = res.data.error_code;
                    if (error_code == 0) {
                        self.hasMore = result.hasMore;
                        if (result.goods) {
                            self.result = self.result.concat(result.goods);
                        }
                    }else{
                        self.isShow = true;
                    }
                    self.loadinging=false
                    this.isBusy = false;
                }).catch(error => {
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