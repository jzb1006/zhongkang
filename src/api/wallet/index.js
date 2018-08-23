import {ajax,qs,} from '../ajax';
export default {
    ajaxWalletGet(module='',params={}){
        return ajax.get(`wallet.php?act=${module}`,{params});
    },
    ajaxWalletPost(module='',params={}){
        params=qs.stringify(params);
        return ajax.post(`wallet.php?action=${module}`,params);
    },
}