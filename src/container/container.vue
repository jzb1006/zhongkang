<template>
    <div>
        <div v-for="(param,index) in params.child" :key="index" :class="{container:is_need()}">
            <my-tree :model="param"></my-tree>
        </div>
    </div>
</template>
<script>
import apiCommon from "@/api/common";
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
    watch: {
        $route() {
            if (this.$route.query.id) {
                this.getData(this.$route.query.id);
            }else{
                this.get_homepage();
            }
        }
    },
    methods: {
        is_need() {
            if (this.params.length > 1) {
                return true;
            } else {
                return false;
            }
        },
        //----排序：start----
        sort_asc() {
            this.params.sort(this.sortId);
        },
        sortId(a, b) {
            return a.rank - b.rank;
        },
        //----排序：end----
        get_homepage(){
            var self = this;
            apiCommon
                .ajaxSearch("container", "home_container")
                .then(res => {
                    console.log(res);
                    self.params = res.data.data;
                    this.sort_asc();
                });
        },
        getData(id) {
            var self = this;
            apiCommon
                .ajaxSearch("container", "container", { id: id })
                .then(res => {
                    self.params = res.data.data;
                    this.sort_asc();
                });
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.getData(this.$route.query.id);
        }else{
            this.get_homepage();
        }
    }
};
</script>
<style scoped>
.container {
    border-bottom: 0.15rem solid #f3f3f3;
}
</style>
