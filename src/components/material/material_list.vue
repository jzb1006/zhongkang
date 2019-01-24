<template>
    <div id="material">
        <materialTab v-if="parseInt(is_more)" @materialType=material_type></materialTab>
        <materialList1 v-if="isShow" :materiallist=materiallist :params=params></materialList1>
        <kong v-if="!isShow" text="素材为空"></kong>
        <Loading v-if="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="getData"></LoadMore>
    </div>
</template>

<script>
import bus from "@/assets/bus.js"
import apiM from "@/api/material/index.js";
import materialTab from "./material_tab";
import kong from "@/components/nosearch/kong.vue"
import materialList1 from "@/templates/material/material_list";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import noSearch from "@/components/nosearch/index.vue";
import { mixin } from "@/assets/js/mixins.js";
export default {
    name: "material1",
    mixins: [mixin],
    props:{
        insId:{
            default:""
        },
        docId:{
            default:""
        },
        type:{
            default:"public"
        }
    },
    components: {
        materialList1,
        Loading,
        LoadMore,
        materialTab,
        noSearch,
        kong
    },
    data() {
        return {
            isBusy: false,
            hasMore: 0,
            loadmore: true,
            loadinging: true,
            materiallist: [],
            page: 0,
            is_more: this.params["is_more"] || 1,
            pageList: this.params.number,
            isShow: true
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
                    type: this.type,
                    page: self.page,
                    pageList:self.pageList,
                    ins_id:this.insId,
                    doc_id:this.docId,
                    healthy_talk_id: self.healthy_talk_id
                })
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    self.materiallist = self.materiallist.concat(
                        res.data.material_list
                    );
                    if (self.materiallist.length == 0 || self.materiallist == false || res.data.diaryList == false) {
                        self.isShow = false;
                    }else{
                        self.isShow = true;
                    }
                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        }
    },
    mounted() {
        this.healthy_talk_id = "";
        this.getData();
        var self = this;
        // bus.$on('index_data_material_updata',res=>{
        //     self.materiallist = [];
        //     self.getData();
        // })
    }
};
</script>

<style>
</style>
