<template>
    <div id="commentInput">
        <p class="input_show" @click="show_textarea"><span class="zk-icon-edit"></span>{{tip}}</p>
        <div class="shade" v-show="show_input" @click="hidden_input">

        </div>
        <div class="input_box" v-show="show_input">
                <textarea id="content" ref="content" placeholder="写评论" :value="'@'+info.p_name" v-focus></textarea>
                <p class="clearfix"><span class="zk-icon-iconfonticon5"></span><span class="zk-icon-tukuxiangce"></span><span class="submit" @click="submit_comment">发表评论</span></p>
        </div>
    </div>
</template>
<script>
export default {
    props:{
        tip:{
            default:"写下你的评论..."
        },
        textareaStatus:Boolean,
        info:Object
    },
    data(){
        return{
            show_input:false
        }
    },
    watch:{
        textareaStatus(val,oldval){
            this.show_input = val;
        }
    },
    directives: {
      focus:function (el) {
          el.focus()
        }
    },
    methods:{
        show_textarea(){
            this.show_input = true;
        },
        submit_comment(){
            this.show_input  = false;
            this.toParent();
        },
        hidden_input(){
            this.show_input  = false;
            this.toParent();
        },
        toParent(){
            this.$emit('toshowinput',this.show_input);
        }
    },
    mounted(){
        this.show_input = this.textareaStatus;
    }
};
</script>
<style scoped>
#commentInput {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 1.5rem;
    display: inline;
    width: 100%;
    z-index: 1000;
}
#commentInput .input_show{
    font-size: .3rem;
    color: #aaa;
    margin: .1rem .2rem;
    padding: .1rem .2rem;
    border: 1px solid #ccc;
    border-radius: .1rem;
    background-color: #cccccc45;
}
#commentInput>div.shade{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #00000050;
    z-index: 1;
}
#commentInput .input_box{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    width:100%;
    text-align: center;
    padding-top: .2rem;
    background-color: #fff3f3;
    z-index: 666;
}
#commentInput .input_box textarea {
    font-size: 0.3rem;
    width: 90%;
    height: 1rem;
    border: 1px solid #000;
    background-color: #cccccc11;
}
#commentInput .input_box p{
    font-size: .25rem;
    text-align: left;
    padding: .2rem 0;
}
#commentInput .input_box p span{
    margin: 0 .3rem;
}
#commentInput .input_box p span.submit{
    color: #17b117b7;
    float: right;
    padding: .1rem .2rem;
    border: 1px solid #17b117b7;
}
</style>
