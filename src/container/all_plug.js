import Search from '@/components/search/search.vue'
import productDetail from '@/components/product/detail.vue'
import proDiary from '@/components/product/pro_diary.vue'
import mycart from '@/components/shopping/mycart_checkout.vue'
import pay from '@/components/shopping/pay.vue'
import orderList from '@/components/order/order_list.vue'
import orderDetail from '@/components/order/order_detail.vue'
import applyRefund from '@/components/order/apply_refund.vue'
import appeal from '@/components/order/appeal.vue'
import scanQR from '@/components/order/scanQR.vue'
import hospitalDetail from '@/components/hospital/detail.vue'
import insAlbum from '@/components/hospital/ins_album.vue'
import ins_imgList from '@/components/hospital/img_list.vue'
import ins_licence from '@/components/hospital/licence.vue'
import insDiary from '@/components/hospital/ins_diary.vue'
import docList from '@/components/hospital/doc_list.vue'
import Map from '@/components/hospital/to_Map.vue'

import productList from '@/components/common/product_list.vue'
import docAlbum from '@/components/doctor/doc_album.vue'
import doc_imgList from '@/components/doctor/img_list.vue'
import doc_licence from '@/components/doctor/licence.vue'
import doctorDetail from '@/components/doctor/detail.vue'
import doctorDiary from '@/components/doctor/doc_diary.vue'

import HProductList from '@/components/home/product_list.vue'
import HDoctorList from '@/components/home/doctor_list.vue'
import HHospitalList from '@/components/home/hospital_list.vue'

import bill from '@/components/user_wallet/user_bill'
import billDetail from '@/components/user_wallet/bill_detail'
import bank from '@/components/user_wallet/user_bank'
import chooseBank from '@/components/user_wallet/user_chooseBank'
import balance from '@/components/user_wallet/user_balance'

//评论
import commentInput from '@/components/comment/comment_input'
import commentList from '@/components/comment/comment_list'
import commentDetail from '@/components/comment/comment_detail'

//素材
import materialList from '@/components/material/material_list'
import articleDetail from '@/components/material/article_detail'
import videoDetail from '@/components/material/video_detail'
import atlasesDetail from '@/components/material/atlases_detail'

//公共
import reward from '@/components/decorate/reward.vue'
import upload from '@/components/upload/upload.vue'
import mediaDisplay from '@/components/upload/media_display.vue'
import aloneDisplay from '@/components/upload/alone_display.vue'
import carousel from '@/components/decorate/carousel.vue'
import container from '@/container/container.vue'
import eMeta from '@/components/decorate/eMeta.vue'
import authorInfo from '@/components/decorate/author_info.vue'
import listHeader from '@/components/decorate/list_header.vue' //头部
import listFooter from '@/components/decorate/list_footer.vue' // 尾部

//diary
import diaryList from '@/components/diary/diary_list.vue'
import diaryBackdropUser from '@/components/diary/diary_backdrop_user.vue'
import diaryBackdropContent from '@/components/diary/diary_backdrop_content.vue'
import diaryDetailTop from '@/components/diary/diary_detail_top.vue'
import diaryDetail from '@/components/diary/diary_detail.vue'
import diaryBackdropList from '@/components/diary/diary_backdrop_list.vue'
import diaryOperate from '@/components/diary/diary_operate.vue'

