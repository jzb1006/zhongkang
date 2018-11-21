<template>
    <div id="FResource">
        <div class="resource" v-for="(resource,$index) in resources">
            <span @click="selectStyle(resource,resource.resource_area)" :class="{'f_active':checkresource == resource.resource_area}">
                {{resource.resource_name}}
            </span>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import api from "@/api/fang";
import Bus from "./../../assets/bus.js";
import Loading from "@/components/decorate/loading.vue";

export default {
    name: "FResource",
    props: {
        resources: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            treat_id: "",
            r_area: "",
            checkresource: null,
            loadinging: true
        };
    },
    watch: {
        resources(val, oldVal) {
            this.$_ajax_resource();
        }
    },
    methods: {
        $_ajax_resource: function() {
            var self = this;

            let check_ids = this.$store.state.fang.check_ids;

            for (let index in check_ids) {
                if (check_ids[index].num == 3) {
                    let id = check_ids[index].id;
                    for (let i in self.resources) {
                        if (self.resources[i].resource_area == id) {
                            this.$store.dispatch("Is_Sel", true);
                            self.checkresource = id;
                            this.addData(id);
                        }
                    }
                }
            }
        },
        selectStyle: function(resource, index) {
            this.checkresource = index;
            this.r_area = index;
            let arr = {
                num: 3,
                id: this.r_area
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);
            this.addData(index);
        },
        addData: function(id) {
            let arr = {
                page: 3,
                tid: this.treat_id,
                r_area: id
            };
            this.$store.dispatch("Content_Data", arr);
        }
    },
    components: {
        Loading
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "3");
        this.$store.dispatch("Content_Jump", "FBrand");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "2") {
                this.treat_id = contentData[index].tid;
            }
        }
        Bus.$emit("changeTitle", "选择产品来源");
    }
};
</script>

<style scoped>
#FResource {
    margin: 2rem 0;
}
#FResource .resource {
    margin: 0.3rem 0;
    text-align: center;
}
#FResource .resource span {
    display: inline-block;
    font-size: 0.3rem;
    width: 1.5rem;
    height: 1.5rem;
    line-height: 1.5rem;
    color: rgb(255, 83, 112);
    border: 1px solid #72dacf;
    border-radius: 50%;
}

#FResource .resource .f_active {
    background-color: rgb(255, 83, 112, 0.8);
    color: #000;
}
</style>
