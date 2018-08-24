<template>
    <div id="selfinfo">
        <top v-bind:title="title"></top>
        <div class="content">
            <div class="item distance">
                <!-- <div class="left">修改头像</div> -->
                <div class="left"><img class="headimg" v-bind:src="nopre"></div>    
                <Upload :img-max-num = 1 :video-max-num= 1 :file-type=1 :sign="sign"><span class="text">修改头像</span></Upload> 
                <div class="clear"></div>
            </div>
            <div class="item">
                <span class="left">昵称:</span>
                <input type="text" class="right input" v-model="nickname">
                <div class="clear"></div>
            </div>
            <div class="item">
                <span class="left">性别:</span>
                <div class="sexradio">
                     <label><input type="radio" name="sex" value="0" v-model="sex" class="radio">男</label>
                     <label><input type="radio" name="sex" value="1" v-model="sex" class="radio">女</label>
                </div>
                <div class="clear"></div>
            </div>
            <div class="item">
                <span class="left">真实姓名:</span>
                <input type="text" class="right input" v-model="realname">
                <div class="clear"></div>
            </div>

                <!-- <span class="left">生日</span> -->
                <!-- <vue-datepicker-local class="right" v-model="birthday"/> -->
                <group>
                    <calendar title="生日:" v-model="birthday" disable-future></calendar>
                </group>

            <div class="save">
                <input type="button" class="saveBtn" value="保存" @click="saveUserinfo">
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api/setup";
import common from "../../widget/lib/user"
// import Bus from './../../assets/bus.js';
import top from "@/components/decorate/top_back_title.vue";
import Upload from '@/components/common/upload.vue'
import {mapState,mapGetters} from 'vuex'
import { Calendar,Group } from 'vux'
import Utils from '@/widget/lib/Utils'

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
            api.update_userinfo(postData).then(res=>{
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
        },
        dpr() {
			(function(e, l) {
			var c, k, d, f = e.document,
			g = f.documentElement,
			h = l.flexible || (l.flexible = {});
			(function() {
			var a, b = f.querySelector('meta[name="viewport"]');
			c = e.devicePixelRatio || 1;
			a = 1;
			g.setAttribute("data-dpr",0);
			a = "width=device-width, initial-scale=" + a + ", minimum-scale=" + a + ", maximum-scale=" + a + ", user-scalable=no";
			b ? b.setAttribute("content", a) : (b = f.createElement("meta"), b.setAttribute("name", "viewport"), b.setAttribute("content", a), (f.head || g.firstElementChild).appendChild(b))
			})();
			})(window, window.FT || (window.FT = {}));
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
        Calendar,
        Group
    }
}
</script>
<style>
@import url("./../../assets/css/calandar.css");
</style>
<style scoped>
    #selfinfo{
        background:#f0f0f0;
    }
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
        /* text-align: left; */
        padding:0.25rem 0 0.25rem 0.15rem;
        background: #fff;
        position: relative;
        margin-bottom:0.08rem;
    }
    .item:before{
        position: absolute;
        left: 0;
        bottom: -2px;
        right: 0;
        width:100%;
        height: 2px;
        border-bottom: 2px solid #ccc;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;
        -webkit-transform: scaleY(0.5);
        transform: scaleY(0.5);
    }
    .clear{
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
        border:1px solid #ccc;
        padding:0.1rem;
        font-size: .3rem;
        box-sizing:border-box;
        
        /* background: -webkit-linear-gradient(-90deg, #000 1px, rgba(0, 0, 0, 0)
            1px, rgba(0, 0, 0, 0) 100%);
        background: -moz-linear-gradient(-90deg, #000 1px, rgba(0, 0, 0, 0) 1px,
            rgba(0, 0, 0, 0) 100%);
        background: linear-gradient(180deg, #000 1px, rgba(0, 0, 0, 0) 1px,
            rgba(0, 0, 0, 0) 100%);
        background-size: 100% 1.7em; */

        /* background: -webkit-linear-gradient(left top, rgba(0, 0, 0, .5) 1px,#fff, rgba(0, 0, 0, .5) 1px); /* Safari 5.1 - 6.0 */
        /*background: -o-linear-gradient(bottom right, rgba(0, 0, 0, .5) 1px, #fff, rgba(0, 0, 0, .5) 1px); /* Opera 11.1 - 12.0 */
        /*background: -moz-linear-gradient(bottom right,rgba(0, 0, 0, .5) 1px,#fff,  rgba(0, 0, 0, .5) 1px); /* Firefox 3.6 - 15 */
        /*background: linear-gradient(to bottom right, rgba(0, 0, 0, .5) 1px, #fff, rgba(0, 0, 0, .5) 1px); /* 标准的语法（必须放在最后） */
        /*background-size: 100% 1.7em; */
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
        background: #ff5370;
        color:#fff;
        border-radius: 0.15rem;
        font-size:.3rem;
    }
</style>
