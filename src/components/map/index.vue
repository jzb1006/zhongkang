<template>
    <div id="map">
        <div id="allmap" ref="allmap"></div>
    </div>
</template>
<script>
    export default {
        name:"map",
        data() {
            return {
                lat: this.$route.params.lat,
                lon: this.$route.params.lon,
                name: this.$route.params.name,
                address: this.$route.params.address,
               
            }
        },
        components: {
        },
        methods: {
            point() {
                return new BMap.Point(this.lon, this.lat)
            },
            map() {
                let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
                map.centerAndZoom(this.point(), 14); // 初始化地图,设置中心点坐标和地图级别
                map.addControl(new BMap.MapTypeControl({ //添加地图类型控件
                    mapTypes: [
                        BMAP_NORMAL_MAP,
                        BMAP_HYBRID_MAP
                    ]
                }));
                map.setCurrentCity("北京"); // 设置地图显示的城市 此项是必须设置的
                map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
                map.enableDoubleClickZoom(true);
                map.addOverlay(this.marker());
                return map;
            },
            SearchInfoWindow(content) {
                let searchInfoWindow = new BMapLib.SearchInfoWindow(this.map(), content, {
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
                searchInfoWindow.open(this.marker());
            },
            marker() {
                var self = this;
                let marker = new BMap.Marker(this.point()); //创建marker对象
                marker.enableDragging(); //marker可拖拽
                marker.addEventListener("click", function(e) {
                    window.searchInfoWindow('fdfg').open(marker);
                })
                return marker
            },
            dpr() {
                (function(e, l) {
                    var c, k, d, f = e.document,
                        g = f.documentElement,
                        h = l.flexible || (l.flexible = {});
                    (function() {
                        var a, b = f.querySelector('meta[name="viewport"]');
                        c = e.devicePixelRatio || 1;
                        a = 1;
                        g.setAttribute("data-dpr",0);
                        a = "width=device-width, initial-scale=" + a + ", minimum-scale=" + a + ", maximum-scale=" + a + ", user-scalable=no";
                        b ? b.setAttribute("content", a) : (b = f.createElement("meta"), b.setAttribute("name", "viewport"), b.setAttribute("content", a), (f.head || g.firstElementChild).appendChild(b))
                    })();
                })(window, window.FT || (window.FT = {}));
            }
        },
        mounted() {
            this.map();
            this.SearchInfoWindow(this.address);
            this.dpr();
        }
    }
</script>
<style>
    #allmap {
        height: 15rem;
        width: 100%;
        overflow: hidden;
    }
</style>