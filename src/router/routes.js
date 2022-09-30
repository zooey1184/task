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
            title: '用户',
            key: 'user',
            icon: 'FolderOpenOutlined',
            children: [
              {
                path: 'userList',
                name: 'userList',
                icon: 'FileTextOutlined',
                component: () => import('@/views/user/list.vue'),
                meta: {title: '用户列表', keepAlive: false}
              },
            ]
          },
          {
            title: '管理',
            key: 'admin',
            icon: "FolderOpenOutlined",
            children: [
              {
                path: 'adminList',
                name: 'adminList',
                icon: 'FileTextOutlined',
                component: () => import('@/views/admin/list.vue'),
                meta: {
                  title: '管理员列表'
                }
              }
            ]
          },
          {
            title: '订单',
            key: 'order',
            icon: 'FolderOpenOutlined',
            children: [
              {
                path: 'orderList',
                name: 'orderList',
                icon: 'FileTextOutlined',
                component: ()=> import('@/views/order/list.vue'),
                meta: {title: '订单管理'}
              },
              {
                path: 'orderReback',
                name: 'orderReback',
                icon: 'FileTextOutlined',
                meta: {
                  title: '订单退款'
                }
              }
            ]
          }
          // {
          //   title: '权限管理',
          //   key: 'permission',
          //   icon: 'FolderOpenOutlined',
          //   children: [
          //     {
          //       path: 'interface',
          //       name: 'microInterface',
          //       icon: 'FileTextOutlined',
          //       component: () => import('@/views/permission/interface/index.vue'),
          //       meta: {title: '接口管理', keepAlive: false, allowNewWindow: true}
          //     },
          //   ]
          // }
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
