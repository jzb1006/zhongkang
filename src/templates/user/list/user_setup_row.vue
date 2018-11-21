<template>
    <div id="user_setup_row" class="item vux-1px-b">
        <!-- <router-link :to='params.link' class="item vux-1px-b" tag="div"> -->
            <span class="text">{{params.text}}</span>
            <span class="zk-icon-fanhui1 icon next"></span>
        <!-- </router-link> -->
    </div>
</template>
<script>
export default {
    name:'user_setup_row',
    props:{
        params:{
            type:[Object]
        }
    }
}
</script>
<style scoped>
    #user_setup_row{
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


