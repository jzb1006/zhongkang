<template>
    <div id="backdrop_info">
        <ul class="info clearfix">
            <li class="sel_item zk-icon-material" @click="show_items">
                <div>
                    请选择项目
                    <span class="a_item">
                        <i v-for="(item,index) in chooseItem" :key=index>{{item.name}}</i>
                    </span>
                </div>
            </li>
            <li class="sel_time zk-icon-youpinwangtubiao-">
                <div>
                    <group>
                        <calendar v-model="day" title="选择时间" disable-future></calendar>
                    </group>
                </div>
            </li>
            <li class="sel_institution zk-icon-organization">
                <div> <input class="text_input" type="text" placeholder="请输入医院" v-model.trim="institution_name" @blur="hidden_institution()" @focus="show_institution()" @keyup="$_ajax_institution()">
                    <div class="show_hospital" v-show="is_show_institution" @mouseout="hidden_institution()">
                        <div v-for="(institution,index) in institutionList" :key=index @click="choose_institution(institution.id,institution.name)">
                            <p>{{institution.name}}</p>
                        </div>
                    </div>
                </div>
            </li>
            <li class="sel_doctor zk-icon-yisheng">
                <div>
                    <input class="text_input" type="text" placeholder="请输入医生" v-model.trim="doctor_name" @blur="hidden_doctor()" @focus="show_doctor()" @keyup="$_ajax_doctor()">
                    <div class="show_hospital" v-show="is_show_doctor" @mouseout="hidden_doctor()">
                        <div v-for="(doctor,index) in doctorList" :key=index @click="choose_doctor(doctor.id,doctor.name)">
                            <p>{{doctor.name}}</p>
                        </div>
                    </div>
                </div>
            </li>
            <li>
            </li>
        </ul>
        <div v-show="show_backdrop">
            <backdrop @closeBackdrop=close_backdrop @getBackUrl=getBackUrl :backimg=backdrop_img></backdrop>
        </div>
        <div v-transfer-dom>
            <popup v-model="show_item" position="bottom" max-height="50%">
                <diarySelItem ref="items" :itemList1=chooseItem></diarySelItem>
            </popup>
        </div>
        <Alert v-bind:Show.sync="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>

