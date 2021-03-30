<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="margin-left: 5px;">油井工况识别</span>
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
					<el-row></el-row>
					<br />
					<el-row>
						<div>
							<span>单区域井的实时工况显示</span>
							<el-table border>
								<el-table-column label="区域"></el-table-column>
								<el-table-column label="井编号"></el-table-column>
								<el-table-column label="工况"></el-table-column>
							</el-table>
						</div>
						<el-row></el-row>
						<br />
						<div>
							<span>单区域井的实时工况显示</span>
							<el-table>
								<el-table-column label="区域"></el-table-column>
								<el-table-column label="井编号"></el-table-column>
								<el-table-column label="工况"></el-table-column>
							</el-table>
						</div>
					</el-row>
					<el-row>
						<span>异常井实时处理数显示</span>
						<div align="center">
							<div id="processLine" style="width: 280px;height: 280px;"></div>
						</div>
						<span>各异常工况影响图</span>
						<div align="center">
							<div id="abnormalRadar" style="width: 280px;height: 280px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="11">
					<el-row>
						<span>异常工况可视化</span>
						<div align="left">
							<div id="wellMap" style="height: 500px;width: 550px;"></div>
						</div>
						<span>异常工况散点分析</span>
						<div align="center">
							<div id="abnormalScatter" style="height: 500px;width: 550px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="7">
					<el-row>
						<span>各异常工况所占比例</span>
						<div align="center">
							<div id="abnormalPie" style="width: 330px;height: 330px;"></div>
						</div>
						<span>各异常工况统计</span>
						<div align="center">
							<div id="abnormalfunnel" style="width: 330px;height: 330px;"></div>
						</div>
						<span>各异常工况比例图</span>
						<div align="center">
							<div id="abnormalLine" style="width: 330px;height: 330px;"></div>
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
				}
			}
		},
		mounted(){
			// 异常井实时处理数显示
			this.loadProcessLine()
			// 异常工况可视化
			this.loadWellMap()
			// 各异常工况所占比例
			this.loadAbnormalPie()
			// 各异常工况统计
			this.loadAbnormalFunnel()
			// 各异常工况比例图
			this.loadAbnormalLine()
			// 各异常工况影响图
			this.loadAbnormalRadar()
			// 异常工况散点分析
			this.loadAbnormalScatter()
		},
		methods:{
			loadProcessLine(){
				let mychart = echarts.init(document.getElementById('processLine'))
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
			loadWellMap(){
				let mychart = echarts.init(document.getElementById('wellMap'))
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
			loadAbnormalPie(){
				let mychart = echarts.init(document.getElementById('abnormalPie'))
				let option={
					    tooltip: {
					        trigger: 'item'
					    },
					    legend: {
					        orient: 'horizontal',
					        left: 'left',
					    },
					    series: [
					        {
					            name: '访问来源',
					            type: 'pie',
					            radius: '50%',
					            data: [
					                {value: 1048, name: '异常工况1'},
					                {value: 735, name: '异常工况2'},
					                {value: 580, name: '异常工况3'},
					                {value: 484, name: '异常工况4'},
					                {value: 300, name: '异常工况5'}
					            ],
					            emphasis: {
					                itemStyle: {
					                    shadowBlur: 10,
					                    shadowOffsetX: 0,
					                    shadowColor: 'rgba(0, 0, 0, 0.5)'
					                }
					            }
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadAbnormalFunnel(){
				let mychart = echarts.init(document.getElementById('abnormalfunnel'))
				let option={
					    tooltip: {
					        trigger: 'item',
					        formatter: "{b} : {c}%"
					    },
					    legend: {
					        data: ['异常工况1','异常工况2','异常工况3','异常工况4','异常工况5']
					    },
					
					    series: [
					        {
					            name:'漏斗图',
					            type:'funnel',
					            left: '10%',
					            top: 60,
					            //x2: 80,
					            bottom: 60,
					            width: '80%',
					            // height: {totalHeight} - y - y2,
					            min: 0,
					            max: 100,
					            minSize: '0%',
					            maxSize: '100%',
					            sort: 'descending',
					            gap: 2,
					            label: {
					                show: true,
					                position: 'inside'
					            },
					            labelLine: {
					                length: 10,
					                lineStyle: {
					                    width: 1,
					                    type: 'solid'
					                }
					            },
					            itemStyle: {
					                borderColor: '#fff',
					                borderWidth: 1
					            },
					            emphasis: {
					                label: {
					                    fontSize: 20
					                }
					            },
					            data: [
					                {value: 60, name: '异常工况1'},
					                {value: 50, name: '异常工况2'},
					                {value: 40, name: '异常工况3'},
					                {value: 80, name: '异常工况4'},
					                {value: 100, name: '异常工况5'}
					            ]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadAbnormalLine(){
				let mychart = echarts.init(document.getElementById('abnormalLine'))
				let option={
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'cross',
					            label: {
					                backgroundColor: '#6a7985'
					            }
					        }
					    },
					    legend: {
					        data: ['异常工况1', '异常工况2', '异常工况3', '异常工况4', '总计']
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
					            boundaryGap: false,
					            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
					        }
					    ],
					    yAxis: [
					        {
					            type: 'value'
					        }
					    ],
					    series: [
					        {
					            name: '异常工况1',
					            type: 'line',
					            stack: '总量',
					            areaStyle: {},
					            emphasis: {
					                focus: 'series'
					            },
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '异常工况2',
					            type: 'line',
					            stack: '总量',
					            areaStyle: {},
					            emphasis: {
					                focus: 'series'
					            },
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '异常工况3',
					            type: 'line',
					            stack: '总量',
					            areaStyle: {},
					            emphasis: {
					                focus: 'series'
					            },
					            data: [150, 232, 201, 154, 190, 330, 410]
					        },
					        {
					            name: '异常工况4',
					            type: 'line',
					            stack: '总量',
					            areaStyle: {},
					            emphasis: {
					                focus: 'series'
					            },
					            data: [320, 332, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '总计',
					            type: 'line',
					            stack: '总量',
					            label: {
					                show: true,
					                position: 'top'
					            },
					            areaStyle: {},
					            emphasis: {
					                focus: 'series'
					            },
					            data: [820, 932, 901, 934, 1290, 1330, 1320]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadAbnormalRadar(){
				let mychart = echarts.init(document.getElementById('abnormalRadar'))
				let option={
					    tooltip: {},
					    legend: {
					        data: ['异常工况1', '异常工况2','异常工况3','异常工况4','异常工况5']
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
					        indicator: [
					            { name: '维度1', max: 100},
					            { name: '维度2', max: 100},
					            { name: '维度3', max: 100},
					            { name: '维度4', max: 100},
					            { name: '维度5', max: 100},
					            { name: '维度6', max: 100}
					        ]
					    },
					    series: [{
					        type: 'radar',
					        // areaStyle: {normal: {}},
					        data: [
					            {
					                value: [43, 10, 28, 35, 50, 19],
					                name: '异常工况1'
					            },
					            {
					                value: [50, 14, 28, 31, 42, 21],
					                name: '异常工况2'
					            },
								{
								    value: [89, 12, 25, 76, 50, 35],
								    name: '异常工况3'
								},
								{
								    value: [86, 53, 75, 25, 35, 62],
								    name: '异常工况4'
								},
								{
								    value: [53, 67, 27, 57, 42, 79],
								    name: '异常工况5'
								},
					        ]
					    }]
				}
				mychart.setOption(option)
			},
			loadAbnormalScatter(){
				let mychart = echarts.init(document.getElementById('abnormalScatter'))
				let option={
					 xAxis: {},
					    yAxis: {},
					    series: [{
					        symbolSize: 20,
					        data: [
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
					            [5.02, 5.68]
					        ],
					        type: 'scatter'
					    }]
				}
				mychart.setOption(option)
			},
		}
	}
</script>

<style>
</style>
