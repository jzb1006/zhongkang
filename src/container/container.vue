<template>
    <div>
        <div v-for="(param,index) in params" v-dragging="{ item: param, list: params, group: 'color' }" :key="index" class="container">
            <my-tree :model="param"></my-tree>
        </div>
        <span @click="submitBtn">提交 </span>
    </div>
</template>
<script>
// import apiCommon from "@/api/common";
import mytree from "./tree";
import Vue from "vue";
export default {
    components: {
        "my-tree": mytree
    },
    data() {
        return {
            info: [],
            params: []
        };
    },
    methods: {
        //----排序：start----
        sort_asc() {
            this.params.sort(this.sortId);
        },
        sortId(a, b) {
            return a.rank - b.rank;
        },
        //----排序：end----

        getData() {
            var self = this;
            apiCommon
                .ajaxSearch("container", "container", { id: 1 })
                .then(res => {
                    console.log(res.data);
                    self.params = res.data.data;
                    this.sort_asc();
                });
        },
        submitBtn(data) {
            console.log(this.info);
            var self = this;
            apiCommon
                .ajaxSearch("container", "changeSite", { info: self.info })
                .then(res => {
                    console.log(res);
                });
        },
        change(data) {
            this.info = [];
            for (let index in data) {
                let da = {
                    rank: index,
                    id: data[index].id,
                    type: data[index].type
                };
                this.info.push(da);
            }
        }
    },
    mounted() {
        this.getData();
        this.$dragging.$on("dragged", ({ value }) => {
            this.change(value.list);
        });
        this.$dragging.$on("dragend", () => {});
    }
};
</script>
<style scoped>
.container {
    padding: 0.2rem;
    border-bottom: 0.15rem solid #f3f3f3;
}
</style>
