<template>
    <div id="app" class="per100">
        <OutMap :om="giveOutData"></OutMap>
    </div>
</template>

<script>
    import OutMap from './map.vue'
    export default {
        data () {
            return {
                giveData:{  //vue2.0将数据定位对象的形式，实现父子组件的通信
                    height:300,
                    longitude:116.404,
                    latitude:39.915
                },
                giveOutData:{
                    height:400,
                    longitude:116.417854,
                    latitude:39.921988
                }
            }
        },
        components:{
            OutMap
        }
    }
</script>

<style>
    .per100{
        height: 100%;
        width:100%;
    }
    html,body {
        height: 100%;
    }
</style>