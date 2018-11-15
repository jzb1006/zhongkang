<template>
    <div id="commentInput">
        <p class="input_show" @click="show_textarea">
            {{tip}}</p>
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
// import Axios from "axios";
import apiCom from "@/api/comment";
import { mapGetters } from "vuex";
import bus from "@/assets/bus.js";
export default {
    name:"comment_input",
    props: {
        tip: {
            default: "写评论..."
        },
        textareaStatus: {
            default: false
        }
    },
    data() {
        return {
            show_input: false,
            comment_content: "",
            info: {}
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
            if (this.getUserinfo.nickname) {
                this.comment_content = "@" + this.getUserinfo.nickname;
            } else {
                this.comment_content = "";
            }
        },
        show_textarea() {
            this.show_input = true;
        },
        submit_comment() {
            this.show_input = false;
            this.toParent();
            var self = this;
            // var formData = new FormData();
            // formData.append('comment_post_ID',self.info.comment_post_ID);
            // formData.append('author',self.getUserinfo.nickname);
            // formData.append('comment_parent',self.info.comment_parent);
            // formData.append('comment_form',self.info.comment_form);
            // formData.append('comment_form_id',self.info.comment_form_id);
            // formData.append('comment',self.info.comment_content);
            // formData.append('uid',self.getUserinfo.user_id);
            // formData.append('parent_id',self.info.parent_id);
            let formData = {
                comment_post_ID: self.info.comment_post_ID, //数据库文章id
                author: self.getUserinfo.nickname, //评论者名字
                comment_parent: self.info.comment_parent, //父级id
                comment_form: self.info.comment_form, //类型
                comment_form_id: self.info.comment_form_id, //评论素材id
                comment: self.comment_content, //评论内容
                uid: self.getUserinfo.user_id, //评论者id
                parent_id: self.info.parent_id //被评论者id
            };

            this.send(formData);
        },
        send(formData) {
            apiCom.addComment(formData)
                .then(res => {
                    console.log(res);
                })
                .catch(error => {
                    console.log(error);
                });
        },
        hidden_input() {
            this.show_input = false;
            this.toParent();
        },
        toParent() {
            this.$emit("toshowinput", this.show_input);
        }
    },
    mounted() {
        bus.$on("comment_info", res => {
            this.info = res;
        });
        this.show_input = this.textareaStatus;
        this.comment_tip();
    }
};
</script>
<style scoped>
#commentInput {
    /* position: fixed;
    left: 0;
    right: 0;
    bottom: 1.5rem;
    display: inline; */
    width: 100%;
    z-index: 1000;
}
#commentInput .input_show {
    font-size: 0.3rem;
    color: #000;
    margin: 0.1rem 0.2rem;
    padding: 0.2rem 0.3rem;
    border: 1px solid #ccc;
    border-radius: 1rem;
    background-color: #00000010;
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
