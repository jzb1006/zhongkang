import {ajax} from '../ajax';
export default{
    ajaxPay(params={}){
        // console.log(params);
        // params=qs.stringify(params);
        return ajax.get(`pay.php?action=pay`, {params});
    }
}
