<template>
    <div id="modify_info" class="content">
            <div class="item vux-1px-b">
                <span class="left">昵称:</span>
                <div class="vux-1px right"><input type="text" class="input" v-model="nickname" @input="getNickName(nickname)"></div>
                <div class="clear"></div>
            </div>
            <div class="item vux-1px-b">
                <span class="left">性别:</span>
                <div class="sexradio">
                     <label><input type="radio" name="sex" value="0" v-model="sex" class="radio">男</label>
                     <label><input type="radio" name="sex" value="1" v-model="sex" class="radio">女</label>
                </div>
                <div class="clear"></div>
            </div>
            <div class="item vux-1px-b">
                <div class="left">真实姓名:</div>
                <div class="vux-1px right"><input type="text" class="input" v-model="realname" @input="getRealName(realname)"></div>
                <div class="clear"></div>
            </div>
            <group class="birth">
                <calendar title="生日:" v-model="birthday" disable-future @on-change="changeBirthday(birthday)"></calendar>
            </group>
            <!-- <div class="save">
                <input type="button" class="saveBtn" value="保存" @click="saveUserinfo">
            </div> -->
        </div>
</template>
<script>
import { Calendar,Group } from 'vux'
import Bus from "@/assets/bus.js"
export default {
    name:'modify_info',
    data(){
        return {
            nickname:'',
            realname:'',
            birthday:'',
            sex:'',
        }
    },
    props:{
        params:{
            type:[Object]
        }
    },
    watch:{
        params(newVal,oldVal){
            this.nickname=newVal.nickname;
            this.realname=newVal.realname;
            this.birthday=newVal.birthday;
            this.sex=newVal.sex;
        },
        sex:function(newVal,oldVal){
            Bus.$emit('getSex',newVal);
        }
    },
    methods:{
        getNickName(nickname){
            Bus.$emit('getNickName',nickname);
        },
        getRealName(realname){
            Bus.$emit('getRealName',realname);
        },
        changeBirthday(birthday){
            Bus.$emit('changeBirthday',birthday);
        },
    },
    mounted(){

    },
    components:{
        Calendar,
        Group,
    }
}
</script>
<style scoped>
    .text{
        font-size:.3rem;
        display:inline-block;
        background: #ff5370;
        color:#fff;
        border-radius:2px;
        padding:0.15rem 0.15rem;
        border-radius: 0.15rem;
        margin-top:.1rem;
    }
    .content{
        margin-top:0.2rem;
        font-size:0.3rem;
    }
    .item{
        padding:0.25rem 0 0.25rem 0.15rem;
        background: #fff;
    }
    .clear{
        content:'';
        display:block;
        clear:both;
    }
    .left{
        padding:0.1rem;
        float:left;
        width:35%;
        box-sizing:border-box;
    }
    .right{
        float:left;
        width:62%;
    }
    .sexradio{
        width:65%;
        float:right;
        text-align: left;
    }
    .input{
        position: relative;
        z-index:100;
        display:block;
        width:98%;
        margin:.1rem auto;
        padding:0.1rem;
        font-size: .3rem;
        box-sizing:border-box;
    }
    .radio{
        width:0.3rem;
        height:0.3rem;
    }
    .save{
        text-align: center;
        margin-top:0.25rem;
    }
    .saveBtn{
        width:50%;
        padding:0.15rem 0.15rem;
        background: #ff5370;
        color:#fff;
        border-radius: 0.15rem;
        font-size:.3rem;
    }
</style>


