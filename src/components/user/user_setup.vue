<template>
    <div id="setup">
        <top title="设置"></top>
        <div class="content">
            <router-link to='/home/userSelfinfo' class="item vux-1px-b" tag="div">个人信息</router-link>
            <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-if="getUserinfo.mobile_phone!=''">修改手机号</router-link>
            <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-else>绑定手机号</router-link>
            <router-link to='/home/userEditpassword' class="item vux-1px-b" tag="div">修改密码</router-link>
            <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-if="getUserinfo.email!=''&&getUserinfo.email!=null">修改邮箱</router-link>
            <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-else>绑定邮箱</router-link>
            <br>
            <div class="item vux-1px-b" @click="logout">退出当前账号</div>
        </div>
    </div>
</template>

<script>
import api from "../../api/setup"
import common from "../../widget/lib/user"
import top from "@/components/decorate/top_back_title.vue";
import {mapState,mapGetters} from 'vuex'
export default {
    name: 'setup',
	methods: {
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
    #setup{
        background:#f0f0f0; 
    }
    .content{
        margin-top:0.2rem;
        font-size:0.32rem;
    }
    .item{
        background: #fff;
        text-align: left;
        padding:.3rem 0 0.3rem 0.15rem;
    }
</style>
