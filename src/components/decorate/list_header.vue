<template>
    <div id="list_header">
        <div class="head" v-if="params.title">
            <span class="icon"></span>
            <span class="title">{{params.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "list_header",
    props: {
        params: {
            default: function() {
                return {
                    title: ""
                };
            }
        }
    }
};
</script>

<style scoped>
#list_header .head {
    padding: 0.3rem 0;
    font-size: 0.35rem;
    font-weight: 550;
}
#list_header .head span.icon {
    display: inline-block;
    width: 0.5rem;
    height: 0.3rem;
    vertical-align: bottom;
    background-color: rgb(255, 83, 112);
}
#list_header .head span.title {
    /* line-height: .5rem; */
}
</style>
