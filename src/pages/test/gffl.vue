<template>
    <div>
        <div>
            <input type="text" v-model.number.lazy="startIndex">
        </div>
        <VirtualList :size="50" :remain="6" :bench="44" class="list" :start="startIndex">
            <div v-for="(udf, index) in items" :index="index" :key="index"><A HREF="#">{{index}}</A></div>
        </VirtualList>
    </div>
</template>

<script>
    //import Item from './item.vue'
    import VirtualList from 'vue-virtual-scroll-list'
    export default {
        name: 'finite-test',
        components: {VirtualList },
        data () {
            return {
                startIndex: 0,
                items: new Array(100000)
            }
        }
    }
</script>

<style>
    .scrollToIndex {
        padding-bottom: 20px;
    }
    input {
        outline: none;
        padding: .4em .5em;
        width: 55px;
        height: 16px;
        border-radius: 3px;
        border: 1px solid;
        border-color: #dddddd;
        font-size: 16px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
    }
    input:focus {
        border-color: #6495ed;
    }
    small {
        color: #999;
    }
    .list {
        background: #fff;
        border-radius: 3px;
        border: 1px solid #ddd;
        -webkit-overflow-scrolling: touch;
        overflow-scrolling: touch;
    }
    .source {
        text-align: center;
        padding-top: 20px;
    }
    .source a {
        color: #999;
        text-decoration: none;
        font-weight: 100;
    }
    @media (max-width: 640px) {
        small {
            display: none;
        }
    }
</style>