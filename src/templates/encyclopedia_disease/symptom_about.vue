<template>
    <div id="disease_about">
        <div class="disease_about_header">
            <span class="back zk-icon-back" @click="back()"></span>
            <p class="edit">相关症状</p>
            <span class="next" @click="submit()">完成</span>
        </div>
        <div class="about_symptom">
            <p>是否还有其他的附属症状：</p>
            <div class="symptoms">
                <span v-for="(asym,index) in symptom" :key="index" class="symptom" :class="{active:has_symptom(asym.id)}" @click="add_symptom(asym.id)">
                    {{asym.symptom_name}}
                </span>
            </div>
        </div>
        <mass @change_age=change_age></mass>
    </div>
</template>

<script>
export default {
    props:{
        symptom:{
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
        return{
            symptom_ids:[],
            mass_id:[],
            sex:""
        }
    },
    methods:{
        change_age(data){
            this.mass_id = data.mass_id;
            this.sex = data.sex; 
        },
        add_symptom(index){
            if(this.symptom_ids.length > 0){
                let ele = this.symptom_ids.indexOf(index);
                if(ele > -1){
                    this.symptom_ids.splice(ele,1);
                }else{
                    this.symptom_ids.push(index);
                }
            }else{
                this.symptom_ids.push(index);
            }
        },
        has_symptom(index){
            if(this.symptom_ids.length > 0){
                if(this.symptom_ids.indexOf(index) > -1){
                    return true;
                }else{
                    return false;
                }
            }else{
                return false;
            }
        },
        back(){
            this.$router.go(-1);
        },
        submit(){
            this.$router.push({name:'container',query:{id:this.params.matchDisease_id,symptom_ids:this.symptom_ids.join(","),mass_id:this.mass_id,sex:this.sex}})
        }
    },
    mounted(){
        this.symptom_ids.push(this.$route.query.symptom_id);
    }
}
</script>

<style scoped>
    #disease_about .about_symptom{
        font-size: .35rem;
        margin: .1rem .3rem;
        padding:.3rem;
        border: 1px solid #ccc;
        background-color: #cccccc40;
    }
    #disease_about .disease_about_header{
        font-size: .35rem;
        color: #fff;
        position: relative;
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background-color: rgb(255, 83, 112);
    }

    #disease_about .disease_about_header .back{
        float: left;
        font-size: .5rem;
    }
    #disease_about .disease_about_header .next{
        position: absolute;
        top: 0;
        right: .3rem;
        color: aqua;
        font-size: .3rem;
    }
    #disease_about .about_symptom>p{
        color: rgb(255, 83, 112);
    }
    #disease_about .about_symptom .ensure{
        text-align: right;
        color: #fff;
        padding-bottom: .2rem;
        border-bottom: 1px solid #aaa;
    }
    #disease_about .about_symptom .ensure span{
        font-size: .25rem;
        padding: .1rem .2rem;
        background-color: rgb(47, 73, 80);
    }
    #disease_about .about_symptom .symptoms{
        margin-top: .3rem;
        padding-top: .1rem;
    }
    #disease_about .about_symptom .symptoms .symptom{
        display: inline-block;
        font-size: .3rem;
        color: #000;
        line-height: .5rem;
        margin: 0 .3rem .1rem 0;
        padding: 0 .2rem;
        border: 1px solid #000;
        border-radius: .2rem;
    }
    #disease_about .about_symptom .symptoms .active{
        color: #fff;
        border: 1px solid #fff;
        background-color: rgb(255, 83, 112);
    }

        #sel_mass .sel_page .sel_sex{
        font-size: .35rem;
        padding: .2rem .3rem;
    }
    #sel_mass .sel_page .sel_sex .sex_cate{
        float: right;
    }
    #sel_mass .sel_page .sel_sex .sex_cate span{
        padding: .1rem .3rem;
        background-color: #eee;
    }
    #sel_mass .sel_page .sel_sex .sex_cate span.active{
        background-color: rgb(255, 83, 112);
    }
    #sel_mass .sel_page .sel_age{
        font-size: .35rem;
        padding: .2rem .3rem;
    }
    #sel_mass .sel_page .sel_age span.right{
        float: right;
    }
    #sel_mass .sel_page .sel_age p{
        padding: .2rem .3rem;
    }

</style>
