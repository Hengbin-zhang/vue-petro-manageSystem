<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="margin-left: 5px;">油井致因分析</span>
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
							<span>油井状态及致因统计</span>
							<el-table border max-height="280px">
								<el-table-column label="序号"></el-table-column>
								<el-table-column label="井编号"></el-table-column>
								<el-table-column label="因素1"></el-table-column>
								<el-table-column label="因素2"></el-table-column>
								<el-table-column label="因素3"></el-table-column>
								<el-table-column label="因素4"></el-table-column>
								<el-table-column label="总计"></el-table-column>
							</el-table>
						</div>
						<el-row></el-row>
						<br />
						<div style="margin-bottom: 20px;">
							<span>油井实时工况统计</span>
							<el-table :border="true" max-height="280px">
								<el-table-column label="序号"></el-table-column>
								<el-table-column label="井编号"></el-table-column>
								<el-table-column label="运行状态"></el-table-column>
								<el-table-column label="异常工况"></el-table-column>
								<el-table-column label="致因分析"></el-table-column>
							</el-table>
						</div>
					</el-row>
					<el-row>
						<el-select placeholder="请选择油井"></el-select>
						<br/>
						<span>xx油井不同工况致因统计</span>
						<div align="center">
							<div id="reasonBar" style="width: 280px;height: 280px;"></div>
						</div>
						<span>各种致因关联显示</span>
						<div align="center">
							<div id="resonSunburst" style="width: 280px;height: 280px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="11">
					<el-row>
						<span>致因分析可视化</span>
						<div align="left">
							<div id="wellMap" style="height: 500px;width: 550px;"></div>
						</div>
						<span>致因分析模型</span>
						<div align="left">
							<div id="reasonTree" style="height: 500px;width: 550px;"></div>
						</div>
					</el-row>
				</el-col>
				<el-col :span="7">
					<el-row style="margin-bottom: 20px;">
						<span>工况日志1</span>
						<el-table :border="true" max-height="330px" style="margin-bottom: 15px;">
							<el-table-column label="区域"></el-table-column>
							<el-table-column label="油井编号"></el-table-column>
							<el-table-column label="工况类型"></el-table-column>
							<el-table-column label="致因1"></el-table-column>
							<el-table-column label="致因2"></el-table-column>
							<el-table-column label="致因3"></el-table-column>
						</el-table>
						<span>工况日志2</span>
						<el-table :border="true" max-height="330px">
							<el-table-column label="区域"></el-table-column>
							<el-table-column label="油井编号"></el-table-column>
							<el-table-column label="工况类型"></el-table-column>
							<el-table-column label="致因1"></el-table-column>
							<el-table-column label="致因2"></el-table-column>
							<el-table-column label="致因3"></el-table-column>
						</el-table>
					</el-row>
					<el-row>
						<span>总区域不同工况致因统计</span>
						<div style="margin-bottom: 20px;">
							<div id="allReasonBar1" style="width: 320px;height: 320px;"></div>
						</div>
						<span>各种致因数量统计</span>
						<div>
							<div id="allReasonBar2" style="width: 320px;height: 320px;"></div>
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
					abnormal:'3'
				}
			}
		},
		mounted(){
			// 单井不同工况致因统计
			this.loadReasonBar()
			// 各种致因关联显示
			this.loadReasonSunBurst()
			// 致因分析模型
			this.loadReasonTree()
			// 致因分析可视化
			this.loadWellMap()
			// 总区域不同工况致因统计
			this.loadallReasonBar1()
			// 总区域不同工况致因统计
			this.loadallReasonBar2()
		},
		methods:{
			loadReasonBar(){
				var posList = [
				    'left', 'right', 'top', 'bottom',
				    'inside',
				    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
				    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
				];
				let app={}
				app.configParameters={
					rotate:{
						min:-90,
						max:90
					},
					align:{
						options:{
							left:'left',
							center:'center',
							right:'right'
						}
					},
					 verticalAlign: {
					        options: {
					            top: 'top',
					            middle: 'middle',
					            bottom: 'bottom'
					        }
					    },
					    position: {
					        options: posList.reduce(function (map, pos) {
					            map[pos] = pos;
					            return map;
					        }, {})
					    },
					    distance: {
					        min: 0,
					        max: 100
					    }
						
				}
				app.config={
					rotate:90,
					align:'left',
					verticalAlign:'middle',
					position:'insideBottom',
					distance:15,
					onChange: function () {
					        var labelOption = {
					            normal: {
					                rotate: app.config.rotate,
					                align: app.config.align,
					                verticalAlign: app.config.verticalAlign,
					                position: app.config.position,
					                distance: app.config.distance
					            }
					        };
					        myChart.setOption({
					            series: [{
					                label: labelOption
					            }, {
					                label: labelOption
					            }, {
					                label: labelOption
					            }, {
					                label: labelOption
					            }]
					        });
					    }
				}
				let labelOption={
					show:true,
					position:app.config.position,
					distance:app.config.distance,
					align:app.config.align,
					verticalAlign:app.config.verticalAlign,
					rotate:app.config.rotate,
					fontSize:16,
					rich:{name:{}}
				}
				let colors=['#ee6666', '#fac858', '#91cc75','#5470c6']
				let mychart=echarts.init(document.getElementById('reasonBar'))
				let option={
					tooltip:{
						trigger:'axis',
						axisPointer:{
							type:'shadow'
						}
					},
					legend:{
						data:['致因1','致因2','致因3','致因4'],
						// data:[
						// 	{
						// 		name:'油层温度',
						// 	textStyle:{
						// 		color:'white'
						// 	}
						// },
						// {
						// 		name:'油层厚度',
						// 	textStyle:{
						// 		color:'white'
						// 	}
						// },
						// {
						// 		name:'油层黏度',
						// 	textStyle:{
						// 		color:'white'
						// 	}
						// },
						// {
						// 		name:'孔隙度',
						// 	textStyle:{
						// 		color:'white'
						// 	}
						// }
						// ]
					},
					xAxis:[
						{
							type:'category',
							axisTick:{show:false},
							data:['工况1','工况2','工况3','工况4','工况5']
							// data:[
							// 	{
							// 		value:'工况1',
							// 		textStyle:{
							// 			color:'white'
							// 		}
							// 	},
							// 	{
							// 		value:'工况2',
							// 		textStyle:{
							// 			color:'white'
							// 		}
							// 	},
							// 	{
							// 		value:'工况3',
							// 		textStyle:{
							// 			color:'white'
							// 		}
							// 	},
							// 	{
							// 		value:'工况4',
							// 		textStyle:{
							// 			color:'white'
							// 		}
							// 	},
							// 	{
							// 		value:'工况',
							// 		textStyle:{
							// 			color:'white'
							// 		}
							// 	}
							// ],
						}
					],
					yAxis:[
						{
							type:'value',
							// name:'油层温度',
							position:'left',
							// axisLine:{
							// 	show:true,
							// 	lineStyle:{
							// 		color:colors[0]
							// 	}
							// },
							// axisLabel:{
							// 	formatter:'{value} °C'
							// }
						},
						{
							type:'value',
							// name:'油层厚度',
							min:0,
							position:'right',
							// axisLine:{
							// 	show:true,
							// 	lineStyle:{
							// 		color:colors[1]
							// 	}
							// },
							// axisLabel:{
							// 	formatter:'{value} mm'
							// }
						},
						{
							type:'value',
							// name:'油层黏度',
							min:0,
							max:100,
							position:'right',
							offset:40,
							// axisLine:{
							// 	show:true,
							// 	lineStyle:{
							// 		color:colors[2]
							// 	}
							// },
							// axisLabel:{
							// 	formatter:'{value}%'
							// }
						},
						{
							type:'value',
							// name:'孔隙度',
							min:0,
							max:100,
							position:'left',
							offset:40,
							// axisLine:{
							// 	show:true,
							// 	lineStyle:{
							// 		color:colors[3]
							// 	}
							// },
							// axisLabel:{
							// 	formatter:'{value} mm'
							// }
						}
					],
					series:[
						{
							name:'致因1',
							type:'bar',
							barGap:0,
							// label:labelOption,
							yAxisIndex:3,
							emphasis:{focus:'series'},
							data:[64,37,14,76,57]
						},
						{
							name:'致因2',
							type:'bar',
							// barGap:0,
							// label:labelOption,
							yAxisIndex:2,
							emphasis:{focus:'series'},
							data:[55,56,54,57,60]
						},
						{
							name:'致因3',
							type:'bar',
							// barGap:0,
							// label:labelOption,
							// yAxisIndex:1,
							emphasis:{focus:'series'},
							data:[26,74,26,27,75]
						},
						{
							name:'致因4',
							type:'bar',
							// barGap:0,
							// label:labelOption,
							yAxisIndex:0,
							emphasis:{focus:'series'},
							data:[55,56,54,57,60]
						}
						
					]
				}
				mychart.setOption(option)
			},
			loadReasonSunBurst(){
				let mychart=echarts.init(document.getElementById('resonSunburst'))
				let data = [{
				    name: '致因1',
				    children: [{
				        name: '致因2',
				        value: 15,
				        children: [{
				            name: '工况1',
				            value: 2
				        }, {
				            name: '工况2',
				            value: 5,
				            children: [{
				                name: '工况3',
				                value: 2
				            }]
				        }, {
				            name: '工况4',
				            value: 4
				        }]
				    }, {
				        name: '致因3',
				        value: 10,
				        children: [{
				            name: '工况5',
				            value: 5
				        }, {
				            name: '工况6',
				            value: 1
				        }]
				    }]
				}, 
				{
				    name: '致因4',
				    children: [{
				        name: '致因5',
				        children: [{
				            name: '工况7',
				            value: 1
				        }, {
				            name: '工况8',
				            value: 2
				        }]
				    }]
				}];
				let option={
					tooltip:{},
					series: {
					        type: 'sunburst',
					        // emphasis: {
					        //     focus: 'ancestor'
					        // },
					        data: data,
					        radius: [0, '90%'],
					        label: {
					            rotate: 'radial'
					        }
					    }
				}
				mychart.setOption(option)
			},
			loadWellMap(){
				let mychart=echarts.init(document.getElementById('wellMap'))
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
			loadReasonTree(){
				let mychart=echarts.init(document.getElementById('reasonTree'))
				let reasonTreeData=[{
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
				}]
				let option={
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: reasonTreeData,
						orient: 'vertical',
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
				mychart.setOption(option)
			},
			loadallReasonBar1(){
				let mychart=echarts.init(document.getElementById('allReasonBar1'))
				let option={
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {            // Use axis to trigger tooltip
					            type: 'shadow'        // 'shadow' as default; can also be 'line' or 'shadow'
					        }
					    },
					    legend: {
					        data: ['致因1', '致因2', '致因3', '致因4', '致因5']
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '3%',
					        containLabel: true
					    },
					    xAxis: {
					        type: 'value'
					    },
					    yAxis: {
					        type: 'category',
					        data: ['工况1', '工况2', '工况3', '工况4', '工况5', '工况6', '工况7']
					    },
					    series: [
					        {
					            name: '致因1',
					            type: 'bar',
					            stack: 'total',
					            label: {
					                show: true
					            },
					            emphasis: {
					                focus: 'series'
					            },
					            data: [320, 302, 301, 334, 390, 330, 320]
					        },
					        {
					            name: '致因2',
					            type: 'bar',
					            stack: 'total',
					            label: {
					                show: true
					            },
					            emphasis: {
					                focus: 'series'
					            },
					            data: [120, 132, 101, 134, 90, 230, 210]
					        },
					        {
					            name: '致因3',
					            type: 'bar',
					            stack: 'total',
					            label: {
					                show: true
					            },
					            emphasis: {
					                focus: 'series'
					            },
					            data: [220, 182, 191, 234, 290, 330, 310]
					        },
					        {
					            name: '致因4',
					            type: 'bar',
					            stack: 'total',
					            label: {
					                show: true
					            },
					            emphasis: {
					                focus: 'series'
					            },
					            data: [150, 212, 201, 154, 190, 330, 410]
					        },
					        {
					            name: '致因5',
					            type: 'bar',
					            stack: 'total',
					            label: {
					                show: true
					            },
					            emphasis: {
					                focus: 'series'
					            },
					            data: [538, 378, 368, 267, 330, 470, 650]
					        }
					    ]
				}
				mychart.setOption(option)
			},
			loadallReasonBar2(){
				let mychart=echarts.init(document.getElementById('allReasonBar2'))
				let option={
					tooltip:{},
					dataset: [{
					        dimensions: ['name', 'age', 'profession', 'score', 'date'],
					        source: [
					            ['致因1', 41, 'Engineer', 314, '2011-02-12'],
					            ['致因2', 20, 'Teacher', 351, '2011-03-01'],
					            ['致因3', 52, 'Musician', 287, '2011-02-14'],
					            ['致因4', 37, 'Teacher', 219, '2011-02-18'],
					            ['致因5', 25, 'Engineer', 253, '2011-04-02'],
					            // [' Adrian Groß', 19, 'Teacher', null, '2011-01-16'],
					            // ['Mia Neumann', 71, 'Engineer', 165, '2011-03-19'],
					            // [' Böhm Fuchs', 36, 'Musician', 318, '2011-02-24'],
					            // ['Han Meimei ', 67, 'Engineer', 366, '2011-03-12'],
					        ]
					    }, {
					        transform: {
					            type: 'sort',
					            config: { dimension: 'score', order: 'desc' }
					        }
					    }],
					    xAxis: {
					        type: 'category',
					        axisLabel: { interval: 0, rotate: 30 },
					    },
					    yAxis: {},
					    series: {
					        type: 'bar',
					        encode: { x: 'name', y: 'score' },
					        datasetIndex: 1
					    }
				}
				mychart.setOption(option)
			}
		}
	}
</script>

<style>
</style>
