<template>
    <comment :commentlist = total></comment>
</template>
<script>
import apiCom from '@/api/comment'
import comment from '@/templates/comment/comment'; 
export default {
    name:"comment_detail",
    data(){
        return{
            total:[],
            parent:[],
            children:[],
            comment_form:"",
            id:"",
        }
    },
    components:{
        comment
    },
    methods:{
        getComment(){
            let self = this;
            apiCom.ajaxSearch('getOnce',{comment_form:this.comment_form,mid:this.mid,cid:this.id}).then(res=>{
                this.parseData(res.data.comments);
            })
        },
        //去除重复数据
        remove_duplicate_data(data){
            var newArr = [];
            for(var i = 0; i < data.length; i++) {　
                if(newArr.indexOf(data[i]) == -1) {　　　　
                    newArr.push(data[i]);　　
                }
            }
            return newArr;
        },
        //整理评论数据
        parseData(data){
            for(let index in data){
                if(data[index].comment_parent == 0){
                    this.parent = [];
                    this.children = [];
                }

                let arr = {
                    id:data[index].id,
                    uid:data[index].uid,
                    username:data[index].username,
                    parent_id:data[index].parent_id,
                    parent_name:data[index].parent_name,
                    comment_ID:data[index].comment_ID,
                    comment_date:data[index].comment_date,
                    comment_parent:data[index].comment_parent,
                    comment_content:data[index].comment_content,
                    comment_form_id:data[index]. comment_form_id,
                    comment_form:data[index]. comment_form,
                    reply:[]
                }

                if(data[index].comment_parent == 0){
                    this.parent = this.parent.concat(arr);
                }else{
                    this.children = this.children.concat(arr);
                }

                if(Object.keys(data[index].comment_ID).length > 0){
                    this.parseData(data[index].comment_ID);
                }else{
                    for(let index in this.parent){
                        this.parent[index].reply = this.children;
                    }
                    this.total = this.total.concat(this.parent);
                }
            }
            this.total = this.remove_duplicate_data(this.total);
        }
    },
    mounted(){
        this.comment_form = this.$route.query.comment_form;
        this.id = this.$route.query.id;
        this.mid = this.$route.query.mid;
        this.getComment();
    }

}
</script>
<style scoped>
    
</style>
