<template>
    <div id="FTreatMethods">
        <ul class="ol_list">
            <li class="ol_li" v-for="(treat,$index) in treatlist.treat_method" :key=$index :class="{'f_active':check_treat == treat.treat_id}" @click="selectStyle(treat,treat.treat_id)">
                <p class="name">{{treat.treat_name}}</p>
                <p class="introduce">
                    {{treat.treat_introduce}}
                    <div class="clearfix">
                        <button type="button" class="btn_d" @click="show_detail(treat.treat_id)">详情</button>
                    </div>
                    <div v-html="treat.treat_detail" class="detail border border-dark p-2" v-show="'c_'+treat.treat_id == check_detail">
                        {{treat.treat_detail}}
                    </div>
            </li>
        </ul>
        <!-- <Loading v-show="loadinging"></Loading> -->
    </div>
</template>

<script>
import Vue from "vue";
import api from "@/api/fang";
import Bus from "@/assets/bus.js";
import Loading from "@/components/decorate/loading.vue";
import { mapState, mapActions } from "vuex";
export default {
    name: "treat_method",
    props: {
        treatlist: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            check_treat: null,
            isshow: true,
            cid: "",
            tid: "",
            // treatlist: {},
            check_detail: "",
            loadinging: true
        };
    },
    watch: {
        treatlist(val, oldVal) {
            this.$_ajax_treat();
        }
    },
    methods: {
        $_ajax_treat: function() {
            var self = this;
            var cid = this.cid;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 2) {
                    let id = check_ids[index].id;
                    for (let i in self.treatlist.treat_method) {
                        if (self.treatlist.treat_method[i].treat_id == id) {
                            this.$store.dispatch("Is_Sel", true);
                            self.check_treat = id;
                            this.addData(this.treatlist.treat_method[i], id);
                        }
                    }
                }
            }
        },
        selectStyle: function(treat, index) {
            this.tid = index;
            let arr = {
                num: 2,
                id: this.tid
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            this.addData(treat, index);
        },
        addData: function(treat, index) {
            this.check_treat = index;
            if (treat.have_product == 0) {
                let arr = {
                    num: 1,
                    id: treat.treat_id,
                    name: treat.treat_name,
                    min_price: treat.min_price,
                    max_price: treat.max_price
                };

                this.$store.dispatch("Price_Data", arr);
                this.$store.dispatch("Content_Jump", "FNursing");
            } else {
                this.$store.dispatch("Content_Jump", "FResourse");
            }

            if (treat.is_anaesthesia != "0") {
                let arr1 = {
                    num: 2,
                    id: this.treatlist.anaesthesia[index].anaesthesia_id,
                    name: this.treatlist.anaesthesia[index].anaesthesia_name,
                    min_price: this.treatlist.anaesthesia[index].min_price,
                    max_price: this.treatlist.anaesthesia[index].max_price
                };
                this.$store.dispatch("Price_Data", arr1);
            }

            if (treat.is_examination != "0") {
                let name = "术前检查";
                let arr2 = {
                    num: 3,
                    id: this.treatlist.examination[index].examination_id,
                    name: name,
                    min_price: this.treatlist.examination[index].min_price,
                    max_price: this.treatlist.examination[index].max_price
                };
                this.$store.dispatch("Price_Data", arr2);
            }

            let arr = {
                page: 2,
                tid: index,
                cid: this.cid
            };
            this.$store.dispatch("Content_Data", arr);

            if (treat.have_product == "0") {
                this.$store.dispatch("Content_Jump", "FNursing");
            }
        },
        show_detail(id) {
            this.check_detail = "c_" + id;
        }
    },
    components: {
        Loading
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "2");
        let contentData = this.$store.state.fang.contentData;

        for (let index in contentData) {
            if (contentData[index].page == "1") {
                this.cid = contentData[index].cid;
            }
        }

        Bus.$emit("changeTitle", "选择治疗方法");
        // this.$emit("getPage", "FTreatMethods");
    }
};
</script>

<style scoped>
#FTreatMethods {
    margin: 2rem 0;
    padding: 0.1rem 0.3rem;
}
#FTreatMethods .ol_list {
    padding: 0;
}
#FTreatMethods .ol_list .ol_li {
    padding: 0.1rem 0.2rem;
    margin: 0.2rem 0;
    border: 1px solid #fff;
    border-bottom: 1px solid #72dacf;
    border-radius: 0.1rem;
}
#FTreatMethods .ol_list .ol_li p.name {
    font-size: 0.31rem;
    font-weight: 550;
}
#FTreatMethods .ol_list .ol_li p.introduce {
    margin-top: 0.2rem;
    font-size: 0.3rem;
    line-height: 0.4rem;
}
#FTreatMethods .ol_list .ol_li .btn_d {
    float: right;
    font-size: 0.28rem;
    padding: 0.1rem 0.2rem;
    border-radius: 0.2rem;
    border: 1px solid #ddf;
    z-index: 1;
}
#FTreatMethods .ol_list .ol_li div.detail {
    font-size: 0.3rem;
    margin-top: 0.1rem;
    padding: 0.1rem;
    line-height: 0.4rem;
    border: 1px solid #c7c1c1;
    border-radius: 0.1rem;
    box-shadow: 0 0 6px #ccc;
}
</style>


