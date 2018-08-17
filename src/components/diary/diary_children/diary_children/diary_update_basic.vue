<template>
    <div id="diary_updata_basic">
        <p class="top">
            <span class="back" @click="$router.back(-1)">
                <x-icon type="ios-arrow-back" class="ios-arrow-back" size=".5rem"></x-icon></span>修改日记本
                    <span class="submit" @click="submit_backdrop()">完成</span>
        </p>
        <div class="pic">
            <div>
                <Upload :img-max-num=3 :video-max-num=1 :file-type=1></Upload>
            </div>
            <p class="tip">
                <span>上传三张术前真实照片</span>
            </p>
        </div>
        <ul class="info clearfix">
            <li class="sel_item" @click="show_items">请选择项目
                <span class="a_item">
                    <i v-for="item in chooseItem">{{item.name}}</i>
                </span>
                <span class="badge_r"><x-icon type="ios-arrow-forward" size=".5rem"></x-icon></span>
            </li>
            <li class="sel_time">
                <group>
                    <calendar v-model="day" title="选择时间" disable-future></calendar>
                </group>
                <!-- <Datepicker :format="customFormatter" :language="zh" :disabledDates="disabledDates" v-model="day" id="datePicker"></Datepicker>
                <span class="badge_l">
                    <x-icon type="ios-arrow-back" size=".5rem"></x-icon> </span>
                        <span class="time">请选择手术时间</span> -->
            </li>
            <li class="sel_institution">
                <span>请输入医院</span>
                <input class="text_input" type="text" placeholder="请输入医院" v-model="institution_name" @blur="hidden_institution()" @focus="show_institution()" @keyup="$_ajax_institution()">
                <div id="show_institution" v-show="is_show_institution" @mouseout="hidden_institution()">
                    <div v-for="institution in institutionList" @click="choose_institution(institution.id,institution.name)">
                        <p>{{institution.name}}</p>
                    </div>
                </div>
            </li>
            <li class="sel_doctor">
                <span>请输入医生 </span>
                <input class="text_input" type="text" placeholder="请输入医生" v-model="doctor_name" @blur="hidden_doctor()" @focus="show_doctor()" @keyup="$_ajax_doctor()">
                <div id="show_doctor" v-show="is_show_doctor" @mouseout="hidden_doctor()">
                    <div v-for="doctor in doctorList" @click="choose_doctor(doctor.id,doctor.name)">
                        <p>{{doctor.name}}</p>
                    </div>
                </div>
            </li>
        </ul>
        <diarySelItem></diarySelItem>
    </div>
</template>
<script>
// import Datepicker from "vuejs-datepicker";
import Loading from "@/widget/loading";
// import moment from "moment";
// import { en, zh } from "vuejs-datepicker/dist/locale";
import Upload from "@/components/public/upload";
import diarySelItem from "./diary_children/diary_sel_item";
import Bus from "@/assets/bus.js";
import apiH from "@/api/hospital";
import api from "@/api/diary";
import { Group, Calendar} from 'vux'
export default {
    data() {
        return {
            // zh: zh,
            // disabledDates: {
            //     to: new Date(1900),
            //     from: new Date()
            // },
            day: "", //日期
            chooseItem: [], //选择的项目
            institutionList: [],
            doctorList: [],
            is_show_institution: false,
            is_show_doctor: false,
            doctor_name: "",
            doctor_id: 0,
            institution_name: "",
            institution_id: 0,
            backdrop_img: [],
            bid: ""
        };
    },
    methods: {
        customFormatter(date) {
            this.day = moment(date).format("YYYY-MM-DD");
            return moment(date).format("YYYY-MM-DD");
        },
        show_items() {
            Bus.$emit("changeSelItem", true);
        },
        $_ajax_institution() {
            var self = this;
            apiH
                .ajaxSearch("search_hospital", { q: this.institution_name })
                .then(res => {
                    self.institutionList = res.data.data;
                });
        },
        $_ajax_doctor() {
            var self = this;
            apiH
                .ajaxSearch("search_doctor", { q: this.doctor_name })
                .then(res => {
                    self.doctorList = res.data.data;
                });
        },
        hidden_institution() {
            this.is_show_institution = false;
        },
        show_institution() {
            this.is_show_institution = true;
        },
        hidden_doctor() {
            this.is_show_doctor = false;
        },
        show_doctor() {
            this.is_show_doctor = true;
        },
        choose_institution(id, name) {
            this.hidden_institution();
            this.institution_name = name;
            this.institution_id = id;
        },
        choose_doctor(id, name) {
            this.hidden_doctor();
            this.doctor_name = name;
            this.doctor_id = id;
        },
        submit_backdrop() {
            let pd = this.examination();
            if (pd) {
                let goods_cate_ids = "";
                for (let index in this.chooseItem) {
                    goods_cate_ids += this.chooseItem[index].id + ";";
                }
                let formData = {
                    bid: this.bid,
                    time: this.day,
                    goods_cate_ids: goods_cate_ids.substring(
                        0,
                        goods_cate_ids.length - 1
                    ),
                    institution_name: this.institution_name,
                    institution_id: this.institution_id,
                    doctor_name: this.doctor_name,
                    doctor_id: this.doctor_id,
                    img1: this.backdrop_img[0],
                    img2: this.backdrop_img[1],
                    img3: this.backdrop_img[2]
                };

                api.ajaxSubmit("ajax_update_basic", formData).then(res => {
                    if (res.data.error == 5) {
                        this.$router.push({
                            name: "diaryBackdrop",
                            query: { bid: this.bid }
                        });
                    } else {
                        alert(res.data.message);
                    }
                });
            }
        },
        examination() {
            if (this.chooseItem.length <= 0) {
                alert("请选择项目！！");
                return false;
            }

            if (this.institution_name.trim().length <= 0) {
                alert("请填写机构名称");
                return false;
            }

            if (this.doctor_name.trim().length <= 0) {
                alert("请填写医生姓名");
                return false;
            }

            if (this.backdrop_img.length < 3) {
                alert("请添加三张图片");
                return false;
            }

            return true;
        },
        $_getInfo() {
            this.bid = this.$route.query.bid;
            var self = this;
            api
                .ajaxSearch("diary_update_basic", { bid: this.bid })
                .then(res => {
                    this.initData(res.data);
                });
        },
        initData(data) {
            this.day = data.backdrop.time;
            this.institution_name = data.backdrop.institution_name;
            this.institution_id = data.backdrop.institution_id;
            this.doctor_name = data.backdrop.doctor_name;
            this.doctor_id = data.backdrop.doctor_id;

            let cids = data.backdrop.goods_cate_ids.split(";");
            let arr = [];
            for (let index in cids) {
                let arr1 = {
                    id: cids[index],
                    name: data.item_name[cids[index]].cat_name
                };
                arr.push(arr1);
            }
            Bus.$emit("initItem", arr);

            let arrImg = [];
            arrImg.push(data.backdrop.img1);
            arrImg.push(data.backdrop.img2);
            arrImg.push(data.backdrop.img3);
            Bus.$emit("initImg", arrImg);

            Loading.stop();
        }
    },
    components: {
        // Datepicker,
        Upload,
        diarySelItem,
         Group, Calendar
    },
    mounted() {
        Loading.run();
        Bus.$on("toItem", res => {
            this.chooseItem = res;
        });
        Bus.$on("changeUrls", res => {
            this.backdrop_img = res;
        });
        this.$_getInfo();
    }
};
</script>
<style>
@import url('./../../../../assets/css/calandar.css');
</style>
<style scoped>
#show_institution {
    position: absolute;
    /* top: 2rem; */
    left: 4rem;
    width: 12rem;
    max-height: 5rem;
    overflow-x: hidden;
    border: 1px dotted #000;
    background-color: #fff;
    z-index: 222;
}

