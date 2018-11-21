<template>
    <div>
        <hgProductT :productlist=productlist></hgProductT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgProductT from "@/templates/hospital_guide/hg_product";
import Loading from "@/components/decorate/loading.vue";

export default {
    components: {
        Loading,
        hgProductT
    },
    data() {
        return {
            brand_id: "",
            treat_id: "",
            r_area: "",
            productlist: {},
            loadinging: true
        };
    },
    methods: {
        $_ajax_product: function() {
            var brand_id = this.brand_id;
            var treat_id = this.treat_id;
            var r_area = this.r_area;
            var self = this;
            api
                .ajaxSearch("get_products", {
                    tid: treat_id,
                    bid: brand_id,
                    r_area: r_area
                })
                .then(res => {
                    self.productlist = res.data;
                    self.loadinging = false;
                    let check_ids = this.$store.state.fang.check_ids;
                    for (let index in check_ids) {
                        if (check_ids[index].num == 5) {
                            let id = check_ids[index].id;
                            for (let i in this.productlist) {
                                if (this.productlist[i].product_id == id) {
                                    this.$store.dispatch("Is_Sel", true);
                                    this.sel_num = id;
                                    this.addData(self.treat_id);
                                }
                            }
                        }
                    }
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "4") {
                this.treat_id = contentData[index].tid;
                this.brand_id = contentData[index].bid;
                this.r_area = contentData[index].r_area;
            }
        }
        this.$_ajax_product();
    }
};
</script>

<style>
</style>
