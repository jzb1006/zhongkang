<template>
    <div id="diarySelItem" v-show="status">
        <p class="sel_ok clearfix">
            <span class="submit" @click="sel_Ok()">OK</span>
        </p>
        <div class="items">
            <span v-if="choose.length > 0">已选项目：</span>
            <span v-for="ch in choose" @click="sel_item3(ch.id)">{{ch.name}}</span>
            <span v-if="choose.length <= 0">请至少选择一个项目 </span>
        </div>
        <div class="show_sel clearfix ">
            <div class="col_4 show_items">
                <ul class="sel_item">
                    <li v-for="item in itemList" v-if="item.parent_id == 0" @click="sel_item1(item.id,item.is_aesthetic_custom)" :class="{item1_selected:item.id == item1}">{{item.name}}</li>
                </ul>
            </div>
            <div class="col_8 show_items2">
                <ul class="sel">
                    <li v-for="item in itemList" v-show="item1 == item.id">
                        <div v-for="item2 in item.cat_id">
                            <p class="md">{{item2.name}}</p>
                            <p class="bottom">
                                <span v-for="item3 in item2.cat_id" class="detail_btn" :class="{detail_selected:duoxuan(item3.id)}" @click="sel_item3(item3.id,item3.name)">{{item3.name}}</span>
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import Bus from "@/assets/bus.js";
import api from "@/api/diary";
export default {
    name:"diary_sel_item",
    props: {
        itemList1: {
            default: function() {
                return [];
            }
        },
        itemList: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            clientHeight: "",
            status: false,
            // itemList: [],
            item1: "",
            item3: "",
            choose: this.itemList1,
            is_aesthetic_custom: 0,
            aesthetic_status: true
        };
    },
    watch: {
        choose(val, oldVal) {
            this.aesthetic_status = true;
            if (val.length > 0) {
                for (let index in val) {
                    this.queryItem(this.itemList, val[index].id);
                }
            } else {
                this.$store.dispatch("Save_Aesthetic_Status",false)
                // Bus.$emit("changeAestheticStatus", false);
                this.is_aesthetic_custom = 0;
            }
        },
        // itemList1(val, oldVal) {
        //     this.aesthetic_status = true;
        //     if (val.length > 0) {
        //         for (let index in val) {
        //             this.queryItem(this.itemList, val[index].id);
        //         }
        //     } else {
        //         this.$store.dispatch("Save_Aesthetic_Status",false)
        //         // Bus.$emit("changeAestheticStatus", false);
        //         this.is_aesthetic_custom = 0;
        //     }
        // }
    },
    methods: {
        queryItem(items, id) {
            for (let index in items) {
                if (items[index].id == id) {
                    if (
                        items[index].parent_id == 0 &&
                        items[index].is_aesthetic_custom == 1
                    ) {
                        this.aesthetic_status = false;
                        this.is_aesthetic_custom = 1;
                        this.$store.dispatch("Save_Aesthetic_Status",true)
                        // Bus.$emit("changeAestheticStatus", true);
                        return true;
                    } else if (
                        items[index].parent_id == 0 &&
                        items[index].is_aesthetic_custom == 0
                    ) {
                        if (this.aesthetic_status) {
                            this.is_aesthetic_custom = 0;
                            this.$store.dispatch("Save_Aesthetic_Status",false)
                            // Bus.$emit("changeAestheticStatus", false);
                        }
                        return false;
                    } else {
                        this.queryItem(this.itemList, items[index].parent_id);
                    }
                } else {
                    if (Object.keys(items[index].cat_id).length > 0) {
                        this.queryItem(items[index].cat_id, id);
                    }
                }
            }
        },
        close() {
            this.status = false;
        },
        $_ajax_getItem() {
            var self = this;
            api.ajaxSearch("diary_create_basic").then(res => {
                self.itemList = res.data;
            });
        },
        sel_item1(data, is_aesthetic_custom) {
            this.item1 = data;
        },
        sel_item3(id, name) {
            var self = this;
            if (this.choose.length <= 0) {
                let arr = {
                    id: id,
                    name: name,
                    is_aesthetic_custom: self.is_aesthetic_custom
                };
                this.choose.push(arr);
            } else {
                for (let index in this.choose) {
                    if (this.choose[index].id == id) {
                        this.choose.splice(index, 1);
                        return;
                    }
                }
                let arr = {
                    id: id,
                    name: name,
                    is_aesthetic_custom: self.is_aesthetic_custom
                };
                this.choose.push(arr);
            }
        },
        duoxuan(data) {
            for (let index in this.choose) {
                if (this.choose[index].id == data) {
                    return true;
                }
            }
            return false;
        },
        sel_Ok() {
            this.status = false;
            Bus.$emit("toItem", this.choose);
        }
    },
    mounted() {
        // this.$_ajax_getItem();
        Bus.$on("changeSelItem", res => {
            this.status = res;
        });

        Bus.$on("initItem", res => {
            this.choose = res;
            this.duoxuan();
            this.sel_Ok();
        });
    }
};
</script>
<style scoped>
.col_4 {
    width: 22%;
}
.col_8 {
    width: 73%;
}
.detail_btn {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.1rem 0.2rem;
    margin-right: 0.2rem;
    color: #aaa;
    border-right: 1px solid #ccc;
}

.detail_selected {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.1rem 0.2rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    color: #17a2b8;
}

#diarySelItem {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    height: 8rem;
    overflow: hidden;
    background-color: #fff;
}
#diarySelItem > div {
    height: 100%;
}
#diarySelItem .sel_ok {
    color: #000;
    font-size: 0.35rem;
    text-align: center;
    padding: 0.3rem;
}
#diarySelItem .sel_ok .badge_l {
    float: left;
}
#diarySelItem .sel_ok .submit {
    float: right;
}

.active {
    background-color: #17a2b8 !important;
}
#diarySelItem p.title {
    padding: 0.2rem 0;
    font-size: 0.4rem;
}
#diarySelItem span.tip {
    color: #fff;
}
#diarySelItem .items {
    padding: 0 0.2rem;
    font-size: 0.3rem;
    height: 0.4rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
#diarySelItem .items span {
    display: inline-block;
    margin-right: 0.3rem;
    padding: 0.1rem 0;
    color: #17a2b8;
}
#diarySelItem .show_sel {
    margin-top: 0.3rem;
}
#diarySelItem .show_items {
    float: left;
    height: 8rem;
}
#diarySelItem .show_items2 {
    float: right;
    height: 8rem;
}
#diarySelItem ul.sel_item {
    text-align: center;
    list-style: none;
    font-size: 0.3rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    height: 80%;
    overflow-y: scroll;
}
#diarySelItem ul.sel_item > li {
    overflow: hidden;
    padding: 0.3rem 0;
    background-color: #f0f0f0;
}
#diarySelItem ul.sel_item > li.item1_selected {
    background-color: #fff;
}
#diarySelItem ul.sel {
    list-style: none;
    font-size: 0.3rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    height: 80%;
    overflow-y: scroll;
}
ul.sel > li > div {
    margin-bottom: 0.3rem;
    padding: 0 15px;
}
p.md {
    font-size: 0.25rem;
    font-weight: 550;
    padding: 0.2rem 0.1rem 0;
    margin-bottom: 0.2rem;
}
</style>
