<template>
    <div id="list_footer">
        <div class="foot">
            <router-link :to="{name:'container',query:{id:5}}">
                <span class="title">进入康复日记</span>
                <span class="icon">></span>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {};
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
