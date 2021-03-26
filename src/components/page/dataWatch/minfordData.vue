<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;">管汇数据实时监控</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"
					value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择管汇节点" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
				<el-row>
					<el-col :span="11" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">管汇过去12小时平均值</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点1均值" prop="" width="90"></el-table-column>
							<el-table-column label="节点2均值" prop="" width="90"></el-table-column>
							<el-table-column label="节点3均值" prop="" width="90"></el-table-column>
							<el-table-column label="节点4均值" prop="" width="90"></el-table-column>
							<el-table-column label="节点5均值" prop="" width="90"></el-table-column>
							<el-table-column label="节点6均值" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">当前温度异常的管汇节点</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点1" prop="" width="90"></el-table-column>
							<el-table-column label="节点2" prop="" width="90"></el-table-column>
							<el-table-column label="节点3" prop="" width="90"></el-table-column>
							<el-table-column label="节点4" prop="" width="90"></el-table-column>
							<el-table-column label="节点5" prop="" width="90"></el-table-column>
							<el-table-column label="节点6" prop="" width="90"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="12" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">风城油田管汇节点分布图</span>
						<div id="minfordDistri" style="width: 600px;height: 400px;"></div>
					</el-col>
					<el-col :span="13" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">异常节点统计</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点1" prop="" width="90"></el-table-column>
							<el-table-column label="节点2" prop="" width="90"></el-table-column>
							<el-table-column label="节点3" prop="" width="90"></el-table-column>
							<el-table-column label="节点4" prop="" width="90"></el-table-column>
							<el-table-column label="节点5" prop="" width="90"></el-table-column>
							<el-table-column label="节点6" prop="" width="90"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="10" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">日志记录表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点编号" prop="" width="90"></el-table-column>
							<el-table-column label="偏离阈值次数" prop="" width="130"></el-table-column>
						</el-table>
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
			return {}
		},
		mounted() {
			this.loadMinDistri()
		},
		methods: {
			loadMinDistri() {
				let mychart = echarts.init(document.getElementById('minfordDistri'))
				let graph = require('../../../../static/json/les-miserable.json')
				graph.nodes.forEach(function(node) {
					node.label = {
						show: node.symbolSize > 30
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
					animationDuration: 1500,
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

			}
		}
	}
</script>

<style>
</style>
