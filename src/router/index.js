import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import api from '../api/user'

import Search from '@/components/search/search.vue'
import productDetail from '@/components/product/detail.vue'
import proDiary from '@/components/product/pro_diary.vue'
import mycart from '@/components/shopping/mycart_checkout.vue'
import pay from '@/components/shopping/pay.vue'
// import orderList from '@/components/order/order_list.vue'
import orderList from '@/containers/order/order_list_box.vue'
// import orderDetail from '@/components/order/order_detail.vue'
import orderDetail from '@/containers/order/order_detail_box.vue'
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

import login from '@/containers/user/login.vue'
import frequentLogin from '@/components/user/frequent_login.vue'
import register from '@/containers/user/register.vue'
import forgetPassword from '@/containers/user/forget_password.vue'
import losephone from '@/containers/user/losephone.vue'
import retrievePassword from '@/containers/user/retrieve_password.vue'
import HUser from '@/containers/user/user.vue'
import HUserSetup from '@/containers/user/user_setup.vue'
import HUserSelfinfo from '@/containers/user/user_selfinfo.vue'
import HUserEditPhone from '@/containers/user/user_editphone.vue'
import HUserEditPassword from '@/containers/user/user_editpassword.vue'
import HUserEditEmail from '@/containers/user/user_editemail.vue'
import HUserWallet from '@/containers/user/user_wallet.vue'

import bill from '@/components/wallet/user_bill'
import balance from '@/components/wallet/user_balance'
import bank from '@/components/wallet/user_bank'
import billDetail from '@/containers/wallet/bill_detail'
import cash from '@/containers/wallet/user_cash'

import addbank from '@/containers/wallet/user_addbank'
import chooseBank from '@/components/wallet/user_choose_bank'
import recharge from '@/containers/wallet/user_recharge'


// import customized from '@/components/customized/customized'
import customized from '@/containers/customized/customized'
import requirement from '@/components/customized/requirement'
import confirmOrder from '@/containers/customized/confirm_order'
import cuspay from '@/components/customized/cuspay'
import adviser from '@/components/adviser/list'
import customizedOrder from '@/containers/customized/customized_order'
import adviserAuthentication from '@/components/adviser/adviser_authentication'
import adviserAuthenticationState from '@/components/adviser/adviser_authentication_state'
import adviserReceipt from '@/containers/adviser/adviser_receipt'
import receiptDetail from '@/components/adviser/receipt_detail'
import customizedReply from '@/containers/adviser/reply'
import programme from '@/components/adviser/add_programme'
import customizedOrderDetail from '@/containers/customized/customized_order_detail'
import viewReply from '@/containers/customized/view_reply'
import replyOrder from '@/containers/adviser/reply_order'
import replyOrderDetail from '@/containers/adviser/reply_order_detail'
import inquiries from '@/components/customized/inquiries'
import ask from '@/containers/customized/ask'
import customized_applyRefund from '@/components/customized/customized_apply_refund'
import customized_appeal from '@/components/customized/customized_appeal'
import appeal_confirm_consumption from '@/components/adviser/appeal_confirm_consumption'
import editProgramme from '@/components/adviser/edit_programme'
import adviserViewReply from '@/containers/adviser/adviser_view_reply'
import answer from '@/containers/adviser/answer'




//评论
import commentInput from '@/components/comment/comment_input'
import commentList from '@/components/comment/comment_list'
import commentDetail from '@/components/comment/comment_detail'

//素材
import materialList from '@/components/material/material_list'
import articledetail from '@/components/material/article_detail'
import videodetail from '@/components/material/video_detail'

//打赏
import reward from '@/components/decorate/reward.vue'

//上传媒体
import upload from '@/components/upload/upload.vue'
import mediaDisplay from '@/components/upload/media_display.vue'
import aloneDisplay from '@/components/upload/alone_display.vue'

//Carousel
import carousel from '@/components/decorate/carousel.vue'

//容器
import container from '@/container/container.vue'

//素材数字信息
import eMeta from '@/components/decorate/eMeta.vue'
import authorInfo from '@/components/decorate/author_info.vue'

