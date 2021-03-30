<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="margin-left: 5px;">数据实时监控/总</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<el-row>
				<el-col :span="6">
					<el-row>
						<div style="background-color: #13d0b2;margin: 5px;float: left;border:#13d0b2;padding: 10px;border-radius: 5px;">
							<div style="font-size: 14px;font-weight: 600;color: #FFFFFF;" align="center">油井</div>
							<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
							</el-row>
							<div style="font-size: 12px; color: #FFFFFF;">
								<div>正常：{{firstCardData.well.normal}}</div>
								<div>异常：{{firstCardData.well.abnormal}}</div>
							</div>
						</div>
						<div style="background-color: #55ff7f;margin: 5px;float: left;border:#55ff7f;padding: 10px;border-radius: 5px;">
							<div style="font-size: 16px;font-weight: 600;color: #FFFFFF;" align="center">管线</div>
							<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
							</el-row>
							<div style="font-size: 12px; color: #FFFFFF;">
								<div>正常：{{firstCardData.pipeline.normal}}</div>
								<div>异常：{{firstCardData.pipeline.abnormal}}</div>
							</div>
						</div>
						<div style="background-color: #ffaa00;margin: 5px;float: left;border:#ffaa00;padding: 10px;border-radius: 5px;">
							<div style="font-size: 16px;font-weight: 600;color: #FFFFFF;" align="center">管汇</div>
							<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
							</el-row>
							<div style="font-size: 12px; color: #FFFFFF;">
								<div>正常：{{firstCardData.maniford.normal}}</div>
								<div>异常：{{firstCardData.maniford.abnormal}}</div>
							</div>
						</div>
					</el-row>
					<el-row>
						<span>计量线温度趋势显示</span>
						<div align="center">
							<div id="tempLine1" style="width: 280px;height: 350px;"></div>
						</div>
						<span>集油线温度趋势显示</span>
						<div align="center">
							<div id="tempLine2" style="width: 280px;height: 350px;"></div>
						</div>
						<span>注汽线温度趋势显示</span>
						<div align="center">
							<div id="tempLine3" style="width: 280px;height: 350px;"></div>
						</div>
						<span>注汽线压力趋势显示</span>
						<div align="center">
							<div id="pressureLine1" style="width: 280px;height: 350px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="11">
					<span>监控数据实时大屏</span>
					<div align="left">
						<div id="tempMap" style="width: 550px;height: 550px;"></div>
					</div>
					<span>温度关系图</span>
					<div align="left">
						<div id="tempDistri" style="width: 550px;height: 550px;"></div>
					</div>
					<span>单井特征方差统计</span>
					<div>
						<div id="varianceBar" style="width: 550px;height: 550px;"></div>
					</div>
				</el-col>
				<el-col :span="7">
					<span>井特征数据显示表</span>
					<el-table :border="true" max-height="320px" :data="test">
						<el-table-column label="油井编号" prop="index1"></el-table-column>
						<el-table-column label="孔隙度" prop="index2"></el-table-column>
						<el-table-column label="原油黏度" prop="index3"></el-table-column>
						<el-table-column label="油层厚度" prop="index4"></el-table-column>
						<el-table-column label="油层温度" prop="index5"></el-table-column>
						<el-table-column label="油层压强" prop="index6"></el-table-column>
					</el-table>
					<el-row></el-row>
					<br />
					<span>管线温度数据显示表</span>
					<el-table :border="true" max-height="320px" :data="test">
						<el-table-column label="监测点" prop="index1"></el-table-column>
						<el-table-column label="区段1" prop="index2"></el-table-column>
						<el-table-column label="区段2" prop="index3"></el-table-column>
						<el-table-column label="区段3" prop="index4"></el-table-column>
						<el-table-column label="区段4" prop="index5"></el-table-column>
						<el-table-column label="区段5" prop="index6"></el-table-column>
					</el-table>
					<el-row></el-row>
					<br />
					<span>管汇温度数据显示表</span>
					<el-table :border="true" max-height="320px" :data="test">
						<el-table-column label="监测点" prop="index1"></el-table-column>
						<el-table-column label="节点1" prop="index2"></el-table-column>
						<el-table-column label="区段2" prop="index3"></el-table-column>
						<el-table-column label="区段3" prop="index4"></el-table-column>
						<el-table-column label="区段4" prop="index5"></el-table-column>
						<el-table-column label="区段5" prop="index6"></el-table-column>
					</el-table>
					<el-row>
						<span>特征平均值异常油井数统计</span>
						<div>
							<div id="abnormalBar" style="width: 400px;height: 320px;"></div>
						</div>
						<span>油井特征数据的平均值</span>
						<div>
							<div id="averageBar" style="width: 400px;height: 320px;"></div>
						</div>
						
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		name: 'basetable',
		data() {
			return {
				test:[
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					},
					{
						index1:'xxxxx',
						index2:'',
						index3:'',
						index4:'',
						index5:'',
						index6:''
					}
				],
				firstCardData: {
					well: {
						normal: 198,
						abnormal: 12
					},
					pipeline: {
						normal: 202,
						abnormal: 8
					},
					maniford: {
						normal: 195,
						abnormal: 15
					}
				},
			};
		},
		mounted() {
			// 计量线温度趋势显示
			this.loadTempLine1()
			// 集油线温度趋势显示
			this.loadTempLine2()
			// 注汽线温度趋势显示
			this.loadTempLine3()
			// 注汽线压力趋势显示
			this.loadPressureLine1()
			// 监控数据实时大屏
			this.loadTempMap()
			// 温度关系图
			this.loadTempDistri()
			// 特征平均值异常油井数统计
			this.loadAbnormalBar()
			// 油井特征数据的平均值
			this.loadAverageBar()
			// 单井特征方差统计
			this.loadVarianceBar()
		},
		methods: {
			loadTempLine1(){
				let mychart=echarts.init(document.getElementById('tempLine1'))
				let option={
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        data: ['油井1', '油井2', '节点1', '节点2', '区块1','区块2']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [
					        {
					            name: '油井1',
					            type: 'line',
					            stack: '总量',
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '油井2',
					            type: 'line',
					            stack: '总量',
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '节点1',
					            type: 'line',
					            stack: '总量',
					            data: [150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name: '节点2',
					            type: 'line',
					            stack: '总量',
					            data: [320, 332, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '区块1',
					            type: 'line',
					            stack: '总量',
					            data: [520, 432, 201, 234, 290, 330, 380]
					        },
							{
							    name: '区块2',
							    type: 'line',
							    stack: '总量',
							    data: [320, 332, 301, 334, 390, 330, 320]
							}
					    ]
				}
				mychart.setOption(option)
			},
			loadTempLine2(){
				let mychart=echarts.init(document.getElementById('tempLine2'))
				let option={
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					         data: ['油井1', '油井2', '节点1', '节点2', '区块1','区块2']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type: 'category',
					        boundaryGap: false,
					        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [
					        {
					            name: '油井1',
					            type: 'line',
					            stack: '总量',
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '油井2',
					            type: 'line',
					            stack: '总量',
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '节点1',
					            type: 'line',
					            stack: '总量',
					            data: [150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name: '节点2',
					            type: 'line',
					            stack: '总量',
					            data: [320, 332, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '区块1',
					            type: 'line',
					            stack: '总量',
					            data: [220, 232, 201, 254, 290, 330, 320]
					        },
							{
							    name: '区块2',
							    type: 'line',
							    stack: '总量',
							    data: [320, 332, 301, 334, 390, 330, 320]
							},
					    ]
				}
				mychart.setOption(option)
			},
			loadTempLine3(){
				let mychart=echarts.init(document.getElementById('tempLine3'))
				let option={
					   tooltip: {
					       trigger: 'axis'
					   },
					   legend: {
					        data: ['油井1', '油井2', '节点1', '节点2', '区块1','区块2']
					   },
					   grid: {
					       left: '3%',
					       right: '4%',
					       bottom: '3%',
					       containLabel: true
					   },
					   xAxis: {
					       type: 'category',
					       boundaryGap: false,
					       data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					   },
					   yAxis: {
					       type: 'value'
					   },
					   series: [
					       {
					           name: '油井1',
					           type: 'line',
					           stack: '总量',
					           data: [120, 132, 101, 134, 90, 230, 210]
					       },
					       {
					           name: '油井2',
					           type: 'line',
					           stack: '总量',
					           data: [220, 182, 191, 234, 290, 330, 310]
					       },
					       {
					           name: '节点1',
					           type: 'line',
					           stack: '总量',
					           data: [150, 232, 201, 154, 190, 330, 410]
					       },
					       {
					           name: '节点2',
					           type: 'line',
					           stack: '总量',
					           data: [320, 332, 301, 334, 390, 330, 320]
					       },
					       {
					           name: '区块1',
					           type: 'line',
					           stack: '总量',
					           data: [220, 232, 201, 254, 290, 330, 320]
					       },
					   	{
					   	    name: '区块2',
					   	    type: 'line',
					   	    stack: '总量',
					   	    data: [320, 332, 301, 334, 390, 330, 320]
					   	},
					   ]
				}
				mychart.setOption(option)
			},
			loadPressureLine1(){
				let mychart=echarts.init(document.getElementById('pressureLine1'))
				let option={
					  tooltip: {
					      trigger: 'axis'
					  },
					  legend: {
					       data: ['油井1', '油井2', '节点1', '节点2', '区块1','区块2']
					  },
					  grid: {
					      left: '3%',
					      right: '4%',
					      bottom: '3%',
					      containLabel: true
					  },
					  xAxis: {
					      type: 'category',
					      boundaryGap: false,
					      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					  },
					  yAxis: {
					      type: 'value'
					  },
					  series: [
					      {
					          name: '油井1',
					          type: 'line',
					          stack: '总量',
					          data: [120, 132, 101, 134, 90, 230, 210]
					      },
					      {
					          name: '油井2',
					          type: 'line',
					          stack: '总量',
					          data: [220, 182, 191, 234, 290, 330, 310]
					      },
					      {
					          name: '节点1',
					          type: 'line',
					          stack: '总量',
					          data: [150, 232, 201, 154, 190, 330, 410]
					      },
					      {
					          name: '节点2',
					          type: 'line',
					          stack: '总量',
					          data: [320, 332, 301, 334, 390, 330, 320]
					      },
					      {
					          name: '区块1',
					          type: 'line',
					          stack: '总量',
					          data: [220, 232, 201, 254, 290, 330, 320]
					      },
					  	{
					  	    name: '区块2',
					  	    type: 'line',
					  	    stack: '总量',
					  	    data: [320, 332, 301, 334, 390, 330, 320]
					  	},
					  ]
				}
				mychart.setOption(option)
			},
			loadTempMap(){
				let mychart=echarts.init(document.getElementById('tempMap'))
				let xinjiang=require('../../../assets/mapjson/xinjiang.json')
				echarts.registerMap('xinjiang',xinjiang)
				let option={
					tooltip:{
						trigger:'item',
						formatter:'{b}:{c}'
					},
					visualMap:{
						min: 800,
						max: 50000,
						text: ['High', 'Low'],
						textStyle:{
							color:'#FFFFFF'
						},
						realtime: false,
						calculable: true,
						inRange: {
						    color: ['lightskyblue', 'yellow', 'orangered']
						}
					},
					series:[
						{
							type:'map',
							mapType:'xinjiang',
							label:{
								show:true
							},
							data:[
								{name: '乌鲁木齐市', value: 20057.34},
								{name: '克拉玛依市', value: 15477.48},
								{name: '吐鲁番市', value: 31686.1},
								{name: '哈密市', value: 6992.6},
								{name: '昌吉回族自治州', value: 44045.49},
								{name: '博尔塔拉蒙古自治州', value: 40689.64},
								{name: '巴音郭楞蒙古自治州', value: 37659.78},
					            {name: '阿克苏地区', value: 45180.97},
					            {name: '克孜勒苏柯尔克孜自治州', value: 55204.26},
								{name: '喀什地区', value: 21900.9},
					            {name: '和田地区', value: 4918.26},
					            {name: '伊犁哈萨克自治州', value: 5881.84},
					            {name: '塔城地区', value: 4178.01},
					            {name: '阿勒泰地区', value: 2227.92},
					            {name: '石河子市', value: 2180.98},
					            {name: '阿拉尔市', value: 9172.94},
								{name: '图木舒克市', value: 3368},
					            {name: '五家渠市', value: 806.98},
								{name: '北屯市', value: 5881.84},
								{name: '铁门关市', value: 4178.01},
								{name: '双河市', value: 2227.92},
								{name: '可克达拉市', value: 2180.98},
								{name: '昆玉市', value: 9172.94},
							]
						}
					]
				}
				mychart.setOption(option)
			},
			loadTempDistri(){
				let mychart=echarts.init(document.getElementById('tempDistri'))
				let graph = require('../../../../static/json/les-miserable.json')
				graph.nodes.forEach(function(node) {
					node.label = {
						show: node.symbolSize > 20
					}
				})
				let option = {
					// title: {
					// 	text: 'Les Miserables',
					// 	// subtext: 'Default layout',
					// 	top: 'bottom',
					// 	left: 'right'
					// },
					tooltip: {},
					legend: [{
						// selectedMode: 'single',
						data: graph.categories.map(function(a) {
							return a.name;
						})
					}],
					animationDuration: 1000,
					animationEasingUpdate: 'quinticInOut',
					series: [{
						name: '节点',
						type: 'graph',
						layout: 'none',
						data: graph.nodes,
						links: graph.links,
						categories: graph.categories,
						roam: true,
						label: {
							position: 'right',
							formatter: '{b}'
						},
						lineStyle: {
							color: 'source',
							curveness: 0.3
						},
						emphasis: {
							focus: 'adjacency',
							lineStyle: {
								width: 10
							}
						}
					}]
				}
				mychart.setOption(option)
			},
			loadAbnormalBar(){
				let mychart=echarts.init(document.getElementById('abnormalBar'))
				let option={
					 xAxis: {
					        type: 'category',
					        data: ['特征1', '特征2', '特征3', '特征4', '特征5', '特征6', '特征7']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data:[
					        	{
					        		value:32,
					        		itemStyle:{
					        			color:'#ff0000'
					        		}
					        	},
					        	{
					        		value:25,
					        		itemStyle:{
					        			color:'#00aaff'
					        		}
					        	},
					        	{
					        		value:39,
					        		itemStyle:{
					        			color:'#555500'
					        		}
					        	},
					        	{
					        		value:26,
					        		itemStyle:{
					        			color:'#55aa00'
					        		}
					        	},
					        	{
					        		value:28,
					        		itemStyle:{
					        			color:'#ffaa00'
					        		}
					        	},
					        	{
					        		value:70,
					        		itemStyle:{
					        			color:'#55ff00'
					        		}
					        	},
					        	{
					        		value:75,
					        		itemStyle:{
					        			color:'#ffff00'
					        		}
					        	}
					        ],
					        type: 'bar'
					    }]
				}
				mychart.setOption(option)
			},
			loadAverageBar(){
				let mychart=echarts.init(document.getElementById('averageBar'))
				let option={
					 xAxis: {
					        type: 'category',
					        data: ['特征1', '特征2', '特征3', '特征4', '特征5', '特征6', '特征7']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data:[
					        	{
					        		value:32,
					        		itemStyle:{
					        			color:'#ff0000'
					        		}
					        	},
					        	{
					        		value:25,
					        		itemStyle:{
					        			color:'#00aaff'
					        		}
					        	},
					        	{
					        		value:39,
					        		itemStyle:{
					        			color:'#555500'
					        		}
					        	},
					        	{
					        		value:26,
					        		itemStyle:{
					        			color:'#55aa00'
					        		}
					        	},
					        	{
					        		value:28,
					        		itemStyle:{
					        			color:'#ffaa00'
					        		}
					        	},
					        	{
					        		value:70,
					        		itemStyle:{
					        			color:'#55ff00'
					        		}
					        	},
					        	{
					        		value:75,
					        		itemStyle:{
					        			color:'#ffff00'
					        		}
					        	}
					        ],
					        type: 'bar'
					    }]
				}
				mychart.setOption(option)
			},
			loadVarianceBar(){
				let mychart=echarts.init(document.getElementById('varianceBar'))
				let option={
					 xAxis: {
					        type: 'category',
							data: ['特征1', '特征2', '特征3', '特征4', '特征5', '特征6', '特征7']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data:[
					        	{
					        		value:32,
					        		itemStyle:{
					        			color:'#ff0000'
					        		}
					        	},
					        	{
					        		value:25,
					        		itemStyle:{
					        			color:'#00aaff'
					        		}
					        	},
					        	{
					        		value:39,
					        		itemStyle:{
					        			color:'#555500'
					        		}
					        	},
					        	{
					        		value:26,
					        		itemStyle:{
					        			color:'#55aa00'
					        		}
					        	},
					        	{
					        		value:28,
					        		itemStyle:{
					        			color:'#ffaa00'
					        		}
					        	},
					        	{
					        		value:70,
					        		itemStyle:{
					        			color:'#55ff00'
					        		}
					        	},
					        	{
					        		value:75,
					        		itemStyle:{
					        			color:'#ffff00'
					        		}
					        	}
					        ],
					        type: 'bar'
					    }]
				}
				mychart.setOption(option)
			}
		}
	};
</script>

<style>
</style>
