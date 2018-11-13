<template>
    <div id="diarySelItem" :style="{height:clientHeight}" v-show="status">
        <p class="top">
            <span class="badge_l" @click="close()">
                <i class="zk-icon-fanhui"></i></span>选择项目
                    <span class="submit" @click="sel_Ok()">完成</span>
        </p>
        <p class="title">从目录选取</p>
        <p class="items">
            <span class="detail_selected" v-for="ch in choose" :key="ch.id" @click="sel_item3(ch.id)">{{ch.name}}</span>
            <span class="detail_selected" v-if="choose.length <= 0">请至少选择一个项目</span>
        </p>
        <div class="show_sel clearfix ">
            <div class="col_4 show_items">
                <ul class="sel_item">
                    <li v-for="item in itemList" :key="item.id" v-if="item.parent_id == 0" @click="sel_item1(item.id)" :class = "{item1_selected:item.id == item1}">{{item.name}}</li>
                </ul>
            </div>
            <div class="col_8 show_items">
                <ul class="sel">
                    <li v-for="item in itemList" :key="item.id" v-show="item1 == item.id">
                        <div v-for="item2 in item.cat_id" :key="item2.id">
                            <p class="md">{{item2.name}}</p>
                            <p class="bottom">
                                <span class="detail_btn" v-for="item3 in item2.cat_id" :key="item3.id" :class="{detail_selected:duoxuan(item3.id)}" @click="sel_item3(item3.id,item3.name)">{{item3.name}}</span>
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
    data() {
        return {
            clientHeight: "",
            status: false,
            itemList: [],
            item1: "",
            item3: "",
            choose: []
        };
    },
    computed: {},
    methods: {
        close() {
            this.status = false;
        },
        $_ajax_getItem() {
            var self = this;
            api.ajaxSearch("diary_create_basic").then(res => {
                self.itemList = res.data;
            });
        },
        sel_item1(data) {
            this.item1 = data;
        },
        sel_item3(id, name) {
            if (this.choose.length <= 0) {
                let arr = {
                    id: id,
                    name: name
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
                    name: name
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
        this.clientHeight = document.documentElement.clientHeight + "px";
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
.col_4{
    width: 33.3%;
}
.col_8{
    width: 66.6%;
}
.detail_btn {
    display: inline-block;
    font-size: 0.3rem;
    padding: 0.1rem 0.2rem;
    margin-right: 0.2rem;
    color: #fff;
    border-radius: 1rem;
    background-color: rgba(123, 123, 123, 0.5);
}


.detail_selected {
    display: inline-block;
    padding: 0.1rem 0.2rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    color: #fff;
    background-color: #17a2b8 !important;
}

#diarySelItem {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 1111;
    overflow: hidden;
    background-color: #fff;
}
#diarySelItem div {
    height: 100%;
}
#diarySelItem .top{
    color: #fff;
    font-size: .35rem;
    text-align: center;
    padding: 0.3rem;
    background-color: rgb(255, 83, 112);
}
#diarySelItem .top .badge_l{
    float: left;
}
#diarySelItem .top .submit{
    float: right;
}

.active {
    background-color: #17a2b8 !important;
}
#diarySelItem p.title {
    padding: .2rem 0;
    font-size: .4rem;
}
#diarySelItem  span.tip {
    color: #fff;
}
#diarySelItem .show_sel{
    margin-top: .5rem;
}
#diarySelItem .show_items{
    float: left;
}
#diarySelItem ul.sel_item {
    list-style: none;
    font-size: 0.4rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    /* overflow-x: hidden; */
    height: 80%;
    overflow-y: scroll;
}
#diarySelItem ul.sel_item > li {
    padding: 0.3rem 0;
    background-color: #ccc;
}
#diarySelItem ul.sel_item > li.item1_selected{
    background-color: #fff;
}
#diarySelItem ul.sel {
    list-style: none;
    font-size: 0.5rem;
    padding: 0 0 8rem 0;
    margin-bottom: 1rem;
    /* overflow-x: hidden; */
    height: 80%;
    overflow-y: scroll;
}
ul.sel > li {
    border-bottom: 1px solid #ccc;
}
ul.sel > li > div{
    margin-bottom: .3rem;
    padding: 0 15px;
}
p.md {
    font-size: .4rem;
    padding: .2rem .1rem 0;
    margin-bottom: .2rem;
}

</style>
