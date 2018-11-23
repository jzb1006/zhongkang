import {ajax,qs} from '../ajax';
export default {
    ajaxWalletGet(module='',params={}){
        return ajax.get(`wallet.php?act=${module}`,{params});
    },
    ajaxWalletPost(module='',params={}){
        params=qs.stringify(params);
        return ajax.post(`wallet.php?action=${module}`,params);
    },
    // ajaxBalancePost(module = '',params={}){
    //     // console.log(params);
    //     params=qs.stringify(params);
    //     return ajax.post(`setup.php?action=${module}`, params);
    // },
    update_user_bank(params={}){
        params=qs.stringify(params);
        return ajax.post('wallet.php?action=update_user_bank',params);
    },
    getBalance(){
        return ajax.get('wallet.php?act=balance');
    },
    remove_bank(params={}){
        params=qs.stringify(params);
        return ajax.post('wallet.php?action=remove_bank',params);
    },
    getBankList(){
        return ajax.get('wallet.php?act=bank');
    },
    select_bill(params={}){
        params=qs.stringify(params);
        return ajax.post('wallet.php?action=select_bill',params);
    },
    checkBank(params={}){
        console.log(params);
        return ajax.get('wallet.php?act=check_bank',{params});
    },
    cash(params={}){
        return ajax.get('wallet.php?act=yuetixian',{params});
    },
    recharge(params={}){
        params=qs.stringify(params);
        return ajax.post(`wallet.php?action=chongzhi`,params);
    },
}