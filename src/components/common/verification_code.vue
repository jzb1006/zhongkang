<template>
    <div id="verification_code">
        <!-- <div class="div1">
            <div class="code"> -->
                <div class="vux-1px include left"><input type="text" class="input yan" placeholder="手机验证码" v-model="verificationCode" @blur="inputCode"></div>
                <span :class="{input:true, get:true, right:true,dis:disable}" @click="flag && get_yanzhengma()">{{codeText}}</span>
                <div class="clear"></div>
            <!-- </div>
        </div> -->
    </div>
</template>
<script>
import api from '../../api/user'
import common from '../../widget/lib/user'
export default {
    name:'verification_code',
    data(){
        return{
            verificationCode:'',
            codeText:'获取验证码',
            flag:true,
            disable:false,
            // phone_num:'',
        }
    },
    props:{
        exist:{
            type:[Boolean],
            default:false,
        },
        phoneNum:{
            type:[String],
        },
        isHasPhone:{
            type:[Boolean],
            default:true,
        }
    },
    methods:{
        get_yanzhengma(){
            if(!this.isHasPhone){
                // api.ajaxuserPost('yanzhengma').then(res=>{
                //     alert(`验证码为${res.data},仅作测试用`);
                //     var i=60;
                //     var timeId=setInterval(()=>{
                //         this.disable=true;
                //         this.flag=false;
                //         i=i-1;
                //         this.codeText=i.toString()+' 秒';
                //         if(i==0){
                //             clearInterval(timeId);
                //             this.flag=true;
                //             this.disable=false;
                //             this.codeText="重新获取";
                //         }
                //     },1000);
                // }).catch(error=>{
                //     console.log(error);
                // }) 
                this.getCode('');
            }else{
                if(!common.checkPhoneNum(this.phoneNum)){
                    return false;
                }
                // common.getVerificationCode(mobileNum,self);
                
                api.ajaxuserPost('check_mobilephone',{'mobile':this.phoneNum}).then(res=>{
                    if(this.exist){
                        if(res.data.error=='1'){
                            this.getCode(this.phoneNum);
                        }else{
                            alert(res.data.message);
                        }
                    }else{
                        if(res.data.error=='1'){
                            alert(res.data.message);
                        }else{
                            this.getCode(this.phoneNum);
                        }
                    }
                    
                })
            }
    
        },
        inputCode(){
            this.$emit('inputCode',this.verificationCode);
        },
        getCode(phone){
            api.ajaxuserPost('yanzhengma',{'mobile':phone}).then(res=>{
                alert('验证码为'+res.data+' 仅作测试用');
                var i=60;
                var timeId=setInterval(()=>{
                    this.disable=true;
                    this.flag=false;
                    i=i-1;
                    this.codeText=i.toString()+' 秒';
                    if(i==0){
                        clearInterval(timeId);
                        this.flag=true;
                        this.disable=false;
                        this.codeText="重新获取";
                    }
                },1000);
                
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        // this.phone_num=this.phoneNum;
    }
}
</script>
<style scoped>
    .div1{
        margin:0 .5rem .3rem;
        height:1rem;
    }
    .include{
		width:70%;
        margin:0 auto;
		padding:.1rem;
	}
    .input{
        position: relative;
        z-index:100;
        display:block;
        width:96%;
        margin:0 auto;
    }
    .yan{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.15rem .15rem .15rem 0;
        font-size:.3rem;
	}
	.get{
		box-sizing: border-box;
		position: relative;
        z-index:100;
        display:block;
        width:100%;
        margin:0 auto;
		padding:.27rem 0;
		background: #ff5370;
        color:#fff;
        font-size:.3rem;
        text-align: center;
	}
    .left{
        padding:0.1rem;
        float:left;
        width:65%;
        box-sizing:border-box;
    }
    .right{
        float:left;
        width:35%;
		box-sizing:border-box;
    }
    .dis{
        opacity:.7;
    }
	.clear{
        content:'';
        display:block;
        clear:both;
    }
</style>


