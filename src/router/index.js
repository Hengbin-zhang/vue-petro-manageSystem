import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
	mode: 'history',
	base: '/',
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    component: () => import(/* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
				{
                    path: '/table',
                    component: () => import(/* webpackChunkName: "table" */ '../components/page/dataWatch/BaseTable.vue'),
                    meta: { title: '数据监控' }
                },
				{
				    path: '/wellData',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/dataWatch/wellData.vue'),
				    meta: { title: '油井数据监控' }
				},
				{
				    path: '/pipData',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/dataWatch/pipData.vue'),
				    meta: { title: '管线数据监控' }
				},
				{
				    path: '/minfordData',
				    component: () => import(/* webpackChunkName: "table" */ '../components/page/dataWatch/minfordData.vue'),
				    meta: { title: '管汇数据监控' }
				},
				
                {
                    path: '/icon',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '温度异常预警' }
                },
                
                {
                    path: '/wellAlert',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/abnormalAlert/wellAlert.vue'),
                    meta: { title: '油井温度异常警报' }
                },
				{
				    path: '/pipAlert',
				    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/abnormalAlert/pipAlert.vue'),
				    meta: { title: '管道温度异常警报' }
				},
				{
				    path: '/minfordAlert',
				    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/abnormalAlert/minfordAlert.vue'),
				    meta: { title: '管汇温度异常警报' }
				},
                {
                    path: '/wellSinPara',
                    component: () => import(/* webpackChunkName: "form" */ '../components/page/singlePara/well.vue'),
                    meta: { title: '油井单参数分析' }
                },
				{
				    path: '/pipSinPara',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/singlePara/pipline.vue'),
				    meta: { title: '管线单参数分析' }
				},
				{
				    path: '/minfordSinPara',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/singlePara/minford.vue'),
				    meta: { title: '管汇单参数分析' }
				},
				{
				    path: '/wellMultiPara',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/multiPara/well.vue'),
				    meta: { title: '油井多参数分析' }
				},
				{
				    path: '/pipMultiPara',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/multiPara/pipline.vue'),
				    meta: { title: '管线多参数分析' }
				},
				{
				    path: '/minfordMultiPara',
				    component: () => import(/* webpackChunkName: "form" */ '../components/page/multiPara/minford.vue'),
				    meta: { title: '管汇多参数分析' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/wellIdentify',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/identify/well.vue'),
				    meta: { title: '油井工况识别' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/piplineIdentify',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/identify/pipline.vue'),
				    meta: { title: '管线工况识别' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/minfordIdentify',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/identify/minford.vue'),
				    meta: { title: '管汇工况识别' }
				},
				{
				    // 拖拽列表组件
				    path: '/wellAnalysis',
				    component: () => import(/* webpackChunkName: "drag" */ '../components/page/analysis/well.vue'),
				    meta: { title: '油井致因分析' }
				},
				{
				    // 拖拽列表组件
				    path: '/piplineAnalysis',
				    component: () => import(/* webpackChunkName: "drag" */ '../components/page/analysis/pipline.vue'),
				    meta: { title: '管线致因分析' }
				},
				{
				    // 拖拽列表组件
				    path: '/minfordAnalysis',
				    component: () => import(/* webpackChunkName: "drag" */ '../components/page/analysis/minford.vue'),
				    meta: { title: '管汇致因分析' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/wellTypical',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/typical/well.vue'),
				    meta: { title: '油井典型工况' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/piplineTypical',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/typical/pipline.vue'),
				    meta: { title: '管线典型工况' }
				},
				{
				    // 拖拽Dialog组件
				    path: '/minfordTypical',
				    component: () => import(/* webpackChunkName: "dragdialog" */ '../components/page/typical/minford.vue'),
				    meta: { title: '管汇典型工况' }
				},
				{
				    path: '/dataManage',
				    component: () => import(/* webpackChunkName: "donate" */ '../components/page/dataManage.vue'),
				    meta: { title: '数据管理' }
				},
				
                {
                    // 富文本编辑器组件
                    path: '/editor',
                    component: () => import(/* webpackChunkName: "editor" */ '../components/page/VueEditor.vue'),
                    meta: { title: '富文本编辑器' }
                },
                {
                    // markdown组件
                    path: '/markdown',
                    component: () => import(/* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () => import(/* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () => import(/* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                
                
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () => import(/* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () => import(/* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () => import(/* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () => import(/* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