import hospitalGuide from '@/components/hospital_guide/hospital_guide.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect:'/container'
    },
    {
      path: '/container',
      name: 'container',
      component : container
    },
    {
      path: '/hospitalGuide',
      name: 'hospitalGuide',
      component : hospitalGuide
    },
    {
      path: '/authorInfo',
      name: 'authorInfo',
      component : authorInfo
    },
    {
      path: '/eMeta',
      name: 'eMeta',
      component : eMeta
    },
    {
      path: '/carousel',
      name: 'carousel',
      component : carousel
    },
    {
      path: '/upload',
      name: 'upload',
      component : upload
    },
    {
      path: '/mediaDisplay',
      name: 'mediaDisplay',
      component : mediaDisplay
    },
    {
      path: '/aloneDisplay',
      name: 'aloneDisplay',
      component : aloneDisplay
    },
    {
      path: '/reward',
      name: 'reward',
      component : reward
    },
    {
      path: '/materialList',
      name: 'materialList',
      component : materialList,
    },
    {
      path: '/articledetail',
      name: 'articledetail',
      component : articledetail
    },
    {
      path: '/videodetail',
      name: 'videodetail',
      component : videodetail,
    },
    {
      path: '/commentInput',
      name: 'commentInput',
      component : commentInput,
    },
    {
      path: '/commentList',
      name: 'commentList',
      component : commentList,
    },
    {
      path: '/commentDetail',
      name: 'commentDetail',
      component : commentDetail,
    },
    {
      path: '/diary/diaryOperate.vue',
      name: 'diaryOperate',
      component: ()=> import('@/components/diary/diary_operate.vue'),
    },
    {
      path: '/diary/diaryBackdrop.vue',
      name: 'diaryBackdrop',
      component: ()=> import('@/components/diary/diary_backdrop.vue'),
    },
    {
      path:'/diary/diaryDetail',
      name:"diaryDetail",
      component: ()=> import('./../components/diary/diary_detail.vue'),
    
    },
    {
      path:'/diary/diaryBackdropList',
      name:"diaryBackdropList",
      component: ()=> import('./../components/diary/diary_backdrop_list.vue'),
    
    },
    {
      path:'/diary/diaryCreateBackdrop',
      name:"diaryCreateBackdrop",
      component: ()=> import('./../components/diary/diary_operate_back.vue'),
    },
    {
      path:'/diary/diaryReward',
      name:"diaryReward",
      component: ()=> import('./../components/diary/diary_reward.vue'),
    },
    {
      path:'/diary/diarySelItem',
      name:"diarySelItem",
      component: ()=> import('./../components/diary/diary_sel_item.vue'),
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/productDetail/:id/:ins_id',
      name: 'productDetail',
      component: productDetail
    },
    {
      path: '/proDiary',
      name: 'proDiary',
      component: proDiary
    },
    {
      path: '/mycart',
      name: 'mycart',
      component: mycart

    },
    {
      path: '/pay/:oid',
      name: 'pay',
      component: pay
    },
    {
      path: '/orderList',
      name: 'orderList',
      component: orderList,
    },
    {
      path: '/orderDetail/:orderSn',
      name: 'orderDetail',
      component: orderDetail,
    },
    {
      path: '/applyRefund/:tt/:oid/:status',
      name: 'applyRefund',
      component: applyRefund,
    },
    {
      path: '/appeal/:tt/:oid/:status',
      name: 'appeal',
      component: appeal,
    },
    {
      path: '/scanQR/:order_sn',
      name: 'scanQR',
      component: scanQR,
    },
    {
      path: '/hospitalDetail/:ins_id',
      name: 'hospitalDetail',
      component: hospitalDetail,
    },
    {
      path: '/insAlbum/:ins_id',
      name: 'insAlbum',
      component: insAlbum,
      children: [{
          path: '/insAlbum/imgList/:ins_id/:tab',
          name: 'InsImgList',
          component: ins_imgList
        },
        {
          path: '/insAlbum/licence/:ins_id/:tab',
          name: 'InsLicence',
          component: ins_licence 
        },

      ]
    },
    {
      path: '/docList/:ins_id',
      name: 'docList',
      component: docList
    },
    {
      path: '/productList/:id/:type/:name',
      name: 'productList',
      component: productList
    },
    {
      path: '/doctorDetail/:doc_id/:ins_id',
      name: 'doctorDetail',
      component: doctorDetail
    },
    {
      path: '/doctorDiary',
      name: 'doctorDiary',
      component: doctorDiary
    },
    {
      path: '/ins_diary',
      name: 'insDiary',
      component: insDiary
    },
    {
      path: '/docAlbum/:doc_id',
      name: 'docAlbum',
      component: docAlbum,
      children: [{
          path: '/docAlbum/imgList/:doc_id/:tab',
          name: 'DocImgList',
          component: doc_imgList
        },
        {
          path: '/docAlbum/licence/:doc_id/:tab',
          name: 'DocLicence',
          component: doc_licence
        },

      ]
    },
    {
      path: '/doctorList',
      name: 'doctorList',
      component: HDoctorList
    },
    {
      path: '/HProductList',
      name: 'HProductList',
      component: HProductList
    },
    {
      path: '/home/diaryList',
      name: 'diaryList',
      component: ()=> import('@/components/diary/diary_list.vue'),
    },
    {
      path: '/hospitalList',
      name: 'hospitalList',
      component: HHospitalList
    },
    {
      path: '/Map/:lat/:lon/:name/:address',
      name: 'Map',
      component: Map
    },
    {
      path: '/home/user',
      name:'user',
      component: HUser
    },
    {
      path: '/home/userSetup',
      name:'userSetup',
      component: HUserSetup
    },
    {
      path: '/home/userSelfinfo',
      name:'userSelfinfo',
      component: HUserSelfinfo
    },
    {
      path: '/home/userEditphone',
      name:'userEditphone',
      component: HUserEditPhone
    },
    {
      path: '/home/userEditpassword',
      name:'userEditpassword',
      component: HUserEditPassword
    },
    {
      path: '/home/userEditemail',
      name:'userEditemail',
      component: HUserEditEmail
    },
    {
      path: '/home/userWallet',
      name:'userWallet',
      component: HUserWallet,
      // redirect:'/home/balance',
      // children:[
      //   {
      //     path:'/home/balance',
      //     name:'balance',
      //     component:balance
      //   },
      //   {
      //     path:'/home/bank',
      //     name:'bank',
      //     component:bank
      //   },
      //   {
      //     path: '/bill',
      //     name:'bill',
      //     component: bill
      // },
      // ]
    },
    // {
    //   path:'/home/customized',
    //   name:'customized',
    //   component:customized
    // },
    {
      path:'/customized',
      name:'customized',
      component:customized,
    },
    {
      path:'/requirement',
      name:'requirement',
      component:requirement
    },
    {
      path:'/confirmOrder',
      name:'confirmOrder',
      component:confirmOrder
    },
    {
      path:'/cuspay',
      name:'cuspay',
      component:cuspay
    },
    {
      path:'/adviser',
      name:'adviser',
      component:adviser
    },
    {
      path:'/customizedOrder',
      name:'customizedOrder',
      component:customizedOrder
    },
    {
      path:'/adviserAuthentication',
      name:'adviserAuthentication',
      component:adviserAuthentication
    },
    {
      path:'/adviserAuthenticationState',
      name:'adviserAuthenticationState',
      component:adviserAuthenticationState
    },
    {
      path:'/adviserReceipt',
      name:'adviserReceipt',
      component:adviserReceipt
    },
    {
      path:'/receiptDetail',
      name:'receiptDetail',
      component:receiptDetail
    },
    {
      path:'/customizedReply',
      name:'customizedReply',
      component:customizedReply
    },
    {
      path:'/programme',
      name:'programme',
      component:programme
    },
    {
      path:'/customizedOrderDetail',
      name:'customizedOrderDetail',
      component:customizedOrderDetail
    },
    {
      path: '/customized_applyRefund/:tt/:oid/:status',
      name: 'customized_applyRefund',
      component: customized_applyRefund,
    },
    {
      path: '/customized_appeal/:tt/:oid/:status',
      name: 'customized_appeal',
      component: customized_appeal,
    },
    {
      path: '/appeal_confirm_consumption/:tt/:oid/:status',
      name: 'appeal_confirm_consumption',
      component: appeal_confirm_consumption,
    },
    {
      path:'/viewReply',
      name:'viewReply',
      component:viewReply
    },
    {
      path:'/adviserViewReply',
      name:'adviserViewReply',
      component:adviserViewReply
    },
    {
      path:'/editProgramme',
      name:'editProgramme',
      component:editProgramme
    },
    {
      path:'/replyOrder',
      name:'replyOrder',
      component:replyOrder
    },
    {
      path:'/replyOrderDetail',
      name:'replyOrderDetail',
      component:replyOrderDetail
    },
    {
      path:'/inquiries',
      name:'inquiries',
      component:inquiries
    },
    {
      path:'/ask',
      name:'ask',
      component:ask
    },
    {
      path:'/answer',
      name:'answer',
      component:answer
    },
    {
      path:'/billDetail',
      name:'billDetail',
      component:billDetail
    },
    {
      path:'/home/recharge',
      name:'recharge',
      component:recharge
    },
    {
      path:'/home/cash',
      name:'cash',
      component:cash
    },
    
    {
      path:'/home/addBank',
      name:'addBank',
      component:addbank
    },
    {
      path:'/home/chooseBank',
      name:'chooseBank',
      component:chooseBank
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/frequentLogin',
      name: 'frequentLogin',
      component: frequentLogin
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/forgetPassword',
      name: 'forgetPassword',
      component: forgetPassword
    },
    {
      path: '/losephone',
      name: 'losephone',
      component: losephone
    },
    {
      path: '/retrievePassword',
      name: 'retrievePassword',
      component: retrievePassword
    },
    
  ],
  // scrollBehavior (to, from, savedPosition) {
  //   if (to.name=="ask") {
  //     // return savedPosition
  //     return { x: 0, y:document.body.ask.offsetHeight-window.innerHeight };
  //   } 
  // }
})

