<template>
    <div>
        <div v-if="model.type == 0" v-for="(item,index) in model.child_component" :key="index">
            <component :params="getParams(item.params)" :number=getNumber(item) :is="item.name"></component>
        </div>

        <div v-if="model.type == 1">
            <tree v-for="(item,index) in model.child_component.child" :key="index" v-bind:model="item"></tree>
        </div>
    </div>
</template>

<script>
export default {
    name: "tree",
    props: ["model"],
    methods: {
        getParams(data) {
            if (data.trim()) {
                return JSON.parse(data);
            }
            return "";
        },
        getNumber(data) {
            if (data.params.trim()) {
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
