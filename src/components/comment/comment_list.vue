<template>
    <div id="commentList">
        <comment :limitnum = '2' :info = info :commentlist = total :user=user></comment>
    </div>
</template>
<script>
import apiCom from './../../api/comment'
import comment from './comment'; 

export default {
    data(){
        return{
            info:{
                p_id: "12",//文章的作者id
				p_name:"多大的",//文章的作者
				u_id: "2360",//用户id
				comment_author:"小黄",//用户名字
				comment_parent:"14",//父评论id,默认为0
                comment_post_id: "21",//后台评论类型id
				comment_form: "diary",//属于哪种类型的评论
				comment_form_id: "20",//评论文章的id
            },
            total:[],
            parent:[],
            children:[],
            user:[],
        }
    },
    methods:{
        getcomment(){
            let self = this;
            apiCom.ajaxSearch('index').then(res=>{
                this.parseData(res.data.comments);
                self.user = res.data.user;
            })
        },
        remove_duplicate_data(data){
            var newArr = [];
            for(var i = 0; i < data.length; i++) {　
                if(newArr.indexOf(data[i]) == -1) {　　　　
                    newArr.push(data[i]);　　
                }
            }
            return newArr;
        },
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
    
</style>
