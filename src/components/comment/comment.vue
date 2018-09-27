<template>
    <div id="comment">
        <div v-if='limitNum()' class="head">
            <p><span class="zk-icon-fanhui fanhui" @click="back()"></span>{{title}}</p>
        </div>
        <div class="list">
            <div class="comment clearfix">
                <div class="headimg">
                    <img src="http://a.hiphotos.baidu.com/image/h%3D300/sign=10b374237f0e0cf3bff748fb3a47f23d/adaf2edda3cc7cd90df1ede83401213fb80e9127.jpg" alt="">
                </div>
                <div class="other">
                    <p class="name">用户名字12138</p>
                    <p class="time">08-13 20:40 <span class="zk-icon-xinaixin"> 1</span> <span class="zk-icon-edit" @click="edit('用户名字12138','155')"></span></p>
                    <p class="content">中国好总理</p>
                </div>
                <div class="replys">
                    <p class="reply" v-for='(comment,index) in comments' v-if='limitNum(index)'  @click="edit(comment.r_name,comment.id)">
                        <span class="name">{{comment.r_name}}</span>:
                        <span> @{{comment.c_name}} </span> {{comment.content}}</p>
                    <router-link :to="{name:'commentDetail',params:info1}">
                    <span v-show="tip_show" class="more">共{{count_comment}}条回复！>></span>
                    </router-link>
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
        info:Object
    },
    data(){
        return{
            tip_show:false,
            textareaStatus:false,
            comments:[
                {   
                    id:12,
                    c_name:"小黄",
                    r_name:"风纪",
                    content:"你很胖啊的粉丝的放开手脚佛具开始对减肥，互寄送到附近开，就回到房间的，获得丰厚的说法"
                },
                {
                    id:121,
                    c_name:"小快递费黄",
                    r_name:"风纪",
                    content:"你很胖啊的粉丝的放开手脚佛具开始对减肥，互寄送到附近开，就回到房间的，获得丰厚的说法"
                },
                {
                    id:2,
                    c_name:"小黄",
                    r_name:"风的方式纪",
                    content:"你很胖啊的粉丝的放开手脚佛具开始对减肥，互寄送到附近开，就回到房间的，获得丰厚的说法"
                },
                {
                    id:122,
                    c_name:"小黄",
                    r_name:"风是纪",
                    content:"你很胖啊的粉丝的放开手脚佛具开始对减肥，互寄送到附近开，就回到房间的，获得丰厚的说法"
                },
            ],
            count_comment:"4",
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
        edit(name,id){
            this.info1 = {
                pid:id,
                p_name:name,
                comment_type:'diary'
            }
            this.textareaStatus = true;
        },
        getshowinput(data){
            this.textareaStatus = data;
        }
    },
    mounted(){
        this.info1 = this.info
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
    margin-left: 1rem;
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
