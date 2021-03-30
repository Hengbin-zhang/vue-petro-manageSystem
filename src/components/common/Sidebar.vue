<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#000066"
            text-color="#bfcbd9"
            active-text-color="#0000ff"
            unique-opened
            router
        >
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span slot="title">{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs">
                            <el-submenu
                                v-if="subItem.subs"
                                :index="subItem.index"
                                :key="subItem.index"
                            >
                                <template slot="title">{{ subItem.title }}</template>
                                <el-menu-item
                                    v-for="(threeItem,i) in subItem.subs"
                                    :key="i"
                                    :index="threeItem.index"
                                >{{ threeItem.title }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.index"
                                :key="subItem.index"
                            >{{ subItem.title }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <i :class="item.icon"></i>
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
export default {
    data() {
        return {
            collapse: false,
            items: [
                {
                    icon: 'el-icon-lx-home',
                    index: 'dashboard',
                    title: '系统首页'
                },
                {
                    icon: 'el-icon-lx-cascades',
                    index: 'table',
                    title: '数据实时监控',
					subs:[
						{
							index: 'table',
							title: '数据实时监控/总'
						},
						{
							index: 'wellData',
							title: '数据实时监控/油井'
						},
						{
							index: 'pipData',
							title: '数据实时监控/管线'
						},
						{
							index: 'minfordData',
							title: '数据实时监控/管汇'
						},
					]
                },
                {
                    icon: 'el-icon-lx-copy',
                    index: 'tabs',
                    title: '温度异常预警',
					subs:[
						{
							index:'wellAlert',
							title:'油井温度警报'
						},
						{
							index:'pipAlert',
							title:'管线温度警报'
						},
						{
							index:'minfordAlert',
							title:'管汇温度警报'
						}
					]
                },
				
				{
					icon: 'el-icon-pie-chart',
					index: 'charts',
					title: '单参数分析',
					subs:[
						{
							index: 'wellSinPara',
							title: '油井单参数分析'
						},
						{
							index: 'pipSinPara',
							title: '管线单参数分析'
						},
						{
							index: 'minfordSinPara',
							title: '管汇单参数分析'
						},
					]
				},
				{
					icon: 'el-icon-s-help',
					title: '多参数分析',
					subs:[
						{
							index: 'wellMultiPara',
							title: '油井多参数分析'
						},
						{
							index: 'pipMultiPara',
							title: '管线多参数分析'
						},
						{
							index: 'minfordMultiPara',
							title: '管汇多参数分析'
						},
					]
				},
				{
				    icon: 'el-icon-rank',
				    index: '6',
				    title: '异常工况识别',
				    subs: [
				        {
				            index: 'wellIdentify',
				            title: '油井工况识别'
				        },
				        {
				            index: 'piplineIdentify',
				            title: '管线工况识别'
				        },
						{
						    index: 'minfordIdentify',
						    title: '管汇工况识别'
						}
				    ]
				},
				{
				    icon: 'el-icon-s-goods',
				    index: 'analysis',
				    title: '反向致因分析',
					subs: [
					    {
					        index: 'wellAnalysis',
					        title: '油井致因分析'
					    },
					    {
					        index: 'piplineAnalysis',
					        title: '管线致因分析'
					    },
						{
						    index: 'minfordAnalysis',
						    title: '管汇致因分析'
						}
					]
				},
				{
				    icon: 'el-icon-s-claim',
				    index: 'typical',
				    title: '典型工况对比',
					subs: [
					    {
					        index: 'wellTypical',
					        title: '油井典型工况'
					    },
					    {
					        index: 'piplineTypical',
					        title: '管线典型工况'
					    },
						{
						    index: 'minfordTypical',
						    title: '管汇典型工况'
						}
					]
				},
				{
				    icon: 'el-icon-setting',
				    index: 'dataManage',
				    title: '数据管理'
				},
            ]
        };
    },
    computed: {
        onRoutes() {
            return this.$route.path.replace('/', '');
        }
    },
    created() {
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
