<template>
	<div id="model">
		<commentInput tip="哈哈哈哈哈" :info=info></commentInput>
	</div>
</template>
<script>
import apiCom from "@/api/comment";
import commentInput from "./comment_input";
export default {
    data() {
        return {
            info: {
				p_id: "12",//文章的作者id
				p_name:"多大的",//文章的作者
				u_id: "2360",//会员id
				u_name:"闪光",//会员名字
				comment_author:"小黄",//用户名字
                comment_post_id: "19",//后台评论类型id
				comment_form: "diary",//属于哪种类型的评论，比如日记评论，医生评论，图片评论等
				comment_form_id: "12",//评论文章的id
            }
        };
    },
    components: {
        commentInput
	}
};
</script>
<style scoped>
</style>
