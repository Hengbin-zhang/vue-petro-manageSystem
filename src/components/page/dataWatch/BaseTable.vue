<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades" style="color: #FFFFFF;"></i><span style="color: #FFFFFF;margin-left: 5px;">数据实时监控/总</span> 
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
				<el-row>
					<el-col :span="8">
						<el-date-picker type="daterange" start-placeholder="起始时间" end-placeholder="结束时间" value-format="yyyy-MM-dd" format="yyyy年MM月dd日" style="margin: 5px;width: 260px;"></el-date-picker>
						<el-select placeholder="请选择油井" style="margin: 5px;">
							<el-option v-for="item in wellOption" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-button icon="el-icon-search" type="primary">搜索</el-button>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据显示表</span>
						<el-table style="width: fit-content;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="孔隙度" prop="" width="80"></el-table-column>
							<el-table-column label="原油黏度" prop="" width="90"></el-table-column>
							<el-table-column label="油层厚度" prop="" width="90"></el-table-column>
							<el-table-column label="油层温度" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">油井特征数据可视化</span>
						<div id="wellBar" style="width: 400px;height: 300px;"></div>
					</el-col>
					<el-col :span="8">
						<el-select placeholder="请选择管线" style="margin: 5px;">
							<el-option v-for="item in pipOption" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-button icon="el-icon-search">搜索</el-button>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">管线温度数据显示表</span>
						<el-table style="width: fit-content;margin: 5px;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="区段1" prop="" width="90"></el-table-column>
							<el-table-column label="区段2" prop="" width="90"></el-table-column>
							<el-table-column label="区段3" prop="" width="90"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">管线温度分布图</span>
						<div id="pipScatter" style="width: 400px;height: 300px;"></div>
					</el-col>
					<el-col :span="8">
						<el-select placeholder="请选择管汇" style="margin: 5px;">
							<el-option v-for="item in MinfordOption" :label="item.label" :value="item.value"></el-option>
						</el-select>
						<el-button icon="el-icon-search">搜索</el-button>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">管汇温度数据显示表</span>
						<el-table style="width: fit-content;margin: 5px;" border>
							<el-table-column label="编号" type="index" width="55"></el-table-column>
							<el-table-column label="监测点" prop="" width="80"></el-table-column>
							<el-table-column label="节点1" prop="" width="100"></el-table-column>
							<el-table-column label="节点2" prop="" width="100"></el-table-column>
							<el-table-column label="节点3" prop="" width="100"></el-table-column>
						</el-table>
						<el-row></el-row>
						<br />
						<span style="color: #FFFFFF;margin: 5px;">管汇温度数据可视化</span>
						<div id="minfordScatter" style="width: 400px;height: 300px;"></div>
					</el-col>
				</el-row>
               
            </div>
            <!-- <el-table
                :data="tableData"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="name" label="用户名"></el-table-column>
                <el-table-column label="账户余额">
                    <template slot-scope="scope">￥{{scope.row.money}}</template>
                </el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="scope.row.thumb"
                            :preview-src-list="[scope.row.thumb]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="address" label="地址"></el-table-column>
                <el-table-column label="状态" align="center">
                    <template slot-scope="scope">
                        <el-tag
                            :type="scope.row.state==='成功'?'success':(scope.row.state==='失败'?'danger':'')"
                        >{{scope.row.state}}</el-tag>
                    </template>
                </el-table-column>

                <el-table-column prop="date" label="注册时间"></el-table-column>
                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div> -->
        </div>

        <!-- 编辑弹出框 -->
       <!-- <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { fetchData } from '../../../api/index';
