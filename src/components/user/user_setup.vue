<template>
    <div id="setup">
        <top title="设置"></top>
        <div class="content">
            <router-link to='/home/userSelfinfo' class="item vux-1px-b" tag="div">
                <span class="text">个人信息</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-if="getUserinfo.mobile_phone!=''">
                <span class="text">修改手机号</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-else>
                <span class="text">绑定手机号</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to='/home/userEditpassword' class="item vux-1px-b" tag="div">
                <span class="text">修改密码</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-if="getUserinfo.email!=''&&getUserinfo.email!=null">
                <span class="text">修改邮箱</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-else>
                <span class="text">绑定邮箱</span>
                <span class="zk-icon-fanhui1 icon next"></span>
            </router-link>
            <br>
            <div class="item vux-1px-b" @click="logout">退出当前账号</div>
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
        logout(){
            api.logout().then(res=>{
                if(res.data.error_code==0){
                    console.log(res);
                    this.$router.push({path:'/'});
                }
            }).catch(error=>{
                console.log(error);
            })
            window.network.logoutToApp();
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
        margin-top:.2rem;
        font-size:.32rem;
    }
    .item{
        background: #fff;
        text-align: left;
        padding:.3rem 0 .3rem .15rem;
    }
    .text{
        display:inline-block;
        width:90%;
    }
    .next{
        display:inline-block;
    }
</style>
