<template>
    <div>
        <hgResourceT :resources=resources></hgResourceT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgResourceT from "@/templates/hospital_guide/hg_resource";
import Loading from "@/components/decorate/loading.vue";

export default {
    components: {
        hgResourceT,
        Loading
    },
    data() {
        return {
            resources: [],
            treat_id: "",
            loadinging: true
        };
    },
    methods: {
        $_ajax_resource: function() {
            var self = this;
            let treat_id = this.treat_id;
            api
                .ajaxSearch("get_resources", { tid: treat_id })
                .then(res => {
                    self.resources = res.data;
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
            if (contentData[index].page == "2") {
                this.treat_id = contentData[index].tid;
            }
        }
        this.$_ajax_resource();
    }
};
</script>

<style>
</style>
