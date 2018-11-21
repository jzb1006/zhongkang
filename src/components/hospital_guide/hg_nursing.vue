<template>
    <div>
        <hgNursingT :nursingList=nursingList></hgNursingT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgNursingT from "@/templates/hospital_guide/hg_nursing";
import Loading from "@/components/decorate/loading.vue";

export default {
    components: {
        Loading,
        hgNursingT
    },
    data() {
        return {
            tid: "",
            nursingList: [],
            checknursing: null,
            loadinging: true
        };
    },
    methods: {
        $_ajax_nursing: function() {
            var treat_id = this.tid;
            var self = this;
            api
                .ajaxSearch("get_nursing", { tid: treat_id })
                .then(res => {
                    self.nursingList = res.data;
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
        this.$_ajax_nursing();
    }
};
</script>

<style>
</style>
