<template>
     <div id="hotsearch">
        <h3>大家都在搜</h3>
        <div class="hotsearch-list">
            <a v-for="(item, index) in list" :key="index" href="javascript:void(0)" @click="handlerHot(item)" class="active">{{item.title}}</a>
        </div>
    </div>
</template>
<script>
export default {
    name:'Hot',
    data(){
        return   {
            list:[
            {
                "title": "水光针",
                "type": "1",
                "url": "app.soyoung:\/\/resultSearch?content=水光针&type=1",
                "order": "1",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "水光针",
                    "type": "1"
                }
            },
            {
                "title": "皮秒",
                "type": "1",
                "url": "app.soyoung:\/\/resultSearch?content=面部吸脂&type=1",
                "order": "2",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "皮秒",
                    "type": "1"
                }
            },
            {
                "title": "华美",
                "type": "3",
                "url": "app.soyoung:\/\/resultSearch?content=瘦脸针&type=1",
                "order": "3",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "华美",
                    "type": "2"
                }
            },
            {
                "title": "双眼皮",
                "type": "1",
                "url": "app.soyoung:\/\/resultSearch?content=双眼皮&type=1",
                "order": "4",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "双眼皮",
                    "type": "1"
                }
            },
            {
                "title": "美白针",
                "type": "1",
                "url": "app.soyoung:\/\/resultSearch?content=美白针&type=1",
                "order": "5",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "美白针",
                    "type": "1"
                }
            },
            {
                "title": "眼综合",
                "type": "1",
                "url": "app.soyoung:\/\/resultSearch?content=眼部综合&type=1",
                "order": "6",
                "position": "0",
                "m_url": {
                    "result_type": "resultSearch",
                    "content": "眼部综合",
                    "type": "1"
                }
            },
         
        ]
        };
    },
    computed:{
      bus(){
          return this.$store.state.search.bus;
      }
    },
    methods:{
         handlerHot(item) {
             if(item.m_url){
                 if(item.m_url.result_type=='resultSearch'){
                     this.bus.$emit('changeIpText',item.m_url.content);
                     this.searchThis(item.title,item.m_url.type);
                 }else if(item.m_url.result_type=='priduct'){
                      location.href = '/normal/cpwap'+item.m_url.pid;
                 }else{
                     location.href = item.url;
                 }
             }else{
                 location.href = item.url;
             }
         },
         searchThis(keyword,type){
            type = parseInt(type)
            this.$store.dispatch('changeTabIndex',type)
            this.$store.dispatch('changeKeyword',keyword);
            this.bus.$emit('search',-1);
         }
    }
}
</script>
<style>
    #hotsearch {
    padding: 0.3rem;
    margin-bottom: 0.2rem;
    background-color: #fff;
    }
    #hotsearch h3 {
    font-size: 0.28rem;
    color: #b8b8b8;
    margin-bottom: 0.3rem;
    }
    #hotsearch .hotsearch-list {
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-flow: wrap;
        -ms-flex-flow: wrap;
            flex-flow: wrap;
    }
    #hotsearch .hotsearch-list a {
    background: #f5f5f5;
    min-width: 2rem;
    border-radius: 999px;
    font-size: 0.26rem;
    color: #333;
    line-height: 0.48rem;
    text-align: center;
    margin-right: 0.2rem;
    margin-bottom: 0.2rem;
    }
    #hotsearch .hotsearch-list .active {
    color: #fc5d7b;
    }
</style>