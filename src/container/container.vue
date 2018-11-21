<template>
    <div>
        <carousel></carousel>
        <div v-if="params.child" v-for="(param,index) in params.child" :key="index" :class="{container:is_need()}">
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
            if (this.$route.query.name == "home_page") {
                this.get_homepage();
            } else if (this.$route.query.name == "person_container") {
                this.getMyInfo();
            } else if (this.$route.query.id) {
                this.getData(this.$route.query.id);
            } else {
                this.get_homepage();
            }
        },
        params(val, oldVal) {
            this.params = val;
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
            let data = this.params.child;
            data.sort(this.sortId);
        },
        sortId(a, b) {
            return a.rank - b.rank;
        },
        //----排序：end----
        get_homepage() {
            var self = this;
            apiCommon.ajaxSearch("container", "home_container").then(res => {
                self.params = res.data.data;
                self.sort_asc();
            });
        },
        getData(id) {
            var self = this;
            apiCommon
                .ajaxSearch("container", "container", { id: id })
                .then(res => {
                    if (res.data.data.container_info != null) {
                        self.params = res.data.data;
                        self.sort_asc();
                    } else {
                        this.$router.back(-1);
                    }
                });
        },
        getMyInfo() {
            var self = this;
            apiCommon.ajaxSearch("container", "person_container").then(res => {
                self.params = res.data.data;
                this.sort_asc();
            });
        }
    },
    mounted() {
        if (this.$route.query.name == "home_page") {
            this.get_homepage();
        } else if (this.$route.query.name == "person_container") {
            this.getMyInfo();
        } else if (this.$route.query.id) {
            this.getData(this.$route.query.id);
        } else {
            this.get_homepage();
            // this.$router.back(-1);
        }
    }
};
</script>
<style scoped>
.container {
    border-bottom: 0.15rem solid #f3f3f3;
}
</style>
