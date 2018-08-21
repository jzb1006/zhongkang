<template>
    <div id="diary_head">
        <p>
            <router-link :to="{name:'diaryBackdropList'}">
            <span>写日记</span>
            </router-link>
             <router-link :to="{name:'FMain'}">
            <span>医导</span>
             </router-link>
        </p>
    </div>

</template>

<script>
export default {};
</script>

<style scoped>
#diary_head p {
    text-align: right;
}
#diary_head p span {
    font-size: 0.3rem;
    padding: 0.1rem 0.3rem;
    border: 1px solid rgb(255, 83, 112);
}
</style>

