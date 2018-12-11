<template>
    <div id="diary_sel_item" v-show="status">
        <p class="sel_ok clearfix">
            <span class="submit" @click="sel_Ok()">OK</span>
        </p>
        <div class="items">
            <span v-if="choose.length > 0">已选项目：</span>
            <span v-for="(ch,index) in choose" :key="index" @click="sel_item3(ch.id)">{{ch.name}}</span>
            <span v-if="choose.length <= 0">请至少选择一个项目{{is_aesthetic_custom}} </span>
        </div>
        <div class="show_sel clearfix ">
            <div class="col_4 show_items">
                <ul class="sel_item">
                    <li v-for="(item,index) in itemList" :key="index" v-if="item.parent_id == 0" @click="sel_item1(item.id,item.is_aesthetic_custom)" :class="{item1_selected:item.id == item1}">{{item.name}}</li>
                </ul>
            </div>
            <div class="col_8 show_items2">
                <ul class="sel">
                    <li v-for="(item,index) in itemList" :key="index" v-show="item1 == item.id">
                        <div v-for="(item2,index) in item.cat_id" :key="index">
                            <p class="md">{{item2.name}}</p>
                            <p class="bottom">
                                <span v-for="item3 in item2.cat_id" :key="index" class="detail_btn" :class="{detail_selected:duoxuan(item3.id)}" @click="sel_item3(item3.id,item3.name)">{{item3.name}}</span>
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
    name:'diary_sel_item',
    props: {
        itemList1: {
            default: function() {
                return [];
            }
        }
    },
    data() {
        return {
            clientHeight: "",
            status: false,
            itemList: [],
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
                this.$store.dispatch("Save_Aesthetic_Status", false);
                this.is_aesthetic_custom = 0;
            }
        }
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
                        this.$store.dispatch("Save_Aesthetic_Status", true);
                        return true;
                    } else if (
                        items[index].parent_id == 0 &&
                        items[index].is_aesthetic_custom == 0
                    ) {
                        if (this.aesthetic_status) {
                            this.is_aesthetic_custom = 0;
                            this.$store.dispatch(
                                "Save_Aesthetic_Status",
                                false
                            );
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
            // this.is_aesthetic_custom = is_aesthetic_custom;
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
        this.$_ajax_getItem();
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

#diary_sel_item {
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1111;
    height: 8rem;
    overflow: hidden;
    background-color: #fff;
}
#diary_sel_item > div {
    height: 100%;
}
#diary_sel_item .sel_ok {
    color: #000;
    font-size: 0.35rem;
    text-align: center;
    padding: 0.3rem;
}
#diary_sel_item .sel_ok .badge_l {
    float: left;
}
#diary_sel_item .sel_ok .submit {
    float: right;
}

.active {
    background-color: #17a2b8 !important;
}
#diary_sel_item p.title {
    padding: 0.2rem 0;
    font-size: 0.4rem;
}
#diary_sel_item span.tip {
    color: #fff;
}
#diary_sel_item .items {
    padding: 0 0.2rem;
    font-size: 0.3rem;
    height: 0.4rem;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
}
#diary_sel_item .items span {
    display: inline-block;
    margin-right: 0.3rem;
    padding: 0.1rem 0;
    color: #17a2b8;
}
#diary_sel_item .show_sel {
    margin-top: 0.3rem;
}
#diary_sel_item .show_items {
    float: left;
    height: 8rem;
}
#diary_sel_item .show_items2 {
    float: right;
    height: 8rem;
}
#diary_sel_item ul.sel_item {
    text-align: center;
    list-style: none;
    font-size: 0.3rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    height: 80%;
    overflow-y: scroll;
}
#diary_sel_item ul.sel_item > li {
    overflow: hidden;
    padding: 0.3rem 0;
    background-color: #f0f0f0;
}
#diary_sel_item ul.sel_item > li.item1_selected {
    background-color: #fff;
}
#diary_sel_item ul.sel {
    list-style: none;
    font-size: 0.3rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    height: 80%;
    overflow-y: scroll;
}
ul.sel > li {
    /* border-bottom: 1px solid #ccc; */
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
