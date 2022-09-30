// 获取真实的路由情况   因为有的菜单只有菜单嵌套而不是真实的路由
export const getRealRoutes = (list, t=[]) => {
  const _routes = t
  list.forEach(item => {
    if (item.children?.length) {
      if (item.key) {
        _routes.push(...item.children)
      } else {
        const __t = getRealRoutes(item.children, [])
        if (__t?.length) {
          _routes.push({
            ...item,
            children: __t
          })
        }
      }
    } else {
      item.path && _routes.push(item)
    }
  })
  return _routes
}

// 获取 menu 配置
export const getMenus = (list, t = [], prefix='') => {
  const _t = []
  list.forEach(item => {
    const isMenu = item.menu ?? '1'
    if (item?.children?.length) {
      const _prefix = prefix ? `${prefix}${item.path ? '/' + item.path : ''}` : item.path
      const __t = getMenus(item.children, _t, _prefix)
      if (__t?.length) {
        if (item.title || item?.meta?.title) {
          _t.push({
            title: item.title || item?.meta?.title || item.name,
            key: item.key || item.name,
            path: item.path ? `${prefix}/${item.path}` : '',
            icon: item.icon || item?.meta?.icon,
            allowNewWindow: item?.meta?.allowNewWindow,
            children: __t
          })
        } else {
          _t.push(...__t)
        }
      }
    } else {
      if (!!isMenu && (item.title || item?.meta?.title)) {
        const _path = item.path ? `${prefix}/${item.path}` : ''
        _t.push({
          title: item.title || item?.meta?.title || item.name,
          key: item.key || item.name,
          path: _path,
          allowNewWindow: item?.meta?.allowNewWindow,
          icon: item.icon || item?.meta?.icon
          // ...item
        })
      }
     
    }
  })
  return _t
}