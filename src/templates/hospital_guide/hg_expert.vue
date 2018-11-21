<template>
    <div id="nursing">
        <FBtn v-show="show_btn"></FBtn>
        <div>
            <p class="title">是否预定专家</p>
            <div class="container2">
                <div class=" border border-dark" :class="{f_active:checkexpert == 0}" @click="sel_expert(0,0)">
                    <p>不预定</p>$
                    <span>0</span>~$
                    <span>0</span>
                </div>
                <div class=" border border-dark" v-for="expert in expertList" v-if="pd_expert(expert)" :class="{f_active:checkexpert == expert.expert_id}" @click="sel_expert(expert,expert.expert_id)">
                    <p>预定</p>$
                    <span>{{expert.min_price}}</span>~$
                    <span>{{expert.max_price}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import FBtn from "@/components/hospital_guide/hg_see_acount";
import Bus from "@/assets/bus.js";
import api from "@/api/fang";
export default {
    name: "FExpert",
    props: {
        expertList: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tid: "",
            checkexpert: null,
            show_btn: false
        };
    },
    watch: {
        expertList(val, oldVal) {
            this.$_ajax_expert();
        }
    },
    methods: {
        $_ajax_expert: function() {
            var self = this;
            let tid = this.tid;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 8) {
                    let id = check_ids[index].id;
                    if (id == "0") {
                        this.sel_expert(0, 0);
                    } else {
                        for (let i in this.expertList) {
                            if (this.expertList[i].expert_id == id) {
                                this.$store.dispatch("Is_Sel", true);
                                this.checkexpert = id;
                                self.show_btn = true;
                            }
                        }
                    }
                }
            }
        },
        sel_expert: function(expert, index) {
            this.show_btn = true;
            this.checkexpert = index;
            let arr = {
                num: 8,
                id: index
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            if (index == "0") {
                let arr = {
                    num: 7,
                    id: 0,
                    name: "不预定专家",
                    min_price: 0,
                    max_price: 0
                };
                this.$store.dispatch("Price_Data", arr);
            } else {
                let arr1 = {
                    num: 7,
                    id: expert.expert_id,
                    name: "预定专家",
                    min_price: expert.min_price,
                    max_price: expert.max_price
                };
                this.$store.dispatch("Price_Data", arr1);
            }
        },
        pd_expert(expert) {
            if (expert.expert_id == null) {
                return false;
            } else {
                return true;
            }
        }
    },
    components: {
        FBtn
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "8");
        Bus.$emit("changeTitle", "预定专家");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "4") {
                this.tid = contentData[index].tid;
            }
        }
    }
};
</script>
<style scoped>
#nursing {
    margin: 2rem 0.3rem 0.3rem 0.3rem;
}
#nursing p.title {
    text-align: center;
    padding: 0.2rem 0;
    background-color: rgb(255, 83, 112);
    font-size: 0.35rem;
    color: #fff;
}
#nursing .container2 .border {
    margin: 0.2rem 0;
    padding: 0.2rem;
    font-size: 0.3rem;
    color: rgb(255, 83, 112);
    border-radius: 0.1rem;
    border: 1px solid #72dacf;
}
#nursing .container2 .border p {
    font-size: 0.31rem;
    padding: 0.1rem 0;
    color: #000;
}
</style>