//私人定制
import submitOrder from '@/components/customized/submit_order.vue'
import detailItemTem from '@/components/commonTemplete/detailItemTem.vue'
import receiptOrderItem from "@/components/adviser/receipt_order_item.vue"
import adviserOrderItem from '@/components/adviser/adviser_order_item.vue'
import orderDetailItem from '@/components/customized/order_detail_item.vue'
import adviserOrderOperation from '@/components/adviser/adviser_order_operation.vue'
import replyBox from '@/components/customized/reply_box.vue'
import addReply from '@/components/adviser/add_reply.vue'
import detailItem from '@/components/customized/detail_Item.vue'
import orderItem from '@/components/customized/order_item'
import tab from '@/components/customized/tab'
<<<<<<< HEAD
import customizedOrderOperation from '@/components/customized/customized_order_operation.vue'
import chat from '@/components/customized/chat.vue'
import chatContent from  '@/components/customized/chat_content.vue'
=======
import customizedOrderOperation from '@/components/customized/customizedOrderOperation.vue'
import chatContent from '@/components/customized/chat_content.vue'
>>>>>>> d08708acebc006ed57e0b2a01fbd975ce47800d7
import chatFoot from '@/components/customized/chat_foot.vue'
import customizedOrderBox from '@/components/customized/customized_order_box.vue'
import requirement from '@/components/customized/requirement'
import chooseAdviser from '@/components/adviser/list.vue'
import customizedReply from '@/components/adviser/customized_reply.vue'
import selectAdviserLevel from '@/components/customized/select_adviser_level.vue'


//个人中心
import userHead from '@/components/user/userHead.vue'
import userOrder from '@/components/user/userOrder.vue'
import userRow from "@/components/user/row/userRow.vue"
import forgetPassword from '@/components/user/forgetPassword.vue'
import userLogin from '@/components/user/userLogin.vue'
import losePhoneNum from '@/components/user/losePhoneNum.vue'
import userRegister from '@/components/user/userRegister.vue'
import findPassword from '@/components/user/findPassword.vue'
import emailTop from '@/components/user/emailTop'
import modifyEmail from '@/components/user/modifyEmail'
import modifyPassword from '@/components/user/modifyPassword.vue'
import showPhone from '@/components/user/showPhone.vue'
import modifyPhone from '@/components/user/modifyPhone.vue'
import phoneTop from '@/components/user/phoneTop.vue'
import selfinfo from '@/components/user/selfinfo.vue'
import top from "@/components/decorate/top.vue";
import logout from "@/components/user/logout.vue"
import userSetupRow from "@/components/user/row/userSetupRow.vue"
import userPhoneRow from "@/components/user/row/userPhoneRow.vue"
import userEmailRow from "@/components/user/row/userEmailRow.vue"
import walletTab from '@/components/wallet/walletTab.vue'
import addBank from '@/components/wallet/addBank.vue'
import cash from "@/components/wallet/cash.vue"
import recharge from "@/components/wallet/recharge.vue"
import billDetailItem from "@/components/wallet/billDetailItem.vue"

import userAdviserInfo from "@/components/user/list/adviserInfo.vue"
import userAuthentication from "@/components/user/list/Authentication.vue"
import userCustomized from "@/components/user/list/customized.vue"
import usercusOrder from "@/components/user/list/cusOrder.vue"
import userMoney from "@/components/user/list/money.vue"
import userReceipt from "@/components/user/list/Receipt.vue"
import userViewOrder from "@/components/user/list/viewOrder.vue"
<<<<<<< HEAD

import setupEmail from "@/components/user/list/setupEmail.vue"
import setupPassword from "@/components/user/list/setupPassword.vue"
import setupPhone from "@/components/user/list/setupPhone.vue"
import setupSelfinfo from "@/components/user/list/setupSelfinfo.vue"

//模板
// import avg from '@/model/avg.vue'
=======
>>>>>>> d08708acebc006ed57e0b2a01fbd975ce47800d7

//医导
import hospitalGuide from "@/components/hospital_guide/hospital_guide.vue";
import hgHeader from "@/components/hospital_guide/hg_header.vue";
import hgFooter from "@/components/hospital_guide/hg_footer.vue";
import hgItem from "@/components/hospital_guide/hg_item.vue";
import hgTreatMethods from "@/components/hospital_guide/hg_treat_methods.vue";
import hgResource from "@/components/hospital_guide/hg_resource.vue";
import hgBrand from "@/components/hospital_guide/hg_brand.vue";
import hgProduct from "@/components/hospital_guide/hg_product.vue";
import hgNursing from "@/components/hospital_guide/hg_nursing.vue";
import hgHospital from "@/components/hospital_guide/hg_hospital.vue";
import hgExpert from "@/components/hospital_guide/hg_expert.vue";

