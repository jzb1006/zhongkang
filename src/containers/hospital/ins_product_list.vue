<template>
    <div id="doc_list">
        <top :title="'商品列表'"></top>
        <product></product>
    </div>
</template>
<script>
    import top from "@/components/decorate/top_back_title.vue";
    import product from "@/components/hospital/ins_product_list.vue";
    export default {
        components: {
            top,
            product
        },
    }
</script>
<style>
</style>