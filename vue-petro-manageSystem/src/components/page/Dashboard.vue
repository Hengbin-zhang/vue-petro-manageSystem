<template>
	<div>
		<span style="background-color: #FFFFFF;">注：当前点击左侧菜单栏展开会出现控件重叠的bug，以及因为菜单展开和折叠造成的右侧留白的问题，后面会进行修复</span>
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<!-- <div style="font-size: 20px; font-weight: 600; color: #FFFFFF;margin-top: -10px;margin-bottom: 5px;">油井分布</div> -->


			<el-card style="background-color: #13d0b2;margin: 5px;float: left;border:#13d0b2 ;">

				<div style="font-size: 20px;font-weight: 600;color: #FFFFFF;" align="center">油井</div>
				<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
				</el-row>
				<div style="font-size: 1rem; color: #FFFFFF;">
					<div>正常：{{firstCardData.well.normal}}</div>
					<div>异常：{{firstCardData.well.abnormal}}</div>
				</div>
			</el-card>
			<el-card style="background-color: #00ff7f;margin: 5px;float: left;border: #00ff7f;">
				<div style="font-size: 20px;font-weight: 600;color: #FFFFFF;" align="center">管线</div>
				<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
				</el-row>
				<div style="font-size: 1rem; color: #FFFFFF;">
					<div>正常：{{firstCardData.pipeline.normal}}</div>
					<div>异常：{{firstCardData.pipeline.abnormal}}</div>
				</div>
			</el-card>
			<el-card style="background-color: #ffaa00;margin: 5px;float: left;border: #ffaa00;">
				<div style="font-size: 20px;font-weight: 600;color: #FFFFFF;" align="center">管汇</div>
				<el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
				</el-row>
				<div style="font-size: 1rem; color: #FFFFFF;">
					<div>正常：{{firstCardData.maniford.normal}}</div>
					<div>异常：{{firstCardData.maniford.abnormal}}</div>
				</div>
			</el-card>
			<el-row>
				<el-col :span="12">
					<!-- <div id="map"></div> -->
					<div id="reasonTree" style="width: 500px;height: 300px;"></div>
				</el-col>
			</el-row>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<el-card ref="card3" class="card" style="float: left;min-height: 500px;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div style="font-size: 20px; font-weight: 600; color: #FFFFFF;margin-top: -10px;margin-bottom: 5px;">
				统计信息</div>
			<el-form :inline="true">
				<el-form-item style="width: fit-content;">
					<el-date-picker style="width: 280px;" type="daterange" start-placeholder="起始时间"
						end-placeholder="结束时间" value-format="yyyy-MM-dd" format="yyyy年MM月dd日"
						v-model="searchForm.dateRange"></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-select style="float:left;" placeholder="请选择种类" v-model="searchForm.type">
						<el-option v-for="item in option" :label="item.label" :value="item.value"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button style="background-color: #053a98;color: #ffffff;border:#053a98;padding: 11px;"
						icon="el-icon-search" @click="search">查询</el-button>
				</el-form-item>
				<el-table class="table" style="width: 560px;" :data="test" :highlight-current-row="false" border
					max-height="450px">
					<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
					<el-table-column v-for="item in tableProp" :label="item.label" :prop="item.prop" align="center">
					</el-table-column>
				</el-table>
			</el-form>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<br />
		<!-- 油井实时温度 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="wellTempline" style="width:24.5rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24.5rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<!-- 管线实时温度 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="pipTempline" style="width: 24.5rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24.5rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<!-- 管汇实时温度 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="minfordTempline" style="width: 24rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<!-- 油井实时工况 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="wellConditionline" style="width: 24.5rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24.5rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<!-- 管线实时工况 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="pipConditionline" style="width: 24.5rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24.5rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<!-- 管汇实时工况 -->
		<el-card class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="minfordConditionline" style="width: 24rem;height: 341px;margin: 5px;"></div>
			<br />
			<el-table style="width: 24rem;" :data="wellTempData" class="table" border max-height="450px">
				<el-table-column label="编号" type="index" align="center" width="60"></el-table-column>
				<el-table-column v-for="item in welltempHeader" :label="item.label" :prop="item.prop"
					:width="item.width"></el-table-column>
			</el-table>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<el-card ref="card4" class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="normalreasonTree" style="width: 630px;height: 300px;"></div>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
		<el-card ref="card4" class="card" style="float: left;">
			<img class="l-img" src="../../assets/img/left_line.png" />
			<div id="abnormalreasonTree" style="width: 630px;height: 300px;"></div>
			<img class="r-img" src="../../assets/img/right_line.png" />
		</el-card>
	</div>
</template>

