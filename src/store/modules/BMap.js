import vue from 'vue'
const state = {
  latitude: '',
  longitude: '',
  city: "北京市",
  district: "朝阳区",
  province: "北京市",
  address: "北京市朝阳区"
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