<template>
    <div id="googleMap" style="width:100%;height:500px"></div>
</template>

<script>
    // const google = window.google
    export default {
        data () {
            return {

            }
        },
        mounted () {
            this.initMap()
        },
        methods: {
            initMap: function () {
                var mapProp = {
                    center:new google.maps.LatLng(51.508742,-0.120850),
                    zoom:5,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
            }
        }
    }
</script>

<style scoped>

</style>