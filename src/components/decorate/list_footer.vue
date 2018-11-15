<template>
    <div id="list_footer">
        <div class="foot" v-if="params.title">
            <router-link :to="{name:'container',query:{id:params.to_cid}}">
                <span class="title">{{params.title}}</span>
                <span class="icon">></span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name:"list_footer",
    props:{
        params:{
            default:function(){
                return {
                    to_cid:'',
                    title:'',
                }
            }
        }
    }
};
</script>

<style scoped>
#list_footer .foot {
    padding: 0.3rem 0;
    font-size: 0.3rem;
    /* font-weight: 550; */
    text-align: center;
}
#list_footer .foot span.icon {
    display: inline-block;
    vertical-align: bottom;
}
#list_footer .foot span.title {
    /* line-height: .4rem; */
}
</style>
