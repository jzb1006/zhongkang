<template>
    <div id="searchHospital">
        <hospital v-if="hospitalList.length!=0" :list="hospitalList"></hospital>
        <nosearch v-else v-show="isRequesting" text="(●ˇ∀ˇ●)没有搜索到你的结果<br>要不换个词儿再搜搜~"></nosearch>
        <LoadMore :state='hasMore' :isLoading='isBusy' v-if="hospitalList.length > 0" @loadmore="$_ajax_hospital"></LoadMore>
    </div>
</template>
<script>
import { mapState } from "vuex";
import Loading from "@/widget/loading";
// import api from "../../api/search";
import api from "@/api/search";
import hospital from "@/components/hospital/list.vue";
import LoadMore from "@/components/loadMore/index.vue";
import nosearch from "@/components/nosearch/index.vue";
export default {
    name: "resultDoctor",
    data() {
        return {
            result: [],
            lastKeyword: "",
            page: 0,
            hasMore: 0,
            isBusy: false,
            isRequesting: true
        };
    },
    computed: {
        ...mapState({
            bus: state => state.search.bus,
            keyword: state => state.search.keyword,
            tabIndex: state => state.search.tabIndex
        }),
        hospitalList() {
            try {
                return this.result;
            } catch (e) {
                return [];
            }
        }
    },
    components: {
        hospital,
        LoadMore,
        nosearch
    },
    methods: {
        //是否是显示当前页面
        isInThisView() {
            return this.tabIndex === 2;
        },
        //重置搜索
        reSearch() {
            this.result = [];
            this.hasMore = 0;
            this.isBusy = false;
            this.page = 1;
            this.$_ajax_hospital();
        },
        $_ajax_hospital() {
            this.isRequesting = false;
            if (!this.isInThisView()) {
                return;
            }
            this.isBusy = true;
            var keyword = this.$store.state.search.keyWord;
            var self = this;
            api
                .ajaxSearch("hospital", {
                    keyword,
                    page: self.page++
                })
                .then(res => {
                    console.log(res);
                    self.lastKeyword = res.data.keyword;
                    self.hasMore = res.data.hasMore;
                    if (res.data.hospital) {
                        self.result = self.result.concat(res.data.hospital);
                    }
                    Loading.stop();

                    this.isBusy = false;
                    this.isRequesting = true;
                    if (
                        document.querySelectorAll(".loading-mask") &&
                        document.querySelectorAll(".loading-mask").length > 0
                    ) {
                        document
                            .querySelectorAll(".loading-mask")
                            .forEach(element => {
                                element.parentNode.removeChild(element);
                            });
                    }
                })
                .catch(error => {
                    Loading.stop();
                    if (
                        document.querySelectorAll(".loading-mask") &&
                        document.querySelectorAll(".loading-mask").length > 0
                    ) {
                        document
                            .querySelectorAll(".loading-mask")
                            .forEach(element => {
                                element.parentNode.removeChild(element);
                            });
                    }
                });
        }
    },
    mounted() {
        Loading.run();
        this.reSearch();
        this.bus.$on("search", type => {
            if (type === -1) {
                Loading.run();
                this.reSearch();
            } else if (type === 2) {
                var keyword = this.$store.state.search.keyWord;
                if (keyword !== this.lastKeyword) {
                    Loading.run();
                    this.reSearch();
                }
            }
        });
    }
};
</script>
<style>
#product-item span {
    display: inline-block;
    background-color: #f5f5f5;
    color: #333;
    font-size: 0.24rem;
    border-radius: 999px;
    margin-right: 0.2rem;
    margin-bottom: 0.1rem;
}
</style>