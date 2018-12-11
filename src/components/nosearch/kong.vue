<template>
    <div class="kong">

        <div class="kong-wrap"><img :src="nosearch" alt="" class="empty">
            <p>{{text}}</p>
        </div>

    </div>
</template>
<script>
import nosearch from "@/assets/nosearch.png";
export default {
    name:"kong",
    data() {
        return {
            nosearch
        };
    },
    props: {
        text: {
            type: String,
            default: "null"
        }
    }
};
</script>
<style scoped>
.kong {
    padding-top: .5rem;
    background-color: #fff;
}
.kong .kong-wrap {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: column;
    -ms-flex-flow: column;
    flex-flow: column;
    text-align: center;
    line-height: 1.5;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 0.3rem;
    color: #aaa;
}
.kong .empty {
    width: 2.26rem !important;
    height: 2.26rem !important;
    margin-bottom: 0.2rem !important;
}
</style>