<script>
	import Schart from 'vue-schart';
	import bus from '../common/bus';
	// import xinjiang from "../../assets/map/xinjiang.js";
	import * as echarts from 'echarts';
	const xinjiangJson = require('../../assets/mapjson/xinjiang.json')
	export default {
		name: 'dashboard',
		data() {
			return {
				searchForm: {
					dateRange: [],
					type: ''
				},
				wellTempData: [{
					'11:00': 56,
					'11:01': 57,
					'11:02': 55,
					'11:03': 54,
					'11:04': 56,
					'11:05': 55,
					'11:06': 55,
					'11:07': 56
				}],
				welltempHeader: [{
						label: '11:00',
						prop: '11:00',
						width: ''
					},
					{
						label: '11:01',
						prop: '11:01',
						width: ''
					},
					{
						label: '11:02',
						prop: '11:02',
						width: ''
					},
					{
						label: '11:03',
						prop: '11:03',
						width: ''
					},
					{
						label: '11:04',
						prop: '11:04',
						width: ''
					},
					{
						label: '11:05',
						prop: '11:05',
						width: ''
					},
					{
						label: '11:06',
						prop: '11:06',
						width: ''
					},
					{
						label: '11:07',
						prop: '11:07',
						width: ''
					}
				],
				tableProp: [{
						label: '井编号',
						prop: 'index'
					},
					{
						label: '注汽线温度',
						prop: 'tempOne'
					},
					{
						label: '集油线温度',
						prop: 'tempTwo'
					},
					{
						label: '计量线温度',
						prop: 'tempThree'
					},
					{
						label: '注汽线压力',
						prop: 'pressure'
					}
				],

				firstCardData: {
					well: {
						normal: 198,
						abnormal: 12
					},
					pipeline: {
						normal: 202,
						abnormal: 8
					},
					maniford: {
						normal: 195,
						abnormal: 15
					}
				},
				option: [{
						label: '油井',
						value: '油井'
					},
					{
						label: '管线',
						value: '管线'
					},
					{
						label: '管汇',
						value: '管汇'
					}
				],
				reasonTreeData: [{
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
				}],
				test: [{
						index: 'xp0001',
						tempOne: '50',
						tempTwo: '40',
						tempThree: '46',
						pressure: '1.05'
					},
					{
						index: 'xp0002',
						tempOne: '54',
						tempTwo: '40',
						tempThree: '43',
						pressure: '1.05'
					},
					{
						index: 'xp0003',
						tempOne: '52',
						tempTwo: '40',
						tempThree: '45',
						pressure: '1.05'
					}
				],
				wellTemp: [
					['11:00', '11:01', '11:02', '11:03', '11:04', '11:05', '11:06', '11:07'],
					[56, 57, 55, 54, 56, 55, 55, 56]
				]
			};
		},
		components: {
			Schart
		},
		computed: {
			role() {
				return this.name === 'admin' ? '超级管理员' : '普通用户';
			}
		},
		mounted() {
			this.loadReasonTree()
			this.loadNormalTree()
			this.loadAbnormalTree()
			this.loadWellLine()
			this.loadPipLine()
			this.loadMinLine()
			this.loadWellConditionLine()
			this.loadPipConditionLine()
			this.loadMinfordConditionLine()
			// this.notice()
			// this.loadMap()
		},
		created() {
			this.handleListener();
			this.changeDate();
		},
		activated() {
			this.handleListener();
		},
		deactivated() {
			window.removeEventListener('resize', this.renderChart);
			bus.$off('collapse', this.handleBus);
		},
		methods: {
			search() {
				this.$message.success('进行了查询')
			},
			notice() {
				console.log('load completed')
			},
			changeDate() {
				const now = new Date().getTime();
				this.data.forEach((item, index) => {
					const date = new Date(now - (6 - index) * 86400000);
					item.name = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
				});
			},
			loadWellConditionLine(){
				let myChart = echarts.init(document.getElementById('wellConditionline'))
				let option = {
					title: {
						text: 'xx油井实时工况',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadPipConditionLine(){
				let myChart = echarts.init(document.getElementById('pipConditionline'))
				let option = {
					title: {
						text: 'xx管线实时工况',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadMinfordConditionLine(){
				let myChart = echarts.init(document.getElementById('minfordConditionline'))
				let option = {
					title: {
						text: 'xx管汇实时工况',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadMinLine() {
				let myChart = echarts.init(document.getElementById('minfordTempline'))
				let option = {
					title: {
						text: 'xx管汇实时温度',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadPipLine() {
				let myChart = echarts.init(document.getElementById('pipTempline'))
				let option = {
					title: {
						text: 'xx管线实时温度',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadWellLine() {
				let myChart = echarts.init(document.getElementById('wellTempline'))
				let option = {
					title: {
						text: 'xx油井实时温度',
						left: 'left',
						textStyle: {
							fontSize: 18,
							color: '#ffffff',
						}
					},
					xAxis: {
						type: 'category',
						data: this.wellTemp[0]
					},
					yAxis: {
						type: 'value'
					},
					series: [{
						data: this.wellTemp[1],
						type: 'line',
						smooth: true
					}]
				}
				myChart.setOption(option)
			},
			loadNormalTree(){
				var myChart = echarts.init(document.getElementById('normalreasonTree'));
				var option = {
					title: {
						text: '正常工况井分析图',
						left: 'left',
						textStyle: {
							fontSize: 20,
							color: '#ffffff',
						}
					},
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: this.reasonTreeData,
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
				myChart.setOption(option)
			},
			loadAbnormalTree(){
				var myChart = echarts.init(document.getElementById('abnormalreasonTree'));
				var option = {
					title: {
						text: '异常工况井分析图',
						left: 'left',
						textStyle: {
							fontSize: 20,
							color: '#ffffff',
						}
					},
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: this.reasonTreeData,
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
				myChart.setOption(option)
			},
			loadReasonTree() {
				var myChart = echarts.init(document.getElementById('reasonTree'));
				var option = {
					title: {
						text: '致因分析树状图',
						left: 'left',
						textStyle: {
							fontSize: 20,
							color: '#ffffff',
						}
					},
					tooltip: {
						trigger: 'item',
						triggerOn: 'mousemove'
					},
					series: [{
						type: 'tree',
						data: this.reasonTreeData,
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
				myChart.setOption(option)
			},
			handleListener() {
				bus.$on('collapse', this.handleBus);
				// 调用renderChart方法对图表进行重新渲染
				window.addEventListener('resize', this.renderChart);
			},
			handleBus(msg) {
				setTimeout(() => {
					this.renderChart();
				}, 200);
			},
			renderChart() {
				this.$refs.bar.renderChart();
				this.$refs.line.renderChart();
				this.$refs.tree.renderChart();
			}
		}
	};
</script>


<style scoped>
	.l-img {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 0;
	}

	.firstSpan {
		font-size: 16px;
		color: #FFFFFF;
		margin-left: 15px;
	}

	.table {
		position: relative;
		top: 0;
		left: 0;
		z-index: 1;
		border: #053a98 1px solid !important;
	}

	.r-img {
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 0;
	}

	.card {
		display: inline-block;
		position: relative;
		margin: 10px;
		/* width: 42.5rem; */
		height: fit-content;
		min-height: 200px;
		/* 单独底色 */
		/* background-color: #0f2a44; */
		/* 大屏底色 */
		background-color: #0c2034;
		border: #00007f;
		font-size: 12px;
		overflow: hidden;
	}

	.el-row {
		margin-bottom: 20px;
	}

	.grid-content {
		display: flex;
		align-items: center;
		height: 100px;
	}

	.grid-cont-right {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #999;
	}

	.grid-num {
		font-size: 30px;
		font-weight: bold;
	}

	.grid-con-icon {
		font-size: 50px;
		width: 100px;
		height: 100px;
		text-align: center;
		line-height: 100px;
		color: #fff;
	}

	.grid-con-1 .grid-con-icon {
		background: rgb(45, 140, 240);
	}

	.grid-con-1 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-2 .grid-con-icon {
		background: rgb(100, 213, 114);
	}

	.grid-con-2 .grid-num {
		color: rgb(45, 140, 240);
	}

	.grid-con-3 .grid-con-icon {
		background: rgb(242, 94, 67);
	}

	.grid-con-3 .grid-num {
		color: rgb(242, 94, 67);
	}

	.user-info {
		display: flex;
		align-items: center;
		padding-bottom: 20px;
		border-bottom: 2px solid #ccc;
		margin-bottom: 20px;
	}

	.user-avator {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.user-info-cont {
		padding-left: 50px;
		flex: 1;
		font-size: 14px;
		color: #999;
	}

	.user-info-cont div:first-child {
		font-size: 30px;
		color: #222;
	}

	.user-info-list {
		font-size: 14px;
		color: #999;
		line-height: 25px;
	}

	.user-info-list span {
		margin-left: 70px;
	}

	.mgb20 {
		margin-bottom: 20px;
	}

	.todo-item {
		font-size: 14px;
	}

	.todo-item-del {
		text-decoration: line-through;
		color: #999;
	}

	.schart {
		width: 100%;
		height: 300px;
	}
</style>