#show_institution > div {
    border-bottom: 1px solid #ccc;
}
#show_institution > div p {
    margin: 0;
    padding: 0.3rem 0.4rem;
}

#show_doctor {
    position: absolute;
    /* top: 2rem; */
    left: 4rem;
    width: 12rem;
    max-height: 5rem;
    overflow-x: hidden;
    border: 1px dotted #000;
    background-color: #fff;
    z-index: 222;
}

#show_doctor > div {
    border-bottom: 1px solid #ccc;
}
#show_doctor > div p {
    margin: 0;
    padding: 0.3rem 0.4rem;
}
span.time {
    position: absolute;
    top: 0.7rem;
    right: 2rem;
}
.ios-arrow-back{
    fill: #fff;
}
#diary_updata_basic{
    margin-bottom: 1.5rem;
}
#diary_updata_basic p.top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    color: #fff;
    font-size: .4rem;
    text-align: center;
    padding: 0.3rem;
    border-bottom: 1px solid #ccc;
    background-color: rgb(255, 83, 112);
    z-index: 999;
}

#diary_updata_basic p.top span.back{
    float: left;
}
#diary_updata_basic p.top span.submit{
    float: right;
}
#diary_updata_basic div.pic{
    margin-top: 1.5rem;
}
#diary_updata_basic div.pic p.tip {
    margin-top: .5rem;
    text-align: center;
    font-size: 0.4rem;
}
#diary_updata_basic div.pic p.tip span {
    padding: 0.1rem 0.4rem;
    border: 1px solid #ccc;
    color: #fff;
    border-radius: 1rem;
    background-color: rgb(255, 83, 112);
}
#diary_updata_basic div.pic {
    padding-bottom: 0.3rem;
    border: 1px solid #ccc;
    box-shadow: 0 5px 2px #ccc;
}
#diary_updata_basic .info{
    font-size: .35rem;
    margin-top: .5rem;
    padding: 0 .3rem;
    margin-bottom: 1.5rem;
}
#diary_updata_basic .info li{
    padding: .3rem .2rem;
    border:1px solid #ccc;
}
#diary_updata_basic .info li.sel_item  .a_item{
    display: inline-block;
    width: 3rem;
    margin-left: .5rem;
    text-align: right;
    overflow: hidden;
}
#diary_updata_basic .info li.sel_item  .a_item i{
    padding: .1rem;
    border: 1px solid #ccc;
}
#diary_updata_basic .info li.sel_item .badge_r{
    float: right;
}
#diary_updata_basic .info li.sel_time{
    position: relative;
    padding: 0;
}
input{
    width: 4.5rem;
    height: .5rem;
    font-size: .3rem;
    border: 1px solid #000;
}
#datePicker{
    width: 4rem;
    height: .5rem;
    border: 1px solid #000;

}
.vdp-datepicker * {
    box-sizing: border-box;
    font-size: .5rem;
}
</style>
