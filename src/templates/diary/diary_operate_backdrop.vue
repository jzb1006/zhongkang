<template>
    <div id="backdrop_info">
        <ul class="info clearfix">
            <li class="sel_time zk-icon-youpinwangtubiao-">
                <div>
                    <group>
                        <calendar v-model="day" title="选择时间" disable-future></calendar>
                    </group>
                </div>
            </li>
            <li class="sel_time zk-icon-tupian"> 
                <div>
                    <group>
                        <x-switch title="是否添加术前图片" :value-map="[0,1]" v-model="is_aesthetic_custom"></x-switch>
                    </group>
                </div>
            </li>
            <li class="sel_institution zk-icon-organization">
                <div> 
                    <input class="text_input" type="text" placeholder="请输入医院" v-model.trim="institution_name" @blur="hidden_institution()" @focus="show_institution()" @keyup="$_ajax_institution()">
                    <div class="show_hospital" id="show_hospital" v-show="is_show_institution" @mouseout="hidden_institution()">
                        <div v-for="(institution,index) in institutionList" :key=index @click="choose_institution(institution.id,institution.name)">
                            <p>{{institution.name}}</p>
                        </div>
                        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_institution()"></LoadMore>
                    </div>
                </div>
            </li>
            <li class="sel_doctor zk-icon-yisheng">
                <div>
                    <input class="text_input" type="text" placeholder="请输入医生" v-model.trim="doctor_name" @blur="hidden_doctor()" @focus="show_doctor()" @keyup="$_ajax_doctor()">
                    <div class="show_hospital" id="show_doctor" v-show="is_show_doctor" @mouseout="hidden_doctor()">
                        <div v-for="(doctor,index) in doctorList" :key=index @click="choose_doctor(doctor.id,doctor.name)">
                            <p>{{doctor.name}}</p>
                        </div>
                        <LoadMore v-if="parseInt(is_more)" :state='hasMore' :isLoading='isBusy' @loadmore="$_ajax_doctor()"></LoadMore>
                    </div>
                </div>
            </li>
            <li>
            </li>
        </ul>
        <div v-show="show_backdrop">
            <backdrop @closeBackdrop=close_backdrop @getBackUrl=getBackUrl :backimg=backdrop_img></backdrop>
        </div>
        <Alert v-bind:Show.sync="isShow" :alerttType="alerttType" :alertText="alertText"></Alert>
    </div>
</template>