import * as echarts from 'echarts';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            tableData: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getData();
    },
	mounted() {
		this.loadWellBar()
		this.loadPipScatter()
		this.loadMinforScatter()
	},
    methods: {
		loadMinforScatter(){
			let mychart=echarts.init(document.getElementById('minfordScatter'))
			let option={
				xAxis:{},
				yAxis:{},
				series:[{
					symbolSize:20,
					data:[
						[10.0, 8.04],
						[8.07, 6.95],
						[13.0, 7.58],
						[9.05, 8.81],
						[11.0, 8.33],
						[14.0, 7.66],
						[13.4, 6.81],
						[10.0, 6.33],
						[14.0, 8.96],
						[12.5, 6.82],
						[9.15, 7.20],
						[11.5, 7.20],
						[3.03, 4.23],
						[12.2, 7.83],
						[2.02, 4.47],
						[1.05, 3.33],
						[4.05, 4.96],
						[6.03, 7.24],
						[12.0, 6.26],
						[12.0, 8.84],
						[7.08, 5.82],
						[5.02, 5.68],
						],
					type:'scatter'
				}]
			}
			mychart.setOption(option)
		},
		loadPipScatter(){
			let mychart=echarts.init(document.getElementById('pipScatter'))
			let option={
				xAxis:{},
				yAxis:{},
				series:[{
					symbolSize:20,
					data:[
						[10.0, 8.04],
						[8.07, 6.95],
						[13.0, 7.58],
						[9.05, 8.81],
						[11.0, 8.33],
						[14.0, 7.66],
						[13.4, 6.81],
						[10.0, 6.33],
						[14.0, 8.96],
						[12.5, 6.82],
						[9.15, 7.20],
						[11.5, 7.20],
						[3.03, 4.23],
						[12.2, 7.83],
						[2.02, 4.47],
						[1.05, 3.33],
						[4.05, 4.96],
						[6.03, 7.24],
						[12.0, 6.26],
						[12.0, 8.84],
						[7.08, 5.82],
						[5.02, 5.68],
						],
					type:'scatter'
				}]
			}
			mychart.setOption(option)
		},
		loadWellBar(){
			var posList = [
			    'left', 'right', 'top', 'bottom',
			    'inside',
			    'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
			    'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
			];
			let app={}
			app.configParameters={
				rotate:{
					min:-90,
					max:90
				},
				align:{
					options:{
						left:'left',
						center:'center',
						right:'right'
					}
				},
				 verticalAlign: {
				        options: {
				            top: 'top',
				            middle: 'middle',
				            bottom: 'bottom'
				        }
				    },
				    position: {
				        options: posList.reduce(function (map, pos) {
				            map[pos] = pos;
				            return map;
				        }, {})
				    },
				    distance: {
				        min: 0,
				        max: 100
				    }
					
			}
			app.config={
				rotate:90,
				align:'left',
				verticalAlign:'middle',
				position:'insideBottom',
				distance:15,
				onChange: function () {
				        var labelOption = {
				            normal: {
				                rotate: app.config.rotate,
				                align: app.config.align,
				                verticalAlign: app.config.verticalAlign,
				                position: app.config.position,
				                distance: app.config.distance
				            }
				        };
				        myChart.setOption({
				            series: [{
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }, {
				                label: labelOption
				            }]
				        });
				    }
			}
			let labelOption={
				show:true,
				position:app.config.position,
				distance:app.config.distance,
				align:app.config.align,
				verticalAlign:app.config.verticalAlign,
				rotate:app.config.rotate,
				fontSize:16,
				rich:{name:{}}
			}
			let colors=['#ee6666', '#fac858', '#91cc75','#5470c6']
			let mychart=echarts.init(document.getElementById('wellBar'))
			let option={
				tooltip:{
					trigger:'axis',
					axisPointer:{
						type:'shadow'
					}
				},
				legend:{
					data:[
						{
							name:'油层温度',
						textStyle:{
							color:'white'
						}
					},
					{
							name:'油层厚度',
						textStyle:{
							color:'white'
						}
					},
					{
							name:'油层黏度',
						textStyle:{
							color:'white'
						}
					},
					{
							name:'孔隙度',
						textStyle:{
							color:'white'
						}
					}
					]
				},
				xAxis:[
					{
						type:'category',
						axisTick:{show:false},
						data:[
							{
								value:'油井1',
								textStyle:{
									color:'white'
								}
							},
							{
								value:'油井2',
								textStyle:{
									color:'white'
								}
							},
							{
								value:'油井3',
								textStyle:{
									color:'white'
								}
							},
							{
								value:'油井4',
								textStyle:{
									color:'white'
								}
							},
							{
								value:'油井5',
								textStyle:{
									color:'white'
								}
							}
						],
					}
				],
				yAxis:[
					{
						type:'value',
						// name:'油层温度',
						position:'left',
						// axisLine:{
						// 	show:true,
						// 	lineStyle:{
						// 		color:colors[0]
						// 	}
						// },
						// axisLabel:{
						// 	formatter:'{value} °C'
						// }
					},
					{
						type:'value',
						// name:'油层厚度',
						min:0,
						position:'right',
						// axisLine:{
						// 	show:true,
						// 	lineStyle:{
						// 		color:colors[1]
						// 	}
						// },
						// axisLabel:{
						// 	formatter:'{value} mm'
						// }
					},
					{
						type:'value',
						// name:'油层黏度',
						min:0,
						max:100,
						position:'right',
						offset:40,
						// axisLine:{
						// 	show:true,
						// 	lineStyle:{
						// 		color:colors[2]
						// 	}
						// },
						// axisLabel:{
						// 	formatter:'{value}%'
						// }
					},
					{
						type:'value',
						// name:'孔隙度',
						min:0,
						max:100,
						position:'left',
						offset:40,
						// axisLine:{
						// 	show:true,
						// 	lineStyle:{
						// 		color:colors[3]
						// 	}
						// },
						// axisLabel:{
						// 	formatter:'{value} mm'
						// }
					}
				],
				series:[
					{
						name:'孔隙度',
						type:'bar',
						barGap:0,
						label:labelOption,
						yAxisIndex:3,
						emphasis:{focus:'series'},
						data:[55,56,54,57,60]
					},
					{
						name:'油层黏度',
						type:'bar',
						// barGap:0,
						label:labelOption,
						yAxisIndex:2,
						emphasis:{focus:'series'},
						data:[55,56,54,57,60]
					},
					{
						name:'油层厚度',
						type:'bar',
						// barGap:0,
						label:labelOption,
						yAxisIndex:1,
						emphasis:{focus:'series'},
						data:[0.5,0.6,0.8,0.4,0.6]
					},
					{
						name:'油层温度',
						type:'bar',
						// barGap:0,
						label:labelOption,
						yAxisIndex:0,
						emphasis:{focus:'series'},
						data:[55,56,54,57,60]
					}
					
				]
			}
			mychart.setOption(option)
		},
        // 获取 easy-mock 的模拟数据
        getData() {
            fetchData(this.query).then(res => {
                console.log(res);
                this.tableData = res.list;
                this.pageTotal = res.pageTotal || 50;
            });
        },
        // 触发搜索按钮
        handleSearch() {
            this.$set(this.query, 'pageIndex', 1);
            this.getData();
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                    this.tableData.splice(index, 1);
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
            this.$set(this.tableData, this.idx, this.form);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
