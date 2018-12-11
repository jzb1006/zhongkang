<template>
    <div>
        <comment @getInfo=getInfo :commentlist=total :comment_post_id=comment_post_id @changeTextareaStatus=changeTextareaStatus></comment>
        <div v-if="total.length == 0">
            <kong text="没有评论，快来抢沙发"></kong>
        </div>
        <commentInput :textareaStatus=textareaStatus :info=info @commentSuccess=comment_success @changeTextareaStatus=changeTextareaStatus></commentInput>
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="getComment"></LoadMore>
    </div>
</template>
<script>
import apiCom from "@/api/comment";
import kong from "@/components/nosearch/kong.vue";
import commentInput from "@/components/comment/comment_input";
import comment from "@/templates/comment/comment_list";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins.js";
export default {
    name: "comment_detail",
    mixins: [mixin],
    data() {
        return {
            comment_post_id: "",
            total: [],
            parent: [],
            children: [],
            comment_form: "",
            id: "",
            info: {},
            textareaStatus: false,

            page: 0,
            is_more: this.params["is_more"] || 1,
            pageList: this.params.number,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true
        };
    },
    components: {
        comment,
        commentInput,
        kong,
        Loading,
        LoadMore
    },
    methods: {
        changeTextareaStatus(data) {
            this.textareaStatus = data;
        },
        comment_success() {
            this.getComment();
            this.total = [];
        },
        getInfo(data) {
            this.info = data;
        },
        getComment() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            apiCom
                .ajaxSearch("getOnce", {
                    comment_form: this.comment_form,
                    comment_form_id: this.comment_form_id,
                    cid: this.id,
                    page: this.page
                })
                .then(res => {
                    this.hasMore = res.data.hasMore;
                    this.parseData(res.data.comments);
                    this.isBusy = false;
                    self.loadinging = false;
                })
                .catch(err => {
                    self.loadinging = false;
                });
        },
        //去除重复数据
        remove_duplicate_data(data) {
            var newArr = [];
            for (var i = 0; i < data.length; i++) {
                if (newArr.indexOf(data[i]) == -1) {
                    newArr.push(data[i]);
                }
            }
            return newArr;
        },
        //整理评论数据
        parseData(data) {
            for (let index in data) {
                if (data[index].comment_parent == 0) {
                    this.parent = [];
                    this.children = [];
                }

                let arr = {
                    id: data[index].id,
                    uid: data[index].uid,
                    username: data[index].username,
                    headimgurl: data[index].headimgurl,
                    parent_id: data[index].parent_id,
                    parent_name: data[index].parent_name,
                    comment_ID: data[index].comment_ID,
                    comment_date: data[index].comment_date,
                    comment_parent: data[index].comment_parent,
                    comment_content: data[index].comment_content,
                    comment_form_id: data[index].comment_form_id,
                    comment_form: data[index].comment_form,
                    reply: []
                };

                if (data[index].comment_parent == 0) {
                    this.parent = this.parent.concat(arr);
                } else {
                    this.children = this.children.concat(arr);
                }

                if (Object.keys(data[index].comment_ID).length > 0) {
                    this.parseData(data[index].comment_ID);
                } else {
                    for (let index in this.parent) {
                        this.parent[index].reply = this.children;
                    }
                    this.total = this.total.concat(this.parent);
                }
            }
            this.total = this.remove_duplicate_data(this.total);
        }
    },
    mounted() {
        this.comment_form = this.$route.query.comment_form;
        this.comment_post_id = this.$route.query.comment_post_id;
        this.id = this.$route.query.cid;
        this.comment_form_id = this.$route.query.comment_form_id;

        this.info = {
            comment_form: this.$route.query.comment_form,
            comment_post_ID: this.$route.query.comment_post_id,
            parent_id: this.$route.query.uid,
            comment_parent: this.$route.query.cid,
            comment_form_id: this.$route.query.comment_form_id
        };
        this.getComment();
    }
};
</script>
<style scoped>
</style>
