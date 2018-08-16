<template>
    <div id="product_list">
        <searchBar :title="'众康医疗'" :iconShow="true"></searchBar>
        <product :list="result"></product>
         <Loading v-show="loadinging"></Loading>
        <LoadMore :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_index"></LoadMore>
    </div>
</template>
<script>
    import foot from "@/components/common/foot.vue";
    import product from '@/components/product/list.vue'
    import Loading from "@/components/decorate/loading.vue";
    import LoadMore from '@/components/loadMore/index.vue'
    import searchBar from '@/components/home/search_bar.vue'
    import api from "../../api/home";
    import {
        Tabbar,
        TabbarItem
    } from 'vux'
    export default {
        data() {
            return {
                result: [],
                page: 1,
                num_list: 5,
                hasMore: 0,
                isBusy: false,
                loadinging:true
            }
        },
        components: {
            Tabbar,
            TabbarItem,
            foot,
            product,
            LoadMore,
            searchBar,
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
                    var result = res.data.data;
                    var error_code = res.data.error_code;
                    if (error_code == 0) {
                        self.hasMore = result.hasMore;
                        if (result.goods_info) {
                            self.result = self.result.concat(result.goods_info);
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