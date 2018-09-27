<template>
    <div id="comment">
        <div v-if='limitNum()' class="head">
            <p><span class="zk-icon-fanhui fanhui" @click="back()"></span>{{title}}</p>
        </div>
        <div class="list">
            <div class="comment clearfix" v-for="comment in commentlist" v-if="comment" >
                <div class="headimg">
                    <img src="http://a.hiphotos.baidu.com/image/h%3D300/sign=10b374237f0e0cf3bff748fb3a47f23d/adaf2edda3cc7cd90df1ede83401213fb80e9127.jpg" alt="">
                </div>
                <div class="other">
                    <p class="name">{{comment.username}}</p>
                    <p class="time">{{comment.comment_date}} <span class="zk-icon-xinaixin"> 1</span> <span class="zk-icon-edit" @click="edit(comment)"></span></p>
                    <p class="content">{{comment.comment_content}}</p>
                    <div v-if="comment.reply.length" class="replys">
                        <p class="reply" v-for="(reply,index) in comment.reply" v-if='limitNum(index)'  @click="edit(reply)">
                            <span class="name">{{reply.username}}</span>:
                            <span> @{{reply.parent_name}} </span> {{reply.comment_content}}</p>
                        <router-link :to="{name:'commentDetail',params:{comment:comment,user:user,info:info1}}">
                            <span v-show="replyLength(comment.reply)" class="more">共{{comment.reply.length}}条回复！>></span>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <commentInput @toshowinput='getshowinput' tip="评论" :textareaStatus=textareaStatus :info=info1></commentInput>
    </div>
</template>
<script>
import commentInput from './comment_input'
export default {
    props:{
        limitnum:{
            default:"",
        },
        title:{
            default:"评论列表"
        },
        info:Object,
        commentlist:"",
        comment_form:{
            default:"diary"
        },
        comment_post_id:{
            default:"19"
        },
        user:"",
    },
    data(){
        return{
            tip_show:false,
            textareaStatus:false,
            info1:{},
        }
    },
    components:{
        commentInput
    },
    watch:{
        textareaStatus(val,oldVal){
            if(!val){
                this.info1 = this.info;
            }
        },
        commentlist(val,oldVal){
            if(typeof commentlist == 'Object'){
                let arr = [];
                for (let i in obj) {
                    let o = {};
                    o[i] = obj[i];
                    arr.push(o)
                }
                this.commentlist = arr;
            }
        }
    },
    methods:{
        limitNum(index){
            if(this.limitnum){
                if(this.limitnum > index){
                    return true;
                }
                this.tip_show = true;
                return false;
            }else{
                return true;
            }
        },
        back(){
            this.$router.back(-1);
        },
        edit(data){
            this.info1 = {
                p_id:data.uid,
                p_name:data.username,
                u_id:this.user.user_id,
                u_name:this.user.user_name,
                comment_parent:data.id,
                comment_form:this.comment_form,
                comment_form_id:data.comment_form_id,
                comment_post_id:this.comment_post_id,
            }
            this.textareaStatus = true;
        },
        getshowinput(data){
            this.textareaStatus = data;
        },
        replyLength(data){
            if(this.limitnum){
                if(data.length > this.limitnum){
                    return true;
                }
            }
            return false;
        }
    },
    mounted(){
        this.info1 = this.info;
        
    }
};
</script>
<style scoped>
#comment .head{
    height: .9rem;
}
#comment .head p{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    font-size: .3rem;
    text-align: center;
    padding: .3rem .1rem;
    background-color: #ccc;
}
#comment .head p span{
    float: left;
    margin-left: .3rem;
}
#comment .list .comment {
    margin: 0.2rem;
}
#comment .list .comment .headimg {
    float: left;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 1rem;
    border: 1px solid #000;
    overflow: hidden;
}
#comment .list .comment .headimg img {
    max-width: 100%;
    min-height: 100%;
}
#comment .list .comment .other {
    margin-left: 1rem;
    font-size: 0.3rem;
}
#comment .list .comment .other p {
    line-height: 0.5rem;
}
#comment .list .comment .other p.name {
    color: #296fbf;
}
#comment .list .comment .other p.time {
    font-size: 0.25rem;
}
#comment .list .comment .other p.time span{
    float: right;
    margin: 0 .2rem;
}
#comment .list .comment .other p.content{
    margin-bottom: .2rem;
}
#comment .list .comment div.replys {
    font-size: 0.25rem;
    padding:.2rem;
    line-height: 0.45rem;
    background-color: #cccccc65;
}
#comment .list .comment div.replys p.reply{
    margin-bottom: .2rem;
}
#comment .list .comment div.replys p.reply span {
    color: #296fbf;
}
#comment .list .comment div.replys span.more{
    color:#296fbf;
}
</style>
