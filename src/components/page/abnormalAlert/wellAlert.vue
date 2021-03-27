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
                <br><br>
                <el-row>
					<el-row>
                        <el-col :span="6" style="margin-top: 10px;">
                        <span class="grid-content bg-purple" style="color: #FFFFFF;margin: 5px;">区块*井*节点*计量线异常温度</span>
                        <span class="grid-content bg-purple" id="temp1" style="height: 250px;width: 380px;"></span>
                        </el-col>

                        <el-col :span="6" style="margin-top: 10px;">
                            <span class="grid-content bg-purple" style="color: #FFFFFF;margin: 5px;left: 90px;position: relative">区块*管线*节点*集油线异常温度</span>
                            <span class="grid-content bg-purple" id="temp2" style="height: 250px;width: 380px;left: 70px;position: relative"></span>

                        </el-col>
                        <el-col :span="6" style="margin-top: 10px;">
                            <span class="grid-content bg-purple" style="color: #FFFFFF;margin: 5px;left: 180px;position: relative">区块*管线*节点*注气线异常温度</span>-->
                            <span class="grid-content bg-purple" id="temp3" style="height: 250px;width: 380px;left: 150px;position: relative"></span>

                        </el-col>
                        <el-col :span="6" style="margin-top: 10px;">
                            <span class="grid-content bg-purple" style="color: #FFFFFF;margin: 5px;left: 250px;position: relative">区块*管汇*节点*注气线异常压力</span>
                            <span class="grid-content bg-purple" id="temp4" style="height: 250px;width: 380px;left: 220px;position: relative"></span>
					    </el-col>
                    </el-row>
                    <br>
                    <br>
                    <el-row>
					    <el-col :span="6" style="margin: 10px;">
                            <span style="color: #FFFFFF;margin: 5px;">油井现场图</span>
                        <img src="../../../assets/img/hangzhoumap.png" style="width:680px;height: 450px;" />
                        </el-col>
<!--                        <el-col :span="6" style="margin: 10px;">-->
<!--                        <img src="../../../assets/img/alert.png" style="width:550px;height: 300px;left: 300px;top:21px; position: relative;" />-->
<!--                        </el-col>-->

                        <el-col :span="6" style="margin: 10px;">
                        <span style="color: #FFFFFF;margin: 5px;left: 400px;position: relative">异常数据可视化</span>
                        <span id="couldsee" style="height: 500px;width: 500px;left: 300px;position: relative"></span>
                        </el-col>
                        <el-col :span="6" style="margin: 10px;">
                        <span style="color: #FFFFFF;margin: 5px;left: 470px;position: relative">正常井与异常井比较图</span>
                        <div id="wellradar" style="height: 400px;left: 470px;position: relative"></div>
                        </el-col>
                    </el-row>
                    <br>
<!--                    <br>-->
                    <br>
                    <el-row style='top:-65px'>
                        <el-col :span="12" style='left:80px;position: relative'>
                            <span style="color: #FFFFFF;margin: 5px;left:-70px;position: relative">日志记录表</span>-->
                            <el-table style="width: fit-content;height: 150px;left:-70px;position: relative" border>
                                <el-table-column label="编号" type="index" width="140"></el-table-column>
                                <el-table-column label="监测点" prop="" width="140"></el-table-column>
                                <el-table-column label="节点编号" prop="" width="140"></el-table-column>
                                <el-table-column label="异常次数" prop="" width="140"></el-table-column>
                            </el-table>
                        </el-col>
                            <el-col :span="10" style="margin: 3px;left: 40px;position: relative">
                            <span style="color: #FFFFFF;margin-top: 50px;">平均值异常井位</span>-->
                            <el-table style="width: fit-content; height: 150px;"border>
                                <el-table-column label="编号" type="index" width="70"></el-table-column>
                                <el-table-column label="孔隙度" prop="" width="90"></el-table-column>
                                <el-table-column label="油层厚度" prop="" width="90"></el-table-column>
                                <el-table-column label="油层黏度" prop="" width="90"></el-table-column>
                                <el-table-column label="油层温度" prop="" width="90"></el-table-column>
                                <el-table-column label="油压值" prop="" width="90"></el-table-column>
                                <el-table-column label="储层岩性" prop="" width="90"></el-table-column>
                                <el-table-column label="地质倾角" prop="" width="90"></el-table-column>
                            </el-table>
				        </el-col>
                    </el-row>
                    <br>
                    <el-row>
				        <el-col :span="8" style="margin: 10px">
                           <span style="color: #FFFFFF;margin: 5px;top:-80px;left:100px;position: relative">异常区间显示</span>
                           <div id="wellgauge" style="height: 400px;top:-120px;left:50px;position: relative"></div>
                           <el-row></el-row>
                           <br/>
                        </el-col>
                        <el-col :span="7" style="margin: 10px">
                           <span style="color: #FFFFFF;margin: 5px;top:-80px;left:230px;position: relative">油井特征平均值</span>
                           <div id="dataAvg" style="height: 300px;top:-80px;left:230px;position: relative"></div>
                        </el-col>

                        <el-col :span="7" style="margin: 10px">
                        <span style="color: #FFFFFF;margin: 5px;top:-80px;left:300px;position: relative">异常分析</span>
                        <div id="pipfunnel" style="height: 350px; top:-80px;left:300px;position: relative"></div>
                         </el-col>
                     </el-row>
                </el-row>
            </div>
		</div>
	</div>
