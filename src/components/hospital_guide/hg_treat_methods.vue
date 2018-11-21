<template>
    <div>
        <hgTreatMethodsT :treatlist=treatlist></hgTreatMethodsT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import Loading from "@/components/decorate/loading.vue";
import hgTreatMethodsT from "@/templates/hospital_guide/hg_treat_methods";
export default {
    components: {
        hgTreatMethodsT,
        Loading
    },
    data() {
        return {
            treatlist: {},
            cid:"",
            loadinging: true
        };
    },
    methods: {
        $_ajax_treat: function() {
            var self = this;
            var cid = this.cid;
            api
                .ajaxSearch("get_treat_methods", { cid: cid })
                .then(res => {
                    self.treatlist = res.data;
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
            if (contentData[index].page == "1") {
                this.cid = contentData[index].cid;
            }
        }
        this.$_ajax_treat();
    }
};
</script>

<style>
</style>