<script>
import Bus from "@/assets/bus.js";
import apiH from "@/api/hospital";
import backdrop from "@/components/diary/diary_operate_back";
import { TransferDom, Group, Calendar, Popup, Cell, XButton } from "vux";
import diarySelItem from "@/components/diary//diary_sel_item";
export default {
    name: "diary_operate_backdrop",
    directives: {
        TransferDom
    },
    components: {
        Group,
        Calendar,
        Popup,
        backdrop,
        diarySelItem,
        Cell,
        XButton
    },
    props: {
        showbackdrop1: {
            default: false
        },
        info: {
            default: function() {
                return {};
            }
        }
    },
    data() {
        return {
            isShow: false,
            alerttType: "",
            alertText: "",

            institutionList: [],
            doctorList: [],
            is_show_institution: false,
            is_show_doctor: false,
            doctor_name: "",
            doctor_id: 0,
            institution_name: "",
            institution_id: 0,
            admin_check_id:"",//审核id

            chooseItem: [], //选择的项目
            show_item: false, //打开项目

            day: "TODAY", //日期
            backdrop_img: [], //背景文件地址
            show_backdrop: this.showbackdrop1,
            is_aesthetic_custom: 0
        };
    },
    watch: {
        chooseItem(val, oldval) {
            this.is_aesthetic(val);
        },
        showbackdrop1(val, oldval) {
            this.show_backdrop = val;
        },
        info(val, oldVal) {
            let data = val.backdrop;
            this.admin_check_id = data.admin_check_id;
            this.doctor_name = data.doctor_name;
            this.doctor_id = data.doctor_id;
            this.institution_name = data.institution_name;
            this.institution_id = data.institution_id;

            if (data.img1) {
                this.backdrop_img.push({ url: data.img1, alt: "" });
                this.backdrop_img.push({ url: data.img2, alt: "" });
                this.backdrop_img.push({ url: data.img3, alt: "" });
            }

            let item = val.item_name;
            for (let index in item) {
                this.chooseItem.push({
                    id: item[index].cat_id,
                    name: item[index].cat_name,
                    is_aesthetic_custom: item[index].is_aesthetic_custom
                });
            }
        }
    },

    methods: {
        getBackdrop() {
            let pd = this.examination();
            if (pd) {
                //所选的项目
                let goods_cate_ids = "";
                for (let index in this.chooseItem) {
                    goods_cate_ids += this.chooseItem[index].id + ";";
                }

                let data = {
                    time: this.day,
                    goods_cate_ids: goods_cate_ids.substring(
                        0,
                        goods_cate_ids.length - 1
                    ),
                    institution_name: this.institution_name,
                    institution_id: this.institution_id,
                    doctor_name: this.doctor_name,
                    doctor_id: this.doctor_id,
                    admin_check_id:this.admin_check_id
                };

                return data;
            } else {
                return false;
            }
        },
        examination() {
            if (this.chooseItem.length <= 0) {
                this.isShow = true;
                this.alerttType = "warn";
                this.alertText = "请选择项目！！";
                return false;
            }

            if (this.institution_name.length <= 0) {
                this.isShow = true;
                this.alerttType = "warn";
                this.alertText = "请填写机构名称";
                return false;
            }

            if (this.doctor_name.length <= 0) {
                this.isShow = true;
                this.alerttType = "warn";
                this.alertText = "请填写医生姓名";
                return false;
            }

            return true;
        },
        show_items() {
            this.show_item = true;
            Bus.$emit("changeSelItem", true);
        },
        hide_items() {
            this.show_item = false;
        },
        close_backdrop() {
            this.show_backdrop = false;
            this.is_aesthetic_custom = true;
            this.$emit("changeShowBackdrop", this.show_backdrop);
        },
        getBackUrl(data) {
            this.backdrop_img = data;
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
        is_aesthetic(data) {
            let pd_type = false;
            for (let index in data) {
                if (data[index].is_aesthetic_custom == "1") {
                    pd_type = true;
                }
            }
            if (pd_type) {
                this.is_aesthetic_custom = true;
            } else {
                this.is_aesthetic_custom = false;
            }
        }
    },
    mounted() {
        Bus.$on("toItem", res => {
            this.chooseItem = res;
            this.hide_items();
            this.is_aesthetic(res);
        });
    }
};
</script>
<style lang="less">
@calendar-selected-bg-color: #000;
@import url("./../../assets/css/calandar.css");
</style>
<style scoped>
.show_hospital {
    position: absolute;
    font-size: 0.3rem;
    width: 77%;
    max-height: 2rem;
    overflow-x: hidden;
    border: 1px dotted #000;
    background-color: #fff;
    z-index: 222;
}

.show_hospital > div {
    border-bottom: 1px solid #ccc;
}
.show_hospital > div p {
    margin: 0;
    padding: 0.3rem 0.4rem;
}
#backdrop_info .info {
    /* margin-top: 1rem; */
    padding: 0 0.3rem;
    /* margin-bottom: 1.5rem; */
}
#backdrop_info .info li {
    font-size: 0.32rem;
    padding: 0.3rem 0.2rem;
    border-top: 1px solid #ccc;
}
#backdrop_info .info li > div {
    float: right;
    width: 87%;
}
#backdrop_info .info li.sel_item .a_item {
    display: inline-block;
    width: 3rem;
    height: 0.3rem;
    margin-left: 0.5rem;
    text-align: right;
    word-wrap: break-word;
    word-break: break-all;
    overflow: hidden;
}
#backdrop_info .info li.sel_item .a_item i {
    padding: 0.1rem;
    border: 1px solid #ccc;
}
#backdrop_info .info li.sel_item .badge_r {
    float: right;
}
#backdrop_info .info li.sel_time {
    position: relative;
    padding-top: 0.3rem;
}
#backdrop_info .info li.sel_time {
    position: relative;
    padding-top: 0.3rem;
}
input {
    width: 100%;
    font-size: 0.3rem;
}
</style>
