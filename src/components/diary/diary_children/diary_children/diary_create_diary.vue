<template>
    <div id="diary_create_diary">
        <div class="create_diary" v-for="backdrop in backdropList">
            <p class="top">
                <top title="写日记"></top>
                <span class="submit" @click="submit()">发表</span>
            </p>
            <p class="status clearfix">{{isPublic}}
                <span class="gou" @click="changeStatus()" :class="{activeStatus:status == true}"><i class="zk-icon-gou"></i></span>
            </p>
            <div class="date">
                <group>
                    <Datetime v-model="day" :start-date="initdata" :end-date="getToday()" @on-show="click_date" title="选择日期"></Datetime>
                </group>
                <div class="col_5">
                    <p class="day">术后第
                        <em>{{differDay}}</em>天</p>
                </div>
                <div class="col_5">
                    <p class="item" v-for="(cid,index) in backdrop.goods_cate_ids" v-if="index == '0'">{{memuList[cid].cat_name}}</p>
                </div>
            </div>
            <textarea-autosize class="content" placeholder="写日记分享变美过程，获得日志奖励" v-model="items.content" ref="count">
                </textarea-autosize>
            <toast v-model="show">添加成功</toast>
            <Upload uploadSel="classics" @changeUrls="getUrl" :img-max-num=9 :video-max-num=1 :file-type=3 title="添加图片或者视频"></Upload>
        </div>
        <div>
        </div>
        
    </div>
</template>
<script>
import Upload from "@/components/public/upload.vue";
import api from "@/api/diary";
import apiUp from "@/api/upload";
import Bus from "@/assets/bus.js";
import top from "@/components/decorate/top_back_title.vue";
import Utils from '@/widget/lib/Utils'
import { Toast } from 'vux'

