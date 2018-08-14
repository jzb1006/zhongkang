<template>
    <div id="doc_list">
        <!-- 头部 -->
        <top :title="ins_name+'商品列表'"></top>
        <product :list="doctorList"></product>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_productList"></LoadMore>
    </div>
</template>
<script>
    import top from "@/components/decorate/top_back_title.vue";
    import product from '@/components/product/list.vue'
    import LoadMore from '@/components/loadMore/index.vue'
    import api from '@/api/hospital';
    export default {
        components: {
            top,
            product,
            LoadMore
        },
        data() {
            return {
                ind_id: this.$route.params.ins_id,
                result: [],
                hasMore: 0,
                isBusy: false,
                ins_info: [],
                page: 1,
                num_list: 5
            }
        },
        computed: {
            doctorList() {
                return this.result
            },
            ins_name() {
                return this.ins_info['name'];
            }
        },
        methods: {
            $_ajax_productList() {
                var self = this;
                this.isBusy = true
                api.detail({
                    id: this.ind_id,
                    page: this.page++,
                    num_list: this.num_list
                }).then(res => {
                    var result = res.data;
                    var errcode = result.error_code;
                    var msg = result.msg;
                    self.hasMore = result.data.hasMore;
                    var goods = result.data.goods;
                    if (errcode == 0) {
                        if (goods) {
                            self.result = self.result.concat(goods);
                        }
                        self.ins_info = result.data.institution_info
                    }
                    self.isBusy = false;
                    console.log(res);
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            this.$_ajax_productList();
        }
    }
</script>
<style>
    @import "../../assets/css/Base.css";
</style>