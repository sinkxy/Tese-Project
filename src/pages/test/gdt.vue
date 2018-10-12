<template>
    <div>
        <el-button @click="createdata">test</el-button>
        <el-form ref="form"  label-width="80px">
        <el-form-item label="活动区域">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in ees"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="活动区域">
            <el-select v-model="value" placeholder="请选择">
                <el-option
                        v-for="item in aaa"
                        :key="item.name"
                        :label="item.name"
                        :value="item.name">
                </el-option>
            </el-select>
        </el-form-item>
    </el-form>
        <table>
            <template v-for="item in ees">
                <tr><td><div>{{item.name}}</div></td></tr>
            </template>
        </table>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                    ees:[],
                    aaa:[],
                    value:'12'

            }
        },
        created:{
        },
        watch:{
            ees:{
                handler: function (val, oldVal) {
                    //console.log(`watch c val change --- new val: ${val}, old val: ${oldVal}`);
                },
                deep: false
            },
            aaa:{
                handler: function (val, oldVal) {
                    //console.log(`watch c val change --- new val: ${val}, old val: ${oldVal}`);
                },
                deep: false
            }
        },
        methods: {
            createdata(){
                this.ees=[];
                var ls=[];
                for (var i=0;i<10000;i++){
                    ls.push({'name':i});
                    //this.ees.push({'name':i})
                    //this.aaa.push({'name':i})
                }
                var d=new Date();
                this.ees=ls;
                console.log(new Date().getTime()-d.getTime());
            },
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>