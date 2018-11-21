<template>
    <div>
        <hgItemT :itemlist=itemlist></hgItemT>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/fang";
import Loading from "@/components/decorate/loading.vue";
import hgItemT from "@/templates/hospital_guide/hg_item";
import { mapState } from "vuex";
export default {
    components: {
        hgItemT,
        Loading
    },
    data() {
        return {
            itemlist: [],
            cid: "",
            loadinging: true
        };
    },
    computed: {
        ...mapState(["pageOne"])
    },
    methods: {
        $_ajax_item() {
            var self = this;
            api.ajaxSearch("get_items").then(res => {
                for (let index in res.data) {
                    if (Object.keys(res.data[index].cat_id).length > 0) {
                        this.tree(res.data[index].cat_id);
                    } else {
                        self.itemlist = self.itemlist.concat(res.data[index]);
                    }
                }
                self.loadinging = false;
            });
        },
        tree(data) {
            for (let index in data) {
                if (Object.keys(data[index].cat_id).length > 0) {
                    this.tree(data[index].cat_id);
                } else {
                    this.itemlist = this.itemlist.concat(data[index]);
                }
            }
        }
    },
    mounted() {
        this.$_ajax_item();
    }
};
</script>

<style>
</style>
