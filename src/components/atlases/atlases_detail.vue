<template>
    <div id="atlasesDetail">
        <div class="detail_footer clearfix">
            <div class="comment">
                <commentInput></commentInput>
            </div>
            <div class="other">
                <span class="zk-icon-edit">1</span>
                <span class="zk-icon-xinaixin">2</span>
                <span class="zk-icon-fenxiang">3</span>
            </div>
        </div>
    </div>
</template>
<script>
import commentInput from "@/components/comment/comment_input.vue";
export default {
    data() {
        return {
            imgs: [
                {
                    url: "http://covteam.u.qiniudn.com/ka2.jpg",
                    title: "pic1"
                },
                {
                    url: "http://covteam.u.qiniudn.com/poster.png",
                    title: "pic2"
                }
            ]
        };
    },
    components: {
        commentInput
    }
};
</script>
<style scoped>
#atlasesDetail {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 4002;
    color: #fff;
    background: #fff;
}

#atlasesDetail .detail_footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
        z-index: 4002;
}
#atlasesDetail .detail_footer .comment {
    float: left;
    width: 49%;
}
#atlasesDetail .detail_footer .other {
    float: right;
    width: 49%;
    display: flex;
    justify-content: space-around;
    padding: 0.21rem 0;
}
#atlasesDetail .detail_footer .other span {
    display: inline-block;
}
</style>

