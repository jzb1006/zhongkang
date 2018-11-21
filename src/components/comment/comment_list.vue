<template>
    <div id="commentList">
        <comment :limitnum = '1' :commentlist = total :mid = m_id></comment>
    </div>
</template>
<script>
import apiCom from './../../api/comment'
import comment from '@/templates/comment/comment'; 
import bus from "@/assets/bus.js"
export default {
    name:"comment_list",
    props:{
        m_id:{
            default:'12'
        }
    },
    data(){
        return{
            info:{
                comment_post_ID: 19,//数据库文章id
                comment_parent: "0",//父级id
                comment_form: "diary",//类型
                comment_form_id: "12",//评论素材id
                parent_id: "3030"//被评论者id
            },
            total:[],
            parent:[],
            children:[],
        }
    },
    methods:{
        //获取评论
        getcomment(){
            let self = this;
            apiCom.ajaxSearch('index',{comment_form:'diary',id:'12'}).then(res=>{
                this.parseData(res.data.comments);
            })

            bus.$emit('comment_info',this.info);
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
    components:{
        comment,
    },
    mounted(){
        this.getcomment();
    }
}
</script>
<style scoped>
    #commentList{
        position: relative;
        background-color: #fff;
        z-index: 550;
    }
</style>
