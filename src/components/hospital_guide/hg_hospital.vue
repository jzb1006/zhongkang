<template>
    <div id="hospital">
        <p class="title">选择病床类型</p>
        <div class="container2">
            <div class="border" v-for="bed in bedList" v-if="bed" :class="{f_active:checkhospital == bed.bed_type}" @click="sel_bed(bed,bed.bed_type)">
                <p>{{bed.bed_name}}</p>
                $
                <span>{{bed.min_price}}</span>~$
                <span>{{bed.max_price}}</span>
            </div>
            <div class="border" :class="{f_active:checkhospital == 0}" v-else @click="sel_bed(0,0)">
                <p>不用住院</p>
            </div>
        </div>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import Bus from "./../../assets/bus.js";
import api from "@/api/fang";
import Loading from "@/components/decorate/loading.vue";

export default {
    data() {
        return {
            tid: "",
            bedList: [],
            checkhospital: null,
            loadinging: true
        };
    },
    methods: {
        $_ajax_hospital: function() {
            var self = this;
            let tid = this.tid;
            api
                .ajaxSearch("get_hospital", { tid: tid })
                .then(res => {
                    self.bedList = res.data;
                    self.loadinging = false;
                    let check_ids = this.$store.state.fang.check_ids;
                    for (let index in check_ids) {
                        if (check_ids[index].num == 7) {
                            let id = check_ids[index].id;
                            if (id == 0) {
                                this.$store.dispatch("Is_Sel", true);
                                this.checkhospital = 0;
                            } else {
                                for (let i in this.bedList) {
                                    if (this.bedList[i].bed_type == id) {
                                        this.$store.dispatch("Is_Sel", true);
                                        this.checkhospital = id;
                                    }
                                }
                            }
                        }
                    }
                })
                .catch(error => {
                    self.loadinging = false;
                });
        },
        sel_bed: function(bed, index) {
            this.checkhospital = index;
            let arr = {
                num: 7,
                id: index
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            if (index == "0") {
                let arr = {
                    num: 6,
                    id: bed.in_hospital_id,
                    name: "住院（不住院）",
                    min_price: 0,
                    max_price: 0
                };
                this.$store.dispatch("Price_Data", arr);
            } else {
                let arr = {
                    num: 6,
                    id: bed.in_hospital_id,
                    name: bed.bed_name,
                    min_price: bed.min_price,
                    max_price: bed.max_price
                };
                this.$store.dispatch("Price_Data", arr);
            }
        }
    },
    components: {
        Loading
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "7");
        // this.$store.dispatch("Content_Jump", "/FMain/FOther/FExpert");

        this.$store.dispatch("Content_Jump", "FExpert");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "4") {
                this.tid = contentData[index].tid;
            }
        }
        // this.tid = contentData.tid;

        Bus.$emit("changeTitle", "选择病房");
        // this.tid = this.$route.query.tid;
        this.$_ajax_hospital();
    }
};
</script>


<style scoped>
#hospital {
    margin: 2rem 0.3rem 0.3rem 0.3rem;
}
#hospital p.title {
    text-align: center;
    padding: 0.2rem 0;
    background-color: rgb(255, 83, 112);
    font-size: 0.35rem;
    color: #fff;
}
#hospital .container2 .border {
    margin: 0.2rem 0;
    padding: 0.2rem;
    font-size: 0.3rem;
    color: rgb(255, 83, 112);
    border-radius: 0.1rem;
    border: 1px solid #72dacf;
}
#hospital .container2 .border p {
    font-size: 0.31rem;
    padding: 0.1rem 0;
    color: #000;
}
</style>