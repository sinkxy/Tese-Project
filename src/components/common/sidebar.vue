<template>
		<el-menu  class="el-menu-vertical-demo" :default-active="$route.path" :router="true">
			<!--<el-menu-item index="/pages/baidu/openmap"><i class="fa fa-map"></i>百度地图api测试</el-menu-item>-->
			<!--<el-menu-item index="/pages/google/map2"><i class="fa fa-map"></i>谷歌地图api简单测试</el-menu-item>-->
			<!--<el-menu-item index="/pages/google/map"><i class="fa fa-map"></i>谷歌地图api复杂测试</el-menu-item>-->
			<!--<el-menu-item index="/pages/openlayer/openlayer0"><i class="fa fa-map"></i>openlayers简单测试</el-menu-item>-->
			<!--<el-menu-item index="/pages/openlayer/openlayer1"><i class="fa fa-map"></i>openlayers测试</el-menu-item>-->
			<el-menu-item index="/pages/test/gdt"><i class="fa fa-map"></i>滚动条</el-menu-item>
			<el-menu-item index="/pages/test/select_biddata"><i class="fa fa-map"></i>大数据的下拉框</el-menu-item>
			<el-menu-item index="/pages/test/gffl"><i class="fa fa-map"></i>官方范例</el-menu-item>
		</el-menu>
</template>
<script>
	import {mapGetters} from 'vuex'
	export default {
		props:['rightmng'],
		data() {
            return {
				schedulesys:chg['dosche']+chg['manage'],
				schedule_class_type:chg['schedule_class_type']+chg['manage'],
				duty_summary:chg['duty_summary'],
				depart:chg['depart']+chg['manage'],
				duty_roster_summary:chg['duty_roster_summary'],
				duty_schedule:chg['duty_schedule'],
				permission:chg['permission']+chg['manage'],
				monthly_duty_schedule:chg['monthly_duty_schedule'],
                gxscheduleroute:chg['gxscheduleroute'],
				dispatchone:chg['dispatchone_s'],
				mileage_total:chg['mileage_total_s'],
				mileage_detail:chg['mileage_detail_s'],
				schedule_detail:chg['schedule_detail'],
				overtime:chg['overtime_s'],
				schedulestop:chg['schedulestop']+chg['datastext'],
				accreditschedulestop:chg['accreditschedulestop'],
                updatelogs:chg['updatelogs'],
				daily_operator_dispatch:chg['daily_operator_dispatch_s'],
                unfinished_overtimes:chg['unfinished_overtimes'],
                overtime_count:chg['overtime_count'],
                rpl_fj_schedule:chg['rpl_fj_schedule'],
                fj_scheduletype:chg['fj_scheduletype'],
				appuser:chg['appuser'],
				approle:chg['approle'],
				curruser:chg['curruser'],
                dutyprofile:chg['dutyprofile'],
                daily_leave:chg['daily_leave'],
            }
        },
		mounted: function() {
	    },	
		methods: {
            view(name){
                if(this[name]){
                    try {
                        var right=(this[name].ops.indexOf('view')>=0);
                        return right;
                    }
                    catch(err) {
                        return false;
                    }
                }
                else{
                    return false;
                }
            },
        },
		computed: {
			...mapGetters({
				//dutydetailright:'dutydetailright',
				//dutyitemright:'dutyitemright',
				//dutyrosterdetailright:'dutyrosterdetailright',
				dutyrostersummaryright:'dutyrostersummaryright',
				//dutyrosterright:'dutyrosterright',
				dutyscheduleright:'dutyscheduleright',
				dutysummaryright:'dutysummaryright',
				scheduleclasstyperight:'scheduleclasstyperight',
				monthly_duty_scheduleright:'monthly_duty_scheduleright',
				schedulestopright:'schedulestopright',
				accreditschedulestopright:'accreditschedulestopright',
				daily_operator_dispatchright:'daily_operator_dispatchright',
				dispatchoneright:'dispatchoneright',
				mileage_totalright:'mileage_totalright',
				mileage_detailright:'mileage_detailright',
				schedule_detailright:'schedule_detailright',
				overtimeright:'overtimeright',
				superright:'superright',
				leave_typeright:'leave_typeright',
				position_typeright:'position_typeright',
				departright:'departright',
				leave_applicationright:'leave_applicationright',
				leave_checkright:'leave_checkright',
				annual_leave_balanceright:'annual_leave_balanceright',
				monthly_leaveright:'monthly_leaveright',
                updatelogsright:'updatelogsright',
                dutyprofileright:'dutyprofileright',
                gxschedulerouteright:'gxschedulerouteright',
                daily_leaveright:'daily_leaveright',
                unfinished_overtimesright:'unfinished_overtimesright',
                overtime_countsright:'overtime_countsright',
                fj_scheduleright:'fj_scheduleright',
                fj_scheduletyperight:'fj_scheduletyperight',
			}),
			userright: {
				get: function () {
					return this.superright;
				},
				set: function () {
				}
			},
		},
        watch: {
            '$route' (to, from){
				this.$store.state.nowurl=to.path
			},
			
        },
    }
</script>
<style scoped>
	.el-submenu .el-menu-item {
		height: 50px;
		line-height: 50px;
		padding: 0 45px;
		min-width: 150px!important;
	}
	.el-title{
		font-weight: bold;
    	font-size: 16px;
	}
</style>
