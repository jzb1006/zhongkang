import {ajax,qs,img_prifix} from '../ajax';
export default {
    ajaxSetupGet(module = '',params={}){
        console.log(params);
        return ajax.get(`setup.php?act=${module}`, params);
    },
    // ajaxSetupPost(module = '',params={}){
    //     console.log(params);
    //     params=qs.stringify(params);
    //     return ajax.post(`setup.php?action=${module}`, params);
    // },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    },
    update_userinfo(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post('setup.php?action=update_userinfo', params);
    },
    updatemobile(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post('setup.php?action=updatemobile', params);
    },
    edit_email(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post('setup.php?action=edit_email', params);
    },
    update_pass(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post('setup.php?action=updatepass', params);
    },
}