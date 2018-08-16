import Vue from 'vue'
import Router from 'vue-router'


import Search from '@/components/search/search.vue'
import productDetail from '@/components/product/detail.vue'
import mycart from '@/components/shopping/mycart_checkout.vue'
import pay from '@/components/shopping/pay.vue'
import orderList from '@/components/order/order_list.vue'
import login from '@/components/user/login.vue'
import orderDetail from '@/components/order/order_detail.vue'
import applyRefund from '@/components/order/apply_refund.vue'
import appeal from '@/components/order/appeal.vue'
import scanQR from '@/components/order/scanQR.vue'
import hospitalDetail from '@/components/hospital/detail.vue'
import insAlbum from '@/components/hospital/ins_album.vue'
import ins_imgList from '@/components/hospital/img_list.vue'
import ins_licence from '@/components/hospital/licence.vue'
import docList from '@/components/hospital/doc_list.vue'
import Map from '@/components/hospital/to_Map.vue'

import productList from '@/components/common/product_list.vue'
import docAlbum from '@/components/doctor/doc_album.vue'
import doc_imgList from '@/components/doctor/img_list.vue'
import doc_licence from '@/components/doctor/licence.vue'
import doctorDetail from '@/components/doctor/detail.vue'

import HProductList from '@/components/home/product_list.vue'
import HDoctorList from '@/components/home/doctor_list.vue'
import HHospitalList from '@/components/home/hospital_list.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/HProductList'
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
      path: '/mycart',
      name: 'mycart',
      component: mycart

    },
    {
      path: '/login',
      name: 'login',
      component: login

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
    // {
    //   path: '/docAlbum/:doc_id',
    //   name: 'docAlbum',
    //   component: docAlbum
    // },
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
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: home,
    //   children: [{
    //     path: '/home/productList',
    //     component: HProductList
    //   },
    //   {
    //     path: '/home/doctorList',
    //     component: HDoctorList
    //   },
    //   {
    //     path: '/home/hospitalList',
    //     component: HHospitalList
    //   },
    // ]
    // },
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
      path: '/hospitalList',
      name: 'hospitalList',
      component: HHospitalList
    },
    {
      path: '/Map/:lat/:lon/:name/:address',
      name: 'Map',
      component: Map
    }
  ]
})