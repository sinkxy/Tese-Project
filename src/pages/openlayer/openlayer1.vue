<template>
    <div id="menu">
        <label for="speed" style="font-weight: bold;">
            运动速度:&nbsp;
            <input id="speed" type="range" min="1" max="20" step="1" value="10" />
        </label>
        <button id="start-animation">
            开始运动
        </button>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                path:"-90 90,90 -90,100 50,150 80.66666",
            }
        },
        mounted () {
            this.initMap()
        },
        methods: {
            initMap:function () {
                var ol = this.ol;
                this.map=new ol.Map({
                    layers: [
                        new ol.layer.Tile({
                            source: new ol.source.OSM()
                        })
                    ],
                    target: 'map',
                    view: new ol.View({
                        center: [0, 0],
                        zoom: 2
                    })
                });
                this.startMove();
            },
            startMove:function () {
                var ol = this.ol;
                var vm=this;
                var map=vm.map;
                console.log(11111111,map);
                //vm.clearOverlayers("beijing_sq");

                //中间站
                var stops=[
                    [12909554.6597,4933234.84552],   //14
                    [12909824.6852,4931594.7854],    //43
                    [12910026.8837,4930523.89946],   //63
                    [12910870.563,4929357.26511]     //85
                ];

                var stopMakers = new Array();

                for(var i=0;i<4;i++){
                    var s = new ol.Feature({
                        type: 'stop',
                        geometry: new ol.geom.Point(stops[i])
                    });
                    stopMakers.push(s);
                }

                if(vm.path.length==0){

                }
                else {
                    var Coordinates=vm.path;
                }

                //将离散点构建成一条折线
                var route = new ol.geom.LineString(Coordinates);
                //获取直线的坐标
                var routeCoords = route.getCoordinates();
                var routeLengthinitMap = routeCoords.length;

                var routeFeature = new ol.Feature({
                    type: 'route',
                    geometry: route
                });
                var geoMarker = new ol.Feature({
                    type: 'geoMarker',
                    geometry: new ol.geom.Point(routeCoords[0])
                });
                var startMarker = new ol.Feature({
                    type: 'icon',
                    geometry: new ol.geom.Point(routeCoords[0])
                });
                var endMarker = new ol.Feature({
                    type: 'icon',
                    geometry: new ol.geom.Point(routeCoords[routeLength - 1])
                });

                var styles = {
                    'route': new ol.style.Style({
                        stroke1: new ol.style.Stroke({
                            width: 6,
                            color: '#F2C841'
                        }),
                        fill:new ol.style.Fill({
                            color:"#F6E3A3"
                        })
                    }),
                    /*'icon': new ol.style.Style({
                        image: new ol.style.Icon({
                            anchor: [0.5, 1],
                            src: require()
                        })
                    }),*/
                    'geoMarker': new ol.style.Style({
                        /*image: new ol.style.Circle({
                            radius: 7,
                            snapToPixel: false,
                            fill: new ol.style.Fill({ color: 'black' }),
                            stroke: new ol.style.Stroke({
                                color: 'white',
                                width: 2
                            })
                        })*/
                        image: new ol.style.Icon({
                            src: require('../../../src/static/end.png'),
                            rotateWithView: false,
                            rotation: -Math.atan2(routeCoords[0][1]-routeCoords[1][1], routeCoords[0][0]-routeCoords[1][0]),
                            scale:0.3,
                        })
                    }),
                    'stop':new ol.style.Style({
                        image:new ol.style.Circle({
                            radius:10,
                            snapToPixel:false,
                            fill:new ol.style.Fill({ color:'red'}),
                            stroke:new ol.style.Stroke({
                                color:'white',
                                width:2
                            })
                        })
                    })
                };

                var animating = false;
                var speed, now;
                var speedInput = document.getElementById('speed');
                var startButton = document.getElementById('start-animation');

                var vectorLayer = new ol.layer.Vector({
                    id:'carLayer',
                    source: new ol.source.Vector({
                        features: [routeFeature, geoMarker, startMarker, endMarker,stopMakers[0],stopMakers[1],stopMakers[2],stopMakers[3]]
                    }),
                    style: function (feature) {
                        //如果动画是激活的就隐藏geoMarker
                        if (animating && feature.get('type') === 'geoMarker') {
                            return null;
                        }
                        return styles[feature.get('type')];
                    }
                });

                //var center = ol.proj.fromLonLat([115.981,40.451]);

                map.addLayer(vectorLayer);

                // 要素移动
                var moveFeature = function (event) {
                    var vectorContext = event.vectorContext;   //HTML5 Canvas context，ol.render.canvas.Immediate的对象
                    var frameState = event.frameState;        //freme 的状态
                    if (animating) {
                        var elapsedTime = frameState.time - now;    //elapsedTime  已过时间
                        //通过增加速度，来获得lineString坐标
                        var index = Math.round(speed * elapsedTime / 1000);   //已经走了多少个点

                        //console.log("#########",routeCoords[index]);

                        if (index >= routeLength) {
                            stopAnimation(true);
                            return;
                        }

                        //fixme ---------------
                        if( index < 14){
                            flashFeature(0);
                        }
                        if( index == 14){
                            changeStyle(0, 1);
                        }

                        if(index > 14 && index <43){
                            flashFeature(1);
                        }
                        if(index == 43){
                            changeStyle(1, 2);
                        }


                        if(index > 43 && index <63){
                            flashFeature(2);
                        }
                        if(index == 63){
                            changeStyle(2, 3);
                        }

                        if(index > 63 && index <85){
                            flashFeature(3);
                        }
                        if(index == 85){
                            changeStyle(3, 3);
                        }
                        //fixme--------------------

                        var dx,dy,rotation,carStyle;
                        if(routeCoords[index] && routeCoords[index+1]){
                            dx=routeCoords[index][0]-routeCoords[index+1][0];
                            dy=routeCoords[index][1]-routeCoords[index+1][1];
                            rotation = Math.atan2(dy,dx);
                            //console.log("***********",rotation);

                            carStyle= new ol.style.Style({
                                image: new ol.style.Icon({
                                    src: require('../../../src/static/end.png'),
                                    rotateWithView: false,
                                    rotation: -rotation,
                                    scale:0.3,
                                })
                            });
                            var currentPoint = new ol.geom.Point(routeCoords[index]);  //当前点
                            var feature = new ol.Feature(currentPoint);
                            //Render a feature into the canvas.
                            // Note that any zIndex on the provided style will be ignored - features are rendered immediately in the order that this method is called.
                            // If you need zIndex support, you should be using an ol.layer.Vector instead
                            vectorContext.drawFeature(feature, carStyle);
                        }
                    }
                    //继续动画效果
                    map.render();
                };

                function changeStyle(previous,next) {
                    //console.log(stopMakers[previous]);
                    stopMakers[previous].setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            snapToPixel: false,
                            fill: new ol.style.Fill({color: 'green'}),
                            stroke: new ol.style.Stroke({
                                color: 'white',
                                width: 2
                            })
                        })
                    }));
                }

                var colors=['red','green'];
                var colorIndex=0;
                function flashFeature(index) {
                    var color;
                    colorIndex++;
                    colorIndex=colorIndex % 30;

                    if(colorIndex < 15){
                        color=colors[0];
                    }else {
                        color = colors[1];
                    }
                    stopMakers[index].setStyle(new ol.style.Style({
                        image: new ol.style.Circle({
                            radius: 10,
                            snapToPixel: false,
                            fill: new ol.style.Fill({
                                color: color
                            }),
                            stroke: new ol.style.Stroke({
                                color: 'white',
                                width: 2
                            })
                        })
                    }));
                }

                function startAnimation() {
                    if (animating) {
                        stopAnimation(false);
                    } else {
                        animating = true;
                        now = new Date().getTime();           /** 开始时的时间*/
                        speed = speedInput.value;
                        startButton.textContent = '结束运动';
                        //隐藏geoMarker
                        geoMarker.setStyle(null);
                        //设置显示范围
                        //map.getView().setCenter(center);
                        map.on('postcompose', moveFeature);    /** postcompose事件-- 地图渲染时都会触发   */
                        map.render();
                    }
                }

                /**
                 * @param {boolean}结束动画
                 */
                function stopAnimation(ended) {
                    animating = false;
                    startButton.textContent = '开始运动';

                    //如果动画取消就开始动画
                    var coord = ended ? routeCoords[routeLength - 1] : routeCoords[0];
                    /** @type {ol.geom.Point} */
                    (geoMarker.getGeometry()).setCoordinates(coord);
                    //移除监听
                    map.un('postcompose', moveFeature);    /** 解除postcompose 事件  */
                }

                startButton.addEventListener('click', startAnimation, false);
            }
        }
    }
</script>

<style scoped>

</style>