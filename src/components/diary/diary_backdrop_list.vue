<template>
    <div id="diary_backdrop_list">
        <div class="top">
            <top title="我的日记本"></top>
            <p class="create_backdrop" @click="create_backdrop()">
                <span>
                    <i class="zk-icon-project-o"></i>
                </span>
                <!-- <router-link :to="{name:'diaryOperate',query:{operate:'cb'}}"> -->
                    新建日记本
                <!-- </router-link> -->
            </p>
        </div>

        <ul class="backdrop_list">
            <li class="backdrop" v-for="backdrop in backdropList">
                <router-link :to="{name:'diaryBackdrop',query:{bid:backdrop.id}}" tag="a">
                    <div class="b_left">
                        <p class="jisuan" v-for="count in diaryCount[backdrop.id]">{{count}} 篇 / {{backdrop.total_comment}}
                            <i class="zk-icon-xinaixin"></i>
                        </p>
                        <p class="item" v-for="(cid,index) in formatCid(backdrop.goods_cate_ids)" v-if="index == '0'">{{itemName[cid].cat_name}}</p>
                        <p class="time" v-if="backdrop.update_time">{{backdrop.update_time.split(" ")[0]}}</p>
                    </div>
                </router-link>
                <div class="b_right">
                    <!-- <router-link :to="{name:'diaryUpdateBasic',query:{bid:backdrop.id}}" tag="a"> -->
                        <span class="setting" @click="update_backdrop(backdrop.id)">
                            <i class="zk-icon-shezhi"></i>
                        </span>
                    <!-- </router-link> -->
                    <span class="writeDiary" @click="create_diary(backdrop.id)">
                        <!-- <router-link :to="{name:'diaryOperate',query:{bid:backdrop.id,operate:'cd'}}"> -->
                            写日记
                        <!-- </router-link> -->
                    </span>
                </div>
            </li>
        </ul>
        <Loading v-show="loadinging"></Loading>
    </div>
</template>

<script>
import api from "@/api/diary";
import Loading from "@/components/decorate/loading.vue";
import top from "@/components/decorate/top_back_title.vue";
export default {
    name:"diary_backdrop_list",
    data() {
        return {
            backdropList: [],
            itemName: [],
            diaryCount: [],
            loadinging: true
        };
    },
    components: {
        top,
        Loading
    },
    methods: {
        update_backdrop(bid){
            this.$store.dispatch('Save_Diary_Operate','ub');
            this.$router.push({name:'diaryOperate',query:{operate:"ub",bid:bid}})
        },
        create_diary(bid){
            this.$store.dispatch('Save_Diary_Operate','cd');
            this.$store.dispatch("Save_Aesthetic_Status", false);
            this.$router.push({name:'diaryOperate',query:{operate:"cd",bid:bid}})
        },
        create_backdrop(){
            this.$store.dispatch('Save_Diary_Operate','cb');
            this.$router.push({name:'diaryOperate'})
        },
        $_ajax_backdropList: function() {
            var self = this;
            api
                .ajaxSearch("diary_select_basic")
                .then(res => {
                    self.backdropList = res.data.backdrop;
                    self.itemName = res.data.item_name;
                    self.diaryCount = res.data.diary_count;
                    self.loadinging = false;
                })
                .catch(error => {
                    self.loadinging = false;
                });
        },
        formatCid(data) {
            if (data) {
                let arr = data.split(";");
                return arr;
            }
        }
    },
    mounted() {
        this.$_ajax_backdropList();
    }
};
</script>
<style scoped>
.ios-arrow-back {
    fill: #fff;
}
#diary_backdrop_list .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgb(255, 83, 112);
    z-index: 999;
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
}
.backdrop_list .backdrop .b_right .setting {
    margin-left: 2.8rem;
    font-size: 0.4rem;
}
.backdrop_list .backdrop .b_right .writeDiary {
    display: inline-block;
    width: 1rem;
    margin: 2.1rem 0 0 0.5rem;
    padding: 0.1rem 0.8rem;
    border-radius: 1rem;
    font-size: 0.3rem;
    border: 1px solid rgb(255, 83, 112);
}
</style>
