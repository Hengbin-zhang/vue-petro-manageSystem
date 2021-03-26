<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;">管线数据实时监控</span>
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
			</div>
			<el-row>
				<el-col :span="11" style="margin: 5px;">
					<span style="color: #FFFFFF;margin: 5px;">管线过去12小时平均值</span>
					<el-table style="width: fit-content;" border>
						<el-table-column label="编号" type="index" width="55"></el-table-column>
						<el-table-column label="监测点" prop="" width="80"></el-table-column>
						<el-table-column label="区间1均值" prop="" width="90"></el-table-column>
						<el-table-column label="区间2均值" prop="" width="90"></el-table-column>
						<el-table-column label="区间3均值" prop="" width="90"></el-table-column>
						<el-table-column label="区间4均值" prop="" width="90"></el-table-column>
						<el-table-column label="区间5均值" prop="" width="90"></el-table-column>
						<el-table-column label="区间6均值" prop="" width="90"></el-table-column>
					</el-table>
					<el-row></el-row>
					<br />
					<span style="color: #FFFFFF;margin: 5px;">当前温度异常的管线区段</span>
					<el-table style="width: fit-content;" border>
						<el-table-column label="编号" type="index" width="55"></el-table-column>
						<el-table-column label="监测点" prop="" width="80"></el-table-column>
						<el-table-column label="区间1" prop="" width="90"></el-table-column>
						<el-table-column label="区间2" prop="" width="90"></el-table-column>
						<el-table-column label="区间3" prop="" width="90"></el-table-column>
						<el-table-column label="区间4" prop="" width="90"></el-table-column>
						<el-table-column label="区间5" prop="" width="90"></el-table-column>
						<el-table-column label="区间6" prop="" width="90"></el-table-column>
					</el-table>
				</el-col>
				<el-col :span="12" style="margin: 5px;">
					<span style="color: #FFFFFF;margin: 5px;">风城油田管线分布图(目前是贴图)</span>
					<img src="../../../assets/img/hangzhoumap.png" style="width: 600px;height: 400px;"/>
					<!-- <div id="pipDistri""></div> -->
				</el-col>
				<el-col :span="11">
					<span style="color: #FFFFFF;margin: 5px;">日志记录表</span>
					<el-table style="width: fit-content;" border>
						<el-table-column label="编号" type="index" width="55"></el-table-column>
						<el-table-column label="监测点" prop="" width="80"></el-table-column>
						<el-table-column label="管线编号" prop="" width="90"></el-table-column>
						<el-table-column label="阈值异常次数" prop="" width="130"></el-table-column>
					</el-table>
				</el-col>
				<el-col :span="12">
					<div style="position: relative;">
						<img class="l-img" src="../../../assets/img/left_line.png" />
						<span style="color: #FFFFFF;margin: 5px;position: relative;top: 2%;left: 2%;">xx区段方差波动情况</span>
						<div id="pipLine" style="width: 700px;height: 400px"></div>
						<img class="r-img" src="../../../assets/img/right_line.png"></img>
					</div>
				</el-col>
			</el-row>
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
			this.loadPipLine()
			this.loadPipDistri()
		},
		methods: {
			loadPipDistri() {
				let mychart = echarts.init(document.getElementById('pipDistri'))
				let data = require('../../../../static/json/lines-bus.json');
				var bmap = mychart.getModel().getComponent('bmap').getBMap();
				bmap.addControl(new BMap.MapTypeControl());
				var lines = data.map(function(track) {
					return {
						coords: track.map(function(seg, idx) {
							return seg.coord;
						})
					};
				});
				bmap={
						center: [120.13066322374, 30.240018034923],
						zoom: 14,
						roam: true,
						mapStyle: {
							styleJson: [{
								'featureType': 'water',
								'elementType': 'all',
								'stylers': {
									'color': '#d1d1d1'
								}
							}, {
								'featureType': 'land',
								'elementType': 'all',
								'stylers': {
									'color': '#f3f3f3'
								}
							}, {
								'featureType': 'railway',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'highway',
								'elementType': 'all',
								'stylers': {
									'color': '#fdfdfd'
								}
							}, {
								'featureType': 'highway',
								'elementType': 'labels',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'arterial',
								'elementType': 'geometry',
								'stylers': {
									'color': '#fefefe'
								}
							}, {
								'featureType': 'arterial',
								'elementType': 'geometry.fill',
								'stylers': {
									'color': '#fefefe'
								}
							}, {
								'featureType': 'poi',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'green',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'subway',
								'elementType': 'all',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'manmade',
								'elementType': 'all',
								'stylers': {
									'color': '#d1d1d1'
								}
							}, {
								'featureType': 'local',
								'elementType': 'all',
								'stylers': {
									'color': '#d1d1d1'
								}
							}, {
								'featureType': 'arterial',
								'elementType': 'labels',
								'stylers': {
									'visibility': 'off'
								}
							}, {
								'featureType': 'boundary',
								'elementType': 'all',
								'stylers': {
									'color': '#fefefe'
								}
							}, {
								'featureType': 'building',
								'elementType': 'all',
								'stylers': {
									'color': '#d1d1d1'
								}
							}, {
								'featureType': 'label',
								'elementType': 'labels.text.fill',
								'stylers': {
									'color': '#999999'
								}
							}]
						}
				}
				let option = {
						series: [{
							type: 'lines',
							coordinateSystem: 'bmap',
							data: lines,
							polyline: true,
							lineStyle: {
								color: 'purple',
								opacity: 0.6,
								width: 1
							}
						}]
				}
				mychart.setOption(option)
			},
			loadPipLine() {
				let mychart = echarts.init(document.getElementById('pipLine'))
				let option = {
					xAxis: {
						type: 'category',
						data: ['6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: [150, 230, 224, 218, 135, 147, 260, 218, 135],
						type: 'line'
					}]
				}
				mychart.setOption(option)
			},
		}
	}
</script>

<style>
	.l-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.r-img {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 0;
	}
</style>
