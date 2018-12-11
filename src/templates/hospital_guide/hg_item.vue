<template>
    <div id="FItem">
        <ul class="ol_list">
            <li class="ol_li" v-for="(item, $index) in itemlist" :key=$index @click="selectStyle (item, item.id) " :class="{'f_active':check_item == item.id}">
                <p class="name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import api from "@/api/fang";
import Bus from "./../../assets/bus.js";
import { mapState } from "vuex";

export default {
    name: "FItem",
    props: {
        itemlist: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            check_item: 0,
            f_active: false,
            cid: "",
        };
    },
    computed: {
        ...mapState(["pageOne"])
    },
    methods: {
        $_ajax_item: function() {
            var keyword = "";
            var self = this;
            let check_ids = this.$store.state.fang.check_ids;
            for (let index in check_ids) {
                if (check_ids[index].num == 1) {
                    let id = check_ids[index].cat_id;
                    for (let val in self.itemlist) {
                        if (self.itemlist[val].id == id) {
                            self.check_item = id;
                            this.addData(id);
                        }
                    }
                }
            }
        },
        selectStyle: function(item, index) {
            this.check_item = index;
            this.$store.dispatch("Is_Sel", true);
            this.cid = index;
            let arr = {
                num: 1,
                cat_id: this.cid
            };
            this.$store.dispatch("Check_Ids", arr);
            this.addData(index);
        },
        addData: function(id) {
            let arr = {
                page: "1",
                cid: id
            };
            this.$store.dispatch("Content_Data", arr);
        }
    },
    mounted() {
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "1");
        this.$store.dispatch("Content_Jump", "hgTreat");
        Bus.$emit("changeTitle", "选择项目");
        this.$_ajax_item();
        let check_ids = this.$store.state.fang.check_ids;
        for (let index in check_ids) {
            if (check_ids[index].num == 1) {
                this.check_item = check_ids[index].cat_id;
                this.$store.dispatch("Is_Sel", true);
            }
        }

        this.$emit("jumpNext", "hgTreat");
        this.$emit("changeTitle", "选择项目");
        this.$emit("getPage", "hgItem");
    }
};
</script>

<style scoped>
#FItem {
    margin: 2rem 0;
    padding: 0.1rem 0.3rem;
}
#FItem .ol_list {
    padding: 0;
}
#FItem .ol_list .ol_li {
    margin-bottom: 0.2rem;
    padding: 0.3rem 0.4rem;
    border-radius: 0.1rem;
    border: 1px solid #72dacf;
}
#FItem .ol_list .ol_li p.name {
    font-size: 0.3rem;
    font-weight: 550;
}
</style>


