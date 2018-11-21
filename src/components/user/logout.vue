<template>
    <div id="logout">
        <div class="item vux-1px-b" @click="logout">退出当前账号</div>
    </div>
</template>
<script>
import api from "../../api/user"
export default {
    name:'logout',
    methods:{
        logout(){
            api.logout().then(res=>{
                if(res.data.error_code==0){
                    console.log(res);
                    this.$router.push({name:'container',query:{id:'1'}});
                }
            }).catch(error=>{
                console.log(error);
            })
            window.network.logoutToApp();
        }
    }
}
</script>
<style scoped>
    #logout{
        margin-top:.2rem;
        font-size:.32rem;
    }
    .item{
        background: #fff;
        text-align: left;
        padding:.3rem 0 .3rem .15rem;
    }
</style>


