import vue from 'vue'
const state = {
  latitude: '',
  longitude: '',
  city: "广州市",
  district: "天河区",
  province: "广东省",
  address: "广东省广州市天河区"
}

const actions = {
  changeLatitude({
    commit
  }, latitude) {
    commit('CHANGE_LATITUDE', latitude)
  },
  changeLongitude({
    commit
  }, longitude) {
    commit('CHANGE_LONGITUTE', longitude)
  },
  changeCity({
    commit
  }, city) {
    commit('CHANGE_CITY', city)
  },
  changeDistrict({
    commit
  }, district) {
    commit('CHANGE_DISTRICT', district)
  },
  changeProvince({
    commit
  }, province) {
    commit('CHANGE_PROVINCE', province)
  },
  changeAddress({
    commit
  }, address) {
    commit('CHANGE_ADDRESS', address)
  }
}

const mutations = {
  CHANGE_LATITUDE(state, latitude) {
    state.latitude = latitude
  },
  CHANGE_LONGITUTE(state, longitude) {
    state.longitude = longitude
  },
  CHANGE_CITY(state, city) {
    state.city = city
  },
  CHANGE_DISTRICT(state, district) {
    state.district = district
  },
  CHANGE_PROVINCE(state, province) {
    state.province = province
  },
  CHANGE_ADDRESS(state, address) {
    state.address = address
  },
}

export default {
    state,
    actions,
    mutations
}