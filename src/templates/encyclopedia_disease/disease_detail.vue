<template>
    <div id="disease_detail">
        <topBackTitle :params="params"></topBackTitle>
        <div v-for="(detail,index) in disease_detail">
            <div class="item" v-if="detail.disease_description">
                <p class="name"><span></span>疾病介绍</p>
                <p class="detail">{{detail.disease_description}}</p>
            </div>
            <div id="department" class="item" v-if="detail.disease_description">
                <p class="name"><span></span>就诊科室</p>
                <p class="detail">{{detail.disease_description}}</p>
            </div>
            <div class="item" v-if="detail.mass_description">
                <p class="name"><span></span>高发群体</p>
                <p class="detail">{{detail.mass_description}}</p>
            </div>
            <div class="item" v-if="detail.complication_description">
                <p class="name"><span></span>并发症</p>
                <p class="detail">{{detail.complication_description}}</p>
            </div>
            <div class="item">
                <p class="name"><span></span>传染</p>
                <p class="detail" v-if="detail.spread_description">{{ detail.spread_description}}</p>
                <p class="detail">无传染</p>
            </div>
            <div id="symptom_description" class="item" v-if="detail.symptom_description">
                <p class="name"><span></span>症状</p>
                <p class="detail">{{detail.symptom_description}}</p>
            </div>
            <div id="pathogeny_description" class="item" v-if="detail.pathogeny_description">
                <p class="name"><span></span>病因</p>
                <p class="detail">{{detail.pathogeny_description}}</p>
            </div>
            <div class="item" v-if="detail.disease_description">
                <p class="name"><span></span>检查</p>
                <p class="detail">{{detail.disease_description}}</p>
            </div>
            <div class="item" v-if="detail.diagnose_description">
                <p class="name"><span></span>诊断与鉴别</p>
                <p class="detail">{{detail.diagnose_description}}</p>
            </div>
            <div id="treat_description" class="item" v-if="detail.treat_method_description">
                <p class="name"><span></span>治疗</p>
                <p class="detail">{{detail.treat_method_description}}</p>
            </div>
            <div class="item" v-if="detail.appropriate_diet">
                <p class="name"><span></span>饮食宜忌</p>
                <p class="detail">{{detail.appropriate_diet}}</p>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props:{
        disease_detail:{
            default:function(){
                return []
            }
        }
    },
    data(){
        return{
            params:{
                title:"急性上呼吸道感染"
            }
        }
    },
    methods:{
        getlocal(){
            let id_name = localStorage.getItem('disease_detail_anchor');
            console.log(id_name);
            let anchor_ele = document.getElementById(id_name);
            if(anchor_ele){
                anchor_ele.scrollIntoView({behavior:'smooth',block:"start"});
            }
        }
    },
    mounted(){
        this.$nextTick(() => {
            setTimeout(() => {
                this.getlocal();
            },200)
        })
    }
}
</script>

<style scoped>
    #disease_detail .item{
        padding:.3rem .3rem 0; 
    }
    #disease_detail .item .name{
        font-size: .35rem;
        font-weight: 550;
        padding: .2rem 0;
        border-bottom: 1px solid #aaa;
    }
    #disease_detail .item .name span{
        display: inline-block;
        width: .1rem;
        height: .35rem;
        vertical-align: middle;
        background-color: rgb(40, 94, 58);
    }
    #disease_detail .item .detail{
        font-size: .3rem;
        padding: .2rem 0;
        line-height: .35rem;
    }
</style>
