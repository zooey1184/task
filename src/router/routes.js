// @ts-nocheck
import { getMenus, getRealRoutes } from './utils'
const SYSTEM = ''

const microRoutes = [
  {
    title: '系统管理',
    key: SYSTEM,
    routes: [
      {
        path: `/${SYSTEM}`,
        name: SYSTEM,
        children: [
          {
            path: 'overview',
            name: 'overview',
            icon: 'DashboardOutlined',
            component: () => import('@/views/data-kanban/overview/index.vue'),
            meta: {title: '实时概览' }
          },
          {
            path: 'paid',
            name: 'paid',
            icon: 'MoneyCollectOutlined',
            component: () => import('@/views/data-kanban/paid/index.vue'),
            meta: {title: '付费看板' }
          },
          {
            path: 'district',
            name: 'district',
            icon: 'UngroupOutlined',
            component: () => import('@/views/data-kanban/district/index.vue'),
            meta: {title: '区服看板' }
          },
          {
            path: 'retain',
            name: 'retain',
            icon: 'FileTextOutlined',
            component: () => import('@/views/data-kanban/retain/index.vue'),
            meta: {title: '留存看板' }
          },
          {
            path: 'mine',
            name: 'mine',
            icon: 'SolutionOutlined',
            component: () => import('@/views/data-kanban/mine/index.vue'),
            meta: {title: '我的看板' }
          },
        ]
      },
    ],
  },
]



const routes = [] // 全部路由
const systemMenu = [] // 系统顶部应用菜单

microRoutes.forEach(item => {
  const options = getMenus(item.routes, [])
  routes.push(...options)
  systemMenu.push({
    title: item.title,
    key: item.key,
    children: item.children,
    options,
  })
});


const __realRoutes = []
microRoutes.forEach(item => {
  if (item.routes) {
    __realRoutes.push(...item.routes)
  }
})


const realRoutes = getRealRoutes(__realRoutes)
export {routes, systemMenu, microRoutes, realRoutes }
