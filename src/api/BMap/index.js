
export default {
  addressDetail(self) { //获取地理位置 
    //全局的this在方法中不能使用，需要重新定义一下
    var geolocation = new BMap.Geolocation();
    //调用百度地图api 中的获取当前位置接口
    geolocation.getCurrentPosition(function (r) {
      if (this.getStatus() == BMAP_STATUS_SUCCESS) {
        //获取当前位置经纬度
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function (result) {
          if (result) {
            self.$store.dispatch('changeCity', result.addressComponents.city);
            self.$store.dispatch('changeDistrict', result.addressComponents.district);
            self.$store.dispatch('changeProvince', result.addressComponents.province);
            self.$store.dispatch('changeAddress', result.address);
            self.$store.dispatch('changeLatitude', result.point.lat);
            self.$store.dispatch('changeLongitude', result.point.lng);
            console.log(result);
          }
        });
      }
    });
  },
}
