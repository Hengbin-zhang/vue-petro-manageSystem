<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;margin-left: 5px;">油井温度异常警报</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"
					value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择油井" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
				<el-row>
					<el-col :span="8" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">油井特征平均值</span>
						<div id="dataAvg" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">平均值异常井位</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="孔隙度" prop="" width="80"></el-table-column>
							<el-table-column label="油层厚度" prop="" width="90"></el-table-column>
							<el-table-column label="油层黏度" prop="" width="90"></el-table-column>
							<el-table-column label="油层温度" prop="" width="90"></el-table-column>
							<el-table-column label="油压值" prop="" width="90"></el-table-column>
							<el-table-column label="储层岩性" prop="" width="90"></el-table-column>
							<el-table-column label="地质倾角" prop="" width="90"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="8" style="margin: 10px;">
						<span style="color: #FFFFFF;margin: 5px;">油井现场图</span>
						<!-- <div id="dataAvg" style="height: 400px;"></div> -->
						<img src="../../../assets/img/hangzhoumap.png" style="width: 360px;height: 500px;" />
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">日志记录表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点编号" prop="" width="120"></el-table-column>
							<el-table-column label="异常次数" prop="" width="120"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="7" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">异常区间显示</span>
						<div id="wellgauge" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">正常井与异常井比较图</span>
						<div id="wellradar" style="height: 400px;"></div>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
	export default {
		data() {
			return {

			}
		},
		mounted() {
			this.loadWellAvg()
			this.loadWellGauge()
			this.loadwellradar()
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
			loadWellGauge() {
				let mychart = echarts.init(document.getElementById('wellgauge'))
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
			loadWellAvg() {
				let mychart = echarts.init(document.getElementById('dataAvg'))
				let option = {
					xAxis: {
						type: 'category',
						data: ['孔隙度', '油层厚度', '油层黏度', '油层温度', '油压值', '储层岩性', '地质倾角']
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