<script>
import Bus from "@/assets/bus.js";
import apiH from "@/api/hospital";
import backdrop from "@/components/diary/diary_operate_back";
import LoadMore from "@/components/loadMore/index.vue";
import { TransferDom, Group, Calendar, Popup, Cell, XButton ,XSwitch } from "vux";
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
        XButton,
        LoadMore,
        XSwitch
    },
    props: {
        showbackdrop1: {
            default: false
        },
        info: {
            default: function() {
                return {};
            }
        },
        operate:{
            default:''
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

            day: "TODAY", //日期
            backdrop_img: [], //背景文件地址
            show_backdrop: this.showbackdrop1,
            is_aesthetic_custom: 0,

            //机构，医生
            doctor_page:1,
            doctor_list:5,
            institution_page:1,
            institution_list:5,
            is_more:1,
            isBusy: false,
            hasMore: 0,
        };
    },
    watch: {
        is_aesthetic_custom(val,oldVal){
            this.$store.dispatch("Save_Aesthetic_Status", val);
        },
        chooseItem(val, oldval) {
            this.is_aesthetic(val);
        },
        showbackdrop1(val, oldval) {
            this.show_backdrop = val;
        },
        institution_name(val,oldVal){
            this.institution_page = 0;
            this.institutionList = [];
        },
        doctor_name(val,oldVal){
            this.doctor_page = 0;
            this.doctorList = [];
        },
        info(val, oldVal) {
            let data = val.backdrop;
            this.admin_check_id = data.admin_check_id;
            this.doctor_name = data.doctor_name;
            this.doctor_id = data.doctor_id;
            this.institution_name = data.institution_name;
            this.institution_id = data.institution_id;

            if (data.img1) {
                this.is_aesthetic_custom = 1;
                this.backdrop_img.push({ url: data.img1, alt: "" });
                this.backdrop_img.push({ url: data.img2, alt: "" });
                this.backdrop_img.push({ url: data.img3, alt: "" });
            }
        }
    },

    methods: {
        getBackdrop() {
            let pd = this.examination();
            if (pd) {
                let data = {
                    time: this.day,
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
            self.institution_page = self.institution_page + 1;
            apiH
                .ajaxSearch("search_hospital", { q: self.institution_name,page:self.institution_page,pageList:self.institution_list })
                .then(res => {
                    self.hasMore = res.data.has_more;
                    self.institutionList = self.institutionList.concat(res.data.data);
                });
        },
        $_ajax_doctor() {
            var self = this;
            self.doctor_page = self.doctor_page + 1;
            apiH
                .ajaxSearch("search_doctor", { q: this.doctor_name,page:this.doctor_page,pageList:this.doctor_list })
                .then(res => {
                    self.hasMore = res.data.has_more;
                    self.doctorList = self.doctorList.concat(res.data.data);
                });
        },
        hidden_institution() {
            this.is_show_institution = false;
        },
        show_institution() {
            this.is_show_institution = true;
            this.$_ajax_institution();
        },
        hidden_doctor() {
            this.is_show_doctor = false;
        },
        show_doctor() {
            this.is_show_doctor = true;
            this.$_ajax_doctor();
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

        var self = this;
        let institution_scroll = document.getElementById('show_hospital');
        institution_scroll.addEventListener("scroll", () => {
            if(institution_scroll.scrollTop + 150 >= institution_scroll.scrollHeight ){
                self.$_ajax_institution();
            }
            
        });

        let doctor_scroll = document.getElementById('show_doctor');
        doctor_scroll.addEventListener("scroll", () => {
            if(doctor_scroll.scrollTop + 150 >= doctor_scroll.scrollHeight ){
                self.$_ajax_doctor();
            }
            
        });
    }
};
</script>
<style lang="less">
#backdrop_info .vux-no-group-title{
    margin-top: 0!important;
}
#backdrop_info .weui-cells{
    margin-top:0!important;
    line-height:.32rem!important;
    font-size: .32rem!important;
}
#backdrop_info .weui-cells:before{
    height: 0px!important;
    border: 0px!important;
}
#backdrop_info .weui-cell{
    padding: 0!important;
}
#backdrop_info .vux-calendar:before{
    height: 0px!important;
    border: 0px!important;
}
#backdrop_info .weui-switch{
    height: 15px!important;
    border: 0px!important;
}
#backdrop_info .weui-switch:before{
    height: 15px!important;
}
#backdrop_info .weui-switch:after{
    height: 15px!important;
}
.inline-calendar th {
    font-size: .35rem !important;
}

.inline-calendar td > span.vux-calendar-each-date {
    font-size: 0.2rem!important;
}

.vux-prev-icon, .vux-next-icon {
    width: .2rem!important;
    height: .2rem!important;
}

.inline-calendar a {
    font-size: .4rem!important;
}
.inline-calendar a {
    top: 0.4rem!important;
}
.vux-next-icon {
    top: 0.3rem!important;
}

.calendar-header {
    line-height: .9rem !important;
    font-size: .6rem !important;
}
.vux-calendar:before{
    border: 0px!important;
}
.weui-cell{
    font-size: .35rem;
    padding: .2rem 0!important;

}
</style>
<style scoped>
#backdrop_info .show_hospital {
    position: absolute;
    font-size: 0.3rem;
    width: 77%;
    max-height: 2rem;
    overflow-x: hidden;
    border: 1px dotted #000;
    background-color: #fff;
    z-index: 400;
}

#backdrop_info .show_hospital > div {
    border-bottom: 1px solid #ccc;
}
#backdrop_info .show_hospital > div p {
    margin: 0;
    padding: 0.3rem 0.4rem;
}
#backdrop_info .info {
    /* margin-top: 1rem; */
    padding: 0 0.3rem;
    /* margin-bottom: 1.5rem; */
}
#backdrop_info .info li {
    position: relative;
    font-size: 0.32rem;
    padding: 0.3rem 0.2rem;
    border-top: 1px solid #ccc;
}
#backdrop_info .info li > div {
    float: right;
    width: 87%;
}
#backdrop_info .info li .sel_time {
    position: relative;
    padding-top: 0.3rem;
}
#backdrop_info .info li .sel_time {
    position: relative;
    padding-top: 0.3rem;
}
#backdrop_info .info li .sel_aesthetic_custom{
    position: relative;
}
#backdrop_info input {
    width: 100%;
    font-size: 0.3rem;
}
</style>
