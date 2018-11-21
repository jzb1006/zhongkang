<template>
    <div id="requirement">
        <top :params=params></top>
        <diaryInfo @getFileList=getFileList></diaryInfo>
        <requirementcontent></requirementContent>
        
    </div>
</template>

<script>
import Bus from "@/assets/bus.js"
import top from "@/components/decorate/top.vue"
import diaryInfo from "@/components/common/diary_diary_info"
import requirementContent from '@/components/customized/requirement_content.vue'
import { mapGetters } from "vuex"
export default {
    name:'requirement',
    data() {
        return {
            photo:[],
            chooseItem:[],
            selected:[],
            params:{
                title:'定制',
                hasBtn:true,
                btnText:'下一步',
                next:this.next,
            }
        };
    },
    components: {
        diaryInfo,
        top,
        requirementContent,
    },
    computed: {
        ...mapGetters(["getCustomizedDetail","getPhoto","getLevel"])
    },
    methods: {
        getFileList(data){
            console.log(data);
            this.photo=[];
            data.forEach(ele=>{
                this.photo.push(ele.url);
            })
            this.$store.dispatch('changePhoto',this.photo);
        },
        next(){
            console.log('detail:'+this.getCustomizedDetail);
            console.log('lastName:'+this.$store.state.customized.lastName);
            console.log('age:'+this.$store.state.customized.age);
            console.log('level:'+this.$store.state.customized.level);
            console.log('photo:'+this.getPhoto);
            console.log('min:'+this.$store.state.customized.minPrice);
            console.log('max:'+this.$store.state.customized.maxPrice);
            let detail=this.getCustomizedDetail
            let lastName=this.$store.state.customized.lastName;
            let age=this.$store.state.customized.age
            let level=this.getLevel
            let photo=this.getPhoto
            let min=this.$store.state.customized.minPrice
            let max=this.$store.state.customized.maxPrice



            this.selected=[];
            
            // this.selected_name=[];
            this.chooseItem.forEach(element => {
                this.selected.push(element.id);
                // this.selected_name.push(element.name);
            });
            if(this.selected==""){
                alert('请至少选择一个项目');
                return false;
            }
            console.log('项目:'+this.selected)
            if(lastName==""){
                alert('姓氏不能为空');
                return false;
            }
            if(age===""){
                alert('年龄不能为空');
                return false;
            }
            if(min===''||max===''){
                alert('请填写预算区间');
                return false;
            }
            if(this.min>this.max){
                alert('预算最小值不能大于最大值');
                return false;
            }
            if(detail==""||detail==null){
                alert('请输入详细的定制需求');
                return false;
            }
            if(!this.checkLength(detail)){
                alert('详情字数超过限制');
                return false;
            }
            if(photo==""||photo==null){
                alert('请至少上传一张照片');
                return false;
            }
            
            
            
            // sessionStorage.setItem('lastname',this.lastname);
            // sessionStorage.setItem('age',this.age);
            // sessionStorage.setItem('level',this.level);
            // sessionStorage.setItem('money',this.money);
            // sessionStorage.setItem('detail',this.detail);
            // sessionStorage.setItem('minPrice',this.min);
            // sessionStorage.setItem('maxPrice',this.max);
            // sessionStorage.setItem('photo',JSON.stringify(this.photo));
            sessionStorage.setItem('operation_category',JSON.stringify(this.selected));
            sessionStorage.setItem('operation_category_name',JSON.stringify(this.chooseItem));
            this.$router.push('/adviser');
        },
        // getMin(data){
        //         console.log(data);
        //         this.min=data;
        // },
        // getMax(data){
        //     console.log(data);
        //     this.max=data;
        // },
        checkLength(value){
            if(value.length>200){
                return false;
            }else{
                return true;
            }
        },
            
    },
    mounted() {

        Bus.$on("toItem", res => {
            this.chooseItem = res;
        });
    }
};
</script>

<style scoped>

</style>