</template>
<script src="https://apip.weatherdt.com/standard/static/js/weather-standard-common.js?v=2.0"></script>
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
            this.loadingtemp1()
            this.loadingtemp2()
            this.loadingtemp3()
            this.loadingtemp4()
            this.loadingsee1()
            this.loadPipFunnel()

		},
		methods: {

            loadwellradar() {
                let mychart = echarts.init(document.getElementById('wellradar'))
                let option = {

                    tooltip: {},
                    legend: {
                        data: ['正常', '异常']
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
            },
            loadingtemp1() {
                let mychart = echarts.init(document.getElementById('temp1'))
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['区块', '井', '节点', '计量线']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: ['14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50'],
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel:{
                        textStyle: {
                            color:'#fff'
                        }
                        }
                    },
                    series: [
                        {
                            name: '区块',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '井',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '节点',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '计量线',
                            type: 'line',
                            stack: '总量',
                            data: [520, 632, 501, 834, 990, 730, 920]
                        }
                    ]
                };
                mychart.setOption(option);
            },
            loadingtemp2() {
                let mychart = echarts.init(document.getElementById('temp2'))
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['区块', '井', '节点', '计量线']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50']
                    },
                    yAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: '区块',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 190, 230, 210]
                        },
                        {
                            name: '井',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 291, 234, 290, 330, 310]
                        },
                        {
                            name: '节点',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 281, 154, 190, 330, 410]
                        },
                        {
                            name: '计量线',
                            type: 'line',
                            stack: '总量',
                            data: [520, 632, 501, 834, 990, 730, 920]
                        }
                    ]
                };
                mychart.setOption(option);
            },
            loadingtemp3() {
                let mychart = echarts.init(document.getElementById('temp3'))
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['区块', '井', '节点', '计量线']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50']
                    },
                    yAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: '区块',
                            type: 'line',
                            stack: '总量',
                            data: [220, 282, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '井',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 290, 230, 210]
                        },
                        {
                            name: '节点',
                            type: 'line',
                            stack: '总量',
                            data: [150, 332, 201, 254, 190, 230, 410]
                        },
                        {
                            name: '计量线',
                            type: 'line',
                            stack: '总量',
                            data: [520, 632, 601, 834, 990, 830, 920]
                        }
                    ]
                };
                mychart.setOption(option);
            },
            loadingtemp4() {
                let mychart = echarts.init(document.getElementById('temp4'))
                let option = {
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['区块', '井', '节点', '计量线']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {

                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['14:44', '14:45', '14:46', '14:47', '14:48', '14:49', '14:50']
                    },
                    yAxis: {
                        axisLabel:{
                            textStyle: {
                                color:'#fff'
                            }
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: '区块',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '井',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '节点',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '计量线',
                            type: 'line',
                            stack: '总量',
                            data: [520, 632, 501, 834, 990, 730, 920]
                        }
                    ]
                };
                mychart.setOption(option);
            },
            loadingsee1() {
                let mychart = echarts.init(document.getElementById('couldsee'))
                let option = {
                    series: [{
                        type: 'gauge',
                        startAngle: 180,
                        endAngle: 0,
                        min: 0,
                        max: 1,
                        splitNumber: 8,
                        radius:130,
                        axisLine: {
                            lineStyle: {
                                width: 6,
                                color: [
                                    [0.25, '#FF6E76'],
                                    [0.5, '#FDDD60'],
                                    [0.75, '#58D9F9'],
                                    [1, '#7CFFB2']
                                ]
                            }
                        },
                        pointer: {
                            icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                            length: '12%',
                            width: 25,
                            offsetCenter: [0, '-60%'],
                            itemStyle: {
                                color: 'auto'
                            }
                        },
                        axisTick: {

                            length: 12,
                            lineStyle: {
                                color: 'auto',
                                width: 4
                            }
                        },
                        splitLine: {
                            length: 20,
                            lineStyle: {
                                color: 'auto',
                                width: 8
                            }
                        },
                        axisLabel: {
                            color: 'auto',
                            fontSize: 20,
                            distance: -60,
                            formatter: function(value) {
                                if (value === 0.875) {
                                    return '优';
                                } else if (value === 0.625) {
                                    return '中';
                                } else if (value === 0.375) {
                                    return '良';
                                } else if (value === 0.125) {
                                    return '差';
                                }
                            }
                        },
                        title: {
                            offsetCenter: [0, '-40%'],
                            fontSize: 15,
                            color:'#fff'
                        },
                        detail: {
                            fontSize: 50,
                            offsetCenter: [0, '0%'],
                            valueAnimation: true,
                            formatter: function(value) {
                                return Math.round(value * 100) + '分';
                            },
                            color: 'auto'
                        },
                        data: [{
                            color:'#fff',
                            value: 0.70,
                            name: '状况评定'
                        }]
                    }]
                };
                mychart.setOption(option);
            },
            loadPipFunnel(){
                let mychart=echarts.init(document.getElementById('pipfunnel'))
                let option={
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
            },
            // loadxinjiang() {
            //     var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
            //
            //     var chartDom = document.getElementById('xinjiang');
            //     var myChart = echarts.init(chartDom);
            //     var option;
            //
            //     myChart.showLoading();
            //     $.get(ROOT_PATH + '../../../assets/mapjson/xianggang.json', function(geoJson) {
            //
            //         myChart.hideLoading();
            //
            //         echarts.registerMap('HK', geoJson);
            //
            //         myChart.setOption(option = {
            //             title: {
            //                 text: '',
            //             },
            //             tooltip: {
            //                 trigger: 'item',
            //                 formatter: '{b}<br/>{c} (p / km2)'
            //             },
            //             toolbox: {
            //                 show: true,
            //                 orient: 'vertical',
            //                 left: 'right',
            //                 top: 'center',
            //                 feature: {
            //                     dataView: { readOnly: false },
            //                     restore: {},
            //                     saveAsImage: {}
            //                 }
            //             },
            //             visualMap: {
            //                 min: 800,
            //                 max: 50000,
            //                 text: ['High', 'Low'],
            //                 realtime: false,
            //                 calculable: true,
            //                 inRange: {
            //                     color: ['lightskyblue', 'yellow', 'orangered']
            //                 }
            //             },
            //             series: [
            //                 {
            //                     name: '香港18区人口密度',
            //                     type: 'map',
            //                     mapType: 'HK', // 自定义扩展图表类型
            //                     label: {
            //                         show: true
            //                     },
            //                     data: [
            //                         { name: '中西区', value: 20057.34 },
            //                         { name: '湾仔', value: 15477.48 },
            //                         { name: '东区', value: 31686.1 },
            //                         { name: '南区', value: 6992.6 },
            //                         { name: '油尖旺', value: 44045.49 },
            //                         { name: '深水埗', value: 40689.64 },
            //                         { name: '九龙城', value: 37659.78 },
            //                         { name: '黄大仙', value: 45180.97 },
            //                         { name: '观塘', value: 55204.26 },
            //                         { name: '葵青', value: 21900.9 },
            //                         { name: '荃湾', value: 4918.26 },
            //                         { name: '屯门', value: 5881.84 },
            //                         { name: '元朗', value: 4178.01 },
            //                         { name: '北区', value: 2227.92 },
            //                         { name: '大埔', value: 2180.98 },
            //                         { name: '沙田', value: 9172.94 },
            //                         { name: '西贡', value: 3368 },
            //                         { name: '离岛', value: 806.98 }
            //                     ],
            //                     // 自定义名称映射
            //                     nameMap: {
            //                         'Central and Western': '中西区',
            //                         'Eastern': '东区',
            //                         'Islands': '离岛',
            //                         'Kowloon City': '九龙城',
            //                         'Kwai Tsing': '葵青',
            //                         'Kwun Tong': '观塘',
            //                         'North': '北区',
            //                         'Sai Kung': '西贡',
            //                         'Sha Tin': '沙田',
            //                         'Sham Shui Po': '深水埗',
            //                         'Southern': '南区',
            //                         'Tai Po': '大埔',
            //                         'Tsuen Wan': '荃湾',
            //                         'Tuen Mun': '屯门',
            //                         'Wan Chai': '湾仔',
            //                         'Wong Tai Sin': '黄大仙',
            //                         'Yau Tsim Mong': '油尖旺',
            //                         'Yuen Long': '元朗'
            //                     }
            //                 }
            //             ]
            //         });
            //     });
            }
    }

</script>

<style>
</style>
