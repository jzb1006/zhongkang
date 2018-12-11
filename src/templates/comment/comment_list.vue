<template>
    <div id="comment">
        <div class="list">
            <div class="comment clearfix" v-for="(comment,index) in commentlist" :key="index" v-if="comment">
                <div class="headimg">
                    <img :src="getImgUrl()+comment.headimgurl" alt="">
                </div>
                <div class="other">
                    <p class="name">{{comment.username ? comment.username : ""}}</p>
                    <p v-show="showInput" class="time clearfix">
                        <span class="zk-icon-edit" @click="edit(comment)"> 回复</span>
                        <span class="zk-icon-xinaixin"> 赞</span>
                    </p>
                    <p class="content">{{comment.comment_content}}</p>
                    <p class="date">{{comment.comment_date}}</p>
                    <div v-if="comment.reply.length" class="replys">
                        <div class="reply" v-for="(reply,index) in comment.reply" :key=index v-if='limitNum(index)'>
                            <span class="name">{{reply.username ? reply.username : ""}}</span>:
                            <span> @{{reply.parent_name}} </span> {{reply.comment_content}}<br />
                            <p class="date">{{comment.comment_date}}
                                <span @click="edit(reply)">回复</span>
                            </p>
                        </div>
                        <router-link :to="{name:'container',query:{id:params.comment_detail_id,comment_form:comment.comment_form,cid:comment.id,uid:comment.uid,comment_form_id:comment.comment_form_id,comment_post_id:comment_post_id}}">
                            <span v-show="replyLength(comment.reply)" class="more">共{{comment.reply.length}}条回复！>></span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import apiCom from "@/api/comment";
import { login_mixin } from "@/assets/js/mixins.js";
export default {
    name: "comment",
    props: {
        showInput:{
            default:true
        },
        limitnum: {
            default: ""
        },
        title: {
            default: "评论列表"
        },
        commentlist: "",
        comment_form_id: {
            default: ""
        },
        comment_post_id: {
            default: ""
        },
        params: {
            default: function() {
                return {};
            }
        }
    },
    mixins: [login_mixin],
    watch: {
        commentlist(val, oldVal) {
            if (typeof commentlist == "Object") {
                let arr = [];
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i];
                    arr.push(o);
                }
                this.commentlist = arr;
            }
        }
    },
    methods: {
        getImgUrl(){
            return apiCom.imgUrl();
        },
        limitNum(index) {
            if (this.limitnum) {
                if (this.limitnum > index) {
                    return true;
                }
                return false;
            } else {
                return true;
            }
        },
        back() {
            this.$router.back(-1);
        },
        edit(data) {
            let arr = {
                comment_post_ID: this.comment_post_id, //数据库文章id
                comment_parent: data.id, //父级id
                comment_form: data.comment_form, //类型
                comment_form_id: data.comment_form_id, //评论素材id
                parent_id: data.uid //被评论者id
            };

            var self = this;
            this.checked_login().then(function(data) {
                self.$emit("getInfo", arr);
                self.$emit("changeTextareaStatus", true);
            }).catch(err => {});
        },
        replyLength(data) {
            if (this.limitnum) {
                if (data.length > this.limitnum) {
                    return true;
                }
            }
            return false;
        }
    }
};
</script>
<style scoped>
#comment .list {
    margin-bottom: 1.2rem;
}
#comment .list .comment {
    margin: 0.3rem 0.2rem;
}
#comment .list .comment .headimg {
    float: left;
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 1rem;
    border: 1px solid #000;
    overflow: hidden;
}
#comment .list .comment .headimg img {
    float: left;
    max-width: 100%;
    min-height: 100%;
}
#comment .list .comment .other {
    margin-left: 1rem;
    font-size: 0.3rem;
    position: relative;
}
#comment .list .comment .other p {
    line-height: 0.5rem;
}
#comment .list .comment .other p.name {
    color: #296fbf;
    font-weight: 550;
    width: 4rem;
    overflow: hidden;
}
#comment .list .comment .other p.date {
    font-size: 0.23rem;
    color: #969696;
}
#comment .list .comment .other .replys p.date span {
    font-size: 0.23rem;
    color: #4c4949;
}
#comment .list .comment .other p.time {
    position: absolute;
    right: 0.2rem;
    top: 0;
    color: #aaa;
}
#comment .list .comment .other p.time span {
    font-size: 0.3rem;
    margin-left: 0.2rem;
}
#comment .list .comment .other p.content {
    margin: 0.2rem 0 0.1rem;
    color: #484848;
}
#comment .list .comment div.replys {
    font-size: 0.25rem;
    padding: 0.2rem;
    line-height: 0.45rem;
    background-color: #cccccc25;
}
#comment .list .comment div.replys div.reply {
    padding: 0.1rem 0;
    border-bottom: 1px solid #cccccc80;
}
#comment .list .comment div.replys div.reply span {
    color: #3194d0;
}
#comment .list .comment div.replys span.more {
    color: #0d151b;
    font-size: 0.23rem;
    text-decoration: underline;
}
</style>
