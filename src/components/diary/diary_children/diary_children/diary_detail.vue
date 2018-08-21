<template>
	<div id="diary_detail">
		<DiaryDetailTop :bid=bid></DiaryDetailTop>
		<div v-for="(diary,index) in diaryContent" v-if="index == 0">
			<div class="content">
				<span class=" icon_days fl">
					<span>第{{getDays(diary.time,diary.course_time)}}天</span>
				</span>
				<p>{{diary.content}}</p>
			</div>
			<div class="media_list">
				<div v-for="media in mediaList">
					<img v-for="url in getMediaUrl(media)" v-if="checkImgType(url)" v-lazy="getImgUrl()+url">
					<video v-else-if="!checkImgType(url)" :src="getImgUrl()+url" controls="controls"></video>
				</div>
			</div>
			<div class="bottom">
				<div class="bottom_see clearfix">
					<div class="col_4">
						<span><i class="zk-icon-liulan"></i>-{{diary.view_count}}</span>
					</div>
					<div class="col_4">
						<span><i class="zk-icon-dianzan"></i>-{{diary.favor}}</span>
					</div>
					<div class="col_4">
						<span><i class="zk-icon-edit"></i>-{{commentNum}}</span>
					</div>
				</div>
			</div>
		</div>
		<div class="footer" @click="favor()" v-if="username">
            <div class="click_zan">
                赞
            </div>
		</div>
	</div>
</template>
<script>
import api from "@/api/diary";
import DiaryDetailTop from "./diary_detail_top";
import Loading from "@/widget/loading";
export default {
    data() {
        return {
            diaryContent: [],
            commentNum: 0,
            bid: "",
            did: "",
            mediaList: [],
            footer_in:false,
            username:"",
        };
    },
    components: {
        DiaryDetailTop
    },
    methods: {
        $_ajax_getDiaryDetail: function() {
            var self = this;
            this.did = this.$route.query.did;
            this.bid = this.$route.query.bid;
            api
                .ajaxSearch("diary_detail_diary", { did: this.did })
                .then(res => {
                    console.log(res);
                    self.diaryContent = res.data.diary;
                    self.mediaList = res.data.media;
                    self.username = res.data.my_name[0].user_name;
                    Loading.stop();
                    // this.commentNum = res.data.comment_num.count(comment_ID);
                })
                .catch(error=>{
                    Loading.stop();
                });
        },
        getImgUrl() {
            return api.imgUrl();
        },
        getMediaUrl(data) {
            let arr = data.split(",");
            return arr;
        },
        checkImgType: function(fileURL) {
            var right_type = new Array(".jpg", ".jpeg", ".mp4", ".gif");

            var right_typeLen = right_type.length;
            var imgUrl = fileURL.toLowerCase();
            var postfixLen = imgUrl.length;
            var len4 = imgUrl.substring(postfixLen - 4, postfixLen);
            var len5 = imgUrl.substring(postfixLen - 5, postfixLen);
            for (let i = 0; i < right_typeLen; i++) {
                if (len4 == right_type[i] || len5 == right_type[i]) {
                    if (len4 == ".mp4") {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        },
        getDays: function(day1, day2) {
            let arr1 = day1.split(" ");
            let arr2 = day2.split(" ");

            let date1 = arr1[0];
            let date2 = arr2[0];

            var date1Str = date1.split("-"); //将日期字符串分隔为数组,数组元素分别为年.月.日
            //根据年 . 月 . 日的值创建Date对象
            var date1Obj = new Date(date1Str[0], date1Str[1] - 1, date1Str[2]);
            var date2Str = date2.split("-");
            var date2Obj = new Date(date2Str[0], date2Str[1] - 1, date2Str[2]);
            var t1 = date1Obj.getTime();
            var t2 = date2Obj.getTime();
            var dateTime = 1000 * 60 * 60 * 24; //每一天的毫秒数
            var minusDays = Math.floor((t2 - t1) / dateTime); //计算出两个日期的天数差
            var days = Math.abs(minusDays); //取绝对值
            return days;
        },
        favor() {
            api.ajaxSubmit("add_favor", { did: this.did }).then(res => {
                alert(res.data.message);
            });
        }
    },
    components: {
        DiaryDetailTop
    },
    mounted() {
        Loading.run();
        this.$_ajax_getDiaryDetail();
    }
};
</script>

<style scoped>
.col_4{
    width:33.3%;
    float: left;
    text-align: center;
    font-size: .35rem;
}
#diary_detail {
    /* margin-top: 1rem; */
}
#diary_detail .media_list{
    padding: 0 .2rem;
}
#diary_detail .media_list video,
img {
    width: 100%;
    height: 100%;
}
#diary_detail .content p {
    margin: .3rem;
    font-size: 0.35rem;
}
#diary_detail .icon_days span {
    color: #fff;
    font-size: 0.4rem;
    display: inline-block;
    margin: 0.2rem;
    padding: 0.1rem 0.4rem;
    border-radius: 2rem;
    background-color: #ff8ea3;
}
#diary_detail .bottom {
    margin-bottom: 2rem;
    padding: .2rem 0;
}
#diary_detail .bottom p {
    margin: 0;
    padding: 0.3rem 0;
    font-size: 0.8rem;
    font-weight: 600;
}
#diary_detail .bottom .row span {
    font-size: 0.7rem;
    color: #aac;
}
#diary_detail div.footer {
    position: fixed;
    right: .5rem;
    bottom: 2.5rem;
    padding: .3rem .4rem;
    border-radius: 50%;
    font-size: 0.4rem;
    background-color: rgb(255, 83, 112)
}
#diary_detail div.footer .click_zan{
    color:#fff;
}

#diary_detail .footer_in{
    background-color: chocolate;
    color: #ff8ea3;
}
</style>

