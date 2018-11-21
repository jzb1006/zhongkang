<template>
    <div>
        <hgHospitalT :bedList=bedList></hgHospitalT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import hgHospitalT from "@/templates/hospital_guide/hg_hospital";
import Loading from "@/components/decorate/loading.vue";

export default {
    components: {
        Loading,
        hgHospitalT
    },
    data() {
        return {
            tid: "",
            bedList: [],
            checknursing: null,
            loadinging: true
        };
    },
    methods: {
        $_ajax_hospital: function() {
            var treat_id = this.tid;
            var self = this;
            api
                .ajaxSearch("get_hospital", { tid: treat_id })
                .then(res => {
                    self.bedList = res.data;
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
        this.$_ajax_hospital();
    }
};
</script>

<style>
</style>
