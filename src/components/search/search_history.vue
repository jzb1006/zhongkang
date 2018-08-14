<template>
    <div id="searchHistory" v-show="this.historyList.length>0">
        <h3>历史记录</h3>
        <div class="searchhistory-list">
            <a v-for="item in historyList" href="javascript:void(0)" :key="item" @click="$_history_searchThis(item)">
                <span class="iconfont icon-lishijilu"></span>
                <span>{{item}}</span>
            </a>
        </div>
        <div class="searchhistory-clean" @click="$_history_clean">清空历史记录</div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                historyList: []
            }
        },
        computed:{
           bus(){
              return this.$store.state.search.bus;
           }
        },
        methods: {

            //吧搜索的关键词保存到js的本地储存
            $_history_save(keyword) {
                if (!window.localStorage) {
                    console.log('浏览器不支持本地存储');
                    return;
                }
                //这里判断当前的关键词是否是排第一个，如果不是就排在第一位，
                var index = this.historyList.indexOf(keyword);
                if (index !== -1) {
                    if (index === 0) {
                        return;
                    } else {
                        this.historyList.splice(index, 1);  //删除当前元素
                    }
                }
                // 保存
                this.historyList.unshift(keyword);//从前面插入元素
                window.localStorage.setItem('history',JSON.stringify(this.historyList)); //保存的本地存储
            },
            $_history_searchThis(keyword){
                this.bus.$emit('changeTpText',keyword);
                this.$store.dispatch('changeKeyword',keyword);
                this.bus.$emit('search',-1);
            },
            $_history_clean(){
                this.historyList = [];
                window.localStorage.removeItem('history');  //移除本地存储
            }
        },
        mounted(){
            this.historyList = JSON.parse(window.localStorage.getItem("history")) || []; //获取本地存储
            this.bus.$on('search',()=>{
                var keyword = this.$store.state.search.keyWord;
                if(keyword !==''){
                    this.$_history_save(keyword);
                }
            })
        }
    }
</script>
<style scoped>
    #searchHistory {
        margin-bottom: 0.2rem;
        background-color: #fff;
    }
    #searchHistory h3 {
        height: 0.8rem;
        line-height: 0.8rem;
        padding: 0 0.3rem;
        border-bottom: 1px solid #ccc;
    }
    #searchHistory .searchhistory-list {
        padding: 0 0.3rem;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
    }
    #searchHistory .searchhistory-list a {
        line-height: 0.8rem;
        border-bottom: 1px solid #ccc;
    }
    #searchHistory .searchhistory-list a span:last-child {
        color: #333;
    }
    #searchHistory .searchhistory-clean {
        line-height: 0.8rem;
        text-align: center;
    }
</style>