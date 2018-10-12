<template>
    <div id="para">
            <!--<el-table-->
                    <!--:data="items"-->
                    <!--style="width: 100%">-->
                <!--<virtual-list :size="40" :remain="8">-->
                    <!--<el-table-column-->
                            <!--prop="name"-->
                            <!--label="姓名"-->
                            <!--width="180">-->
                    <!--</el-table-column>-->
                <!--</virtual-list>-->
            <!--</el-table>-->
            <!--el-table不行-->
            <el-form ref="form" label-width="80px">
                <el-form-item class="scrollToIndex">
                    <span>Scroll to index: </span>
                    <input type="text" v-model.number.lazy="startIndex">
                    <small>Change and blur to set start index.</small>
                </el-form-item>
                <el-form-item label="活动区域" >
                    <el-select v-model="form" @change="valchg" :clearable="true" placeholder="请选择活动区域">
                        <virtual-list :size="40" :remain="8" :bench="44" :start="startIndex">
                            <el-option v-for="(item,index) of items" :label="item.name" :index="index" :key="index" :value="item.name"  class="aatest"></el-option>
                        </virtual-list>
                    </el-select>
                </el-form-item>
            </el-form>
    </div>
</template>

<
<script>
    import virtualList from 'vue-virtual-scroll-list'
    export default {
        components: { 'virtual-list': virtualList },
        data() {
            return {
                data: null,
                items: [],
                form:'',
                startIndex: 200,
            }
        },
        mounted() {
            var a=[];
            for (var i=0;i<10000;i++){
                a.push({'name':i});
            }
            this.items=a;
            /**
            this.$nextTick(() => {
                setTimeout(() => {
                    this.start=200;
                }, 1000);
            })**/
        },
        methods: {
            valchg(){
                console.log(this.startIndex);
            },
        }
    }
</script>


<style>
    div[class*="el-select-dropdown"]>div>div[class="el-scrollbar__bar is-vertical"]>div{
        display: none;
    }
</style>