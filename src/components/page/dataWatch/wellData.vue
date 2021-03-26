<template>
	<div>
		<div class="crumbs">
	        <el-breadcrumb separator="/">
	            <el-breadcrumb-item>
	                <span style="color: #FFFFFF;">油井数据实时监控</span> 
	            </el-breadcrumb-item>
	        </el-breadcrumb>
	    </div>
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择油井" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
				<el-row>
					<el-col :span="11" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据显示表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="孔隙度" prop="" width="80"></el-table-column>
							<el-table-column label="原油黏度" prop="" width="90"></el-table-column>
							<el-table-column label="油层厚度" prop="" width="90"></el-table-column>
							<el-table-column label="油层温度" prop="" width="90"></el-table-column>
							<el-table-column label="油压值" prop="" width="90"></el-table-column>
							<el-table-column label="储层岩性" prop="" width="90"></el-table-column>
							<el-table-column label="地质倾角" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据可视化</span>
						<div id="wellBar" style="width: 550px; height: 300px;"></div>
					</el-col>
					<el-col :span="12" style="margin: 5px">
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据方差表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="孔隙度" prop="" width="80"></el-table-column>
							<el-table-column label="原油黏度" prop="" width="90"></el-table-column>
							<el-table-column label="油层厚度" prop="" width="90"></el-table-column>
							<el-table-column label="油层温度" prop="" width="90"></el-table-column>
							<el-table-column label="油压值" prop="" width="90"></el-table-column>
							<el-table-column label="储层岩性" prop="" width="90"></el-table-column>
							<el-table-column label="地质倾角" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据平均值</span>
						<div id="wellBarAvg" style="width: 550px;height: 300px;"></div>
						
					</el-col>
					<el-col :span="11" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据众数</span>
						<div id="wellBarMode" style="width: 550px;height: 300px;"></div>
						<!-- <span style="color: #FFFFFF;margin: 5px;">油井特征数据方差表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="孔隙度" prop="" width="80"></el-table-column>
							<el-table-column label="原油黏度" prop="" width="90"></el-table-column>
							<el-table-column label="油层厚度" prop="" width="90"></el-table-column>
							<el-table-column label="油层温度" prop="" width="90"></el-table-column>
							<el-table-column label="油压值" prop="" width="90"></el-table-column>
							<el-table-column label="储层岩性" prop="" width="90"></el-table-column>
							<el-table-column label="地质倾角" prop="" width="90"></el-table-column>
						</el-table> -->
					</el-col>
					<el-col :span="12" style="margin: 5px;">
						<span style="color: #FFFFFF;margin: 5px;">方差大于阈值井分布图(目前是贴图)</span>
						<img src="../../../assets/img/hangzhoumap.png" style="width: 550px;height: 300px;" />
						<!-- <div style="width: 550px;height: 300px;background-color: #ff557f;"></div> -->
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
			this.loadWellBar()
			this.loadWellBarAvg()
			this.loadWellBarMode()
		},
		methods:{
			loadWellBar(){
				let mychart=echarts.init(document.getElementById('wellBar'))
				let option={
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
			loadWellBarAvg(){
				let mychart=echarts.init(document.getElementById('wellBarAvg'))
				let option={
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
			loadWellBarMode(){
				let mychart=echarts.init(document.getElementById('wellBarMode'))
				let option={
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
		}
	}
</script>

<style>
</style>
