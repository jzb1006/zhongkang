import {ajax,qs,ajax2} from '../ajax';
export default {

    ajax(module = 'index',params={}){
        params=qs.stringify(params);
        return ajax.get(`login_register.php?action=${module}`, {params});
    },
    ajaxpost(module = 'index',params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=${module}`, params);
    },
    ajaxuserPost(module = 'index',params={}){
        params=qs.stringify(params);
        return ajax.post(`user.php?action=${module}`, params);
    },
    ajaxuserGet(module = 'index',params={}){
        // params=qs.stringify(params);
        return ajax.get(`user.php?act=${module}`, {params});
    },
    ajaxWalletGet(module='index',params={}){
        return ajax.get(`wallet.php?act=${module}`,{params});
    },
    ajaxWalletPost(module='index',params={}){
        params=qs.stringify(params);
        return ajax.post(`wallet.php?action=${module}`,params);
    },
    ajaxSetupGet(module = 'index',params={}){
        // console.log(params);
        params=qs.stringify(params);
        return ajax.get(`setup.php?act=${module}`, params);
    },
    ajaxSetupPost(module = 'index',params={}){
        // console.log(params);
        params=qs.stringify(params);
        return ajax.post(`setup.php?action=${module}`, params);
    },
    ajaxOrderGet(module='index',params={}){
        return ajax.get(`order.php?act=${module}`, {params});
    },
    ajaxPayPost(module = 'index',params={}){
        // console.log(params);
        params=qs.stringify(params);
        return ajax.post(`pay.php?action=${module}`, params);
    },
    //相片网址前缀
    imgUrl(){
        return "http://localhost/"
    }
    
}