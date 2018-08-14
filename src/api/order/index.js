import {ajax,ajax2,qs,img_prifix} from '../ajax';
export default {
    //获取订单列表
    get_order_list(params={}){
        console.log(params);
        return ajax.get('order.php?action=ajax_orderlist',{params})
    },
    //获取订单详情
    get_order_detail(params={}){
        console.log(params);
        return ajax.get('order.php?act=order_detail',{params});
    },
    //直接退款
    refund(params={}){
        console.log(params);
        return ajax.post('user.php?action=ajax_order_op_user',qs.stringify(params))
    },
    //申请退款
    apply_refund(params={}){
        console.log(params);
        return ajax.post('user.php?action=apply_tk_or_th',qs.stringify(params))
    },
    //向平台申诉
    appeal(params={}){
        console.log(params);
        return ajax.post('user.php?action=apply_cancel_order',qs.stringify(params))
    },
    //扫码页面
    scan(params={}){
        console.log(params);
        return ajax.get('goods_order.php?type=scan_QR',{params})
    },
    //确认扫码
    checkScan(params={}){
        console.log(params);
        return ajax.get('goods_order.php?type=scan',{params})
    },
     //相片网址前缀
     imgUrl(){
        return img_prifix;
    }
}