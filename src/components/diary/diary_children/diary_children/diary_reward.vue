<template>
    <div id="diary_reward">
        <top title="奖励"></top>
        <ul class="guide clearfix">
            <li class="item" :class="{active:showPage == 'standard'}" @click="changShow('standard')">奖励标准</li>
            <li class="item" :class="{active:showPage == 'flow'}" @click="changShow('flow')">申请流程</li>
            <li class="item" :class="{active:showPage == 'notice'}" @click="changShow('notice')">申请须知</li>
        </ul>
        <div class="content">
            <div v-show="'standard' == showPage" class="standard" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
                <section class="item">
                    <p>• 术前照片要求</p>
                    <p class="detail">
                        术前：3张照片（正面、侧面45°、侧面90°各一张）；<br> 脸部项目请提供全脸照片，非脸部项目请提相关部位照片；除私密部位必须打码，其它所有部位照片要求无马赛克、无遮挡。
                    </p>
                </section>
                <section class="item">
                    <p>• 日记更新要求</p>
                    <p class="detail">
                        首篇日记：与手术项目相关至少300字，5张本人照片；<br> (可描述医院环境、术前心理状态、医生护士的服务、自己的感受和对项目的了解等）
                        <br> 更新日记：与手术项目相关至少200字，5张本人照片；
                        <br> 每篇日记需至少相隔5天（按发表日期算）脸部项目需全脸无码照片，私密部位注意打码。
                    </p>
                </section>
                <section class="item">
                    <p>• 日记奖励金额</p>
                    <p class="detail">
                        美丽预约价≤1000元，奖励金额为100元；美丽预约价＞1000元，奖励金额为美丽预约价的10%，封顶800元；（美丽预约价=预付金+到院付-红包抵扣）
                    </p>
                </section>
                <section class="item">
                    <p>• 篇数计算</p>
                    <p class="detail">
                        总篇数 为“(美丽预约价/500)+1”篇（篇数少于5篇，需要至少5篇，超出15篇的只需写15篇即可）日记不按单篇计算奖励。
                    </p>
                </section>
            </div>
            <div v-show="'flow' == showPage" class="flow" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
                <p class="item">
                    <span class="num">1</span>
                    <span class="text">美丽APP——我的——待写日记 找到相应订单开始写日记。</span>
                </p>
                <p class="item">
                    <span class="num">2</span>
                    <span class="text">术前：3张照片（全脸正面、侧面45°、侧面90°各一张）。<br><br> 脸部项目请提供全脸照片，非脸部项目请提相关部位照片；除私密部位必须打码，其它所有部位照片要求无马赛克、无遮挡。 <br><br> 首篇日记：与手术项目相关至少300字+5张本人照片；
                        <br><br> 更新日记：与手术项目相关至少200字+5张本人照片；
                        <br><br> 每篇日记需至少相隔5天（按发表日期算）
                    </span>
                </p>
                <p class="item">
                    <span class="num">3</span>
                    <span class="text">按规则完成后，点击日记右上角“申请返现”提交返现。</span>
                </p>
                <p class="item">
                    <span class="num">4</span>
                    <span class="text">申请后3个工作日私信通知结果。</span>
                </p>
                <p class="item">
                    <span class="num">5</span>
                    <span class="text">审核驳回后需要按照规则继续更新到合格篇数再次提交。</span>
                </p>
                <p class="item">
                    <span class="num">6</span>
                    <span class="text">审核通过的日记，奖励将在3个工作日内发放至“美丽钱包”用户可以进行提现到支付宝或购买商品使用。</span>
                </p>

                <div class="note">
                    注意：<br> 提现到支付宝一般需要3——7个工作日，节假日延后处理。
                </div>
                <div class="note">*以上解释权归美丽所有</div>
            </div>
            <div v-show="'notice' == showPage" class="notice" style="transform-origin: 0px 0px 0px; opacity: 1; transform: scale(1, 1);">
                <ul>
                    <li>
                        <span>1.</span>如果宝宝所发日记未关联订单/匿名日记/私密日记/负面以及投诉日记，不参与日记奖励；</li>
                    <li>
                        <span>2.</span>日记奖励仅限于针剂类、手术类，金额500元以上的项目，如果宝宝对美丽美淘商品写评测，不参与日记奖励；</li>
                    <li>
                        <span>3.</span>如果宝宝参与线上免费模特招募所写的日记，不能参加日记奖励活动；</li>
                    <li>
                        <span>4.</span>日记需关联产品订单，且日记内容需与订单相符，否则无法获得日记奖励；</li>
                    <li>
                        <span>5.</span>如果宝宝同一 商品/项目 购买多次，所写日记仅做一次日记奖励（比如宝宝同一部位一次打了三针玻尿酸，多次购买瘦脸针、瘦腿针等只有一次日记奖励的机会，不同医院购买项目相同也只算做一次）；</li>
                    <li>
                        <span>6.</span>已经获得日记奖励的，擅自删除图片或者整篇日记，将失去参与日记奖励活动资格；</li>
                    <li>
                        <span>7.</span>所有日记需本人真实经历，不能抄袭，如被举报查实，将取消一切福利资格；</li>
                    <li>
                        <span>8.</span>美丽的【日记奖励】可与医院发起的【日记返现】活动同时使用；</li>
                    <li>
                        <span>9.</span>日记内容要与所做项目相关，如多篇日记项目及内容雷同，内容为科普，百度搜索过来的，质量不高等将无法获得日记奖励；</li>
                    <li>
                        <span>10.</span>理疗类、面诊预约金、押金专拍、部分牙齿类，不具有分享价值和前后对比无大改变的项目不参与日记返现（如刮痧、洗牙、拔罐、足疗、除腋臭、中医减肥、打耳洞等）；私密整形因需要对图片打码或受文字限制，暂时不参加日记返现。</li>
                    <li>
                        <span>11.</span>一个日历只能绑定一个订单且参加一次返现，宝宝如果参加美丽其他活动拿过奖励，且奖励与返现订单相冲突，以其他已获得活动奖励为主，不做二次返现。</li>
                    <li>
                        <span>12.</span>非手术项目购买使用后超过3个月未开始写日记，被视为自动放弃活动资格。</li>
                </ul>
                <p class="note">＊以上解释权归美丽所有</p>
            </div>
        </div>
    </div>
</template>
<script>
import top from "@/components/decorate/top_back_title.vue";
export default {
    data() {
        return {
            showPage: "standard"
        };
    },
    methods: {
        changShow(data) {
            this.showPage = data;
        }
    },
    components:{
        top
    }
};
</script>
<style scoped>
#diary_reward{
    margin-bottom: 1rem;
}
#diary_reward p.top{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: .5rem;
    padding: .3rem 0;
    text-align: center;
    background-color: rgb(255, 83, 112);
}
#diary_reward p.top .back{
    float: left;
}
ul.guide {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    font-size: .3rem;
    list-style: none;
    padding: 0;
}
ul.guide li.item {
    padding: 0.3rem 0;
    font-size: 0.3rem;
    text-align: center;
    border: 0px solid #ccc;
    border-left: 0px;
}
.active {
    background-color: #17a2b875;
    color: #fff;
}

div.standard,
div.flow,
div.notice {
    font-size: 0.3rem;
    padding: 0.5rem 0;
    margin-bottom: 1rem;
}
div.standard .item{
    margin-top: .5rem;
    padding: 0 .5rem;
    line-height: .4rem;
    font-size:.3rem;
}
div.flow p.item{
    margin-top: .5rem 0;
    padding:0 .5rem;
}
div.flow p.item span.text{
    font-size: .3rem;
    line-height: .45rem;
    font-weight: 300;
}
div.flow div.note{
    padding:0 .5rem;
}
div.notice ul {
    padding:0 0.5rem;
}
div.notice ul li {
    margin-top: .6rem;
}
div.notice ul li span {
    line-height: .5rem;
    font-weight: 550;
    margin-right: 0.3rem;
}
</style>

