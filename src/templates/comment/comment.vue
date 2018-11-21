<template>
    <div id="comment">
        <div v-if='limitNum()' class="head">
            <p>
                <span class="zk-icon-fanhui fanhui" @click="back()"></span>{{title}}</p>
        </div>
        <div class="list">
            <div class="comment clearfix" v-for="comment in commentlist" v-if="comment">
                <div class="headimg">
                    <img src="https://tse1-mm.cn.bing.net/th?id=OET.2c876ba3093543feba76d5d2216d86ea&w=135&h=135&c=7&rs=1&o=5&pid=1.9" alt="">
                </div>
                <div class="other">
                    <p class="name">{{comment.username}}</p>
                    <p class="time clearfix">
                        <span class="zk-icon-edit" @click="edit(comment)"> 回复</span>
                        <span class="zk-icon-xinaixin"> 赞</span>
                    </p>
                    <p class="content">{{comment.comment_content}}</p>
                    <p class="date">{{comment.comment_date}}</p>
                    <div v-if="comment.reply.length" class="replys">
                        <div class="reply" v-for="(reply,index) in comment.reply" v-if='limitNum(index)'>
                            <span class="name">{{reply.username}}</span>:
                            <span> @{{reply.parent_name}} </span> {{reply.comment_content}}<br/>
                            <p class="date">{{comment.comment_date}}
                                <span @click="edit(reply)">回复</span>
                            </p>
                        </div>
                        <router-link :to="{name:'commentDetail',query:{comment_form:comment.comment_form,id:comment.id,mid:mid}}">
                            <span v-show="replyLength(comment.reply)" class="more">共{{comment.reply.length}}条回复！>></span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="comment_input">
            <commentInput @toshowinput='getshowinput' :textareaStatus=textareaStatus></commentInput>
        </div>
        
    </div>
</template>
<script>
import commentInput from "@/components/comment/comment_input";
import bus from "@/assets/bus.js"
export default {
    name:"comment",
    props: {
        limitnum: {
            default: ""
        },
        title: {
            default: "评论列表"
        },
        commentlist: "",
        mid: {
            default: ""
        },
        comment_post_id:{
            default: '19'
        }
    },
    data() {
        return {
            tip_show: false,
            textareaStatus: false
        };
    },
    components: {
        commentInput
    },
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
        limitNum(index) {
            if (this.limitnum) {
                if (this.limitnum > index) {
                    return true;
                }
                this.tip_show = true;
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
                comment_post_ID: this.comment_post_id,//数据库文章id
                comment_parent: data.id,//父级id
                comment_form: data.comment_form,//类型
                comment_form_id: data.comment_form_id,//评论素材id
                parent_id: data.uid//被评论者id
            }
            bus.$emit('comment_info',arr);
            this.textareaStatus = true;

        },
        getshowinput(data) {
            this.textareaStatus = data;
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
#comment{
    z-index: 1000;
}
#comment .comment_input{
    position: fixed;
    bottom: 0rem;
    height: 1.2rem;
    width: 100%;
    background-color: #fff;
    z-index: 666;
}
#comment .head {
    height: 0.9rem;
}
#comment .head p {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: 0.3rem;
    text-align: center;
    padding: 0.3rem 0.1rem;
    background-color: #ccc;
    z-index: 1;
}
#comment .head p span {
    float: left;
    /* margin-left: 0.3rem; */
}
#comment .list{
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
