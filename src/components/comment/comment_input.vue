<template>
    <div id="commentInput">
        <p class="input_show" @click="show_textarea">
            <!-- <span class="zk-icon-edit"></span> -->
        {{tip}}</p>
        <div class="shade" v-show="show_input" @click="hidden_input">

        </div>
        <div class="input_box" v-show="show_input">
            <textarea id="content" ref="content" placeholder="'@'+name" v-model="comment_content" v-focus></textarea>
            <p class="clearfix">
                <!-- <span class="zk-icon-iconfonticon5"></span>
                <span class="zk-icon-tukuxiangce"></span> -->
                <span class="submit" @click="submit_comment">发表评论</span>
            </p>
        </div>
    </div>
</template>
<script>
import apiCom from "./../../api/comment";
export default {
    props: {
        tip: {
            default: "写评论..."
        },
        textareaStatus: {
            default: false
        },
        info: Object
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
    methods: {
        show_textarea() {
            this.show_input = true;
        },
        submit_comment() {
            this.show_input = false;
            this.toParent();
            let arr = {
                comment_post_ID: this.info.comment_post_id,
                author: this.info.u_name,
                comment_parent: this.info.comment_parent,
                comment_form: this.info.comment_form,
                comment_form_id: this.info.comment_form_id,
                comment: this.comment_content,
                uid: this.info.u_id,
                parent_id: this.info.p_id
            };

            apiCom
                .addComment(arr)
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
        this.show_input = this.textareaStatus;
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
    padding: 0.2rem .3rem;
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
    padding: .15rem;
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
