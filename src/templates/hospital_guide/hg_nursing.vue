<template>
    <div id="nursing">
        <p class="title">选择护理方式</p>
        <div class="container2">
            <div class="border" @click="sel_nursing(0,0)" :class="{f_active:checknursing == 0}">
                <p>自身护理</p>$
                <span>0</span>~$
                <span>0</span>
            </div>
            <div class="border" v-for="(nursing,index) in nursingList" :key=index v-if="nursing" @click="sel_nursing(nursing,nursing.nursing_id)" :class="{f_active:checknursing == nursing.nursing_id}">
                <p>{{nursing.nursing_name}}</p>$
                <span>{{nursing.min_price}}</span>~$
                <span>{{nursing.max_price}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "./../../assets/bus.js";
export default {
    props: {
        nursingList: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            tid: "",
            checknursing: null
        };
    },
    watch: {
        nursingList(val, oldVal) {
            this.$_ajax_nursing();
        }
    },
    methods: {
        $_ajax_nursing: function() {
            var self = this;
            var treat_id = this.tid;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 6) {
                    let id = check_ids[index].id;
                    if (id == "0") {
                        this.$store.dispatch("Is_Sel", true);
                        this.checknursing = 0;
                    } else {
                        for (let i in this.nursingList) {
                            if (this.nursingList[i].nursing_id == id) {
                                this.$store.dispatch("Is_Sel", true);
                                this.checknursing = id;
                            }
                        }
                    }
                }
            }
        },
        sel_nursing: function(nursing, index) {
            this.checknursing = index;
            let arr = {
                num: 6,
                id: index
            };
            this.$store.dispatch("Check_Ids", arr);
            this.$store.dispatch("Is_Sel", true);

            if (index == 0) {
                let arr = {
                    num: 5,
                    id: 0,
                    name: "自身护理",
                    min_price: 0,
                    max_price: 0
                };
                this.$store.dispatch("Price_Data", arr);
            } else {
                let arr = {
                    num: 5,
                    id: nursing.nursing_id,
                    name: nursing.nursing_name,
                    min_price: nursing.min_price,
                    max_price: nursing.max_price
                };
                this.$store.dispatch("Price_Data", arr);
            }
        }
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "6");
        this.$store.dispatch("Content_Jump", "FHospital");

        let contentData = this.$store.state.fang.contentData;
        for (let index in contentData) {
            if (contentData[index].page == "4") {
                this.tid = contentData[index].tid;
            }
        }

        Bus.$emit("changeTitle", "选择护理方式");
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
