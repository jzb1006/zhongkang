<template>
    <div id="map">
        <!-- 头部 -->
        <top title="医院地图"></top>
        <div id="allmap" ref="allmap"></div>
    </div>
</template>
<script>
    import top from "@/components/decorate/top_back_title.vue";
    export default {
        data() {
            return {
                lat: this.$route.params.lat,
                lon: this.$route.params.lon,
                name: this.$route.params.name,
                address: this.$route.params.address,
            }
        },
        components: {
            top
        },
        methods: {
            point() {
                return new BMap.Point(this.lon, this.lat)
            },
            map(size) {
                let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
                map.centerAndZoom(this.point(), size); // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]
                }));
                map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                map.addOverlay(this.marker());
                return map;
            },
            SearchInfoWindow(content) {
                let searchInfoWindow = new BMapLib.SearchInfoWindow(this.map(16), content, {
                    title: this.name, //标题
                    width: 290, //宽度
                    height: 50, //高度
                    panel: "panel", //检索结果面板
                    enableAutoPan: true, //自动平移
                    enableSendToPhone: false,
                    searchTypes: [
                        BMAPLIB_TAB_SEARCH, //周边检索
                        BMAPLIB_TAB_TO_HERE, //到这里去
                        BMAPLIB_TAB_FROM_HERE //从这里出发
                    ]
                });
                // console.log(a)
                searchInfoWindow.open(this.marker());
            },
            marker() {
                var self = this;
                let marker = new BMap.Marker(this.point()); //创建marker对象
                marker.enableDragging(); //marker可拖拽
                marker.addEventListener("click", function(e) {
                    this.searchInfoWindow('fdfg').open(marker);
                })
                return marker
            },
            addressDetail() { //获取地理位置 
                var self = this;
                //全局的this在方法中不能使用，需要重新定义一下
                var geolocation = new BMap.Geolocation();
                //调用百度地图api 中的获取当前位置接口
                geolocation.getCurrentPosition(function(r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        //获取当前位置经纬度
                        var myGeo = new BMap.Geocoder();
                        myGeo.getLocation(new BMap.Point(r.point.lng, r.point.lat), function(result) {
                            if (result) {
                                // //根据当前位置经纬度解析成地址
                                // self.ADDRESS_DETAIL(result.addressComponents.district + result.addressComponents.street);
                                // // 在vuex中存入区、 街道地址信息。 其他地方需要使用直接调用
                                // self.geohash = result.point.lat + "," + result.point.lng;
                                // self.SAVE_GEOHASH(self.geohash);
                                // self.latitude = result.point.lat;
                                // self.longitude = result.point.lng;
                                // // console.log(result.point.lat); self.RECORD_ADDRESS({'latitude':result.point.lat,'longitude':result.point.lng});
                                console.log(result);
                            }
                        });
                    }
                });
            },
        },
        mounted() {
            this.map(10);
            this.SearchInfoWindow(this.address);
            this.addressDetail();
        }
    }
</script>
<style>
    #allmap {
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>