// router.beforeEach((to, from, next) => {
//   if(to.name=='user'||to.name=='orderList'||to.name=='recharge'||to.name=='cash'||to.name=='addBank'||
//     to.name=='userSelfinfo'||to.name=='userEditphone'||to.name=='userEditpassword'||to.name=='userEditemail'||
//     to.name=='balance'||to.name=='bank'||to.name=='bill'||to.name=='userSetup'||to.name=='userWallet'||to.name=='orderList'||
//     to.name=='chooseBank' || to.name=='diaryBackdropList'||to.name=='customized'){
//       api.checkLogin('checkLogin').then(res=>{
//           console.log(res.data);
//           if(res.data.error==0){
//             // router.push({name:'login'});
//             next('/login');
//           }else{
//             next();
//           }
//       }).catch(error=>{
//           console.log(error);
//       })
//   }else{
//     next();
//   }
// })
router.beforeEach((to, from, next) => {
  if(to.name=='productDetail' || to.name=='mycart' || to.name=='orderDetail' ||to.name=='confirmOrder'||
  to.name=='bill' || to.name=="customizedOrderDetail" || to.name=='receiptDetail' || to.name=='ask' ||
  to.name=='answer' || to.name=='replyOrderDetail' || to.name=='viewReply' || to.name=='adviserViewReply'
  || to.name=='programme'){
    store.dispatch('changeTabShow',false);
  }else{
    store.dispatch('changeTabShow',true);
  }

  //图片浏览模式的状态
  if(store.state.media_display.open_image_mode){
    store.dispatch('Open_Image_Mode',false);
    store.dispatch('Close_Image_Browse',true);
    next(false);
    return;
  }
  next();
})


//在路由跳转之后设置页面的路径,并把路径传给谷歌统计
router.afterEach(function (to) {
  if (window.ga) {
    window.ga('set', 'page', to.fullPath) // 你可能想根据请求参数添加其他参数，可以修改这里的 to.fullPath
    window.ga('send', 'pageview')
  }
})

export default router;
