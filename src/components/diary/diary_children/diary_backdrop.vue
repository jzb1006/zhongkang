<template>
    <div id="diary_backdrop">
        <DiaryBackdropUser></DiaryBackdropUser>
        <DiaryBackdropFormerly></DiaryBackdropFormerly>
        <DiaryBackdropContent></DiaryBackdropContent>
    </div>
</template>

<script>
import DiaryBackdropUser from "./diary_backdrop_user";
import DiaryBackdropFormerly from "./diary_backdrop_formerly";
import DiaryBackdropContent from "./diary_backdrop_content";
export default {
    name: "diaryBackdrop",
    components: {
        DiaryBackdropUser,
        DiaryBackdropContent,
        DiaryBackdropFormerly
    }
};
</script>
<style>
/* 主流浏览器清除浮动 */
.clearfix::after {
    display: block;
    clear: both;
    visibility: hidden;
    height: 0;
    overflow: hidden;
    content: ".";
}
/* IE6/7 清除浮动 */
.clearfix{
	zoom:1;
}
</style>

<style scoped>
#diary_backdrop {
    padding: 0;
}
</style>
