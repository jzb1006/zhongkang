<template>
    <div id="disease_list">
        <div class="item" v-for="(disease,index) in disease_list" :key="index">
            <router-link :to="{name:'container',query:{id:params.disease_detail_id,disease_id:disease.id}}">
                <p class="name">{{disease.disease_name}}</p>
                <p class="description">{{disease.disease_description}}</p>
            </router-link>
            <div class="detail_title">
                <span v-for="(title,index) in disease_titles" :key="index" @click="to_disease_detail(title.id_name,disease.id)">{{title.name}}</span>
            </div>  
        </div>
    </div>
</template>

<script>
export default {
    props:{
        disease_list:{
            default:function(){
                return []
            }
        },
        params:{
            default:function(){
                return {}
            }
        }
    },
    data(){
        return {
            disease_titles:[
                {
                    name:"就诊科室",
                    id_name:"department"    
                },
                {
                    name:"症状",
                    id_name:"symptom_description"
                },
                {
                    name:"病因",
                    id_name:"pathogeny_description"
                },
                {
                    name:"治疗",
                    id_name:"treat_description"
                }
            ]
        }
    },
    methods:{
        to_disease_detail(str,index){
            localStorage.setItem('disease_detail_anchor',str);
            this.$router.push({name:'container',query:{id:this.params.disease_detail_id,disease_id:index}})
        }
    },
    mounted(){
        localStorage.setItem('disease_detail_anchor',"");
    }
}
</script>

<style scoped>
    #disease_list .item{
        padding: .2rem;
    }
    #disease_list .item .name{
        font-size: .35rem;
        font-weight: 550;
        padding: .3rem;
    }
    #disease_list .item .description{
        font-size: .3rem;
        padding: 0 .3rem 0;
        line-height: .4rem;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp:3;
        -webkit-box-orient:vertical; 
        overflow: hidden;
        color: rgb(107, 107, 107);
    }
    #disease_list .item .detail_title{
        display: flex;
        justify-content:space-around;
        align-items: center;
        padding: .2rem 0;
    }   
    #disease_list .item .detail_title span{
        font-size: .3rem;
        padding: 0 .2rem;
        border-right: 1px solid #ccc;
        border-left: 1px solid #ccc;
    }
</style>
