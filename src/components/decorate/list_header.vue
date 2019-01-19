<template>
    <div id="list_header">
        <div class="head" v-if="params.title">
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
    padding:.3rem 0.2rem 0;
    font-size: 0.35rem;
    font-weight: 550;
}
</style>
