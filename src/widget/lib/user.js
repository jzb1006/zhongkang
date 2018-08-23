import api from '../../api/user'
export default{
	//检验手机号
	checkPhoneNum(phonenum){
        let reg_mobile=/^1[3458]\d{9}$/g;
		if(phonenum==""){
			alert('手机号码不能为空');
			return false;
		}else if(!reg_mobile.test(phonenum)){
			alert('手机号码格式不正确');
			return false;
		}
		return true;
	},
	//检验密码
	checkPassword(password){
        let reg=/^[0-9a-zA-Z]{6,12}$/g;
		if(password==""){
			alert('密码不能为空');
			return false;
		}else if(!reg.test(password)){
			alert('密码应该设置为6-12位的数字或字母');
			return false;
		}
		return true;
	},
	//检验验证码
	checkVerificationCode(verificationCode){
        let reg=/^[0-9]{6}$/g;
		if(verificationCode==""){
			alert('验证码不能为空');
			return false;
		}else if(!reg.test(verificationCode)){
			alert('验证码应为系统发送给您手机的六位数字');
			return false;
		}
		return true;
	},
    //日期格式化
    formatDate(date){
        let seperator1 = "-";
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        let currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    },
    //将10位数的时间戳转化成日期格式
    timestampToTime(timestamp) {
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        let D = date.getDate()<10?'0'+date.getDate():date.getDate();
        let h = date.getHours()<10?'0'+date.getHours():date.getHours();
        let m = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes();
        let s = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds();
        let space=' ';
        let seperator=':'
        return Y+M+D+space+h+seperator+m+seperator+s;
    },
    //获取验证码,在手机号未存在时才能获取,参数为手机号
    getVerificationCode(phoneNum){
        api.ajaxuserPost('check_mobilephone',{'mobile':phoneNum}).then(res=>{
            if(res.data.error=='1'){
               alert(res.data.message);
            }else{
               api.ajaxuserPost('yanzhengma',{'mobile':phoneNum}).then(res=>{
                   alert('验证码为'+res.data+' 仅作测试用');
               })
            }
        })
    },
    //获取验证码,在手机号已存在时才能获取,参数为手机号
    getVerificationCode_exit(phoneNum){
        api.ajaxuserPost('check_mobilephone',{'mobile':phoneNum}).then(res=>{
            if(res.data.error=='1'){
                api.ajaxuserPost('yanzhengma',{'mobile':phoneNum}).then(res=>{
                   alert('验证码为'+res.data+' 仅作测试用');
                })
            }else{
                alert(res.data.message);
            }
        })
    },
    //检验是否登录
    checkLogin(self,toPath){
        api.ajaxloginPost('checkLogin').then(function(res){
            if(res.data.error==0){
                self.$router.push({path:'/login'});
            }else{
                self.$router.push({path:toPath});
            }
        }).catch(error=>{
            console.log(error);
        })
    }
    
}