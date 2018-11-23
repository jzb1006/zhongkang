<template>
    <div id="meta">
        <div :class="'meta_list list_'+(Object.keys(parameter).length)">
            <div v-if="parameter.date" class="demo time">
                <span class="">{{transform_date(parameter.date)}}</span>
            </div>
            <div v-if="parameter.browses" class="demo browses">
                <span class="zk-icon-liulan">{{transform_num(parameter.browses)}}</span>
            </div>
            <div v-if="parameter.likes" class="demo likes" @click="click_like">
                <span class="zk-icon-xinaixin">{{transform_num(parameter.likes)}}</span>
            </div>
            <div v-if="parameter.comments" class="demo comments" @click="click_comment">
                <span class="zk-icon-edit">{{transform_num(parameter.comments)}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import apiCom from "@/api/common";
export default {
    name:"e_meta",
    props: {
        info: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            parameter: this.get_info()
        };
    },
    methods: {
        get_info() {
            let msg = {
                date: this.info.date,
                browses: this.info.browses,
                likes: this.info.likes,
                comments: this.info.comments
            };
        
            return this.filter_kong(msg);
        },
        filter_kong(data){
            for(let index in data){
                if(!data[index]){
                    delete data[index];
                }
            }
            return data;
        },
        click_like() {
            apiCom
                .ajaxSubmit("common", "favor", {
                    table: this.info.item.table,
                    id: this.info.item.id
                })
                .then(res => {
                    if (res.data.error == "0") {
                        this.parameter.likes = parseInt(this.info.likes) + 1 +'';
                    }
                });
        },
        click_comment() {
            if (this.parameter.comment_id) {
                this.$emit("click_comment", this.parameter.comment_id);
            }
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        transform_date(index) {
            return index.split(" ", 1)[0];
        }
    }
};
</script>

<style scoped>
#meta .meta_list {
    display: grid;
    padding: 0.1rem 0;
    font-size: 0.27rem;
    color: #524c4c;
    white-space: nowrap;
    overflow: hidden;
    text-align: center;
}
#meta .list_1 {
    grid-template-columns: 1fr;
}
#meta .list_2 {
    grid-template-columns: 1fr 1fr;
}
#meta .list_3 {
    grid-template-columns: 1fr 1fr 1fr;
}
#meta .list_4 {
    grid-template-columns: 28% 24% 24% 24%;
}
#meta .meta_list .demo {
    padding: 0.1rem 0;
}
</style>
