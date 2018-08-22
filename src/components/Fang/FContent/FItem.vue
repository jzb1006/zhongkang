<template>
    <div id="FItem">
        <ul class="ol_list">
            <li class="ol_li" v-for="(item, $index) in itemlist" @click="selectStyle (item, item.id) " :class="{'f_active':check_item == item.id}">
                <p class="name">{{item.name}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import Vue from "vue";
import api from "./../../../api/fang";
import Bus from "./../../../assets/bus.js";
import Loading from "./../../Fang/../../widget/loading";
import { mapState } from "vuex";

export default {
    name: "FItem",
    data() {
        return {
            check_item: null,
            f_active: false,
            itemlist: [],
            cid: ""
        };
    },
    computed: {
        ...mapState(["pageOne"])
    },
    methods: {
        $_ajax_item: function() {
            var keyword = "";
            var self = this;
            api.ajaxSearch("get_items").then(res => {
                for(let index in res.data){ 
                    if(Object.keys(res.data[index].cat_id).length > 0){
                        this.tree(res.data[index].cat_id);
                    }else{
                        self.itemlist = self.itemlist.concat(res.data[index]);
                    }
                }

                Loading.stop();
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
            });
        },
        selectStyle: function(item, index) {
            this.check_item = index;
            // this.$store.dispatch('Content_Type',true);
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
                cid: id
            };
            this.$store.dispatch("Content_Data", arr);
        },
        tree(data){
            for(let index in data){ 
                if(Object.keys(data[index].cat_id).length > 0){
                    this.tree(data[index].cat_id);
                }else{
                    this.itemlist = this.itemlist.concat(data[index]);
                }
            }
        }
    },
    computed: {},
    mounted() {
        Loading.run();
        this.$store.dispatch("Is_Sel", false);
        Bus.$emit("Content_Type", "1");
        this.$store.dispatch("Content_Jump", "/FMain/FTreatMethods");
        Bus.$emit("changeTitle", "选择项目");
        this.$_ajax_item();
        let check_ids = this.$store.state.fang.check_ids;
        for (let index in check_ids) {
            if (check_ids[index].num == 1) {
                this.check_item = check_ids[index].id;
                this.$store.dispatch("Is_Sel", true);
            }
        }
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
    padding: 0.5rem 0.4rem;
    border-radius: 0.3rem;
    border: 1px solid #72dacf;
}
#FItem .ol_list .ol_li p.name {
    font-size: 0.35rem;
    font-weight: 550;
}
</style>


