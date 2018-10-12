<template>
    <div  style="header">			
		<div class="noprint logout addlogout">
			<span class="headfont">{{personsys}}</span>
			<a href="#" @click.stop.prevent="mylogout" class="logoutbtn">{{user}} {{logout}}</a>
		</div>
		<div class="content">
			<div class="menu">
				<sidebar></sidebar>
			</div>
			<div style="margin:0px 0px 0px 202px;background-color:white;height: 100%;">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>
<script>
import sidebar from './sidebar.vue';
import container from './container.vue';
import axios from 'axios'
import '../../locale/lang/zh_tw.js';
import { Loading } from 'element-ui';
export default {
	data(){
		return{
			personsys:chg['personsys'],
			loadingCount:0,
			logout:chg['logout'],
			maskLoading:null,
		}
	},
	computed: {
		editableTabs(){
			return this.$store.state.tabs;
		},
		user:function () {
			return '匿名用户';
		},
	},
	mounted:function()  {
		//this.$store.dispatch('loadpermissions');
		var me=this;
		axios.interceptors.request.use(function (config){
		    //console.log(config);
			if (config.isMask){
				if (me.loadingCount==0){
					me.maskLoading=Loading.service({ fullscreen: true});
				}
				me.loadingCount++;
			}
			return config;
		 }, function (error){
			return Promise.reject(error);
		 });

		axios.interceptors.response.use(function (response) {
			if(response.config.method.toUpperCase()=='PUT'){
				me.$message({
					showClose: true,
					type: 'success',
					message: chg['editsuccess']
				});
			}else if (response.config.method.toUpperCase()=='POST'){
//				/console.log(response.request.responseURL);
				if(response.request.responseURL.indexOf('confirmschedule')>0){
					//console.log('11111');
					me.$message({
						showClose: true,
						message: 'upload finish!',
						type: 'success'
					}); 
				}
				else if(response.request.responseURL.indexOf('createschedule')>0){
					//console.log(response.config.isMonthCreate);
					if(!response.config.isMonthCreate){
						me.$message({
							showClose: true,
							message: '產生成功',
							type: 'success'
						});
					} 
				}
                else if(response.request.responseURL.indexOf('sche_fj_schs')>0){
                    console.log(response.request.status,'come in');
                    if(response.request.status==201){
                        me.$message({
                            showClose: true,
                            type: 'success',
                            message: chg['sche_fj_schsuccess']
                        });
					}
					else if( response.request.status==200){
                        me.$message({
                            showClose: true,
                            message: chg['insertsuccesswhilenull']
                        });
					}
                }
            	else if(response.request.responseURL.indexOf('fj_schedules')>0){
                    //console.log(response.config.isMonthCreate);
                    if(response.request.status==201){
                        me.$message({
                            showClose: true,
                            message: chg['fj_schedulessuccess'],
                            type: 'success'
                        });
                    }
                }
                else if(response.request.responseURL.indexOf('fj_schedule_one')>0){
                    //console.log(response.config.isMonthCreate);
                    if(response.request.status==201){
                        me.$message({
                            showClose: true,
                            message: chg['editsuccess'],
                            type: 'success'
                        });
                    }
                }
				else{
                    console.log(response.request.responseURL); ///sche_fj_schs
					me.$message({
						showClose: true,
						type: 'success',
						message: chg['insertsuccess']
					});
				}
			}else if (response.config.method.toUpperCase()=='DELETE'){
				me.$message({
					showClose: true,
					type: 'success',
					message: chg['deletesuccess']
				});
			}
			if(response.config.isMask){
				if (me.loadingCount>0){
					me.loadingCount--;
				}
				if ((me.loadingCount==0)&&me.maskLoading){
					me.maskLoading.close();
				} 
			}
			return response;
		}, function (error) {
			if (error.response.status!=401){
				if(error.response.config.isMask){
					if (me.loadingCount>0){
						me.loadingCount--;
					}
					if ((me.loadingCount==0)&&me.maskLoading){
						me.maskLoading.close();
					}
				}
				//console.log(error.response);
				var errormsg=chg['defaulterror'];
				var errorcause=error.response.data.error;
				if(errorcause){
					console.log(errorcause);
					if(errorcause.indexOf('UNIQUE KEY')>0){
						errormsg=chg['uniqueerror'];
					}
					else if(errorcause.indexOf('DELETE')>0 && errorcause.indexOf('REFERENCE constraint')>0){
						errormsg=chg['fornkeyerror'];
					}
					else if(error.config.isMonthCreate){
						errormsg='';
					}
					else if(errorcause.indexOf('有')>=0 || errorcause.indexOf('不可')>=0||errorcause.indexOf('無')>=0){
                        errormsg=errorcause;
					}
                    else if(errorcause.indexOf('Unq_GXScheduleRoute_SchedulestopAndRrGoback')>=0){
                        errormsg='相同場站同一條路線去回程相同，不能重複';
                    }
				}
				if(errormsg){
					me.$message({
						showClose: true,
						type: 'error',
						message:errormsg
					});
				}
				return Promise.reject(error);
			}
		});
	},
	created() {
	},
	methods: {
		mylogout(){
            // this.$axios.get('/kong/auth/v1.0/logout_jwt').then(function(response){
            //     console.log('sus');
            //     Auth.logout();
            //     window.location.reload();
            // }).catch(function(error){
            //     console.log('fa')
            //     Auth.logout();
            //     window.location.reload();
            // })
		},
        /*delCookie(name) {
            var date=new Date();
            date.setTime(date.getTime()-10000);
            var cval = name;
            document.cookie= name + "=" + cval + ";expires="+date.toGMTString()+"; path=/";
		},*/
 		setCookie(cname, cvalue, exdays) {
			var d = new Date();
			d.setTime(d.getTime() + (exdays*24*60*60*1000));
			var expires = "expires="+d.toUTCString();
			document.cookie = cname + "=" + cvalue + "; " + expires;
		}
},
	components: {
		'sidebar': sidebar,
		'container':container
	},	
	destroyed: function() {
		this.$nextTick(() => {
			this.$store.commit('resetsuperright');
			this.userright = undefined;
		})
	}
}
</script>
<style>
	@import '../../css/custom.css';
	html,body {
		height: 100%; 
		padding: 0; 
		margin: 0;
	}	
	.header {
		background-color:#20A0FF;
		color:white;
		height:40px;
		width: 100%;
	}

	.content{
		width: 100%;
		position: absolute;
		top: 40px;
		bottom: 0px;
		left: 0px;
		background-color:#eef1f6;
	}
	.menu{
		width:200px;
		float:left;
		overflow-y:auto;
		height: 100%;
	}   
	.right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
</style>