<template>
    <div id="setup_con">
        <!-- <router-link to='/home/userSelfinfo' class="item vux-1px-b" tag="div">
            <span class="text">个人信息</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link> -->
        <userSetupRow :params="params1"></userSetupRow>
        <userSetupRow :params="params2"></userSetupRow>
        <userSetupRow :params="params3"></userSetupRow>
        <userSetupRow :params="params4"></userSetupRow>
        <userSetupRow :params="params5"></userSetupRow>
        <userSetupRow :params="params6"></userSetupRow>
        <!-- <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-if="getUserinfo.mobile_phone!=''">
            <span class="text">修改手机号</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link>
        <router-link to='/home/userEditphone' class="item vux-1px-b" tag="div" v-else>
            <span class="text">绑定手机号</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link> -->
        <!-- <router-link to='/home/userEditpassword' class="item vux-1px-b" tag="div">
            <span class="text">修改密码</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link> -->
        <!-- <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-if="getUserinfo.email!=''&&getUserinfo.email!=null">
            <span class="text">修改邮箱</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link>
        <router-link to='/home/userEditemail' class="item vux-1px-b" tag="div" v-else>
            <span class="text">绑定邮箱</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        </router-link> -->
    </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex'
import userSetupRow from "@/components/user/row/userSetupRow.vue"
export default {
    name:'setup_con',
    data(){
        return{
            // params1:{
            //     link:'/home/userSelfinfo',
            //     text:'个人信息',
            //     isShow:true,
            // },
            // params2:{
            //     link:'/home/userEditphone',
            //     text:'修改手机号',
            //     isShow:this.getUserinfo.mobile_phone!='',
            // },
            // params3:{
            //     link:'/home/userEditphone',
            //     text:'绑定手机号',
            //     isShow:this.getUserinfo.mobile_phone=='',
            // },
            // params4:{
            //     link:'/home/userEditpassword',
            //     text:'修改密码',
            //     isShow:true,
            // },
            // params5:{
            //     link:'/home/userEditemail',
            //     text:'修改邮箱',
            //     isShow:this.getUserinfo.email!=''&&this.getUserinfo.email!=null,
            // },
            // params6:{
            //     link:'/home/userEditemail',
            //     text:'绑定邮箱',
            //     isShow:this.getUserinfo.demail==''||this.getUserinfo.email==null,
            // }
        }
    },
    computed:{
        ...mapGetters([
          'getUserinfo'
        ]),
        params1(){
            return {
                link:'/home/userSelfinfo',
                text:'个人信息',
                isShow:true,
            }
        },
        params2(){
            return {
                link:'/home/userEditphone',
                text:'修改手机号',
                isShow:this.getUserinfo.mobile_phone!='',
            }
        },
        params3(){
            return {
                link:'/home/userEditphone',
                text:'绑定手机号',
                isShow:this.getUserinfo.mobile_phone=='',
            }
        },
        params4(){
            return {
                link:'/home/userEditpassword',
                text:'修改密码',
                isShow:true,
            }
        },
        params5(){
            return {
                link:'/home/userEditemail',
                text:'修改邮箱',
                isShow:this.getUserinfo.email!=''&&this.getUserinfo.email!=null,
            }
        },
        params6(){
            return {
                link:'/home/userEditemail',
                text:'绑定邮箱',
                isShow:!(this.getUserinfo.email!=''&&this.getUserinfo.email!=null),
                // isShow:this.getUserinfo.demail==''||this.getUserinfo.email==null,
            }
        },

        // params1(){
        //     if(this.getUserinfo.mobile_phone!=''){
        //         return {
        //             link:'/home/userEditphone',
        //             text:'修改手机号',
        //         }
        //     }else{
        //         return {
        //             link:'/home/userEditphone',
        //             text:'绑定手机号',
        //         }
        //     }
        // },
        // params3(){
        //     if(this.getUserinfo.email!=''&&this.getUserinfo.email!=null){
        //         return {
        //             link:'/home/userEditemail',
        //             text:'修改邮箱',
        //         }
        //     }else{
        //         return{
        //             link:'/home/userEditemail',
        //             text:'绑定邮箱',
        //         }
        //     }
        // }
    },
    components:{
        userSetupRow
    }
}
</script>
<style scoped>
    #setup_con{ 
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


