import axios from 'axios';
const state = {
    data:{},
    loaded:false,
	superright:false,
	rightLoad:false
}

// getters  �������Ҫ������ state ��� event, �Ǿ���Ҫд��getters
const getters = {
    //dutydetailright:state=>state.data.dutydetail||{},
	//dutyitemright:state=>state.data.dutyitem||{},
	//dutyrosterdetailright:state=>state.data.dutyrosterdetail||{},
	dutyrostersummaryright:state=>state.data.dutyrostersummary||{},
	//dutyrosterright:state=>state.data.dutyroster||{},
    dutyscheduleright:state=>state.data.dutyschedule||{},
	dutysummaryright:state=>state.data.dutysummary||{},
	scheduleclasstyperight:state=>state.data.scheduleclasstype||{},
	monthly_duty_scheduleright:state=>state.data.monthly_duty_schedule||{},
    daily_leaveright:state=>state.data.daily_leave||{},
    unfinished_overtimesright:state=>state.data.unfinished_overtimes||{},
	accreditschedulestopright:state=>state.data.accreditschedulestop||{},
	schedulestopright:state=>state.data.schedulestop||{},
	daily_operator_dispatchright:state=>state.data.daily_operator_dispatch||{},
	superright:state=>state.superright,
	dispatchoneright:state=>state.data.dispatchone||{},
	mileage_totalright:state=>state.data.mileage_total||{},
	mileage_detailright:state=>state.data.mileage_detail||{},
	schedule_detailright:state=>state.data.schedule_detail||{},
	overtimeright:state=>state.data.overtime||{},
	leave_typeright:state=>state.data.leave_type||{},
	position_typeright:state=>state.data.position_type||{},
	departright:state=>state.data.depart||{},
	leave_applicationright:state=>state.data.leave_application||{},
	leave_checkright:state=>state.data.leave_check||{},
	annual_leave_balanceright:state=>state.data.annual_leave_balance||{},
	monthly_leaveright:state=>state.data.monthly_leaves||{},
    updatelogsright:state=>state.data.updatelogs||{},
    dutyprofileright:state=>state.data.dutyprofile||{},
    gxschedulerouteright:state=>state.data.gxscheduleroute||{},
    overtime_countsright:state=>state.data.overtime_count||{},
    fj_scheduleright:state=>state.data.fj_schedule||{},
    fj_scheduletyperight:state=>state.data.fj_scheduletype||{},
}

// actions
const actions = {
    loadpermissions ({ commit, state }) {
		if (!state.loaded){			
			/*axios.get(adapterUrl+'rightmanage/v1.0/cur-permissions?systemname=misweb')
			.then(function(response){
				commit('loadpermissions',response.data)
			}).catch(function(error){
				commit('loadpermissions','')
			})*/
			axios.get(adapterUrl+'rightmanage/v1.0/cur-permissions?systemname=sch_jm')
			.then(function(response){
				commit('loadpermissions',response.data)
			}).catch(function(error){
				commit('loadpermissions','')
			})
		}
		if (!state.rightLoad){
			axios.get('/kong/jm-schedule/v1.0/getrights').then((response) => {
				commit('loadsuperright',response.data)
				//this.userright=response.data.data;
			})
			.catch((response)=> {
			});
		}
    }
}

// mutations �޸� state
const mutations = {
    loadpermissions(state,data){
        state.data=data;
        state.loaded=true;
    },
	loadsuperright(state,data){
        state.superright=data.data;
		state.rightLoad=true;
    },
	resetsuperright(state){
        state.superright=false;
		state.rightLoad=false;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}