<template>
    <div id="list_footer">
        <div v-if="false" class="updata" @click="update()">
            <span>换一换</span>
            <span class="icon zk-icon-jiaoyiguanli"></span>
        </div>
        <div class="foots" v-if="params.title">
            <router-link :to="{name:'container',query:{id:params.to_cid}}">
                <span class="title">{{params.title}}</span>
                <span class="icon zk-icon-more"></span>
            </router-link>
        </div>
    </div>
</template>

<script>
import bus from "@/assets/bus.js"
export default {
    name:"list_footer",
    props:{
        params:{
            default:function(){
                return {
                    to_cid:'',
                    title:'',
                }
            }
        }
    },
    methods:{
        update(){
            bus.$emit('index_data_material_updata',true);
        }
    }
};
</script>

<style scoped>
#list_footer{
    display: flex;
    align-items: center;
    justify-content: space-around;
}
#list_footer .updata {
    padding: 0.3rem 0;
    font-size: 0.3rem;
    color: #ff5370;
    text-align: center;
}
#list_footer .updata span.icon {
    display: inline-block;
    vertical-align: bottom;
}
#list_footer .foots {
    padding: 0.3rem 0;
    font-size: 0.3rem;
    color: #ff5370;
    text-align: center;
}
#list_footer .foots span.icon {
    display: inline-block;
    vertical-align: bottom;
}
</style>
