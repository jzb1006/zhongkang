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

import FMain from '@/components/Fang/FMain.vue'
import FFooter from '@/components/Fang/FFooter.vue'
import FItem from '@/components/Fang/FContent/FItem.vue'
import FTreatMethods from '@/components/Fang/FContent/FTreatMethods.vue'
import FResource from '@/components/Fang/FContent/FResource.vue'
import FBrand from '@/components/Fang/FContent/FBrand.vue'
import FProduct from '@/components/Fang/FContent/FProduct.vue'
import FOther from '@/components/Fang/FContent/FOther.vue'
import FExpert from '@/components/Fang/FContent/FOther/FExpert.vue'
import FHospital from '@/components/Fang/FContent/FOther/FHospital.vue'
import FNursing from '@/components/Fang/FContent/FOther/FNursing.vue'

import login from '@/components/user/login.vue'
import register from '@/components/user/register.vue'
import forgetPassword from '@/components/user/forget_password.vue'
import losephone from '@/components/user/losephone.vue'
import retrievePassword from '@/components/user/retrieve_password.vue'
import HUser from '@/components/user/user.vue'
import HUserSetup from '@/components/user/user_setup.vue'
import HUserSelfinfo from '@/components/user/user_selfinfo.vue'
import HUserEditPhone from '@/components/user/user_editphone.vue'
import HUserEditPassword from '@/components/user/user_editpassword.vue'
import HUserEditEmail from '@/components/user/user_editemail.vue'
import HUserWallet from '@/components/user/user_wallet.vue'

import bill from '@/components/user_wallet/user_bill'
import billDetail from '@/components/user_wallet/bill_detail'
import cash from '@/components/user_wallet/user_cash'
import bank from '@/components/user_wallet/user_bank'
import addbank from '@/components/user_wallet/user_addbank'
import chooseBank from '@/components/user_wallet/user_chooseBank'
import balance from '@/components/user_wallet/user_balance'
import recharge from '@/components/user_wallet/user_recharge'

//评论
import commentInput from '@/components/comment/comment_input'
import commentList from '@/components/comment/comment_list'
import commentDetail from '@/components/comment/comment_detail'

//素材
import materialList from '@/components/material/material_list'
import articledetail from '@/components/material/article_detail'
import videodetail from '@/components/material/video_detail'

//公共
import reward from '@/components/decorate/reward.vue'
import upload from '@/components/upload/upload.vue'
import mediaDisplay from '@/components/upload/media_display.vue'
import aloneDisplay from '@/components/upload/alone_display.vue'
import carousel from '@/components/decorate/carousel.vue'
import container from '@/container/container.vue'
import meta from '@/components/decorate/meta.vue'
import authorInfo from '@/components/decorate/author_info.vue'
import listHeader from '@/components/decorate/list_header.vue'//头部
import listFooter from '@/components/decorate/list_footer.vue'// 尾部

//diary
import diaryList from '@/components/diary/diary_list.vue'
import diaryBackdropUser from '@/components/diary/diary_children/diary_backdrop_user.vue'
import diaryBackdropContent from '@/components/diary/diary_children/diary_backdrop_content.vue'
import diaryDetailTop from '@/components/diary/diary_children/diary_children/diary_detail_top.vue'
import diaryDetail from '@/components/diary/diary_children/diary_children/diary_detail.vue'

export default {
  install(Vue, options) {
    //公共        
    Vue.component('container', container)
    Vue.component('e-mate', meta)
    Vue.component('carousel', carousel)
    Vue.component('upload', mediaDisplay)
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
    //素材
    Vue.component('materialList', materialList)
    Vue.component('articledetail', articledetail)
    Vue.component('videodetail', videodetail)
    //医生
    Vue.component('doctorList', HDoctorList)
    //产品
    Vue.component('HProductList', HProductList)
    //机构
    Vue.component('hospitalList', HHospitalList)
    //评论
    Vue.component( 'commentList', commentList);
    Vue.component( 'commentInput', commentInput);
    Vue.component( 'commentDetail', commentDetail);
  }
}
