<template id="child-Outmap">
    <div id="allmap" :style="style"></div>
</template>

<script>
    export default{
        data(){
            return{
                style:{
                    width:'100%',
                    height:this.om.height+'px'
                },
                data_info:[]
            }
        },
        /*props:{		//里面存放的也是数据，与data里面的数据不同的是，这里的数据是从其他地方得到的数据
          height:{
            type:Number,
            default:300
          },
          longitude:{//定义经度
            type:Number,
            default:116.404
          },
          latitude:{//定义纬度
            type:Number,
            default:39.915
          }
        },*/
        props:['om'],    //通过props属性，将从父级得到的数据传给子级
        mounted(){
            this.currentLocation();
            // this.feathData();
        },
        methods:{
            currentLocation(){
                var map = new BMap.Map("allmap");
                // var point = new BMap.Point(116.331398,39.897445);
                // map.centerAndZoom(point,12);
                map.enableScrollWheelZoom(true);  //开启地图缩放
                map.addControl(new BMap.NavigationControl());
                map.addControl(new BMap.ScaleControl());
                map.addControl(new BMap.OverviewMapControl());
                map.addControl(new BMap.MapTypeControl());
                var opts = {offset: new BMap.Size(150, 5)}
                map.addControl(new BMap.ScaleControl(opts));
                var point = new BMap.Point(22.404, 42.915);
                map.centerAndZoom(point, 15);
                var marker = new BMap.Marker(point);        // 创建标注
                map.addOverlay(marker);                     // 将标注添加到地图中
                marker.enableDragging();
                map.addEventListener("dragend", function(e){
                    // var clng=e.point.lng;
                    // var clat=e.point.lat;
                    // var cpoint = new BMap.Point(clng, clat);
                    // map.addOverlay(cpoint);
                    alert("当前位置：" + e.point.lng + ", " + e.point.lat);
                })
                function addMarker(point, index){  // 创建图标对
                    // 创建标注对象并添加到地图
                    map.addEventListener("dragend", function(e){
                        var clng=e.point.lng;
                        var clat=e.point.lat;
                        var cpoint = new BMap.Point(clng, clat);
                        map.addOverlay(cpoint);
                        // alert("当前位置：" + e.point.lng + ", " + e.point.lat);
                    })
                    // var marker = new BMap.Marker(point);
                    // map.addOverlay(marker);
                }

                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function(r){
                    if(this.getStatus() == BMAP_STATUS_SUCCESS){
                        var mk = new BMap.Marker(r.point);
                        map.addOverlay(mk);
                        map.panTo(r.point);   //跳转到指定坐标
                         //alert('您的位置：'+r.point.lng+','+r.point.lat);
                    }
                    else {
                        alert('failed'+this.getStatus());
                    }
                });
            },
            feathData(){
                var _this=this;
                this.$axios.get('src/data/OutMap.txt').then((res)=>{
                    _this.data_info=eval(res.data);
                    // console.log(res.data);
                    // console.log(_this.data_info);
                    // console.log(_this.data_info[0]);
                    // console.log(_this.data_info[0].point1);
                    // console.log(_this.data_info.length);
                    // console.log(_this.om.longitude)
                    var map = new BMap.Map("allmap");
                    map.centerAndZoom(new BMap.Point(_this.om.longitude,_this.om.latitude), 15);
                    var opts = {
                        width : 250,     // 信息窗口宽度
                        height: 80,     // 信息窗口高度
                        title : "信息窗口" , // 信息窗口标题
                        enableMessage:true//设置允许信息窗发送短息
                    };
                    for(var i=0;i<_this.data_info.length;i++){
                        var marker = new BMap.Marker(new BMap.Point(_this.data_info[i].point1,_this.data_info[i].point2));  // 创建标注
                        var content = _this.data_info[i].address;
                        map.addOverlay(marker);               // 将标注添加到地图中
                        addClickHandler(content,marker);
                    }
                    function addClickHandler(content,marker){
                        marker.addEventListener("mouseover",function(e){
                            openInfo(content,e)}
                        );
                    };
                    function openInfo(content,e){
                        var p = e.target;
                        var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
                        var infoWindow = new BMap.InfoWindow(content,opts);  // 创建信息窗口对象
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    };
                }).catch((err)=>{
                    console.log(err);
                });
            }
        }
    }
</script>
