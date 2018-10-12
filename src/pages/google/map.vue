<template>
    <div id="map" style="width:100%;height:500px"></div>
</template>

<script>
    // const google = window.google
    export default {
        data () {
            return {
                map: null,
                marker: null,
                zoom: 15,
                flightPath: null,
                center: {lat: 39.908520, lng: 116.397492},
                image: [
                    {
                        url: '../../../src/static/start.png',    //  起点marker
                        scaledSize: new google.maps.Size(25, 40),   //  设置marker大小
                        anchor: new google.maps.Point(13, 35)
                    },
                    {
                        url: '../../../src/static/end.png',    //  终点marker
                        scaledSize: new google.maps.Size(25, 40),   //  设置marker大小
                        anchor: new google.maps.Point(13, 35)
                    }
                ],
                bikepath: [
                    {lat: 22.523010, lng: 113.939786},
                    {lat: 22.524199, lng: 113.936405},
                    {lat: 22.525014, lng: 113.936402},
                    {lat: 22.525069, lng: 113.935160},
                    {lat: 22.525574, lng: 113.930773},
                    {lat: 22.526533, lng: 113.929268},
                    {lat: 22.535076, lng: 113.930507},
                    {lat: 22.527743, lng: 113.924629},
                    {lat: 22.511143, lng: 113.937004}
                ],
                position: []
            }
        },
        mounted () {
            this.initMap()
        },
        methods: {
            initMap: function () {
                this.addposition()
                this.setCenter()
                this.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: this.zoom,
                    center: this.center,
                    disableDefaultUI: true
                })
                for (var i = 0; i < this.position.length; i++) {
                    this.marker = new google.maps.Marker({
                        position: this.position[i],
                        label: '',
                        map: this.map,
                        icon: this.image[i]
                    })
                }
                this.flightPath = new google.maps.Polyline({
                    map: this.map,
                    path: this.bikepath,
                    geodesic: true,
                    strokeColor: '#35A5FE',
                    strokeOpacity: 1,
                    strokeWeight: 3
                })
            },
            addposition: function () {
                let len = this.bikepath.length
                this.position.push(this.bikepath[0], this.bikepath[len - 1])
            },
            //  设置中心点
            setCenter: function () {
                let maxlat = 0
                let minlat = this.bikepath[0].lat
                let maxlng = 0
                let minlng = this.bikepath[0].lng
                this.bikepath.map((n, i) => {
                    n.lat > maxlat ? maxlat = n.lat : null
                    n.lat < minlat ? minlat = n.lat : null
                    n.lng > maxlng ? maxlng = n.lng : null
                    n.lng < minlng ? minlng = n.lng : null
                })
                let latValue = (maxlat - minlat) / 2
                let lngValue = (maxlng - minlng) / 2
                this.center.lat = minlat + latValue
                this.center.lng = minlng + lngValue
                this.changeZoom(latValue, lngValue)
            },
//  设置地图缩放
            changeZoom: function (latValue, lngValue) {
                let latzoom = Math.floor(latValue / 0.0059)
                let lngzoom = Math.floor(lngValue / 0.0069)
                // console.log(latValue)
                latValue < lngValue ? this.zoom = 15 - lngzoom : this.zoom = 15 - latzoom
                this.zoom < 12 ? this.zoom = 12 : null   // 最低缩放到12
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    #allmap{
        height: 500px;
        overflow: hidden;

    }
</style>
