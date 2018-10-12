<template>
    <div id="map"></div>
</template>

<<script>
    export default {
        data () {
            return {
                data: null,
            }
        },
        mounted () {
            this.init();
        },
        methods: {
            init(){
                var ol=this.ol;
                console.log(ol)
                var l1 = new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: "http://t3.tianditu.com/DataServer?T=cta_w&x={x}&y={y}&l={z}"// 注记
                    })
                });
                var l2 = new ol.layer.Tile({
                    source: new ol.source.XYZ({
                        url: "http://t3.tianditu.com/DataServer?T=vec_w&x={x}&y={y}&l={z}"  // 行政区划
                    })
                });
                // let center = ol.proj.transformExtent([103.3, 35.5], "EPSG:4326", "EPSG:3857");
                var map = new ol.Map({
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    target: 'map',
                    view: new ol.View({
                        center: [103.3, 35.5],
                        zoom: 4
                    }),
                    controls: [
                    ]
                });
                map.addLayer(l1);
                map.addLayer(l2);
                var lat = 39.9306804;
                var lon = 116.3854147;
                var zoom = 11;
                var lonLat = new ol.LonLat(lon, lat).transform(new ol.Projection("EPSG:4326"), map.getProjectionObject());
                //设置地图中心和缩放级别
                map.setCenter(lonLat, zoom);
            },
            goMyplace(){
                var lat = 39.9306804;
                var lon = 116.3854147;
                var zoom = 11;
                var lonLat = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject());
                //设置地图中心和缩放级别
                map.setCenter(lonLat, zoom);
            },
        }
    }
</script>


<style scoped>

</style>