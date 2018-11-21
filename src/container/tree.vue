<template>
    <div>
        <div v-for="(item,index) in model.child_component" :key="index">
            <component v-if="item.type != 0" :params="getParams(item.params)" :number=getNumber(item) :is="item.name"></component>
        </div>

        <div v-if="hasChild">
            <tree v-for="(item,index) in model.child_component" :key="index" v-bind:model="item" ></tree>
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
            return (
                this.model.child_component && this.model.child_component.length
            );
        }
    },
    methods: {
        getParams(data) {
            if (data) {
                return JSON.parse(data);
            }
            return "";
        },
        getNumber(data) {
            if (data.params) {
                if (JSON.parse(data.params).number)
                    return JSON.parse(data.params).number;
            }
            return "";
        },
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
