<template>
    <div class="selfinfo">
        <top v-bind:title="title"></top>
        <div class="content">
            <div class="item distance">
                <!-- <div class="left">修改头像</div> -->
                <div class="left"><img class="headimg" v-bind:src="nopre"></div>    
                <Upload :img-max-num = 1 :video-max-num= 1 :file-type=1 :sign="sign"></Upload> 
            </div>
            <div class="item">
                <span class="left">昵称:</span>
                <input type="text" class="right input" v-model="nickname">
            </div>
            <div class="item">
                <span class="left">性别:</span>
                <div class="sexradio">
                     <input type="radio" name="sex" value="0" v-model="sex" class="radio">男
                     <input type="radio" name="sex" value="1" v-model="sex" class="radio">女
                </div>
            </div>
            <div class="item">
                <span class="left">真实姓名:</span>
                <input type="text" class="right input" v-model="realname">
            </div>
            <div class="item">
                <!-- <span class="left">生日</span> -->
                <!-- <vue-datepicker-local class="right" v-model="birthday"/> -->
                <group>
                    <calendar title="生日:" v-model="birthday" disable-future></calendar>
                </group>
            </div>
            <div class="save">
                <input type="button" class="saveBtn" value="保存" @click="saveUserinfo">
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api/user";
import common from "../../widget/lib/user"
// import Bus from './../../assets/bus.js';
import top from "@/components/decorate/top_back_title.vue";
import Upload from '@/components/common/upload.vue'
import {mapState,mapGetters} from 'vuex'
import { Calendar } from 'vux'
export default {
    name: 'selfinfo',
    data(){
        return{
            nickname:'',
            headimgurl:'',
            nopre:'',
            realname:'',
            birthday:'',
            sex:'',
            title:'个人信息',
            sign:'headimg',
            temporary:''
        }
    },
    methods:{
        getNickname(argument){
            if(argument.nickname==""){
                return argument.user_name;
            }else{
                return argument.nickname;
            }
        },
        getHeadimgurl(argument){
            let headimgurl=((argument.headimgurl!=null)&&(argument.headimgurl!=""))?api.imgUrl()+argument.headimgurl:argument.defaultImg;
            return headimgurl;
        },
        getBirthday(argument){           
            if(argument.birthday!="0000-00-00"){
                return argument.birthday;
            }else{
                let date=new Date();
                let currentdate=common.formatDate(date);
                return currentdate;
            }
        },
        saveUserinfo(){
            let nickname=this.nickname;
            let sex=this.sex;
            let birthday=this.birthday;
            let realname=this.realname;
            let headimgurl=this.headimgurl;
            if(nickname==''){
                alert('昵称不能为空');
                return false;
            }
            if(birthday==''){
                alert('生日不能为空');
                return false;
            }
            if(realname==''){
                alert('真实姓名不能为空');
                return false;
            }
            let postData={
                'nickName':nickname,
                'Sex':sex,
                'Birthday':birthday,
                'realName':realname,
                'headimgurl':headimgurl
            };
            api.ajaxSetupPost('update_userinfo',postData).then(res=>{
                if(res.data.error==7){
                    alert(res.data.message);
                    this.$router.push('/login');
                }else if(res.data.error==0){
                    this.getUserinfo.nickname=nickname;
                    this.getUserinfo.sex=sex;
                    this.getUserinfo.realname=realname;
                    this.getUserinfo.birthday=birthday;
                    this.getUserinfo.headimgurl=headimgurl;
                    this.$store.dispatch('changeUserinfo',this.getUserinfo);
                    this.$router.push({path:'/home/userSetup'});
                }else{
                    alert(res.data.message);
                }
            }).catch(error=>{
                console.log(error);
            })
        }
    },
    computed:{
        ...mapGetters([
            'getUserinfo'    
        ]),
        ...mapState({
          bus:state=>state.user.bus
        })
    },
    mounted(){
        let data;
        if(this.getUserinfo){
            data=this.getUserinfo;
        }else{
            api.ajaxSetupGet('selfinfo').then(res=>{
                data=res.data;
            }).catch(error=>{
                console.log(error);
            })
        }
        this.nickname=this.getNickname(data);
        this.nopre=this.getHeadimgurl(data);
        this.headimgurl=data.headimgurl;
        this.realname=data.realname;
        this.birthday=this.getBirthday(data);
        this.sex=data.sex;
        this.bus.$on('changeUrls',params=>{
            this.headimgurl=params[0];
            this.nopre=api.imgUrl()+params[0];
        })
    },
    components:{
        Upload,
        top,
        Calendar
    }
}
</script>
<style>
    .weui-cell{
        display: block!important;
        padding-right:0!important;
        padding-left:0!important;
    }
    .vux-cell-bd{
        float:left!important;
        width:35%;
        padding-top:0.1rem;
        padding-left:0.1rem;
        box-sizing:border-box!important;
    }
    .vux-cell-primary{
        display: block!important;
        border:2px solid #ccc;
        padding:0.15rem 0 0.15rem 0.15rem !important;
        text-align: left!important;
        background:#fff!important;
        float:right!important;
        width:65%!important;
        box-sizing:border-box!important;
    }
    .weui-cells {
        font-size: .35rem!important;
    }

    .inline-calendar th {
        font-size: .5rem !important;
    }

    .inline-calendar td > span.vux-calendar-each-date {
        width: auto!important;
        height: auto!important;
        font-size: 0.4rem!important;
        line-height: 1rem!important;
    }

    .vux-prev-icon, .vux-next-icon {
        width: .3rem!important;
        height: .3rem!important;
    }

    .inline-calendar a {
        top: 0.3rem!important;
    }
    .vux-next-icon {
        top: 0.3rem!important;
    }

    .calendar-header {
        line-height: .9rem !important;
        font-size: .6rem !important;
    }
</style>   
<style scoped>
    .distance>>>.position-relative{
        padding:0.2rem;
        width:3.1rem;
        font-size: .35rem;
        float:right;
    }
    .content{
        margin-top:0.2rem;
        font-size:0.35rem;
    }
    .item{
        border-bottom:2px solid #ccc;
        background:#eef;
        padding:0.15rem;
    }
    .item:after{
        content:'';
        display:block;
        clear:both;
    }
    .distance{
        margin-bottom:0.25rem;
    }
    .left{
        padding:0.1rem;
        float:left;
        width:35%;
        box-sizing:border-box;
    }
    .right{
        float:right;
        width:65%;
    }
    .sexradio{
        width:65%;
        float:right;
        text-align: left;
    }
    .input{
        padding:0.1rem;
        font-size: .35rem;
        box-sizing:border-box;
    }
    .headimg{
        width:1rem;
        height:1rem;
        border-radius:0.5rem;
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
        background: #32CD32;
        border-radius: 0.15rem;
        font-size:.35rem;
    }
</style>