export default {
<<<<<<< HEAD
    install(Vue,options){
        // Vue.component('e-mate',meta)
        // Vue.component('carousel',carousel)
        Vue.component('upload',upload)
        Vue.component('container',container)
        // Vue.component('avg',avg)

        Vue.component('submitOrder',submitOrder)
        Vue.component('detailItemTem',detailItemTem)
        Vue.component('receiptOrderItem',receiptOrderItem)
        Vue.component('adviserOrderItem',adviserOrderItem)
        Vue.component('orderDetailItem',orderDetailItem)
        Vue.component('adviserOrderOperation',adviserOrderOperation)
        Vue.component('replyBox',replyBox)
        Vue.component('addReply',addReply)
        Vue.component('detailItem',detailItem)
        Vue.component('orderItem',orderItem)
        Vue.component('tab',tab)
        Vue.component('customizedOrderOperation',customizedOrderOperation)
        Vue.component('chatContent',chatContent)
        Vue.component('chatFoot',chatFoot)
        Vue.component('customizedOrderBox',customizedOrderBox)
        Vue.component('requirement',requirement)
        Vue.component('chooseAdviser',chooseAdviser)
        Vue.component('customizedReply',customizedReply)
        Vue.component('selectAdviserLevel',selectAdviserLevel)
        Vue.component('chat',chat)
        

        Vue.component('top',top)
        Vue.component('userHead',userHead)
        Vue.component('userOrder',userOrder)
        Vue.component('userRow',userRow)
        Vue.component('forgetPassword',forgetPassword)
        Vue.component('userLogin',userLogin)
        Vue.component('losePhoneNum',losePhoneNum)
        Vue.component('userRegister',userRegister)
        Vue.component('findPassword',findPassword)
        Vue.component('emailTop',emailTop)
        Vue.component('modifyEmail',modifyEmail)
        Vue.component('modifyPassword',modifyPassword)
        Vue.component('showPhone',showPhone)
        Vue.component('modifyPhone',modifyPhone)
        Vue.component('phoneTop',phoneTop)
        Vue.component('selfinfo',selfinfo)
        Vue.component('logout',logout)
        Vue.component('userSetupRow',userSetupRow)
        Vue.component('userPhoneRow',userPhoneRow)
        Vue.component('userEmailRow',userEmailRow)
        Vue.component('walletTab',walletTab)
        Vue.component('addBank',addBank)
        Vue.component('cash',cash)
        Vue.component('recharge',recharge)
        Vue.component('billDetailItem',billDetailItem)

        Vue.component('userAdviserInfo',userAdviserInfo)
        Vue.component('userAuthentication',userAuthentication)
        Vue.component('userCustomized',userCustomized)
        Vue.component('userCusOrder',usercusOrder)
        Vue.component('userMoney',userMoney)
        Vue.component('userReceipt',userReceipt)
        Vue.component('userViewOrder',userViewOrder)

        Vue.component('setupEmail',setupEmail)
        Vue.component('setupPassword',setupPassword)
        Vue.component('setupPhone',setupPhone)
        Vue.component('setupSelfinfo',setupSelfinfo)
    }
=======
  install(Vue, options) {
    Vue.component('submitOrder', submitOrder)
    Vue.component('detailItemTem', detailItemTem)
    Vue.component('receiptOrderItem', receiptOrderItem)
    Vue.component('adviserOrderItem', adviserOrderItem)
    Vue.component('orderDetailItem', orderDetailItem)
    Vue.component('adviserOrderOperation', adviserOrderOperation)
    Vue.component('replyBox', replyBox)
    Vue.component('addReply', addReply)
    Vue.component('detailItem', detailItem)
    Vue.component('orderItem', orderItem)
    Vue.component('tab', tab)
    Vue.component('customizedOrderOperation', customizedOrderOperation)
    Vue.component('chatContent', chatContent)
    Vue.component('chatFoot', chatFoot)

    Vue.component('top', top)
    Vue.component('user-head', userHead)
    Vue.component('userOrder', userOrder)
    Vue.component('userRow', userRow)
    Vue.component('forgetPassword', forgetPassword)
    Vue.component('userLogin', userLogin)
    Vue.component('losePhoneNum', losePhoneNum)
    Vue.component('userRegister', userRegister)
    Vue.component('findPassword', findPassword)
    Vue.component('emailTop', emailTop)
    Vue.component('modifyEmail', modifyEmail)
    Vue.component('modifyPassword', modifyPassword)
    Vue.component('showPhone', showPhone)
    Vue.component('modifyPhone', modifyPhone)
    Vue.component('phoneTop', phoneTop)
    Vue.component('selfinfo', selfinfo)
    Vue.component('logout', logout)
    Vue.component('userSetupRow', userSetupRow)
    Vue.component('userPhoneRow', userPhoneRow)
    Vue.component('userEmailRow', userEmailRow)
    Vue.component('walletTab', walletTab)
    Vue.component('addBank', addBank)
    Vue.component('cash', cash)
    Vue.component('recharge', recharge)
    Vue.component('billDetailItem', billDetailItem)

    //公共        
    Vue.component('container', container)
    Vue.component('e-meta', eMeta)
    Vue.component('carousel', carousel)
    Vue.component('upload', mediaDisplay)
    Vue.component('aloneDisplay',aloneDisplay)
    Vue.component('authorInfo', authorInfo)
    Vue.component('listHeader', listHeader)
    Vue.component('listFooter', listFooter)
    Vue.component('reward', reward);
    //diary
    Vue.component('diaryList', diaryList)
    Vue.component('diaryBackdropUser', diaryBackdropUser)
    Vue.component('diaryBackdropContent', diaryBackdropContent)
    Vue.component('diaryDetailTop', diaryDetailTop)
    Vue.component('diaryDetail', diaryDetail)
    Vue.component('diaryBackdropList', diaryBackdropList)
    Vue.component('diaryOperate', diaryOperate)
    //素材
    Vue.component('materialList', materialList)
    Vue.component('articleDetail', articleDetail)
    Vue.component('videoDetail', videoDetail)
    Vue.component('atlasesDetail', atlasesDetail)
    //医生
    Vue.component('doctorList', HDoctorList)
    //产品
    Vue.component('HProductList', HProductList)
    //机构
    Vue.component('hospitalList', HHospitalList)
    //评论
    Vue.component('commentList', commentList);
    Vue.component('commentInput', commentInput);
    Vue.component('commentDetail', commentDetail);

    Vue.component('userAdviserInfo',userAdviserInfo)
    Vue.component('userAuthentication',userAuthentication)
    Vue.component('userCustomized',userCustomized)
    Vue.component('userCusOrder',usercusOrder)
    Vue.component('userMoney',userMoney)
    Vue.component('userReceipt',userReceipt)
    Vue.component('userViewOrder',userViewOrder)

    //医导
    Vue.component("hospitalGuide",hospitalGuide)
    Vue.component('hgFooter',hgFooter)
    Vue.component('hgHeader',hgHeader)
    Vue.component('hgItem',hgItem)
    Vue.component('hgTreatMethods',hgTreatMethods)
    Vue.component('hgResource',hgResource)
    Vue.component('hgBrand',hgBrand)
    Vue.component('hgProduct',hgProduct)
    Vue.component('hgExpert',hgExpert)
    Vue.component('hgHospital',hgHospital)
    Vue.component('hgNursing',hgNursing)
  }
>>>>>>> d08708acebc006ed57e0b2a01fbd975ce47800d7
}