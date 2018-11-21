<template>
    <div id="material">
        <materialTab v-show="loadmore" @materialType=material_type></materialTab>
        <materialList1 :materiallist=materiallist :params=params></materialList1>
        <Loading v-if="loadinging"></Loading>
        <LoadMore v-if="loadmore" :state='hasMore' :isLoading='isBusy' @loadmore="getData"></LoadMore>
    </div>
</template>

<script>
import apiM from "@/api/material/index.js";
import materialTab from "./material_tab";
import materialList1 from "@/templates/material/material_list";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins.js";
export default {
    name: "material1",
    mixins: [mixin],
    components: {
        materialList1,
        Loading,
        LoadMore,
        materialTab
    },
    data() {
        return {
            isBusy: false,
            hasMore: 0,
            loadmore: true,
            loadinging: true,
            materiallist: [],
            page: 0
        };
    },
    methods: {
        material_type(index) {
            this.page = 0;
            this.materiallist = [];
            if (index == 0) {
                this.condition = "";
            } else if (index == 1) {
                this.condition = "3";
            } else {
                this.condition = "2";
            }
            this.getData();
        },
        getData() {
            var self = this;
            this.isBusy = true;
            this.healthy_talk_id = this.$route.query.healthy_talk_id;
            self.page = self.page + 1;
            apiM
                .act_material("material_list", {
                    condition: this.condition,
                    type: "public",
                    page: self.page,
                    healthy_talk_id: self.healthy_talk_id
                })
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.materiallist = self.materiallist.concat(
                        res.data.material_list
                    );
                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        this.getData();
        if (this.params.hasOwnProperty("number") && this.params.number.length > 0) {
            this.loadmore = false;
        }
    }
};
</script>

<style>
</style>
