<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;margin-left: 5px;">管线单参数分析</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"
					value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择管线" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
				<el-row>
					<el-col :span="8" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">参数历史数据</span>
						<div id="historyData" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">参数历史数据记录</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="区段1" prop="" width="90"></el-table-column>
							<el-table-column label="区段2" prop="" width="90"></el-table-column>
							<el-table-column label="区段3" prop="" width="90"></el-table-column>
							<el-table-column label="区段4" prop="" width="90"></el-table-column>
							<el-table-column label="区段5" prop="" width="90"></el-table-column>
							<el-table-column label="区段6" prop="" width="90"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="8" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">随机区域预测趋势展示</span>
						<br />
						<div id="predictData1" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<div id="predictData2" style="height: 400px;"></div>
					</el-col>
					<el-col :span="7" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">历史预测误差记录</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="区段1" prop="" width="90"></el-table-column>
							<el-table-column label="区段2" prop="" width="90"></el-table-column>
							<el-table-column label="区段3" prop="" width="90"></el-table-column>
							<el-table-column label="区段4" prop="" width="90"></el-table-column>
							<el-table-column label="区段5" prop="" width="90"></el-table-column>
							<el-table-column label="区段6" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">历史预测误差统计</span>
						<div id="historyPreData" style="height: 400px;"></div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default{
		data(){
			return{
				
			}
		},
		mounted() {
			this.loadHisPreData()
			this.loadHistoryData()
			this.loadPreData1()
			this.loadPreData2()
		},
		methods:{
			loadHistoryData(){
				let mychart = echarts.init(document.getElementById('historyData'))
				let option = {
					tooltip: {
					    trigger: 'axis'
					},
					legend: {
					    data: ['孔隙度', '油层厚度', '油层温度', '油层黏度', '地质倾角']
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
					    data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
					},
					yAxis: {
					    type: 'value'
					},
					series: [
					    {
					        name: '孔隙度',
					        type: 'line',
					        stack: '总量',
					        data: [120, 132, 101, 134, 90, 230, 210],
							smooth: true
					    },
					    {
					        name: '油层厚度',
					        type: 'line',
					        stack: '总量',
					        data: [220, 182, 191, 234, 290, 330, 310],
							smooth: true
					    },
					    {
					        name: '油层温度',
					        type: 'line',
					        stack: '总量',
					        data: [150, 232, 201, 154, 190, 330, 410],
							smooth: true
					    },
					    {
					        name: '油层黏度',
					        type: 'line',
					        stack: '总量',
					        data: [320, 332, 301, 334, 390, 330, 320],
							smooth: true
					    },
					    {
					        name: '地质倾角',
					        type: 'line',
					        stack: '总量',
					        data: [820, 932, 901, 934, 1290, 1330, 1320],
							smooth: true
					    }
					]
				}
				mychart.setOption(option)
			},
			loadPreData1(){
				let mychart = echarts.init(document.getElementById('predictData1'))
				let option = {
					title:{
						text:'注汽线温度预测',
						align:'left',
						textStyle:{
							fontSize:14,
							color:'#FFFFFF'
						}
					},
					xAxis: {
					        type: 'category',
					        data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
							
					    },
						legend: {
						    data: ['实时温度', '预测温度'],
							
						},
					    yAxis: {
					        type: 'value'
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
			loadPreData2(){
				let mychart = echarts.init(document.getElementById('predictData2'))
				let option = {
					title:{
						text:'集油线温度预测',
						align:'left',
						textStyle:{
							fontSize:14,
							color:'#FFFFFF'
						}
					},
					xAxis: {
					        type: 'category',
					        data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
					    },
						legend: {
						    data: ['实时温度', '预测温度']
						},
					    yAxis: {
					        type: 'value'
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
			loadHisPreData(){
				let mychart = echarts.init(document.getElementById('historyPreData'))
				let option = {
					xAxis: {
						type: 'category',
						data: ['2%', '5%', '10%', '15%', '20%', '25%', '30%']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [{
								value: 32,
								itemStyle: {
									color: '#ff0000'
								}
							},
							{
								value: 25,
								itemStyle: {
									color: '#00aaff'
								}
							},
							{
								value: 39,
								itemStyle: {
									color: '#555500'
								}
							},
							{
								value: 26,
								itemStyle: {
									color: '#55aa00'
								}
							},
							{
								value: 28,
								itemStyle: {
									color: '#ffaa00'
								}
							},
							{
								value: 70,
								itemStyle: {
									color: '#55ff00'
								}
							},
							{
								value: 75,
								itemStyle: {
									color: '#ffff00'
								}
							}
						],
						type: 'bar'
					}]
				}
				mychart.setOption(option)
			}
		}
	}
</script>

<style>
</style>
