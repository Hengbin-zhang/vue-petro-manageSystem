<template>
	<div>
		<div class="crumbs">
	        <el-breadcrumb separator="/">
	            <el-breadcrumb-item>
	                <span style="color: #FFFFFF;margin-left: 5px;">管汇温度异常警报</span> 
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
					<el-col :span="8" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">历史各测点纵向温度均值</span>
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
						<span style="color: #FFFFFF;margin: 5px;">在阈值区间外监测点报警数</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点编号" prop="" width="120"></el-table-column>
							<el-table-column label="时间" prop="" width="120"></el-table-column>
							<el-table-column label="报警次数" prop="" width="120"></el-table-column>
						</el-table>
					</el-col>
					<el-col :span="8" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">油井现场图</span>
						<!-- <div id="dataAvg" style="height: 400px;"></div> -->
						<img src="../../../assets/img/hangzhoumap.png" style="width: 360px;height: 400px;" />
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">各节点报警正确次数</span>
						<div id="minfordBar" style="height: 400px;"></div>
					</el-col>
					<el-col :span="7" style="margin: 7px;">
						<span style="color: #FFFFFF;margin: 5px;">异常区间显示</span>
						<div id="minfordGauge" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">各种异常占比</span>
						<div id="minfordfunnel" style="height: 400px;"></div>
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
			this.loadMinfordFunnel()
			this.loadMinfordGauge()
		},
		methods:{
			loadMinfordBar(){
				let mychart = echarts.init(document.getElementById('minfordBar'))
				let option = {
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
			loadMinfordFunnel(){
				let mychart = echarts.init(document.getElementById('minfordfunnel'))
				let option = {
					tooltip: {
					    trigger: 'item',
					    formatter: "{a} <br/>{b} : {c}%"
					},
					legend: {
					    data: ['计量线温度','集油线温度','注汽线温度','注汽线压力','待定项']
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
					            {value: 60, name: '注汽线压力'},
					            {value: 40, name: '注汽线温度'},
					            {value: 20, name: '待定项'},
					            {value: 80, name: '集油线温度'},
					            {value: 100, name: '计量线温度'}
					        ]
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
