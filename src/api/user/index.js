import {ajax,qs,ajax2,img_prifix} from '../ajax';
export default {

    ajax(module = '',params={}){
        // params=qs.stringify(params);
        return ajax.get(`login_register.php?action=${module}`, {params});
    },
    ajaxpost(module = '',params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post(`login_register.php?action=${module}`, params);
    },
    ajaxuserPost(module = '',params={}){
        params=qs.stringify(params);
        return ajax.post(`user.php?action=${module}`, params);
    },
    ajaxuserGet(module = '',params={}){
        // params=qs.stringify(params);
        return ajax.get(`user.php?act=${module}`, {params});
    },
    ajaxWalletGet(module='',params={}){
        return ajax.get(`wallet.php?act=${module}`,{params});
    },
    ajaxWalletPost(module='',params={}){
        params=qs.stringify(params);
        return ajax.post(`wallet.php?action=${module}`,params);
    },
    ajaxSetupGet(module = '',params={}){
        // console.log(params);
        // params=qs.stringify(params);
        return ajax.get(`setup.php?act=${module}`, params);
    },
    ajaxSetupPost(module = '',params={}){
        // console.log(params);
        params=qs.stringify(params);
        return ajax.post(`setup.php?action=${module}`, params);
    },
    ajaxOrderGet(module='',params={}){
        return ajax.get(`order.php?act=${module}`, {params});
    },
    ajaxPayGet(module = '',params={}){
        // console.log(params);
        // params=qs.stringify(params);
        return ajax.get(`pay.php?action=${module}`, {params});
    },
    ajaxBalancePost(module = '',params={}){
        // console.log(params);
        params=qs.stringify(params);
        return ajax.post(`setup.php?action=${module}`, params);
    },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    }
    
}