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
            <el-form ref="form" label="索引值" label-width="80px">
                <el-form-item label="下拉框" label-width="80px">
                    <el-select v-model="selectval" @change="valchg" @visible-change="vchg" :filter-method="fchg" :clearable="true" :filterable="true" :remote="true" placeholder="请选择活动区域">
                        <virtual-list :size="40" :remain="8" :bench="44" :start="startIndex">
                            <el-option v-for="(item,index) in items" style="height:40px;" :label="item.name" :index="index" :key="index" :value="item.name"  class="aatest"></el-option>
                        </virtual-list>
                    </el-select>
                </el-form-item>
            </el-form>
    </div>
</template>

<script>
    /*
        virtual-list组件的size是每一行数据的行号，具体的每一行行高需要与size的值保持一致，否则会出bug
    */
    import virtualList from 'vue-virtual-scroll-list'
    export default {
        components: { 'virtual-list': virtualList },
        data() {
            return {
                data: null,
                items: [],
                itemsremain:[],
                selectval:0,
                startIndex: 0,
            }
        },
        mounted() {
            var a=[];
            for (var i=0;i<10000;i++){
                a.push({'name':'line'+i});
            }
            this.items=a;
            this.itemsremain=JSON.parse(JSON.stringify(this.items)); //将完整的下拉源数据存起来
        },
        methods: {
            valchg(){
                console.log(this.startIndex);
            },
            vchg(val){
                this.items=JSON.parse(JSON.stringify(this.itemsremain));
                //console.log(this.selectval,this.items)
                if(val){
                    var dindindex=this.items.findIndex((item) => item.name.indexOf(this.selectval)>-1);
                    //console.log(dindindex)
                    if(dindindex>0){
                        this.startIndex=dindindex;
                    }
                }
                else{
                    this.startIndex=0;
                }
            },
            fchg(val){
                if(val){//输入有值，做过滤
                    this.items=JSON.parse(JSON.stringify(this.itemsremain)); //每次进入搜索事件，都需要从下来源数据进行搜索
                    //console.log(val);
                    var chgitem=this.items.filter((item,index) => item.name.indexOf(val)>-1);
                    console.log(chgitem);
                    if(chgitem.length>0){
                        this.items=chgitem;
                        this.startIndex=0;
                    }
                    else{
                        this.items=[];
                    }
                }
                else{
                    this.items=JSON.parse(JSON.stringify(this.itemsremain));
                }

            }
        }
    }
</script>


<style>
    /*原elment-ui下拉框自带的滑动条将会被禁用*/
    div[class*="el-select-dropdown"]>div>div[class="el-scrollbar__bar is-vertical"]>div{
        display: none;
    }
</style>