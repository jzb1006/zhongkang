import {ajax,qs,img_prifix} from '../ajax';
export default {
    ajaxloginPost(module ='',params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=${module}`, params);
    },
    ajaxuserPost(module = '',params={}){
        params=qs.stringify(params);
        return ajax.post(`user.php?action=${module}`, params);
    },
    user_center(){
        // params=qs.stringify(params);
        return ajax.get(`user.php?act=user_center`);
    },
    login(params={}){
        params=qs.stringify(params);
        return ajax.post(`user.php?action=login`, params);
    },
    logout(){
        return ajax.get(`user.php?act=logout`);
    },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    },
    email_verification(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=email_verification`, params);
    },
    register(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=register`, params);
    },
    findPass(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=login_forgetpass`, params);
    },
    checkLogin(){
        return ajax.post(`login_register.php?action=checkLogin`);
    },
    getUserInfo(){
        return ajax.get(`user.php?act=get_user_basic_info`);
    }
}