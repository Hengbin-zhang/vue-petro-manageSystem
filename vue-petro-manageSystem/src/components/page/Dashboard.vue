<template>
	<div>
		<div class="container" style="padding: 0px;margin: 0px !important;">
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
						<div>
							<span style="color: #FFFFFF;margin: 5px;">实时温度显示</span>
							<div id="tempshow" style="height: 400px;width: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">异常工况显示</span>
							<div id="abnormalState" style="height: 400px;width: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">趋势预测</span>
							<div id="predictData" style="height: 400px;width: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">异常区间展示</span>
							<div id="abnormalGauge" style="height: 300px;width: 300px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="11">
					<el-row>
						<div align="center" style="color: #ffffff;height: 100px;font-size: 45px;font-weight: 700;">稠油生产大数据分析</div>
						<span style="color: #FFFFFF;margin: 5px;">风城油田展示(现在展示的为新疆地图)</span>
						<div align="left">
							<div id="chinaMap" style="height: 500px;width: 550px;"></div>
						</div>
					</el-row>
					<el-row>
						<span style="color: #FFFFFF;margin: 5px;">异常工况连接图</span>
						<div align="left">
							<div id="minfordDistri" style="height: 500px;width: 550px;"></div>
						</div>
					</el-row>
					<el-row>
						<span style="color: #FFFFFF;margin: 5px;">异常工况可视化</span>
						<div align="left">
							<div id="wellMap" style="height: 500px;width: 550px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="7">
					<el-row>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">油井特征数据可视化</span>
							<div id="wellBar" style="width: 400px; height: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">管线温度分布图</span>
							<div id="pipScatter" style="width: 400px;height: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">井状态综合预测</span>
							<div id="wellLine" style="width: 400px;height: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">正常井与异常井比较图</span>
							<div id="wellradar" style="width: 400px;height: 300px;"></div>
						</div>
						<div>
							<span style="color: #FFFFFF;margin: 5px;">致因分析树状图</span>
							<div id="reasonTree" style="height: 400px;width: 300px;"></div>
						</div>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import Schart from 'vue-schart';
	import bus from '../common/bus';
	// import xinjiang from "../../assets/map/xinjiang.js";
	import * as echarts from 'echarts';
	const xinjiangJson = require('../../assets/mapjson/xinjiang.json')
	export default {
		name: 'dashboard',
		data() {
			return {
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
				option: [{
						label: '油井',
						value: '油井'
					},
					{
						label: '管线',
						value: '管线'
					},
					{
						label: '管汇',
						value: '管汇'
					}
				],
				reasonTreeData: [{
					name: 'level1.1',
					children: [{
							name: 'level2.1',
							children: [{
									name: 'thirdLevel3.1',
									value: '111'
								},
								{
									name: 'thirdLevel3.2',
									value: '222'
								}
							]
						},
						{
							name: 'secondLevl2.2',
							children: [{
									name: 'thirdLevel3.3',
									value: '333'
								},
								{
									name: 'thirdLevel3.4',
									value: '444'
								}
							]
						}
					]
				}],
			};
		},
		components: {
			Schart
		},
		computed: {
			role() {
				return this.name === 'admin' ? '超级管理员' : '普通用户';
			}
		},
		mounted() {
			// 实时温度显示
			this.tempShow()
			// 异常工况显示
			this.loadAbnormalState()
			// 异常区间展示
			this.loadAbnormalGauge()
			// 趋势预测
			this.loaPredictData()
			// 异常工况可视化
			this.loadWellMap()
			// 异常工况连线图
			this.loadMinDistri()
			// 中国地图
			this.loadChinaMap()
			// 油井特征数据可视化
			this.loadWellBar()
			// 管线温度分布图
			this.loadPipScatter()
			// 井状态综合预测
			this.loadWellLine()
			// 正常井和异常井比较图
			this.loadwellradar()
			// 致因分析树状图
			this.loadReasonTree()
		},
		deactivated() {
			window.removeEventListener('resize', this.renderChart);
			bus.$off('collapse', this.handleBus);
		},
		methods: {
			loadwellradar() {
				let mychart = echarts.init(document.getElementById('wellradar'))
				let option = {
					
					tooltip: {},
					legend: {
						data: ['正常','异常']
					},
					radar: {
						// shape: 'circle',
						name: {
							textStyle: {
								color: '#fff',
								backgroundColor: '#999',
								borderRadius: 3,
								padding: [3, 5]
							}
						},
						indicator: [{
								name: '孔隙度',
								max: 6500
							},
							{
								name: '油层厚度',
								max: 16000
							},
							{
								name: '油层温度',
								max: 30000
							},
							{
								name: '油层黏度',
								max: 38000
							},
							{
								name: '油压值',
								max: 52000
							},
							{
								name: '地质倾角',
								max: 25000
							}
						]
					},
					series: [{
						name: '油井1 VS油井2',
						type: 'radar',
						// areaStyle: {normal: {}},
						data: [{
								value: [4300, 10000, 28000, 35000, 50000, 19000],
								name: '油井1'
							},
							{
								value: [5000, 14000, 28000, 31000, 42000, 21000],
								name: '油井2'
							}
						]
					}]
				}
				mychart.setOption(option)
			},
			loadWellLine(){
				let mychart = echarts.init(document.getElementById('wellLine'))
				let option = {
					xAxis: {
					        type: 'category',
					        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data: [150, 230, 224, 218, 135, 147, 260],
					        type: 'line',
							smooth:true
					    }]
				}
				mychart.setOption(option)
			},
			loadPipScatter(){
				let mychart=echarts.init(document.getElementById('pipScatter'))
				let option={
					xAxis:{},
					yAxis:{},
					series:[{
						symbolSize:20,
						data:[
							[10.0, 8.04],
							[8.07, 6.95],
							[13.0, 7.58],
							[9.05, 8.81],
							[11.0, 8.33],
							[14.0, 7.66],
							[13.4, 6.81],
							[10.0, 6.33],
							[14.0, 8.96],
							[12.5, 6.82],
							[9.15, 7.20],
							[11.5, 7.20],
							[3.03, 4.23],
							[12.2, 7.83],
							[2.02, 4.47],
							[1.05, 3.33],
							[4.05, 4.96],
							[6.03, 7.24],
							[12.0, 6.26],
							[12.0, 8.84],
							[7.08, 5.82],
							[5.02, 5.68],
							],
						type:'scatter'
					}]
				}
				mychart.setOption(option)
			},
			loadWellBar(){
				let mychart=echarts.init(document.getElementById('wellBar'))
				let option={
					xAxis:{
						type:'category',
						data:['孔隙度','油层厚度','油层黏度','油层温度','油压值','储层岩性','地质倾角']
					},
					yAxis:{
						type:'value'
					},
					series:[{
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
						type:'bar'
					}]
				}
				mychart.setOption(option)
			},
			loadChinaMap(){
				let mychart = echarts.init(document.getElementById('chinaMap'))
				let china=require('../../assets/mapjson/china.json')
				echarts.registerMap('china',china)
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
							mapType:'china',
							label:{
								show:true
							},
							data:[
								{name: '北京', value: 48057.34},
								{name: '安徽', value: 15477.48},
								{name: '四川', value: 31686.1},
								{name: '新疆', value: 6992.6},
								{name: '上海', value: 49045.49},
								{name: '广东', value: 49689.64},
								{name: '福建', value: 37659.78},
				                {name: '河北', value: 45180.97},
				                {name: '浙江', value: 45204.26},
								{name: '喀什地区', value: 21900.9},
				                {name: '和田地区', value: 4918.26},
				                {name: '甘肃', value: 5881.84},
				                {name: '青海', value: 4178.01},
				                {name: '云南', value: 12227.92},
				                {name: '贵州', value: 12180.98},
				                {name: '内蒙古', value: 4172.94},
								{name: '宁夏', value: 3368},
				                {name: '西藏', value: 806.98},
								{name: '辽宁', value: 5881.84},
								{name: '黑龙江', value: 4178.01},
								{name: '江西', value: 22227.92},
								{name: '台湾', value: 12180.98},
								{name: '湖北', value: 29172.94},
								{name: '湖南', value: 27172.94},
								{name: '吉林', value: 22227.92},
								{name: '山东', value: 42180.98},
								{name: '河南', value: 29172.94},
								{name: '陕西', value: 27172.94},
								{name: '江苏', value: 44227.92},
								{name: '广西', value: 12180.98},
								{name: '海南', value: 22227.92},
								{name: '山西', value: 12180.98},
								{name: '南海诸岛', value: 29172.94},
								{name: '重庆', value: 27172.94},
								{name: '天津', value: 45227.92}
							]
						}
					]
				}
				mychart.setOption(option)
			},
			loadMinDistri() {
				let mychart = echarts.init(document.getElementById('minfordDistri'))
				let graph = require('../../../static/json/les-miserable.json')
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
			loadWellMap(){
				let mychart = echarts.init(document.getElementById('wellMap'))
				let xinjiang=require('../../assets/mapjson/xinjiang.json')
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
			loaPredictData(){
				let mychart = echarts.init(document.getElementById('predictData'))
				let option = {
					xAxis: {
					        type: 'category',
					        data:['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
					    },
						legend: {
						    data: ['实时温度', '预测温度'],
							textStyle:{
								color:'#FFFFFF'
							}
						},
					    yAxis: {
					        type: 'value',
							textStyle:{
								color:'#FFFFFF'
							}
					    },
					    series: [{
					        name: '实时温度',
					        type: 'line',
					        data: [225, 162, 181,230 , , , ],
							smooth: true
					    },
					    {
					        name: '预测温度',
					        type: 'line',
					        data: [220, 182, 191, 234, 290, 330, 310],
							smooth: true
					    }]
				}
				mychart.setOption(option)
			},
			loadAbnormalGauge(){
				let myChart=echarts.init(document.getElementById('abnormalGauge'))
				let option={
					series: [{
						type: 'gauge',
						axisLine: {
							lineStyle: {
								width: 30,
								color: [
									[0.3, '#55ff00'],
									[0.7, '#37a2da'],
									[1, '#fd666d']
								]
							}
						},
						pointer: {
							itemStyle: {
								color: 'auto'
							}
						},
						axisTick: {
							distance: -30,
							length: 8,
							lineStyle: {
								color: '#fff',
								width: 2
							}
						},
						splitLine: {
							distance: -30,
							length: 30,
							lineStyle: {
								color: '#fff',
								width: 4
							}
						},
						axisLabel: {
							color: 'auto',
							distance: 40,
							fontSize: 14
						},
						detail: {
							valueAnimation: true,
							formatter: '{value}',
							color: 'auto'
						},
						data: [{
							value: 70
						}]
					}]
				}
				setInterval(function () {
				    option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
				    myChart.setOption(option, true);
				}, 2000);
				myChart.setOption(option)
			},
			loadAbnormalState(){
				let myChart=echarts.init(document.getElementById('abnormalState'))
				let option={
					legend: {
						textStyle:{
							color:'#FFFFFF'
						}
					},
					tooltip: {
					    trigger: 'axis',
					    showContent: true
					},
					dataset: {
					    source: [
					        ['product', '3-21', '3-22', '3-23', '3-24', '3-25', '3-26'],
					        ['计量线温度', 56.5, 82.1, 88.7, 70.1, 53.4, 85.1],
					        ['集油线温度', 51.1, 51.4, 55.1, 53.3, 73.8, 68.7],
					        ['注汽线温度', 40.1, 62.2, 69.5, 36.4, 45.2, 32.5],
					        ['注汽线压力', 25.2, 37.1, 41.2, 18, 33.9, 49.1]
					    ]
					},
					xAxis: {type: 'category'},
					yAxis: {gridIndex: 0},
					grid: {top: '55%'},
					series:[
						{type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
						{type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
						{type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
						{type: 'line', smooth: true, seriesLayoutBy: 'row', emphasis: {focus: 'series'}},
						 {
						                type: 'pie',
						                id: 'pie',
						                radius: '30%',
						                center: ['50%', '25%'],
						                emphasis: {focus: 'data'},
						                label: {
						                    formatter: '{b}'
						                },
						                encode: {
						                    itemName: 'product',
						                    value: '3-21',
						                    tooltip: '3-21'
						                }
						            }
					]
				}
				myChart.on('updateAxisPointer', function (event) {
				        var xAxisInfo = event.axesInfo[0];
				        if (xAxisInfo) {
				            var dimension = xAxisInfo.value + 1;
				            myChart.setOption({
				                series: {
				                    id: 'pie',
				                    label: {
				                        formatter: '{b}'
				                    },
				                    encode: {
				                        value: dimension,
				                        tooltip: dimension
				                    }
				                }
				            });
				        }
				    });
				myChart.setOption(option)
			},
			tempShow(){
				let myChart=echarts.init(document.getElementById('tempshow'))
				let option={
					tooltip: {
					    trigger: 'axis'
					},
					legend: {
						textStyle:{
							color:'#FFFFFF'
						},
						data:['油井1号','油井2号','油井3号','油井4号'],
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
						data:[
							{
								value:'8:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'9:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'10:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'11:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'12:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'13:00',
								textStyle:{
									color:'#FFFFFF'
								}
							},
							{
								value:'14:00',
								textStyle:{
									color:'#FFFFFF'
								}
							}
						]
					},
					yAxis: {
					    type: 'value'
					},
					series: [
					    {
					        name: '油井1号',
					        type: 'line',
					        stack: '总量',
					        data: [120, 132, 101, 134, 90, 230, 210],
							smooth: true
					    },
					    {
					        name: '油井2号',
					        type: 'line',
					        stack: '总量',
					        data: [220, 182, 191, 234, 290, 330, 310],
							smooth: true
					    },
					    {
					        name: '油井3号',
					        type: 'line',
					        stack: '总量',
					        data: [150, 232, 201, 154, 190, 330, 410],
							smooth: true
					    },
					    {
					        name: '油井4号',
					        type: 'line',
					        stack: '总量',
					        data: [320, 332, 301, 334, 390, 330, 320],
							smooth: true
					    }
						// ,
					 //    {
					 //        name: '油井5号',
					 //        type: 'line',
					 //        stack: '总量',
					 //        data: [820, 932, 901, 934, 1290, 1330, 1320],
						// 	smooth: true
					 //    }
					]
				}
				myChart.setOption(option)
			},

			loadReasonTree() {
				var myChart = echarts.init(document.getElementById('reasonTree'));
				var option = {
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: this.reasonTreeData,
						top: '1%',
						left: '7%',
						bottom: '1%',
						right: '20%',
						// 标记的大小
						symbolSize: 7,
						label: {
							position: 'left',
							verticalAlign: 'middle',
							align: 'right',
							fontSize: 9
						},
						leaves: {
							label: {
								position: 'right',
								verticalAlign: 'middle',
								align: 'left'
							},
						},
						expandAndCollapse: true,
					}],
				}
				myChart.setOption(option)
			},
		}
	};
</script>


<style scoped>
	.l-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.firstSpan {
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 15px;
	}

	.table {
		position: relative;
		top: 0;
		left: 0;
		z-index: 1;
		border: #053a98 1px solid !important;
	}

	.r-img {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 0;
	}

	.card {
		display: inline-block;
		position: relative;
		margin: 10px;
		/* width: 42.5rem; */
		height: fit-content;
		min-height: 200px;
		/* 单独底色 */
		/* background-color: #0f2a44; */
		/* 大屏底色 */
		background-color: #0c2034;
		border: #00007f;
		font-size: 12px;
		overflow: hidden;
	}

	.el-row {
		margin-bottom: 20px;
	}

	.grid-content {
		display: flex;
		align-items: center;
		height: 100px;
	}

	.grid-cont-right {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #999;
	}

	.grid-num {
		font-size: 30px;
		font-weight: bold;
	}

	.grid-con-icon {
		font-size: 50px;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		color: #fff;
	}

	.grid-con-1 .grid-con-icon {
		background: rgb(45, 140, 240);
	}

	.grid-con-1 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-2 .grid-con-icon {
		background: rgb(100, 213, 114);
	}

	.grid-con-2 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-3 .grid-con-icon {
		background: rgb(242, 94, 67);
	}

	.grid-con-3 .grid-num {
		color: rgb(242, 94, 67);
	}

	.user-info {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 2px solid #ccc;
		margin-bottom: 20px;
	}

	.user-avator {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.user-info-cont {
		padding-left: 50px;
		flex: 1;
		font-size: 14px;
		color: #999;
	}

	.user-info-cont div:first-child {
		font-size: 30px;
		color: #222;
	}

	.user-info-list {
		font-size: 14px;
		color: #999;
		line-height: 25px;
	}

	.user-info-list span {
		margin-left: 70px;
	}

	.mgb20 {
		margin-bottom: 20px;
	}

	.todo-item {
		font-size: 14px;
	}

	.todo-item-del {
		text-decoration: line-through;
		color: #999;
	}

	.schart {
		width: 100%;
		height: 300px;
	}
</style>
