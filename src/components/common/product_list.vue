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
    import api from '@/api/product';
    export default {
        components: {
            top,
            product,
            LoadMore
        },
        data() {
            return {
                id: this.$route.params.id,
                type: this.$route.params.type,
                name: this.$route.params.name,
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
                return this.name
            }
        },
        methods: {
            $_ajax_productList() {
                var self = this;
                this.isBusy = true
                api.orderList({
                    id: this.id,
                    type: this.type,
                    page: this.page++,
                    num_list: this.num_list
                }).then(res => {
                    var result = res.data;
                    var errcode = result.error_code;
                    var msg = result.msg;
                    if (errcode == 88) {
                        self.$router.push({
                            name: 'login'
                        })
                        return false;
                    }else if(errcode==1){
                        self.$router.back(-1)
                        return false;
                    }
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
</style>