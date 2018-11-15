<template>
    <div id="authentication_state">
        <top title="顾问认证">
        </top>
        <div class="content">
            <div class="font">审核状态:{{is_check}}</div>
            <div class="font"><span class="btn" @click="adviser_info">我的顾问资料</span></div>
        </div>
    </div>
</template>

<script>
    import top from '@/components/decorate/top_back_title.vue'
    import api from "../../api/customized"
    export default{
        name:'authentication_state',
        data(){
            return{
                is_check:'',
            }
        },
        methods:{
            //查看认证状态
            query_authentication_state(){
                api.query_authentication_state().then(res=>{
                    console.log(res);
                    if(res.data.error_code==1){
                        this.is_check=res.data.msg;
                    }else{
                        this.is_authentication=false;
                    }
                }).catch(err=>{
                    console.log(err);
                })
            },
            adviser_info(){
                this.$router.push('/adviserAuthentication');
            }
        },
        mounted(){
            this.query_authentication_state();
        },
        components:{
            top,
        }
    }
</script>
<style scoped>
    .content{
        width:90%;
        margin:.2rem auto;
        font-size:.3rem;
        box-sizing: border-box;
    }
    .font{
        font-size:.35rem;
        margin-bottom:.35rem;
    }
    .btn{
        background:#ff5370;
        color:#fff;
    }
</style>