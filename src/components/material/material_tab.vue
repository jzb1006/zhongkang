<template>
    <div id="material_tab">
        <button-tab>
            <button-tab-item @on-item-click="select_material_type" selected>
                <i class="zk-icon-all"></i>
            </button-tab-item>
            <button-tab-item @on-item-click="select_material_type">
                <i class="zk-icon-tupian"></i>
            </button-tab-item>
            <button-tab-item @on-item-click="select_material_type">
                <i class="zk-icon-icon-test"></i>
            </button-tab-item>
        </button-tab>
    </div>
</template>

<script>
import { ButtonTab, ButtonTabItem } from "vux";
export default {
    components: {
        ButtonTab,
        ButtonTabItem
    },
    methods: {
        select_material_type(index) {
            this.$emit("materialType",index);
        }
    }
};
</script>

<style>
#material_tab{
    padding: 0.1rem 0.1rem 0.2rem 0.1rem;
    height: 0.5rem;
    position: sticky;
    top: 0rem;
    z-index: 500;
}
#material_tab .vux-button-group {
    width: 3rem;
    float: right;
}
</style>
