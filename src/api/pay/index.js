import {ajax,qs} from '../ajax';
export default{
    // ajaxPay(params={}){
    //     // console.log(params);
    //     // params=qs.stringify(params);
    //     return ajax.get(`pay.php?action=pay`, {params});
    // },
    pay(params={}){
        console.log(params);
        return ajax.post('pay.php?action=pay', qs.stringify(params));
    }
}
