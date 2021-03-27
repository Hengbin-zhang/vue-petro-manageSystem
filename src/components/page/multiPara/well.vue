<template>
	<div>
		<div class="crumbs">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item>
					<span style="color: #FFFFFF;margin-left: 5px;">油井多参数分析</span>
				</el-breadcrumb-item>
			</el-breadcrumb>
      <el-card style="background-color: #13d0b2;margin: 5px;float: left;border:#13d0b2 ;">
        <div style="font-size: 20px;font-weight: 600;color: #FFFFFF;" align="center">油井</div>
        <el-row style="height: 1px;background-color: #000000;margin-top: 5px;margin-bottom: 5px;">
        </el-row>
        <div style="font-size: 1rem; color: #FFFFFF;">
          <div>正常：{{firstCardData.well.normal}}</div>
          <div>异常：{{firstCardData.well.abnormal}}</div>
        </div>
      </el-card>
		</div>
<!--搜索框-->
		<div class="container">
			<div class="handle-box">
				<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间"
					value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
				<el-select placeholder="请选择油井" style="margin: 5px;">
					<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
				</el-select>
				<el-button icon="el-icon-search" type="primary">搜索</el-button>
      </div>
    </div>
<!-- -->
    <div class="container">
      <div class="handle-box">
        <el-row>
					<el-col :span="7" style="margin: 6px;">
<!--						<span style="color: #FFFFFF;margin: 5px;">融合状态预测模型</span>-->
<!--						<img src="../../../assets/img/modelImage2.png" style="width: 400px;height: 400px;"/>-->
<!--						<el-row></el-row>-->
            <span style="color: #FFFFFF;margin: 5px;">多参数综合分析</span>
            <div id="wellMult" style="height: 400px;"></div>

						<br />
						<span style="color: #FFFFFF;margin: 5px;">综合状态评估</span>
						<div id="wellGauge" style="height: 400px;"></div>

<!--            <br/>-->

					</el-col>


          <el-col :span="10" style="margin: 6px;">
            <span style="color: #FFFFFF;margin: 5px;">  </span>
            <img src="../../../assets/img/mult2.png" style="width: 500px;height: 800px;"/>
<!--            <div id="bigMap" style="height: 600px;"></div>-->
          </el-col>

					<el-col :span="6" style="margin: 6px;">
						<span style="color: #FFFFFF;margin: 5px;">井状态综合预测</span>
						<div id="wellLine" style="height: 400px;"></div>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">历史预测误差统计</span>
						<div id="wellBar" style="height: 400px;"></div>
					</el-col>
          <el-col :span="8" style="margin: 6px;">
            <span style="color: #FFFFFF;margin: 5px;">基于多参数的综合预测</span>
            <div id="wellMultPre" style="height: 400px;width: 420px"></div>
            <el-row></el-row>
          </el-col>
          <el-col :span="8" style="margin: 6px;">
            <span style="color: #FFFFFF;margin: 5px;">井状态年份对比</span>
            <div id="wellYear" style="height: 400px;"></div>
            <el-row></el-row>
            <br />
<!--            <span style="color: #FFFFFF;margin: 5px;">井状态融合预测显示表</span>-->
<!--            <el-table style="width: fit-content;" border>-->
<!--              <el-table-column label="编号" type="index" width="55"></el-table-column>-->
<!--              <el-table-column label="孔隙度" prop="" width="80"></el-table-column>-->
<!--              <el-table-column label="油层厚度" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="油层黏度" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="油层温度" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="油压值" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="储层岩性" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="地质倾角" prop="" width="90"></el-table-column>-->
<!--              <el-table-column label="融合预测" prop="" width="90"></el-table-column>-->
          </el-col>

          <el-col :span="6" style="margin: 6px;">
            <span style="color: #FFFFFF;margin: 5px;">井状态分析</span>
            <div id="wellState" style="height: 400px;width: 300px;"></div>
            <el-row></el-row>
          </el-col>
				</el-row>

        <el-col :span="6" style="margin: 6px;">
          <span style="color: #FFFFFF;margin: 5px;">与良好状态对比关系</span>
          <div id="wellContrast1" style="height: 300px;"></div>
          <el-row></el-row>
        </el-col>
        <el-col :span="6" style="margin: 6px;">
          <span style="color: #FFFFFF;margin: 5px;"> </span>
          <div id="wellContrast2" style="height: 300px;"></div>
          <el-row></el-row>
        </el-col>
        <el-col :span="7" style="margin: 6px;">
          <span style="color: #FFFFFF;margin: 5px;"> </span>
          <div id="wellContrast3" style="height: 300px;"></div>
          <el-row></el-row>
        </el-col>

          <span style="color: #FFFFFF;margin: 5px;">与良好状态数据关联(贴图)
            <p style="height: 50px"></p>
            <img src="../../../assets/img/mult1.png" style="width: 200px;height: 200px;"/>
            <el-row></el-row>
            </span>
			</div>
		</div>
	</div>
