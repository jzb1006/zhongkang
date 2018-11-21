<template>
    <div>
        <hgExpertT :expertList=expertList></hgExpertT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgExpertT from "@/templates/hospital_guide/hg_expert";
import Loading from "@/components/decorate/loading.vue";

export default {
    components: {
        Loading,
        hgExpertT
    },
    data() {
        return {
            tid: "",
            expertList: [],
            loadinging: true
        };
    },
    methods: {
        $_ajax_expert: function() {
            var treat_id = this.tid;
            var self = this;
            api
                .ajaxSearch("get_expert", { tid: treat_id })
                .then(res => {
                    self.expertList = res.data;
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
            if (contentData[index].page == "4") {
                this.tid = contentData[index].tid;
            }
        }
        this.$_ajax_expert();
    }
};
</script>

<style>
</style>
