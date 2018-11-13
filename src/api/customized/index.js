import {ajax,qs,img_prifix} from './../ajax'
export default{
    get_operationList(){
        return ajax.get('customized.php?act=get_operationList');
    },
    saveCustomizedDemand(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=saveCustomizedDemand',params);
    },
    queryCustomizedOrder(params={}){
        return ajax.get('customized.php?act=queryCustomizedOrder',{params});
    },
    getAdviserList(params={}){
        return ajax.get('customized.php?act=getAdviserList',{params});
    },
    adviserAuthentication(params={}){
        console.log(params);
        params=qs.stringify(params);
        return ajax.post('customized.php?action=adviserAuthentication',params);
    },
    queryAdviserOrder(){
        return ajax.get('customized.php?act=queryAdviserOrder');
    },
    receiptDetail(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=receiptDetail',params);
    },
    customizedOrderDetail(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=customizedOrderDetail',params);
    },
    saveCustomizedReply(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=saveCustomizedReply',params);
    },
    viewReply(params={}){
        return ajax.get('customized.php?act=viewReply',{params});
    },
    querySingleReply(params={}){
        return ajax.get('customized.php?act=querySingleReply',{params});
    },
    updateSingleReply(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=updateSingleReply',params);
    },
    queryReceiptOrder(params={}){
        return ajax.get('customized.php?act=queryReceiptOrder',{params});
    },
    queryReplyOrder(){
        return ajax.get('customized.php?act=queryReplyOrder');
    },
    getinfo(){
        return ajax.get('customized.php?act=getinfo');
    },
    getImgByUserId(params={}){
        return ajax.get('customized.php?act=getImgByUserId',{params});
    },
    saveCustomizedChat(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=saveCustomizedChat',params);
    },
    //保存顾问发送消息记录
    saveAdviserChat(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=saveAdviserChat',params);
    },
    //保存用户发送消息记录
    saveUserChat(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=saveUserChat',params);
    },
    queryChatRecord(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=queryChatRecord',params);
    },
    link(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=link',params);
    },
    cuspay(params={}){
        return ajax.get('customized.php?act=cuspay',{params});
    },
    //顾问接单
    receipt(params={}){
        return ajax.get('customized.php?act=receipt',{params});
    },
    //直接退款
    refund(params={}){
        console.log(params);
        return ajax.post('customized.php?action=ajax_order_op_user',qs.stringify(params))
    },
    //申请退款
    apply_refund(params={}){
        console.log(params);
        return ajax.post('user.php?action=customized_apply_tk_or_th',qs.stringify(params))
    },
    //向平台申诉
    appeal(params={}){
        console.log(params);
        return ajax.post('user.php?action=customized_apply_cancel_order',qs.stringify(params))
    },
    //顾问向平台申述确认消费
    appeal_confirm_consumption(params={}){
        console.log(params);
        return ajax.post('user.php?action=appeal_confirm_consumption',qs.stringify(params))
    },
    //查看顾问认证状态
    query_authentication_state(){
        return ajax.get('customized.php?act=query_authentication_state');
    },
    //查询顾问资料
    queryAdviserInfo(){
        return ajax.get('customized.php?act=queryAdviserInfo');
    },
    //用户订单操作
    userOrderOperation(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=userOrderOperation',params);
    },
    //顾问订单操作
    adviserOrderOperation(params={}){
        params=qs.stringify(params);
        return ajax.post('customized.php?action=adviserOrderOperation',params);
    },
    //相片网址前缀
    imgUrl(){
        return img_prifix;
    }
}