</template>

<script>
import * as echarts from 'echarts';

export default{
		data(){
			return{
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
			}
		},
		mounted() {
			this.loadWellBar()
			this.loadWellGauge()
			this.loadWellLine()
      this.loadWellYear()
      this.loadWellMult()
      this.loadWellMultPre()
      // this.loadBigMap()
      this.loadWellState()
      this.loadwellContrast1()
      this.loadwellContrast2()
      this.loadwellContrast3()
		},
		methods:{
		  loadwellContrast1(){
        let mychart = echarts.init(document.getElementById('wellContrast1'))
		    let option = {
          title: {
            text: ''
          },
          tooltip: {},
          // legend: {
          //     data: ['一', '二']
          // },
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
            indicator: [
              { name: '1', max: 6500},
              { name: '2', max: 16000},
              { name: '3', max: 30000},
              { name: '4', max: 38000},
              { name: '5', max: 52000},
              { name: '6', max: 25000}
            ]
          },
          series: [{
            name: '一 vs 二',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '一'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '二'
              }
            ]
          }]
        };
        mychart.setOption(option)
      },
      loadwellContrast2(){
        let mychart = echarts.init(document.getElementById('wellContrast2'))
        let option = {
          title: {
            text: ''
          },
          tooltip: {},
          // legend: {
          //     data: ['一', '二']
          // },
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
            indicator: [
              { name: '1', max: 6500},
              { name: '2', max: 16000},
              { name: '3', max: 30000},
              { name: '4', max: 38000},
              { name: '5', max: 52000},
              { name: '6', max: 25000}
            ]
          },
          series: [{
            name: '一 vs 二',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '一'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '二'
              }
            ]
          }]
        };
        mychart.setOption(option)
      },
      loadwellContrast3(){
        let mychart = echarts.init(document.getElementById('wellContrast3'))
        let option = {
          title: {
            text: ''
          },
          tooltip: {},
          // legend: {
          //     data: ['一', '二']
          // },
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
            indicator: [
              { name: '1', max: 6500},
              { name: '2', max: 16000},
              { name: '3', max: 30000},
              { name: '4', max: 38000},
              { name: '5', max: 52000},
              { name: '6', max: 25000}
            ]
          },
          series: [{
            name: '一 vs 二',
            type: 'radar',
            // areaStyle: {normal: {}},
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '一'
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '二'
              }
            ]
          }]
        };
        mychart.setOption(option)
      },
		  loadWellState(){
        var data = [{
          name: 'Grandpa',
          children: [{
            name: 'Uncle Leo',
            value: 15,
            children: [{
              name: 'Cousin Jack',
              value: 2
            }, {
              name: 'Cousin Mary',
              value: 5,
              children: [{
                name: 'Jackson',
                value: 2
              }]
            }, {
              name: 'Cousin Ben',
              value: 4
            }]
          }, {
            name: 'Father',
            value: 10,
            children: [{
              name: 'Me',
              value: 5
            }, {
              name: 'Brother Peter',
              value: 1
            }]
          }]
        }, {
          name: 'Nancy',
          children: [{
            name: 'Uncle Nike',
            children: [{
              name: 'Cousin Betty',
              value: 1
            }, {
              name: 'Cousin Jenny',
              value: 2
            }]
          }]
        }];
        let mychart = echarts.init(document.getElementById('wellState'))
        let option = {
          series: {
            type: 'sunburst',
            data: data,
            radius: [60, '90%'],
            itemStyle: {
              borderRadius: 7,
              borderWidth: 2
            },
            label: {
              show: false
            }
          }
        };
        mychart.setOption(option)
      },
		  /*loadBigMap(){
        var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';
        $.get(ROOT_PATH + '/data/asset/data/lines-bus.json', function(data) {
          var hStep = 300 / (data.length - 1);
          var busLines = [].concat.apply([], data.map(function (busLine, idx) {
            var prevPt;
            var points = [];
            for (var i = 0; i < busLine.length; i += 2) {
              var pt = [busLine[i], busLine[i + 1]];
              if (i > 0) {
                pt = [
                  prevPt[0] + pt[0],
                  prevPt[1] + pt[1]
                ];
              }
              prevPt = pt;

              points.push([pt[0] / 1e4, pt[1] / 1e4]);
            }
            return {
              coords: points,
              lineStyle: {
                normal: {
                  color: echarts.color.modifyHSL('#5A94DF', Math.round(hStep * idx))
                }
              }
            };
          }));
        });
        var app = {};
        let mychart = echarts.init(document.getElementById('bigMap'))
        let option = {
          bmap: {
            center: [116.46, 39.92],
            zoom: 10,
            roam: true,
            mapStyle: {
              'styleJson': [
                {
                  'featureType': 'water',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#031628'
                  }
                },
                {
                  'featureType': 'land',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000102'
                  }
                },
                {
                  'featureType': 'highway',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'off'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'arterial',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#0b3d51'
                  }
                },
                {
                  'featureType': 'local',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'railway',
                  'elementType': 'geometry.stroke',
                  'stylers': {
                    'color': '#08304b'
                  }
                },
                {
                  'featureType': 'subway',
                  'elementType': 'geometry',
                  'stylers': {
                    'lightness': -70
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry.fill',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.fill',
                  'stylers': {
                    'color': '#857f7f'
                  }
                },
                {
                  'featureType': 'all',
                  'elementType': 'labels.text.stroke',
                  'stylers': {
                    'color': '#000000'
                  }
                },
                {
                  'featureType': 'building',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'green',
                  'elementType': 'geometry',
                  'stylers': {
                    'color': '#062032'
                  }
                },
                {
                  'featureType': 'boundary',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#465b6c'
                  }
                },
                {
                  'featureType': 'manmade',
                  'elementType': 'all',
                  'stylers': {
                    'color': '#022338'
                  }
                },
                {
                  'featureType': 'label',
                  'elementType': 'all',
                  'stylers': {
                    'visibility': 'off'
                  }
                }
              ]
            }
          },
          series: [{
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            silent: true,
            lineStyle: {
              // color: '#c23531',
              // color: 'rgb(200, 35, 45)',
              opacity: 0.2,
              width: 1
            },
            progressiveThreshold: 500,
            progressive: 200
          }, {
            type: 'lines',
            coordinateSystem: 'bmap',
            polyline: true,
            data: busLines,
            lineStyle: {
              width: 0
            },
            effect: {
              constantSpeed: 20,
              show: true,
              trailLength: 0.1,
              symbolSize: 1.5
            },
            zlevel: 1
          }]
        }
        mychart.setOption(option);
      },*/
		  loadWellMultPre(){
        var data = [["2020-06-05",116],["2020-06-06",129],["2020-06-07",135],["2020-06-08",86],["2020-06-09",73],["2020-06-10",85],["2020-06-11",73],["2020-06-12",68],["2020-06-13",92],["2020-06-14",130],["2020-06-15",245],["2020-06-16",139],["2020-06-17",115],["2020-06-18",111],["2020-06-19",309],["2020-06-20",206],["2020-06-21",137],["2020-06-22",128],["2020-06-23",85],["2020-06-24",94],["2020-06-25",71],["2020-06-26",106],["2020-06-27",84],["2020-06-28",93],["2020-06-29",85],["2020-06-30",73],["2020-07-01",83],["2020-07-02",125],["2020-07-03",107],["2020-07-04",82],["2020-07-05",44],["2020-07-06",72],["2020-07-07",106],["2020-07-08",107],["2020-07-09",66],["2020-07-10",91],["2020-07-11",92],["2020-07-12",113],["2020-07-13",107],["2020-07-14",131],["2020-07-15",111],["2020-07-16",64],["2020-07-17",69],["2020-07-18",88],["2020-07-19",77],["2020-07-20",83],["2020-07-21",111],["2020-07-22",57],["2020-07-23",55],["2020-07-24",60]];
        var dateList = data.map(function (item) {
          return item[0];
        });
        var valueList = data.map(function (item) {
          return item[1];
        });
        let mychart = echarts.init(document.getElementById('wellMultPre'))
        let option = {
          visualMap: [{
            show: false,
            type: 'continuous',
            seriesIndex: 0,
            min: 0,
            max: 400
          }, {
            show: false,
            type: 'continuous',
            seriesIndex: 1,
            dimension: 0,
            min: 0,
            max: dateList.length - 1
          }],


          title: [{
            left: 'center',
            text: '\n孔隙度',
            textStyle:{
              color:'#c7c7c7'
            },
          }, {
            top: '55%',
            left: 'center',
            text: '油层厚度',
            textStyle:{
              color:'#c7c7c7'
            },
          }],
          tooltip: {
            trigger: 'axis'
          },
          xAxis: [{
            data: dateList
          }, {
            data: dateList,
            gridIndex: 1
          }],
          yAxis: [{
          }, {
            gridIndex: 1
          }],
          grid: [{
            bottom: '60%'
          }, {
            top: '60%'
          }],
          series: [{
            type: 'line',
            showSymbol: false,
            data: valueList
          }, {
            type: 'line',
            showSymbol: false,
            data: valueList,
            xAxisIndex: 1,
            yAxisIndex: 1
          }]
        };
        mychart.setOption(option)
      },
		  loadWellMult(){
        let mychart = echarts.init(document.getElementById('wellMult'))
        let option = {

          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['孔隙度', '油层厚度', '油层黏度', '油层温度', '油压值','地质倾角'],
            textStyle:{
              color:'#c7c7c7'
            },
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
            data: ['6月', '7月', '8月', '9月', '10月', '11月', '12月']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: '孔隙度',
              type: 'line',
              stack: '总量',
              data: [1,3,3,4,5,6,7]
            },
            {
              name: '油层厚度',
              type: 'line',
              stack: '总量',
              data: [2,3,5,5,6,7,5]
            },
            {
              name: '油层黏度',
              type: 'line',
              stack: '总量',
              data: [3,4,3,6,7,5,2]
            },
            {
              name: '油层温度',
              type: 'line',
              stack: '总量',
              data: [4,5,6,7,5,6,7]
            },
            {
              name: '油压值',
              type: 'line',
              stack: '总量',
              data: [5,6,7,6,5,6,5]
            },
            {
              name: '地质倾角',
              type: 'line',
              stack: '总量',
              data: [6,6,7,6,5,6,5]
            }
          ]
        };
        mychart.setOption(option)
      },
			loadWellGauge(){
				let mychart = echarts.init(document.getElementById('wellGauge'))
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
			loadWellLine(){
				let mychart = echarts.init(document.getElementById('wellLine'))
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
			loadWellBar(){
				let mychart = echarts.init(document.getElementById('wellBar'))
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
			},
      loadWellYear(){
        let mychart = echarts.init(document.getElementById('wellYear'))
        var colors = ['#5470C6', '#EE6666'];
        let option = {
          color: colors,
          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross'
            }
          },
          legend: {
            data:['参数 1', '参数 2']
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[1]
                }
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return ' ' + params.value
                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ['2020-1', '2020-2', '2020-3', '2020-4', '2020-5', '2020-6', '2020-7', '2020-8', '2020-9', '2020-10', '2020-11', '2020-12']
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[0]
                }
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return ' ' + params.value
                        + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                  }
                }
              },
              data: ['2019-1', '2019-2', '2019-3', '2019-4', '2019-5', '2019-6', '2019-7', '2019-8', '2019-9', '2019-10', '2019-11', '2019-12']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '参数 1',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              emphasis: {
                focus: 'series'
              },
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '参数 2',
              type: 'line',
              smooth: true,
              emphasis: {
                focus: 'series'
              },
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
            }
          ]
        };
        mychart.setOption(option)
      },

		}
	}
</script>

<style>
</style>
