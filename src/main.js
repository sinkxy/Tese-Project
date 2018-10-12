import Vue from 'vue'
import ElementUI from 'element-ui'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import axios from 'axios'
import './utils/dragDialog.js';
window.adapterUrl='/kong/';
Vue.prototype.$axios = axios
import ol from 'openlayers';
Vue.prototype.ol = ol;

import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import routeConfig from './router-config'
Vue.use(VueRouter)
Vue.use(Vuex)
import locale from 'element-ui/lib/locale/lang/zh-TW'
Vue.use(ElementUI, { locale,size: 'small' })
import store from './store/index'
import './font/font-awesome/css/font-awesome.min.css'

import 'babel-polyfill'  //兼容IE

Vue.use(ElementUI)

const router = new VueRouter({
	routes: routeConfig
});

//axios.defaults.headers.common['Authorization'] =Auth.header_token();
axios.interceptors.response.use(function (response) {
	return	response;
}, function (error) {
	//console.log('response error',error,error.response);
	//console.log("response error");
	if (error.response.status==401 || error.response.status==403){
		Auth.login();
		return Promise.reject(null)
	}
	else
		return Promise.reject(error);

	//return Promise.reject(error);
});

Date.prototype.format = function(fmt)  
{ 
    var o = {  
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };  
    if(/(y+)/.test(fmt))  
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));  
    for(var k in o)  
        if(new RegExp("("+ k +")").test(fmt))  
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));  
    return fmt;  
};


new Vue({
	router,
	el: '#app',		
	store:store,
	render: h => h(App)
})
