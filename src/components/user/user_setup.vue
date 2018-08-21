<template>
    <div id="setup">
        <top title="设置"></top>
        <div class="content">
            <div class="metext" @click="selfinfo">个人信息</div>
            <div class="metext" v-if="getUserinfo.mobile_phone!=''" @click="editphone">修改手机号</div>
            <div class="metext" v-else @click="editphone">绑定手机号</div>
            <div class="metext" @click="editPassword">修改密码</div>
            <div class="metext" v-if="getUserinfo.email!=''&&getUserinfo.email!=null" @click="editEmail">修改邮箱</div>
            <div class="metext" v-else @click="editEmail">绑定邮箱</div>
            <br>
            <div class="metext" @click="logout">退出当前账号</div>
        </div>
    </div>
</template>

<script>
import api from "../../api/user"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue";
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'setup',
	methods: {
        selfinfo(){
            common.checkLogin(this,'/home/userSelfinfo');
        },
        editphone(){
            common.checkLogin(this,'/home/userEditphone');
        },
        editPassword(){
            common.checkLogin(this,'/home/userEditpassword');
        },
        editEmail(){
            common.checkLogin(this,'/home/userEditemail');
        },
        logout(){
            api.ajaxSetupGet('logout').then(res=>{
                this.$router.push({path:'/'});
            }).catch(error=>{
                console.log(error);
            })
        }
	},
    computed:{
        ...mapGetters([
          'getUserinfo'
        ])
    },
    components:{
        top
    }
}
</script>

<style scoped>
    .content{
        margin-top:0.2rem;
        font-size:0.35rem;
    }
    .metext{
        text-align: left;
        padding:0.25rem 0 0.25rem 0.15rem;
        border-bottom:2px solid #ccc;
        background-color: #eef;
    }
</style>
