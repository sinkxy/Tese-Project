<template>
	<el-tabs v-model="editableTabsValue" type="border-card" closable @tab-click="locationsider" 
		@tab-remove="removeone" style="margin:0px 8px 0px 8px;height: inherit;border:0px;">
		 <el-tab-pane
		 	:key="item.name"
			v-for="(item, index) in editableTabs"
			:label="item.title"
			:name="item.name"
			style="width: 100%;overflow:auto;height:100%">
			<span slot="label"><i :class="item.iconClass"></i> {{item.title}}</span>
			<div :is="item.content"></div>
		</el-tab-pane>
	</el-tabs>
</template>
<script>
export default {
    data() {
		return {
			editableTabsValue: '0',
			editableTabs: [],
			themaxheight:'',
			tabIndex:0,
		}
    },
	watch: {
		'$route' (to, from) {
			this.addTab(this.$route.params.path,this.$route.params.subPath,this.$route.params.page);
		}
	},
	created() {
		this.setsize();
	},
	mounted:function()  {
		this.addTab(this.$route.params.path,this.$route.params.subPath,this.$route.params.page);
		if(!this.$route.params.page)
			window.localStorage.setItem('nowurl', '/')
		else{
			window.localStorage.setItem('nowurl', this.$route.params.page);
		}
		//如果路径不为空，定位到相应侧边栏
	},
    methods: {
		addTab(path,subPath,page) {
			var tabs=this.editableTabs;
			var targetName=path+'-'+subPath+'-'+page;
			var obj=tabs.find(function(value, index, arr) {  
				return value['name']==targetName;  
			});
			//console.log(obj);
			if (typeof(obj)!='undefined'){
				this.editableTabsValue = targetName;
			}else{
				try{
					this.editableTabs.push({
						title:chg[page],
						name: targetName,
						iconClass:chg[page+'Icon'] || chg['defaultIcon'],
						content:require('../../'+path+'/'+subPath+'/'+page+'.vue')
					});
					this.editableTabsValue = targetName;
				}
				catch(err){
					console.log('路徑錯誤');
				}
			}
		},
		removeone(targetName){
			let tabs = this.editableTabs;
			let activeName = this.editableTabsValue;
			if (activeName === targetName) {
				tabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = tabs[index + 1] || tabs[index - 1];
						if (nextTab) {
						    console.log(nextTab.name);
							activeName = nextTab.name;
						}
					}
				});
			}          
			this.editableTabsValue = activeName;
            var index='/'+activeName.split('-').join("/");  //路由跳到新的地址
            this.$router.replace(index);
			this.editableTabs = tabs.filter(tab => tab.name !== targetName);
		},
		locationsider(tab){
			var index='/'+tab.name.split('-').join("/");
			//this.$store.state.nowurl=index;
			this.$router.push(index);
			//window.localStorage.setItem('nowurl', index);
		},
		setsize(){
			this.themaxheight =  window.innerHeight-115+ "px";
			//this.$store.state.screenheight=window.innerHeight-115;
		}
    }
  }
</script>