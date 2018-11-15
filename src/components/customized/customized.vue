<template>
    <div id="customized">
        <top title="定制"></top>
        <div class="title">请选择手术类别(至多选三种)：</div>
        <!-- <ul class="nav">
            <li v-for="item in result" :key="item.operation_id" :class="{list:true,bg:istrue(item.operation_id)}" @click="select(item)">
                {{item.operation_name}}
            </li>
        </ul> -->
        <diary-sel-content @choose="choose"></diary-sel-content>
        <!-- <operation-list @passSelected="getSelected"></operation-list> -->
        <div @click="next" class="next" >下一步</div>
        <!-- <diarySelItem>
            <div slot="click" @click="next" class="submit" >下一步</div>
        </diarySelItem> -->
            
        
    </div>    
</template>

<script>
    import customized from './../../api/customized'
    import operationList from './operation_list'
    import top from '@/components/decorate/top_back_title.vue'
    import Bus from "@/assets/bus.js";
    import diarySelContent from "@/components/diary/diary_sel_content.vue";
    export default{
        name:'customized',
        data(){
            return{
                // result:[],
                selected:[],
            }
        },
        methods:{
            choose(data){
                console.log(data);
                // this.selected=data;
                this.selected=[];
                data.forEach(element => {
                    this.selected.push(element.id);
                });
            },
            // select(item){
            //     if(this.selected.length>0){
            //         for (let index in this.selected) {
            //             if (this.selected[index] == item.operation_id) {
            //                 this.selected.splice(index,1);
            //                 return false;
            //             }
            //         }
            //     }
            //     if(this.selected.length<3){
            //         this.selected.push(item.operation_id);
            //     }else if(this.selected.length>=3){
            //         this.selected.splice(2,1,item.operation_id);
            //     }
            // },
            // istrue(id){
            //     for (let index in this.selected) {
            //         if (this.selected[index] == id) {
            //             return true;
            //         }
            //     }
            //     return false;
            // },
            getSelected(data){
                this.selected=data;
            },
            next(){
                // console.log(this.choose);
                if(this.selected==''){
                    alert('至少选择一个手术类别');
                    return false;
                }
                sessionStorage.setItem('operation_category',JSON.stringify(this.selected));
                this.$router.push('/requirement');
            }
        },
        mounted(){
            
            Bus.$emit("changeSelItem", true);
            customized.get_operationList()
            .then(res=>{
                console.log(typeof res.data);
                this.result=res.data;
                // console.log(this.result);
            })
            .catch(err=>{
                console.log(err);
            })
        },
        components:{
            top,
            operationList,
            diarySelContent
        }
    }
</script>

<style scoped>
    .title{
        font-size:.35rem;
        margin:.3rem;
    }
    .nav:after{
        content:'';
        display: block;
        clear:both;
    }
    .list{
        float:left;
        width:30%;
        height:.7rem;
        line-height:.7rem;
        background-color: #f3f7f7;
        color:#ff5370;
        font-size:.3rem;
        text-align: center;
        margin:.1rem;
        box-sizing: border-box;
        border-radius:.4rem;
    }
    .bg{
        background:#ff5370;
        color:#fff;
    }
    .next{
        position:relative;
        width:50%;
        margin:.3rem auto;
        height:.8rem;
        line-height:.8rem;
        text-align: center;
        font-size:.3rem;
        background:#ff5370;
        color:#ffffff;
        z-index:111;
    }
</style>