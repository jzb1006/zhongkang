<template>
    <div>
        <div v-for="(item,index) in model.child_component" :key="index">
            <component v-if="item.type != 0" :is="item.name" :params="item.params"></component>
        </div>
        
        <div v-if="hasChild">
            <tree v-for="(item,index) in model.child_component" :key="index" v-bind:model="item" v-bind:key="index"></tree>
        </div>
    </div>
</template>

<script>
export default {
    name: "tree",
    props: ["model"],
    computed: {
        hasChild() {
            this.sort_asc();
            return this.model.child_component && this.model.child_component.length;
        }
    },
    methods: {
        sort_asc() {
            if (this.model.child_component) {
                this.model.child_component.sort(this.sortId);
            }
        },
        sortId(a, b) {
            return a.rank - b.rank;
        }
    }
};
</script>

<style>
</style>
