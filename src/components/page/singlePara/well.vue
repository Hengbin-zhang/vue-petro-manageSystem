<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="margin-left: 5px;">油井单参数分析</span>
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
					<el-col :span="5" class='colunm-style'>
						<span class='font-style'>区块*井*节点*计量线温度——预测</span>
						<div id="historyData" class='chart-style' style="height: 200px;"></div>
                        <span class='font-style' >区块*管线*节点*集油线温度——预测</span>
                        <div id="predictData" class='chart-style'  style="height: 200px;"></div>
					</el-col>
					<el-col :span="8" class='img-style'>
						<img src="../../../assets/img/图片1.png" style="width: 490px;height: 380px;"/>
					</el-col>
                    <el-col :span='5' class='right-table-container-style'>
                        <p class='table-title-style'>
                            <span >管汇温度数据显示表</span>
                        </p>
                        <el-table class='table-content-style' border>
                            <el-table-column label="区段1" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段2" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段3" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段4" prop="" min-width='60%' ></el-table-column>
                        </el-table>
                        <p class='table-title-style'>
                            <span >井特征数据显示表</span>
                        </p>
                        <el-table class='table-content-style' border>
                            <el-table-column label="区段1" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段2" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段3" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段4" prop="" min-width='60%' ></el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span='5' class='right-table-container-style'>
                        <p class='table-title-style'>
                            <span >管线温度数据显示表</span>
                        </p>
                        <el-table class='table-content-style' border>
                            <el-table-column label="区段1" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段2" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段3" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段4" prop="" min-width='60%' ></el-table-column>
                        </el-table>
                        <p class='table-title-style'>
                            <span >管线温度数据显示表</span>
                        </p>
                        <el-table class='table-content-style' border>
                            <el-table-column label="区段1" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段2" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段3" prop="" min-width='60%' ></el-table-column>
                            <el-table-column label="区段4" prop="" min-width='60%' ></el-table-column>
                        </el-table>
                    </el-col>
				</el-row>
                <el-row>
                    <el-col :span="5"  class='colunm-style'>
                        <span class='font-style' >区块*管线*节点*注气线温度——预测</span>
                        <div id="lineChartData" class='chart-style'  style="height: 200px;"></div>
                        <span class='font-style' >区块*管汇*节点*注气线压力——预测</span>
                        <div id="MutilChartContainer" class='chart-style'  style="height: 200px;"></div>
                    </el-col>
                    <el-col :span="8" class='img-style'>
                        <p style="margin: 5px;width:100%;text-align: center">深度预测模型</p>
                        <img src="../../../assets/img/bottom-center.png" style="margin:0 10px;width: 430px;height: 330px;"/>
                    </el-col>
                      <el-col :span="5" class='right-container-style bottom-right-style'>
                          <span style="margin: 5px;">预测分析</span>
                          <div id="RightChartContainer" class='chart-style'  style="height: 220px;"></div>
                          <span style="margin: 5px;">预测误差统计</span>
                          <div id="BarChartContainer" class='chart-style'   style="height: 180px;"></div>
                      </el-col>

                      <el-col :span="5" class='right-container-style bottom-right-style'>
                          <div id="StockChartContainer" class='chart-style'  style="height: 220px;"></div>
                          <span style="margin: 5px;">残差分析</span>
                          <div id="ScatterChartContainer" class='chart-style'  style="height: 220px;"></div>
                      </el-col>
                </el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import * as echarts from 'echarts';
    import { G2, Line ,Column ,Scatter,Stock } from '@antv/g2plot';
    import {predictData,ScatterData } from '@/assets/wellSinpara.json'
	export default{
		data(){
			return{

			}
		},
		mounted() {
			this.loadPredictionData('historyData')
            this.loadPredictionData('lineChartData')
            this.loadMultipleData()
            this.loadBasicChart()
            this.loadScrollBar()
            this.loadScatterChart()
            this.loadRightLineChart()
            this.loadStockChart()
			// this.loadPredictData()
		},
		methods:{
		    loadStockChart(){

                const data = [
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-13',
                        close: 2887.4265,
                        open: 2804.2322,
                        high: 2910.8812,
                        low: 2799.9841,
                        vol: 366450436,
                        amount: 393019665.2,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-12',
                        close: 2923.4856,
                        open: 2936.0163,
                        high: 2944.4651,
                        low: 2906.2838,
                        vol: 307778457,
                        amount: 328209202.4,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-11',
                        close: 2968.5174,
                        open: 3001.7616,
                        high: 3010.0286,
                        low: 2968.5174,
                        vol: 352470970,
                        amount: 378766619,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-10',
                        close: 2996.7618,
                        open: 2918.9347,
                        high: 3000.2963,
                        low: 2904.7989,
                        vol: 393296648,
                        amount: 425017184.8,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-09',
                        close: 2943.2907,
                        open: 2987.1805,
                        high: 2989.2051,
                        low: 2940.7138,
                        vol: 414560736,
                        amount: 438143854.6,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-06',
                        close: 3034.5113,
                        open: 3039.9395,
                        high: 3052.4439,
                        low: 3029.4632,
                        vol: 362061533,
                        amount: 377388542.7,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-05',
                        close: 3071.6771,
                        open: 3036.1545,
                        high: 3074.2571,
                        low: 3022.9262,
                        vol: 445425806,
                        amount: 482770471.4,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-04',
                        close: 3011.6657,
                        open: 2981.806,
                        high: 3012.0035,
                        low: 2974.3583,
                        vol: 353338278,
                        amount: 389893917.5,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-03',
                        close: 2992.8968,
                        open: 3006.8888,
                        high: 3026.842,
                        low: 2976.623,
                        vol: 410108047,
                        amount: 447053681.5,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-03-02',
                        close: 2970.9312,
                        open: 2899.31,
                        high: 2982.5068,
                        low: 2899.31,
                        vol: 367333369,
                        amount: 397244201.2,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-28',
                        close: 2880.3038,
                        open: 2924.6407,
                        high: 2948.1261,
                        low: 2878.5443,
                        vol: 401216914,
                        amount: 432657775,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-27',
                        close: 2991.3288,
                        open: 2992.4919,
                        high: 3009.4575,
                        low: 2980.4774,
                        vol: 350523658,
                        amount: 395955641.5,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-26',
                        close: 2987.9287,
                        open: 2978.4195,
                        high: 3028.7788,
                        low: 2974.9423,
                        vol: 469049552,
                        amount: 495341447.3,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-25',
                        close: 3013.0501,
                        open: 2982.0696,
                        high: 3016.9458,
                        low: 2943.7168,
                        vol: 441622762,
                        amount: 513128644.6,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-24',
                        close: 3031.2333,
                        open: 3027.8925,
                        high: 3042.1821,
                        low: 3007.3557,
                        vol: 370430044,
                        amount: 451601363.1,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-21',
                        close: 3039.6692,
                        open: 3022.2455,
                        high: 3058.898,
                        low: 3020.141,
                        vol: 364557276,
                        amount: 445062076.7,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-20',
                        close: 3030.1542,
                        open: 2981.8802,
                        high: 3031.3706,
                        low: 2968.4451,
                        vol: 345732881,
                        amount: 413761364.1,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-19',
                        close: 2975.4019,
                        open: 2979.5223,
                        high: 2998.2718,
                        low: 2971.8219,
                        vol: 315141151,
                        amount: 381331160.4,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-18',
                        close: 2984.9716,
                        open: 2981.4097,
                        high: 2990.6003,
                        low: 2960.7751,
                        vol: 311665913,
                        amount: 374998562.6,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-17',
                        close: 2983.6224,
                        open: 2924.9913,
                        high: 2983.6371,
                        low: 2924.9913,
                        vol: 313198007,
                        amount: 367014340.1,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-14',
                        close: 2917.0077,
                        open: 2899.8659,
                        high: 2926.9427,
                        low: 2899.5739,
                        vol: 250650627,
                        amount: 308080368.7,
                    },
                    {
                        ts_code: '000001.SH',
                        trade_date: '2020-02-13',
                        close: 2906.0735,
                        open: 2927.1443,
                        high: 2935.406,
                        low: 2901.2425,
                        vol: 274804844,
                        amount: 334526327.4,
                    },
                ];

                const stockPlot = new Stock('StockChartContainer', {
                    width: 400,
                    height: 500,
                    data: data,
                    xField: 'trade_date',
                    yField: ['open', 'close', 'high', 'low'],
                });

                stockPlot.render();
            }
		    ,
		    loadRightLineChart(){
                fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
                    .then((res) => res.json())
                    .then((data) => {
                        const line = new Line('RightChartContainer', {
                            data,
                            padding: 'auto',
                            xField: 'Date',
                            yField: 'scales',
                            xAxis: {
                                type: 'timeCat',
                                tickCount: 5,
                            },
                        });

                        line.render();
                    });
            },
		    loadScatterChart(){

                        const scatterPlot = new Scatter('ScatterChartContainer', {
                            appendPadding: 30,
                            data:ScatterData,
                            xField: 'xG conceded',
                            yField: 'Shot conceded',
                            colorField: 'Result',
                            size: 5,
                            shape: 'circle',
                            pointStyle: {
                                fillOpacity: 1,
                            },
                            yAxis: {
                                nice: true,
                                line: {
                                    style: {
                                        stroke: '#aaa',
                                    },
                                },
                            },
                            xAxis: {
                                grid: {
                                    line: {
                                        style: {
                                            stroke: '#eee',
                                        },
                                    },
                                },
                                line: {
                                    style: {
                                        stroke: '#aaa',
                                    },
                                },
                            },
                            label: {},
                        });
                        scatterPlot.render();

            }
		    ,
            loadMultipleData(){

                fetch('https://gw.alipayobjects.com/os/bmw-prod/c48dbbb1-fccf-4a46-b68f-a3ddb4908b68.json')
                    .then((res) => res.json())
                    .then((data) => {
                        const line = new Line('MutilChartContainer', {
                            data,
                            xField: 'date',
                            yField: 'value',
                            yAxis: {
                                label: {
                                    // 数值格式化为千分位
                                    formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
                                },
                            },
                            seriesField: 'type',
                            color: ({ type }) => {
                                return type === 'register' ? '#F4664A' : type === 'download' ? '#30BF78' : '#FAAD14';
                            },
                            lineStyle: ({ type }) => {
                                if (type === 'register') {
                                    return {
                                        lineDash: [4, 4],
                                        opacity: 1,
                                    };
                                }
                                return {
                                    opacity: 0.5,
                                };
                            },
                        });

                        line.render();
                    });
            },
		    loadBasicChart(){


                fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
                    .then((res) => res.json())
                    .then((data) => {
                        const line = new Line('predictData', {
                            data,
                            padding: 'auto',
                            xField: 'Date',
                            yField: 'scales',
                            xAxis: {
                                tickCount: 5,
                            },
                            slider: {
                                start: 0.1,
                                end: 0.5,
                            },
                        });

                        line.render();
                    });


            },
		    loadScrollBar(){
                fetch('https://gw.alipayobjects.com/os/bmw-prod/be63e0a2-d2be-4c45-97fd-c00f752a66d4.json')
                    .then((res) => res.json())
                    .then((data) => {
                        const column = new Column('BarChartContainer', {
                            data,
                            xField: '城市',
                            yField: '销售额',
                            xAxis: {
                                label: {
                                    autoRotate: false,
                                },
                            },
                            scrollbar: {
                                type: 'horizontal',
                            },
                        });

                        column.render();
                    });
            },

		    loadPredictionData(domID){
                G2.registerShape('point', 'breath-point', {
                    draw(cfg, container) {
                        const data = cfg.data;
                        const point = { x: cfg.x, y: cfg.y };
                        const group = container.addGroup();
                        if (data.time === '14.20' && data.date === 'today') {
                            const decorator1 = group.addShape('circle', {
                                attrs: {
                                    x: point.x,
                                    y: point.y,
                                    r: 10,
                                    fill: cfg.color,
                                    opacity: 0.5,
                                },
                            });
                            const decorator2 = group.addShape('circle', {
                                attrs: {
                                    x: point.x,
                                    y: point.y,
                                    r: 10,
                                    fill: cfg.color,
                                    opacity: 0.5,
                                },
                            });
                            const decorator3 = group.addShape('circle', {
                                attrs: {
                                    x: point.x,
                                    y: point.y,
                                    r: 10,
                                    fill: cfg.color,
                                    opacity: 0.5,
                                },
                            });
                            decorator1.animate(
                                {
                                    r: 20,
                                    opacity: 0,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                }
                            );
                            decorator2.animate(
                                {
                                    r: 20,
                                    opacity: 0,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                    delay: 600,
                                }
                            );
                            decorator3.animate(
                                {
                                    r: 20,
                                    opacity: 0,
                                },
                                {
                                    duration: 1800,
                                    easing: 'easeLinear',
                                    repeat: true,
                                    delay: 1200,
                                }
                            );
                            group.addShape('circle', {
                                attrs: {
                                    x: point.x,
                                    y: point.y,
                                    r: 6,
                                    fill: cfg.color,
                                    opacity: 0.7,
                                },
                            });
                            group.addShape('circle', {
                                attrs: {
                                    x: point.x,
                                    y: point.y,
                                    r: 1.5,
                                    fill: cfg.color,
                                },
                            });
                        }

                        return group;
                    },
                });

                (()=>{
                    console.log(predictData);
                    const plot = new Line(domID, {
                        autoFit: true,
                        height: 500,
                        data:predictData,
                        meta: {
                            number: {
                                time: { type: 'cat' },
                                max: 400,
                                min: 0,
                            },
                        },
                        xField: 'time',
                        yField: 'number',
                        seriesField: 'kind',
                        tooltip: { showMarkers: false },
                        point: {
                            // shape: 'breath-point',
                            shape:'diamond',
                            size:5,
                            style: {
                                fill: 'white',
                                stroke: '#5B8FF9',
                                lineWidth: 2,
                            },
                        },
                        smooth:true
                    });

                    plot.render();
                })()
            },
			loadHistoryData(){
				// let mychart = echarts.init(document.getElementById('historyData'))
				// let option = {
				// 	    tooltip: {
				// 	        trigger: 'axis'
				// 	    },
				// 	    legend: {
				// 	        data: ['孔隙度', '油层厚度', '油层温度', '油层黏度', '地质倾角']
				// 	    },
				// 	    grid: {
				// 	        left: '3%',
				// 	        right: '4%',
				// 	        bottom: '3%',
				// 	        containLabel: true
				// 	    },
				// 	    xAxis: {
				// 	        type: 'category',
				// 	        boundaryGap: false,
				// 	        data: ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00']
				// 	    },
				// 	    yAxis: {
				// 	        type: 'value'
				// 	    },
				// 	    series: [
				// 	        {
				// 	            name: '孔隙度',
				// 	            type: 'line',
				// 	            stack: '总量',
				// 	            data: [120, 132, 101, 134, 90, 230, 210],
				// 				smooth: true
				// 	        },
				// 	        {
				// 	            name: '油层厚度',
				// 	            type: 'line',
				// 	            stack: '总量',
				// 	            data: [220, 182, 191, 234, 290, 330, 310],
				// 				smooth: true
				// 	        },
				// 	        {
				// 	            name: '油层温度',
				// 	            type: 'line',
				// 	            stack: '总量',
				// 	            data: [150, 232, 201, 154, 190, 330, 410],
				// 				smooth: true
				// 	        },
				// 	        {
				// 	            name: '油层黏度',
				// 	            type: 'line',
				// 	            stack: '总量',
				// 	            data: [320, 332, 301, 334, 390, 330, 320],
				// 				smooth: true
				// 	        },
				// 	        {
				// 	            name: '地质倾角',
				// 	            type: 'line',
				// 	            stack: '总量',
				// 	            data: [820, 932, 901, 934, 1290, 1330, 1320],
				// 				smooth: true
				// 	        }
				// 	    ]
				// }
				// mychart.setOption(option)
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

<style scoped>
.font-style{
    font-size: 10px;
    margin:5px;
}
.colunm-style{
    margin:0 -30px;
}
.img-style{
    transform: translate(10%,20%);
}
.right-container-style{
    transform: translate(35%,0);
}
.right-table-container-style{
    transform: translate(60%,0);
}
.bottom-right-style{
    margin:10px 10px;
}
.chart-style{
    padding:10px 0;
}
.table-title-style{
    width:100%;
    text-align: center;
}
.table-title-style span{
    color:#fff;
    background:#4472C4;
    width:80%;
    display: inline-block;
}
.table-content-style{
    width:fit-content;
    margin:20px 0;
}
</style>
