<template>
    <div>
        <hgBrandT :brandlist=brandlist></hgBrandT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgBrandT from "@/templates/hospital_guide/hg_brand";
import Loading from "@/components/decorate/loading.vue";
export default {
    data() {
        return {
            treat_id: "",
            r_area: "",
            brandlist: {},
            checkbrand: null,
            loadinging: true
        };
    },
    components: {
        Loading,
        hgBrandT
    },
    methods: {
        $_ajax_brand: function() {
            var self = this;
            var treat_id = this.treat_id;
            var r_area = this.r_area;
            api
                .ajaxSearch("get_brands", { tid: treat_id, r_area: r_area })
                .then(res => {
                    self.brandlist = res.data;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "3") {
                this.treat_id = contentData[index].tid;
                this.r_area = contentData[index].r_area;
            }
        }
        this.$_ajax_brand();
    }
};
</script>

<style>
</style>
