<template>
    <div id="sel_mass">
        <div class="sel_page" v-show="sel_page_status">
            <div class="sel_sex">
                <span class="sex">性别</span>
                <div class="sex_cate">
                    <span :class="{active:sex_cate == 0}" @click="sel_sex(0)">男</span>
                    <span :class="{active:sex_cate == 1}" @click="sel_sex(1)">女</span>
                </div>
            </div>
            <div class="sel_age" @click="change_age_status">
                <span class="sex">年龄</span> <span class="right zk-icon-more"></span> <span class="right">{{age}}</span> 
                <div v-transfer-dom>
                    <popup v-model="sel_age_status" position="bottom" max-height="50%">
                            <p v-for="(age,index) in mass" :key="index" @click="sel_age(age)">{{age.mass_description}}{{age.text}}</p>
                    </popup>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { TransferDom, Popup, Group, Cell, XSwitch } from 'vux'
export default {
    props:{
        mass:{
            default:function(){
                return []
            }
        }
    },
    directives: {
        TransferDom
    },
    components: {
        Popup,
        Group,
        Cell,
        XSwitch
    },
    data(){
        return{
            sex:"男",
            age:"青年 15~35岁",
            age_region_id:5,
            sex_cate:"0",
            sel_age_status:false,
            sel_page_status:true,
            show_page_status:false,
            age_region:[
                {
                    name:"胎儿，婴儿",
                    text:"0~0.6岁",
                    val:"1"
                },
                {
                    name:"幼儿",
                    text:"0.6~2岁",
                    val:"2"
                },
                {
                    name:"儿童",
                    text:"3~6岁",
                    val:"3"
                },
                {
                    name:"少年",
                    text:"7~14岁",
                    val:"4"
                },
                {
                    name:"青年",
                    text:"15~35岁",
                    val:"5"
                },
                {
                    name:"中年",
                    text:"36~60岁",
                    val:"6"
                },
                {
                    name:"老年",
                    text:"60以上",
                    val:"7"
                },
            ]
        }
    },
    methods:{
        change_age_status(){
            this.sel_age_status = !this.sel_age_status;
        },
        sel_age(age){
            this.age = age.mass_description;
            this.age_region_id = age.id;
            this.change_age_status();
            this.submit();
        },
        sel_sex(index){
            this.sex_cate = index;
            index == 1 ? this.sex = "女" : this.sex = "男";
            this.submit();
        },
        submit(){
            let data = {
                mass_id:this.age_region_id,
                sex:this.sex_cate
            }
            this.$emit('change_age',data);
        }
    },
    mounted(){
        let data = {
            mass_id:this.age_region_id,
            sex:this.sex_cate
        }
        this.$emit('change_age',data);
    }
}
</script>

<style scoped>
@import url("./../../assets/css/calandar.css");
    #sel_mass .show_page{
        font-size: .35rem;
        height: .5rem;
        line-height: .5rem;
        padding:0.1rem .3rem;
        border-bottom: 1px solid #eee;
        border-top: 1px solid #eee;
    }
    #sel_mass .show_page span.right{
        float: right;
    }
    #sel_mass .sel_page .sel_page_header{
        font-size: .35rem;
        color: #fff;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: rgb(255, 83, 112);
    }

    #sel_mass .sel_page .back{
        float: left;
        font-size: .4rem;
    }
    #sel_mass .sel_page .tijiao{
        position: absolute;
        top: 0;
        right: .3rem;
        color: aqua;
        font-size: .3rem;
    }
    #sel_mass .sel_page .sel_sex{
        font-size: .35rem;
        margin: 0 .3rem;
        padding: .3rem 0;
        border-bottom: 1px solid #ccc;
    }
    #sel_mass .sel_page .sel_sex .sex_cate{
        float: right;
    }
    #sel_mass .sel_page .sel_sex .sex_cate span{
        padding: .05rem .3rem;
        border-radius:.2rem;
        box-shadow: 0px 1px 1px 1px #ccc;
        background-color: #eee;
    }
    #sel_mass .sel_page .sel_sex .sex_cate span.active{
        background-color: rgb(255, 83, 112);
    }
    #sel_mass .sel_page .sel_age{
        font-size: .35rem;
        margin: 0 .3rem;
        padding: .3rem 0;
        border-bottom: 1px solid #ccc;
    }
    #sel_mass .sel_page .sel_age span.right{
        float: right;
    }
    #sel_mass .sel_page .sel_age p{
        padding: .2rem .3rem;
    }
</style>