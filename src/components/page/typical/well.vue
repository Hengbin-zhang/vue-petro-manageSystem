<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="margin-left: 5px;">油井典型工况</span>
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
								<div>正常：{{well.normal}}</div>
								<div>异常：{{well.abnormal}}</div>
							</div>
						</div>
					</el-row>
					<el-row>
						<span>油井工况分析</span>
						<el-table>
							<el-table-column label="区域"></el-table-column>
							<el-table-column label="井编号"></el-table-column>
							<el-table-column label="得分"></el-table-column>
							<el-table-column label="判定名次"></el-table-column>
							<el-table-column label="典型井"></el-table-column>
						</el-table>
						<span>典型井工况分析</span>
						<el-table style="margin-bottom: 20px;">
							<el-table-column label="区域"></el-table-column>
							<el-table-column label="井编号"></el-table-column>
							<el-table-column label="得分"></el-table-column>
							<el-table-column label="典型工况1"></el-table-column>
							<el-table-column label="典型工况2"></el-table-column>
							<el-table-column label="典型工况3"></el-table-column>
						</el-table>
					</el-row>
					<el-row>
						<span>典型工况深度分析对比</span>
						<div align="left" style="margin-bottom: 15px;">
							<div id="typicalCompareBar1" style="width: 280px;height: 350px;"></div>
						</div>
						<span>典型工况深度分析对比</span>
						<div align="left" style="margin-bottom: 15px;">
							<div id="typicalCompareBar2" style="width: 280px;height: 350px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="11">
					<el-row>
						<span>典型井分布</span>
						<div align="left">
							<div id="typicalWellMap" style="width: 550px;height: 550px;"></div>
						</div>
						<span>典型工况深度分析对比</span>
						<div align="left">
							<div id="typicalSankey" style="width: 550px;height: 550px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="7">
					<el-row>
						<span>xx区域典型井综合得分</span>
						<el-select placeholder="请选择区域"></el-select>
						<div style="margin-bottom: 15px;">
							<div id="wellScoreBar" style="width: 320px;height: 320px;"></div>
						</div>
						<span>xx工况典型井得分</span>
						<br />
						<el-select placeholder="请选择工况"></el-select>
						<div style="margin-bottom: 15px;">
							<div id="typicalScoreBar" style="width: 320px;height: 320px;"></div>
						</div>
						<span>典型工况得分走势分析</span>
						<el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期"
						 range-separator="至" format="yyyy年MM月dd日" value-format="yyyy-MM-dd"></el-date-picker>
						<div>
							<div id="typicalScoreLine" style="width: 320px;height: 320px;"></div>
						</div>
					</el-row>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default{
		data(){
			return{
				well:{
					normal:'55',
					abnormal:'4'
				},
				data:['工况1', '工况2', '工况3', '工况4', '工况5']
			}
		},
		mounted(){
			// 典型井分布
			this.loadTypicalWellMap()
			// 不同区域典型井综合得分
			this.loadWellScoreBar()
			// 工况典型井得分
			this.loadTypicalScoreBar()
			// 典型工况得分走势分析
			this.loadTypicalScoreLine()
			// 典型工况深度分析对比桑基图
			this.loadTypicalSankey()
			// 典型工况深度分析对比柱状图1
			this.loadTypicalCompareBar1()
			// 典型工况深度分析对比柱状图2
			this.loadTypicalCompareBar2()
		},
		methods:{
			loadTypicalWellMap(){
				let mychart=echarts.init(document.getElementById('typicalWellMap'))
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
			loadTypicalCompareBar1(){
				let mychart=echarts.init(document.getElementById('typicalCompareBar1'))
				let option={
					tooltip: {
					        trigger: 'axis',
					        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    legend: {
					        data: ['工况1', '工况2', '工况3', '工况4']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: [
					        {
					            type: 'category',
					            data: ['因素1', '因素2', '因素3', '因素4', '因素5', '因素6', '因素7']
					        }
					    ],
					    yAxis: [
					        {
					            type: 'value'
					        }
					    ],
					    series: [
					        {
					            name: '工况1',
					            type: 'bar',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [320, 332, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '工况2',
					            type: 'bar',
					            stack: '广告',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '工况3',
					            type: 'bar',
					            stack: '广告',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '工况4',
					            type: 'bar',
					            stack: '广告',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [150, 232, 201, 154, 190, 330, 410]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadTypicalCompareBar2(){
				let mychart=echarts.init(document.getElementById('typicalCompareBar2'))
				let option={
					tooltip: {
					        trigger: 'axis',
					        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
					            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    legend: {
					        data: [ '工况5', '工况6', '工况7', '工况8']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: [
					        {
					            type: 'category',
					            data: ['因素1', '因素2', '因素3', '因素4', '因素5', '因素6', '因素7']
					        }
					    ],
					    yAxis: [
					        {
					            type: 'value'
					        }
					    ],
					    series: [
					        
					        {
					            name: '工况5',
					            type: 'bar',
					            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
					            emphasis: {
					                focus: 'series'
					            },
					            // markLine: {
					            //     lineStyle: {
					            //         type: 'dashed'
					            //     },
					            //     data: [
					            //         [{type: 'min'}, {type: 'max'}]
					            //     ]
					            // }
					        },
					        {
					            name: '工况6',
					            type: 'bar',
					            // barWidth: 5,
					            stack: '搜索引擎',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [620, 732, 701, 734, 1090, 1130, 1120]
					        },
					        {
					            name: '工况7',
					            type: 'bar',
					            stack: '搜索引擎',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [120, 132, 101, 134, 290, 230, 220]
					        },
					        {
					            name: '工况8',
					            type: 'bar',
					            stack: '搜索引擎',
					            emphasis: {
					                focus: 'series'
					            },
					            data: [60, 72, 71, 74, 190, 130, 110]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadWellScoreBar(){
				let mychart=echarts.init(document.getElementById('wellScoreBar'))
				let option={
					tooltip:{},
					xAxis: {
					        type: 'category',
					        data: ['工况1', '工况2', '工况3', '工况4', '工况5', '工况6']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data: [85, 88, 82, 80, 90, 94],
					        type: 'bar'
					    }]
				}
				mychart.setOption(option)
			},
			loadTypicalScoreBar(){
				let mychart=echarts.init(document.getElementById('typicalScoreBar'))
				let option={
					tooltip:{},
					xAxis: {
					        type: 'category',
					        data: ['油井1', '油井2', '油井3', '油井4', '油井5', '油井6']
					    },
					    yAxis: {
					        type: 'value'
					    },
					    series: [{
					        data: [94, 95, 92, 88, 90, 89],
					        type: 'bar'
					    }]
				}
				mychart.setOption(option)
			},
			loadTypicalScoreLine(){
				let mychart=echarts.init(document.getElementById('typicalScoreLine'))
				let option={
					    tooltip: {
					        trigger: 'axis'
					    },
					    legend: {
					        data: this.data
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
					            name: '工况1',
					            type: 'line',
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '工况2',
					            type: 'line',
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '工况3',
					            type: 'line',
					            data: [150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name: '工况4',
					            type: 'line',
					            data: [320, 332, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '工况5',
					            type: 'line',
					            data: [220, 332, 401, 454, 329, 133, 232]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadTypicalSankey(){
				let mychart=echarts.init(document.getElementById('typicalSankey'))
				let option={
					 series: {
					        type: 'sankey',
					        layout: 'none',
					        emphasis: {
					            focus: 'adjacency'
					        },
					        data: [{
					            name: 'a'
					        }, {
					            name: 'b'
					        }, {
					            name: 'a1'
					        }, {
					            name: 'a2'
					        }, {
					            name: 'b1'
					        }, {
					            name: 'c'
					        }],
					        links: [{
					            source: 'a',
					            target: 'a1',
					            value: 5
					        }, {
					            source: 'a',
					            target: 'a2',
					            value: 3
					        }, {
					            source: 'b',
					            target: 'b1',
					            value: 8
					        }, {
					            source: 'a',
					            target: 'b1',
					            value: 3
					        }, {
					            source: 'b1',
					            target: 'a1',
					            value: 1
					        }, {
					            source: 'b1',
					            target: 'c',
					            value: 2
					        }]
					    }
				}
				mychart.setOption(option)
			},
		}
	}
</script>

<style>
</style>
