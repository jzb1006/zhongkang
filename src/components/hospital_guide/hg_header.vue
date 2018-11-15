<template>
    <div id="FHeader">
		<div class="top">
			<p class="title"><span class="en">
			Hospital Guide</span> · <span class="cn">医导</span></p>
		</div>
		<div class="bottom">
			<span>
				{{sel_title}}
			</span>
		</div>
	</div>
</template>

<script>
import bus from "./../../assets/bus.js";
export default{
    name:"fheader",
    data(){
        return{
            sel_title:""
        }
    },
    mounted(){
        var self = this;
        bus.$on('changeTitle',function(data){
           self.sel_title = data;
       })
    }
}
</script>

<style scoped>
        #FHeader{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: .2rem .3rem;
            background-color:#fff;
        }
        #FHeader .top p.title{
            text-align: center;
            font-size: .5rem;
            color: rgb(255, 83, 112);
        }
        #FHeader .top p.title span.cn{
            font-size: .3rem;
        }
        #FHeader .bottom span{
            font-size: .3rem;
            font-weight: 550;
            padding: .1rem .2rem;
            color: #fff;
            border-top-right-radius: .4rem;
            background-color: rgb(255, 83, 112);
        }
</style>