import { Datetime, Group } from "vux";
export default {
    data() {
        return {
            initdata: "",
            number: 0,
            items: {
                content: ""
            },
            day: this.getToday(),
            status: true,
            isPublic: "公开",
            disabledDates: {},
            fileUrls: [],
            bid: "",
            backdropList: [],
            memuList: [],
            differDay: 0,
            show:false,
        };
    },
    computed: {},
    components: {
        Upload,
        Datetime,
        Group,
        top,
        Toast
    },
    watch:{
        'day':function(){
            this.changeDifferDays();
        }
    },
    methods: {
        click_date(){
            console.log(12312313);
            Utils.dpr();
        },
        changeStatus() {
            this.status = !this.status;

            if (this.status) {
                this.isPublic = "公开";
            } else {
                this.isPublic = "隐藏";
            }
        },
        getToday(){
            var myDate = new Date();
            let y = myDate.getFullYear(); //获取完整的年份(4位,1970)
            let m = myDate.getMonth()+1; //获取当前月份(0-11,0代表1月)
            let d = myDate.getDate(); //获取当前日(1-31)
            if(m<10){
                m = '0'+m;
            }

            if(d<10){
                d = '0'+d;
            }
            return y+'-'+m+'-'+d
        },
        $_ajax_getInfo() {
            var self = this;
            api
                .ajaxSearch("diary_create_diary", { bid: this.bid })
                .then(res => {
                    // console.log(res.data);
                    self.memuList = res.data.item_name;
                    self.backdropList = res.data.backdrop;
                    this.changeInitData();
                });
        },
        changeInitData() {
            for (let val in this.backdropList) {
                this.initdata = this.backdropList[val].time;
                let arr = this.initdata.split(" ");
                this.initdata = arr[0];
            }
            this.changeDifferDays();
        },
        changeDifferDays() {
            let s1 = new Date(this.initdata.replace(/-/g, "/"));
            let s2 = new Date(this.day);
            let days = s2.getTime() - s1.getTime();
            let time = parseInt(days / (1000 * 60 * 60 * 24));
            this.differDay = time;
        },
        limit() {
            let imgNum = 0;
            let videoNum = 0;
        },
        submit() {
            let pd = this.examination();
            if (pd) {
                let show_type = 'show';

                if (!this.status) {
                    show_type = 'hidden';
                }

                let origin_urls = "";
                let video_urls = "";

                for (let index in this.fileUrls) {
                    if (this.checkImgType(this.fileUrls[index])) {
                        origin_urls += this.fileUrls[index] + ",";
                    } else {
                        video_urls += this.fileUrls[index] + ",";
                    }
                }

                origin_urls = origin_urls.substring(0, origin_urls.length - 1);
                video_urls = video_urls.substring(0, video_urls.length - 1);

                let fromData = {
                    bid: this.bid,
                    show_type: show_type,
                    content: this.items.content,
                    time: this.day,
                    origin_urls: origin_urls,
                    video_urls: video_urls
                };

                let self = this;
                api.ajaxSubmit("ajax_create_diary", fromData).then(res => {
                    console.log(res.data);
                    if (res.data.error == 0) {
                        self.show = true;
                        this.timer = setInterval(() => {
                            this.$router.push({
                                name: "diaryDetail",
                                query: { bid: self.bid, did: res.data.did }
                            });
                        self.show = false;
                        }, 1000);
                    } else {
                        alert(res.data.message);
                    }
                });
            }
        },
        examination() {
            if (this.items.content.trim().length <= 0) {
                alert("请添加内容！！");
                return false;
            }

            if (this.fileUrls.length <= 0) {
                alert("请添加图片或者视频！！");
                return false;
            }

            return true;
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
        getUrl(data){
            this.fileUrls = data; 
        }
    },
    mounted() {
        // Utils.dpr();
        this.bid = this.$route.query.bid;
        this.$_ajax_getInfo();
        var self = this;
    },
    beforeDestroy () {
        clearInterval(this.timer)
    }
};
</script>
<style>
@import url("./../../../../assets/css/calandar.css");
</style>
<style scoped>
.col_5 {
    width: 50%;
    float: left;
    margin-top: .3rem;
}
#diary_create_diary {
    /*padding: 0 15px;*/
    font-size: 0.5rem;
}
#diary_create_diary .create_diary{
    padding: 0 15px;
}
#diary_create_diary .top {
    font-size: 0.35rem; 
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
}
#diary_create_diary .top .back {
    float: left;
}
#diary_create_diary .top .submit {
    position: absolute;
    right: .3rem;
    top: .3rem;
}

#diary_create_diary .date {
    margin-top: 0.5rem;
    font-size: 0.5rem;
}
#diary_create_diary .date p.day {
    text-align: center;
    font-size: 0.35rem;
}
#diary_create_diary .date p.item {
    text-align: center;
    font-size: 0.35rem;
}

input.upfile {
    width: 8.1rem;
    height: 2rem;
    opacity: 0;
    left: -0.1rem;
    top: -0.1rem;
}

span.activeStatus {
    display: inline-block;
    background-color:rgba(255, 83, 112,.8);
    color: #fff;
}
p.status {
    margin-top: 1rem;
    border-top: 1px solid #ccc;
    padding-top: 0.5rem;
    font-size: 0.4rem;
}
p.status .gou {
    float: right;
}
p.status span {
    padding: 0 0.5rem .1rem;
    border: 1px solid #17a2b8;
}
p.top {
    font-size: 0.4rem;
    text-align: center;
    position: relative;
    margin-bottom: 0;
    color: #fff;
}
.content {
    width: 100%;
    min-height: 2rem;
    max-height: 10rem;
    font-size: 0.35rem;
    margin: 0.5rem 0;
    border: 1px solid rgb(255, 83, 112);
}
.media_list video,
img {
    width: 100%;
    height: 100%;
    margin: 0.5rem 0;
}
.media_list .wrapper {
    position: relative;
}
.media_list .wrapper span.del {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.3rem;
    color: #fff;
    border-radius: 1rem;
    z-index: 9999;
    background-color: rgba(0, 0, 0, 0.5);
}
</style>
