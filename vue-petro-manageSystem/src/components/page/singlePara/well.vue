<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;margin-left: 5px;">油井单参数分析</span>
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
					<el-col :span="11" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">单井参数历史数据</span>
						<div id="historyData" style="height: 400px;"></div>
					</el-col>
					<el-col :span="12" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">实时预测模型（贴图）</span>
						<img src="../../../assets/img/modelImage.png" style="width: 500px;height: 400px;"/>
						<el-row></el-row>
						<br />
						
					</el-col>
					<el-col :span="11" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">单井预测趋势显示</span>
						<div id="predictData" style="height: 400px;"></div>
					</el-col>
					<el-col :span="12" style="margin: 6px;">
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
			this.loadHistoryData()
			this.loadPredictData()
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
			loadPredictData(){
				let mychart = echarts.init(document.getElementById('predictData'))
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
			}
		}
	}
</script>

<style>
</style>
