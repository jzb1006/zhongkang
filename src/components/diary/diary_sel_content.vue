<template>
    <div id="diarySelContent">
        <p class="items">
            <span class="detail_selected" v-for="(ch,index) in choose" @click="sel_item3(ch.id)" :key=index>{{ch.name}}</span>
            <span class="detail_selected" v-if="choose.length <= 0">请至少选择一个项目</span>
        </p>
        <div class="show_sel clearfix ">
            <div class="col_4 show_items">
                <ul class="sel_item">
                    <li v-for="(item,index) in itemList" :key=index v-if="item.parent_id == 0" @click="sel_item1(item.id)" :class = "{item1_selected:item.id == item1}">{{item.name}}</li>
                </ul>
            </div>
            <div class="col_8 show_items">
                <ul class="sel">
                    <li v-for="(item,index) in itemList" :key=index v-show="item1 == item.id">
                        <div v-for="(item2,index) in item.cat_id" :key=index>
                            <p class="md">{{item2.name}}</p>
                            <p class="bottom">
                                <span class="detail_btn" v-for="(item3,index) in item2.cat_id" :key=index :class="{detail_selected:duoxuan(item3.id)}" @click="sel_item3(item3.id,item3.name)">{{item3.name}}</span>
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
    name:"diary_sel_content",
    data() {
        return {
            clientHeight: "",
            itemList: [],
            item1: "",
            item3: "",
            choose: []
        };
    },
    methods: {
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
                        this.$emit('choose',this.choose);
                        return;
                    }
                }
                let arr = {
                    id: id,
                    name: name
                };
                this.choose.push(arr);
            }
            this.$emit('choose',this.choose);
        },
        duoxuan(data) {
            for (let index in this.choose) {
                if (this.choose[index].id == data) {
                    return true;
                }
            }
            return false;
        },
    },
    mounted() {
        // this.clientHeight = document.documentElement.clientHeight + "px";
        this.$_ajax_getItem();
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

/* #diarySelContent .top{
    color: #fff;
    font-size: .35rem;
    text-align: center;
    padding: 0.3rem;
    background-color: rgb(255, 83, 112);
}
#diarySelContent .top .badge_l{
    float: left;
}
#diarySelContent .top .submit{
    float: right;
} */

/* .active {
    background-color: #17a2b8 !important;
} */
/* #diarySelContent p.title {
    padding: .2rem 0;
    font-size: .4rem;
} */
/* #diarySelContent  span.tip {
    color: #fff;
} */
#diarySelContent .show_sel{
    margin-top: .5rem;
}
#diarySelContent .show_items{
    float: left;
}
#diarySelContent ul.sel_item {
    list-style: none;
    font-size: 0.4rem;
    /* padding: 0 0 8rem 0; */
    margin-bottom: 1rem;
    /* height: 80%; */
    /* overflow-y: scroll; */
}
#diarySelContent ul.sel_item > li {
    padding: 0.3rem 0;
    background-color: #ccc;
}
#diarySelContent ul.sel_item > li.item1_selected{
    background-color: #fff;
}
#diarySelContent ul.sel {
    list-style: none;
    font-size: 0.5rem;
    /* padding: 0 0 8rem 0; */
    margin-bottom: 1rem;
    /* height: 80%; */
    /* overflow-y: scroll; */
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
