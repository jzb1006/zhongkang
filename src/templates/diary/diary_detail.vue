<template>
    <div id="diary_detail">
        <div v-for="(diary,index) in diaryContent" v-if="index == 0" :key=index>
            <div class="content">
                <p class="icon_days">
                    <span>第{{getDays(diary.time,diary.course_time)}}天</span>
                </p>
                <p>{{diary.content}}</p>
            </div>
            <div class="media_list">
                <div v-for="(media,index) in mediaList" :key=index>
                    <img v-for="(url,index) in getMediaUrl(media)" :key=index v-if="checkImgType(url)" v-lazy="getImgUrl()+url">
                    <video controlsList="nodownload" v-else-if="!checkImgType(url)" :src="getImgUrl()+url" controls="controls"></video>
                </div>
            </div>
            <div class="bottom">
                <e-meta :info="format_info(diary,diary.view_count,diary.favor,commentNum)"></e-meta>
            </div>
        </div>
    </div>
</template>
<script>
import apiCom from "@/api/common";
import api from "@/api/diary";
export default {
    name:"diary_detail",
    props:{
        diaryDetailInfo:{
            default:function(){
                return {}
            }
        }
        // username:{
        //     default:""
        // },
        // diaryContent:{
        //     default:function(){
        //         return []
        //     }
        // },
        // mediaList:{
        //     default:function(){
        //         return []
        //     }
        // }
    },
    data() {
        return {
            diaryContent: [],
            commentNum: "0",
            mediaList: [],
        };
    },
    watch:{
        diaryDetailInfo(val,oldVal){
            this.diaryContent = val.diaryContent;
            this.mediaList = val.mediaList;
        }
    },
    methods: {
        format_info(item, browses, likes, comments) {
            let data = {
                item: { table: "recovery_diary", id: item.did },
                browses: browses,
                likes: likes,
                comments: comments
            };
            return data;
        },
        transform_num(index) {
            let num = parseInt(index);
            return num > 100000000
                ? Math.floor(num / 100000000) + "亿"
                : num > 10000 ? Math.floor(num / 10000) + "万" : num;
        },
        getImgUrl() {
            return api.imgUrl();
        },
        getMediaUrl(data) {
            let arr = data.split(",");
            return arr;
        },
        checkImgType: function(fileURL) {
            var right_type = new Array(".jpg", ".jpeg", ".mp4", ".gif", ".png");

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
    }
};
</script>

<style scoped>
#diary_detail .media_list {
    padding: 0 0.2rem;
}
#diary_detail .media_list video,
img {
    width: 100%;
    height: 100%;
}
#diary_detail .content p {
    margin: 0.3rem;
    font-size: 0.3rem;
    line-height: 1.5;
}
#diary_detail p.icon_days {
    margin: 0.1rem 0.3rem;
}
#diary_detail .icon_days span {
    color: #fff;
    font-size: 0.3rem;
    display: inline-block;
    padding: 0.1rem 0.4rem;
    border-radius: 2rem;
    background-color: #ff8ea3;
}
#diary_detail .bottom {
    padding: 0.2rem 0;
}
#diary_detail .bottom .bottom_see {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 0.1rem;
    font-size: 0.3rem;
    text-align: center;
}
/* #diary_detail .bottom p {
    margin: 0;
    padding: 0.3rem 0;
    font-size: 0.8rem;
    font-weight: 600;
}
#diary_detail .bottom .row span {
    font-size: 0.7rem;
    color: #aac;
} */
#diary_detail div.footer {
    position: fixed;
    right: 0.5rem;
    bottom: 2.5rem;
    padding: 0.2rem 0.2rem;
    border-radius: 50%;
    font-size: 0.3rem;
    background-color: rgb(255, 83, 112);
}
#diary_detail div.footer .click_zan {
    color: #fff;
}

#diary_detail .footer_in {
    background-color: chocolate;
    color: #ff8ea3;
}
</style>

