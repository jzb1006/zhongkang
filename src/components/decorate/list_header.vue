<template>
    <div id="list_header">
        <div class="head">
            <span class="icon"></span>
            <span class="title">{{title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:'康复日志'
        }
    }
}
</script>

<style scoped>
#list_header .head{
    padding: .3rem 0;
    font-size: .35rem;
    font-weight: 550;
}
#list_header .head span.icon{
    display: inline-block;
    width: .5rem;
    height: .3rem;
    vertical-align: bottom;
    background-color: rgb(255, 83, 112);
}
#list_header .head span.title{
    /* line-height: .5rem; */
}
</style>
