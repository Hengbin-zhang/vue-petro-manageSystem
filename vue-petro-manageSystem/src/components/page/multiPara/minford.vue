<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;margin-left: 5px;">管汇多参数分析</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"
					value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择管汇" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
				<el-row>
					<el-col :span="8" style="margin: 6px;">
						<span style="color: #FFFFFF;margin: 5px;">管汇状态融合预测显示表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="节点1" prop="" width="80"></el-table-column>
							<el-table-column label="节点2" prop="" width="90"></el-table-column>
							<el-table-column label="节点3" prop="" width="90"></el-table-column>
							<el-table-column label="节点4" prop="" width="90"></el-table-column>
							<el-table-column label="节点5" prop="" width="90"></el-table-column>
							<el-table-column label="节点6" prop="" width="90"></el-table-column>
							<el-table-column label="节点7" prop="" width="90"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="8" style="margin: 6px;">
						<span style="color: #FFFFFF;margin: 5px;">融合状态预测模型</span>
						<img src="../../../assets/img/modelImage2.png" style="width: 400px;height: 400px;"/>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">某管汇综合评分</span>
						<div id="minfordGauge" style="height: 400px;"></div>
					</el-col>
					<el-col :span="7" style="margin: 6px;">
						<span style="color: #FFFFFF;margin: 5px;">基于多参数的管汇状态综合预测</span>
						<div id="minfordLine" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">历史预测误差统计</span>
						<div id="minfordBar" style="height: 400px;"></div>
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
			this.loadMinfordBar()
			this.loadMinfordGauge()
			this.loadMinfordLine()
		},
		methods:{
			loadMinfordGauge(){
				let mychart = echarts.init(document.getElementById('minfordGauge'))
				let option = {
					series: [{
						type: 'gauge',
						axisLine: {
							lineStyle: {
								width: 30,
								color: [
									[0.3, '#67e0e3'],
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
							fontSize: 20
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
				mychart.setOption(option)
			},
			loadMinfordLine(){
				let mychart = echarts.init(document.getElementById('minfordLine'))
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
			loadMinfordBar(){
				let mychart = echarts.init(document.getElementById('minfordBar'))
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
