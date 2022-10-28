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
            title: '项目管理',
            key: 'project',
            icon: 'FolderOpenOutlined',
            children: [
              {
                path: 'gantt',
                name: 'gantt',
                icon: 'FileTextOutlined',
                component: () => import('@/views/project/gante.vue'),
                meta: {title: '任务甘特' }
              },
              {
                path: 'kanban',
                name: 'kanban',
                icon: 'FileTextOutlined',
                component: () => import('@/views/project/kanban.vue'),
                meta: {title: '任务看板' }
              },
            ]
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
