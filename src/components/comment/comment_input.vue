<template>
    <div id="commentInput">
        <div class="input_style">
            <p class="input_show" @click="show_textarea">{{tip}}</p>
            <div class="other">
                <router-link :to="{name:'container',query:{id:73,comment_form:this.info.comment_form,comment_post_ID:this.info.comment_post_ID,comment_form_id: this.$route.query.comment_form_id,
            parent_id: this.$route.query.uid,}}">
                    <span class="zk-icon-edit"></span>
                </router-link>
                <span class="zk-icon-xinaixin"></span>
                <span class="zk-icon-ys"></span>
            </div>
        </div>
        <div class="shade" v-show="show_input" @click="hidden_input">

        </div>
        <div class="input_box" v-show="show_input">
            <textarea id="content" ref="content" placeholder="写点感想" v-model="comment_content" v-focus></textarea>
            <p class="clearfix">
                <span class="submit" @click="submit_comment">发表评论</span>
            </p>
        </div>
    </div>
</template>
<script>
import apiCom from "@/api/comment";
import { mapGetters } from "vuex";
import bus from "@/assets/bus.js";
import { login_mixin, mixin } from "@/assets/js/mixins.js";
export default {
    name: "comment_input",
    mixins: [login_mixin, mixin],
    props: {
        tip: {
            default: "写评论..."
        },
        textareaStatus: {
            default: false
        },
        info: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            show_input: false,
            comment_content: ""
        };
    },
    watch: {
        textareaStatus(val, oldval) {
            this.show_input = val;
            this.comment_content = "";
        }
    },
    directives: {
        focus: function(el) {
            el.focus();
        }
    },
    computed: {
        ...mapGetters(["getUserinfo"])
    },
    methods: {
        comment_tip() {
            if (this.getUserinfo) {
                this.comment_content =
                    "@" +
                    (this.getUserinfo.nickname
                        ? this.getUserinfo.nickname
                        : "");
            } else {
                this.comment_content = "";
            }
        },
        show_textarea() {
            this.checked_login()
                .then(() => {
                    this.show_input = true;
                })
                .catch(err => {});
        },
        submit_comment() {
            this.show_input = false;
            this.toParent();
            var self = this;
            let formData = {
                comment_post_ID: self.info.comment_post_ID, //数据库文章id
                author: self.getUserinfo ? self.getUserinfo.nickname : "", //评论者名字
                comment_parent: self.info.comment_parent
                    ? self.info.comment_parent
                    : 0, //父级id
                comment_form: self.info.comment_form, //类型
                comment_form_id: self.info.comment_form_id, //评论素材id
                comment: self.comment_content, //评论内容
                uid: self.getUserinfo ? self.getUserinfo.user_id : "", //评论者id
                parent_id: self.info.parent_id //被评论者id
            };

            apiCom.addComment(formData).then(res => {
                console.log(res);
                if (res.data.err == "0") {
                    this.$emit("commentSuccess");
                }
            });
        },
        hidden_input() {
            this.show_input = false;
            this.toParent();
        },
        toParent() {
            this.$emit("changeTextareaStatus", this.show_input);
        }
    },
    mounted() {
        this.show_input = this.textareaStatus;
    }
};
</script>
<style scoped>
#commentInput {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    background-color: #f6f4f4;
}
#commentInput .input_style{
    display: grid;
    grid-template-columns: repeat(2,1fr);
}
#commentInput .input_style .other{
    font-size: .35rem;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    text-align: center;
    align-content: center;
}
#commentInput .input_style .other span{
    font-size: .4rem;
    color:#000;
}
#commentInput .input_show {
    font-size: 0.3rem;
    color: #000;
    margin: 0.1rem 0.2rem;
    padding: 0.2rem 0.3rem;
    border: 1px solid #ccc;
    border-radius: .2rem;
    background-color: #fff;
}
#commentInput > div.shade {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000050;
    z-index: 1;
}
#commentInput .input_box {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding-top: 0.2rem;
    background-color: #fff3f3;
    z-index: 666;
}
#commentInput .input_box textarea {
    font-size: 0.3rem;
    width: 90%;
    padding: 0.15rem;
    height: 1.5rem;
    border-radius: 0.1rem;
    border: 1px solid #00000080;
}
#commentInput .input_box p {
    font-size: 0.25rem;
    text-align: left;
    padding: 0.2rem 0;
}
#commentInput .input_box p span {
    margin: 0 0.3rem;
}
#commentInput .input_box p span.submit {
    color: #fff;
    float: right;
    padding: 0.2rem;
    border: 1px solid #fff;
    border-radius: 0.2rem;
    background-color: #00000050;
}
</style>
