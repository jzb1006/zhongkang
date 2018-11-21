<template>
    <div id="addReply" class="footer vux-1px-t" v-if="isHasEdit">
        <span class="reply vux-1px" @click="add_programme()">增加回复</span>
        <!-- <span class="reply vux-1px" @click="edit(result.order_sn)">修改回复</span> -->
    </div>    
</template>
<script>
import {mapGetters} from 'vuex'
export default {
    data(){
        return{
            isHasEdit:'',
        }
    },
    methods:{
        add_programme(){
            this.$router.push({path:'/customizedReply',query:{'order_sn':this.getOrderSn}});
        },
    },
    computed:{
        ...mapGetters(
            ['getOrderSn']
        )
    },
    mounted(){
        this.isHasEdit=Number(sessionStorage.getItem('isHasEdit'));
    }
}
</script>
<style scoped>
    .footer{
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 0.2rem 0px;
        background: #fff;
    }
    .reply{
        height: 0.6rem;
        font-size: 0.22rem;
        float: right;
        color: #000000;
        line-height: 0.6rem;
        border-radius: 0.04rem;
        text-align: center;
        margin-left: 0.1rem;
        padding: 0.1rem;
        margin-right:0.15rem;
    }
</style>


