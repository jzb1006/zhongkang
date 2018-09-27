<template>
    <div id="atlasesHead">
        <div class="head">
            <div class="headimg">
                <img src="http://g.hiphotos.baidu.com/image/h%3D300/sign=06c07b158b18367ab28979dd1e728b68/0b46f21fbe096b6340b5e86c01338744ebf8ac5a.jpg" alt="">
            </div>
            <span class="name">军婚斌子</span>
            <span class="fans">123粉丝</span>
            <span class="follow">
                关注
            </span>
            <span class="more">···</span>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
    #atlasesHead .head {
    position: fixed;
    top: 0;
    left: 0;
    right: 2rem;
    color: #fff;
    margin: 0.1rem 0;
    z-index: 4002;
}
#atlasesHead .head span {
    position: absolute;
    font-size: 0.3rem;
}
#atlasesHead .head span.close,
span.more {
    top: 0.25rem;
}
#atlasesHead .head span.close {
    left: 0.2rem;
}
#atlasesHead .head span.follow {
    top: 0.15rem;
    display: inline-block;
    right: 1rem;
    color: #fff;
    padding: 0.1rem 0.2rem;
    border: 1px solid #ccc;
    border-radius: 0.1rem;
    background-color: rgb(146, 17, 34);
}
#atlasesHead .head span.more {
    right: .3rem;
}
#atlasesHead .head .headimg {
    width: 0.8rem;
    height: 0.8rem;
    margin-left: 0.3rem;
    border-radius: 1rem;
    overflow: hidden;
}
#atlasesHead .head .headimg img {
    max-width: 100%;
    min-height: 100%;
}
#atlasesHead .head span.name {
    left: 1.3rem;
    top: 0.1rem;
}
#atlasesHead .head span.fans {
    left: 1.3rem;
    top: 0.5rem;
    font-size: 0.25rem;
}
</style>

