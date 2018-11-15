<template>
    <div id="operation_list">
        <ul class="nav">
            <li v-for="item in result" :key="item.operation_id" :class="{list:true,bg:istrue(item.operation_id)}" @click="select(item)">
                {{item.operation_name}}
            </li>
        </ul>
    </div>    
</template>

<script>
    import customized from './../../api/customized'
    export default{
        name:'operation_list',
        data(){
            return{
                result:[],
                selected:[],
            }
        },
        methods:{
            select(item){
                if(this.selected.length>0){
                    for (let index in this.selected) {
                        if (this.selected[index] == item.operation_id) {
                            this.selected.splice(index,1);
                            return false;
                        }
                    }
                }
                if(this.selected.length<3){
                    this.selected.push(item.operation_id);
                }else if(this.selected.length>=3){
                    this.selected.splice(2,1,item.operation_id);
                }

                this.$emit('passSelected',this.selected);
            },
            istrue(id){
                for (let index in this.selected) {
                    if (this.selected[index] == id) {
                        return true;
                    }
                }
                return false;
            },
        },
        mounted(){
            customized.get_operationList()
            .then(res=>{
                console.log(typeof res.data);
                this.result=res.data;
                // console.log(this.result);
            })
            .catch(err=>{
                console.log(err);
            })
        }
    }
</script>

<style scoped>
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
</style>