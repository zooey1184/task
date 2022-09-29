import { createWebHashHistory, createRouter } from 'vue-router'
import {Button, notification} from 'ant-design-vue'
import {h} from 'vue'
import {useNavStore} from '@/store/routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/main'),
      children: [
        {
          path: 'tags',
          name: 'tags',
          component: () => import('@/views/tags/index.vue')
        },
        {
          path: 'taskadmin',
          name: 'taskadmin',
          component: () => import('@/views/task/index.vue')
        }
      ]
    }
  ],
})

const setArr = arr => {
  const t = []
  arr.forEach(item => {
    if (!t.includes(item)) {
      t.push(item)
    }
  })
  return t
}

// 用于返回刷新的事件列表
const refreshEventMap = {}


router.onError((error) => {
  const pattern = /Loading chunk (.*)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  if (isChunkLoadFailed) {
    notification.info({
      message: '更新提醒',
      description: '系统内应用已更新，请刷新页面',
      btn: h(
        Button,
        {
          type: 'primary',
          size: 'small',
          onClick: () => window.location.reload(),
        },
        '刷新',
      ),
    })
  }
});

// 设置页面是否缓存
router.beforeEach((to, from, next) => {
  const navStore = useNavStore()

  // let t = store.state.keepAlive
  // const _routes = store.state.routes || {}
  // if (!_routes[to.fullPath] && to.meta?.title ) {
  //   _routes[to.name] = to
  // }
  // store.dispatch('set_data', {
  //   routes: _routes
  // })
  const navs = navStore.routes
  const hasCurrent = navs.some(item => item.name === to.name)
  if (!hasCurrent) {
    // navs.value.push(to)
    navStore.setRoutes([to])
    console.log('==',navs, to);
  }

  // if (to.meta.cacheLast) {
  //   t.push(from.name)
  //   t = setArr(t)
  // }
  // document.title = to.meta.title || 'admin'
  // if (to.meta.cacheNext) {
  //   t = t?.filter(item => item !== to.name)
  // }
  // const toKeepAlive = to.meta.keepAlive ?? '-1'
  // if (toKeepAlive !== '-1') {
  //   if (toKeepAlive) {
  //     t.push(to.name)
  //     t = setArr(t)
  //   } else {
  //     t = t?.filter(item => item !== to.name)
  //   }
  // } else {
  //   if (!from.meta.cacheLast) {
  //     t = t?.filter(item => item !== to.name)
  //   }
  //   if (!to.meta.cacheLast) {
  //     t = t?.filter(item => item !== from.name)
  //   }
  // }

  // store.dispatch('set_keepAlive', t)

  if (from?.meta?.refresh) {
    refreshEventMap[from.name] = from?.meta?.refresh
  }
  // if (t.includes(to.name) && refreshEventMap[to.name]) {
  //   refreshEventMap[to.name]()
  // }
  setTimeout(() => {
    next()
  })
})

export default router
