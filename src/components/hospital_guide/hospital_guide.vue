<template>
    <div id="Fmain">
        <hgHeader></hgHeader>
        <hgItem v-if="page == '1'"></hgItem>
        <hgTreatMethods v-if="page == '2'"></hgTreatMethods>
        <hgResource v-if="page == '3'"></hgResource>
        <hgBrand v-if="page == '4'"></hgBrand>
        <hgProduct v-if="page == '5'"></hgProduct>
        <hgNursing v-if="page == '6'"></hgNursing>
        <hgHospital v-if="page == '7'"></hgHospital>
        <hgExpert v-if="page == '8'"></hgExpert>
        <hgFooter @changePage=changePage></hgFooter>
    </div>
</template>

<script>
import Bus from "./../../assets/bus.js";
export default {
    name: "FMain",
    data() {
        return {
            page: "1"
        };
    },
    methods: {
        changePage(data) {
            this.page = data;
        }
    },
    mounted() {
        Bus.$on("Content_Type", res => {
            this.page = res;
        });
    }
};
</script>
<style>
.f_active {
    color: #000;
    border: 1px solid #000 !important;
}
</style>
