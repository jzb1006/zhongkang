<template>
    <div id="diary_backdrop_list">
        <div class="list_wrapper">
            <div class="top">
                <top title="我的日记本"></top>
                <p class="create_backdrop" @click="create_backdrop()">
                    <span>
                        <i class="zk-icon-project-o"></i>
                    </span>
                    新建日记本
                </p>
            </div>
            <ul class="backdrop_list">
                <li class="backdrop" v-for="(backdrop,index) in backdropList" :key=index>
                    <router-link :to="{name:'container',query:{id:params.diary_backdrop_id,bid:backdrop.id}}" tag="a">
                        <div class="b_left">
                            <p class="jisuan" v-for="(count,index) in diaryCount[backdrop.id]" :key=index>{{count}} 篇 / {{backdrop.total_comment}}
                                <i class="zk-icon-xinaixin"></i>
                            </p>
                            <p class="item" v-for="(cid,index) in formatCid(backdrop.goods_cate_ids)" v-if="index == '0'">{{itemName[cid].cat_name}}</p>
                            <p class="time" v-if="backdrop.update_time">{{backdrop.update_time.split(" ")[0]}}</p>  
                        </div>
                    </router-link>
                    <div class="b_right">
                        <span class="setting" @click="update_backdrop(backdrop.id)">
                            <i class="zk-icon-shezhi"></i>
                        </span>
                        <span class="writeDiary" @click="create_diary(backdrop.id)">
                            写日记
                        </span>
                    </div>
                </li>
            </ul>
            <keep-alive v-if="is_operate">
                <diaryOperate @back=click_back></diaryOperate>
            </keep-alive>
        </div>
    </div>
</template>

<script>
import api from "@/api/diary";
import Loading from "@/components/decorate/loading.vue";
import top from "@/components/decorate/top_back_title.vue";
import { mapGetters } from "vuex";
export default {
    name: "diary_backdrop_list",
    props: {
        diaryBackdropInfo: {
            default: function() {
                return {};
            }
        },
        params: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            backdropList:[],
            itemName:[],
            diaryCount:[],
            is_operate: false,
            loadinging: true
        };
    },
    watch:{
        diaryBackdropInfo(val,oldVal){
            this.backdropList = val.backdropList;
            this.itemName = val.itemName;
            this.diaryCount = val.diaryCount;
        }
    },
    computed: {
        ...mapGetters([
            "getDiaryOperate",
            "getAestheticStatus",
            "getBid",
            "getDid"
        ])
    },
    components: {
        top,
        Loading
    },
    methods: {
        hidden_backdropList() {
            this.$emit("close");
        },
        click_back() {
            this.is_operate = false;
        },
        update_backdrop(bid) {
            this.$store.dispatch("Save_Diary_Operate", "ub");
            this.$store.dispatch("Save_Bid", bid);
            this.is_operate = true;
        },
        create_diary(bid) {
            this.$store.dispatch("Save_Diary_Operate", "cd");
            this.$store.dispatch("Save_Aesthetic_Status", false);
            this.$store.dispatch("Save_Bid", bid);
            this.is_operate = true;
        },
        create_backdrop() {
            this.$store.dispatch("Save_Diary_Operate", "cb");
            this.is_operate = true;
        },
        formatCid(data) {
            if (data) {
                let arr = data.split(";");
                return arr;
            }
        }
    }
};
</script>
<style scoped>
.ios-arrow-back {
    fill: #fff;
}
#diary_backdrop_list {
    background-color: #fff;
    overflow: hidden;
}
#diary_backdrop_list .list_wrapper {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
}
#diary_backdrop_list .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 83, 112);
}
#diary_backdrop_list .top p.title {
    font-size: 0.35rem;
    text-align: center;
    padding: 0.3rem;
    color: #fff;
    border-bottom: 1px solid #eee;
}
#diary_backdrop_list .top p.title span.back {
    float: left;
}
#diary_backdrop_list .top p.create_backdrop {
    text-align: center;
    padding: 0.4rem;
    font-size: 0.35rem;
    font-weight: 550;
    box-shadow: 2px 2px 2px #ccc;
    background-color: #faebd778;
}

#diary_backdrop_list .backdrop_list {
    margin-top: 3rem;
    padding: 0 15px;
}
.backdrop_list .backdrop {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 0.1rem;
    box-shadow: 2px 2px 2px #ccc;
    height: 4rem;
    margin-bottom: 0.5rem;
}
#diary_backdrop_list .backdrop a {
    display: inline-flex;
}
.backdrop_list .backdrop .b_left {
    width: 75%;
    height: 3.68rem;
    padding-left: 0.3rem;
    background-color: rgb(255, 83, 112);
    border-radius: 0.1rem;
    box-shadow: 0px 2px 0px #ccc;
}
.backdrop_list .backdrop .b_left p {
    margin-bottom: 0px;
    font-size: 0.3rem;
    color: #fff;
}
.backdrop_list .backdrop .b_left p.jisuan {
    margin-top: 1rem;
    font-size: 0.3rem;
}
.backdrop_list .backdrop .b_left p.item {
    font-size: 0.35rem;
    margin: 0.3rem 0;
}

.backdrop_list .backdrop .b_right {
    float: left;
    width: 3.5rem;
    height: 5rem;
    text-align: center;
}
.backdrop_list .backdrop .b_right .setting {
    margin-left: 2.8rem;
    font-size: 0.4rem;
}
.backdrop_list .backdrop .b_right .writeDiary {
    display: inline-block;
    width: auto;
    margin-top: 2.1rem;
    padding: 0.1rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    border: 1px solid rgb(255, 83, 112);
}
</style>
