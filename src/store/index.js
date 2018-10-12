import Vue from 'vue'
import Vuex from 'vuex'


import mypermissions from './modules/mypermissions'





Vue.use(Vuex)


export default new Vuex.Store({
	state:{
		nowurl:'',
		duty_itemid:'',
	},
    modules: {
		mypermissions,
    }
})