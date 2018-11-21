<template>
    <div id="doc_list">
        <!-- 头部 -->
        <searchBar :title="'机构'" :iconShow="true"></searchBar>
        <hospital :list="result"></hospital>
        <div id="fill"></div>
    </div>
</template>
<script>
import hospital from "@/components/hospital/list.vue";
import searchBar from "@/components/common/search_bar.vue";
export default {
    components: {
        hospital,
        searchBar,
    }
};
</script>
<style>

</style>