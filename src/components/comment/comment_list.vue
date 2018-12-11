<template>
    <div id="commentList" name="commentList">
        <comment v-if="isShow" :showInput=showInput :params=params :limitnum='1' @getInfo=getInfo :commentlist=total :comment_form_id=this.cInfo.comment_form_id :comment_post_id=this.cInfo.comment_post_ID @changeTextareaStatus=changeTextareaStatus></comment>
        <kong v-if="!isShow" text="没有评论，快来抢沙发"></kong>
        <commentInput v-show="showInput" :textareaStatus=textareaStatus :info=info @commentSuccess=comment_success @changeTextareaStatus=changeTextareaStatus></commentInput>
        <Loading v-show="loadinging"></Loading>
        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="getcomment"></LoadMore>
    </div>
</template>
<script>
import kong from "@/components/nosearch/kong.vue";
import apiCom from "@/api/comment";
import commentInput from "@/components/comment/comment_input";
import comment from "@/templates/comment/comment_list";
import bus from "@/assets/bus.js";
import Loading from "@/components/decorate/loading.vue";
import LoadMore from "@/components/loadMore/index.vue";
import { mixin } from "@/assets/js/mixins.js";

export default {
    name: "comment_list",
    components: {
        commentInput,
        kong,
        comment,
        Loading,
        LoadMore
    },
    mixins: [mixin],
    props: {
        m_id: {
            default: "12"
        },
        showInput: {
            default: true
        }
    },
    data() {
        return {
            cInfo: {},
            info: {
                comment_post_ID: "", //数据库文章id
                comment_parent: "", //父级id
                comment_form: "", //类型
                comment_form_id: "", //评论素材id
                parent_id: "" //被评论者id
            },
            total: [],
            parent: [],
            children: [],
            textareaStatus: false,
            isShow: true,

            page: 0,
            is_more: this.params["is_more"] || 1,
            pageList: this.params.number,
            isBusy: false,
            hasMore: 0,
            loadinging: true,
            loadmore: true,
            add_status:false
        };
    },
    watch: {
        cInfo(val, oldVal) {
            this.info.comment_post_ID = val.comment_post_ID;
            this.info.comment_form = val.comment_form;
            this.info.comment_form_id = val.comment_form_id;
            this.info.parent_id = val.parent_id;
            this.info.comment_parent = val.comment_parent;
        },
        total(val, oldVal) {
            if (val.length > 0) {
                this.isShow = true;
            }
        }
    },
    methods: {
        changeTextareaStatus(data) {
            this.textareaStatus = data;
        },
        comment_success() {
            this.add_status = true;
            this.page = 0;
            this.getcomment();
        },
        //获取评论
        getInfo(data) {
            this.info = data;
        },
        getcomment() {
            var self = this;
            this.isBusy = true;
            self.page = self.page + 1;
            apiCom
                .ajaxSearch("index", {
                    comment_form: this.cInfo.comment_form,
                    id: this.cInfo.comment_form_id,
                    page:this.page
                })
                .then(res => {
                    if(self.add_status){
                        this.total = [];
                    }
                    this.hasMore = res.data.hasMore;
                    this.parseData(res.data.comments);
                    this.isBusy = false;
                    self.loadinging = false;
                    self.add_status = false;
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

            if (this.total.length == 0) {
                this.isShow = false;
            }
            
            this.total =  this.remove_duplicate_data(this.total);
        }
    },
    mounted() {
        this.cInfo = {
            comment_post_ID: this.params.comment_post_ID,
            comment_form: this.params.comment_form?this.params.comment_form:this.$route.query.comment_form,
            comment_form_id: this.$route.query.comment_form_id,
            parent_id: this.$route.query.uid,
            comment_parent: "0"
        };
        this.getcomment();
    }
};
</script>
<style scoped>
</style>
