interface ITreeAlias {
  [name: string]: any
}

interface ITreeOptions {
  level?: number
  // eslint-disable-next-line camelcase
  parent_id?: string | number
  alias?: ITreeAlias
  params?: any
  [key: string]: any
}

const useTreeData = (
  data: any,
  options: ITreeOptions = { level: 100, parent_id: 0 },
) => {
  const _list:any = []
  const PARENT_ID = options?.parent_id ?? 0
  const LEVEL = options?.level ?? 4
  const PARAMS = options.params
  const ALIAS = options?.alias || {}
  const CHILDREN = ALIAS?.children ?? 'children'
  const KEY = ALIAS?.key ?? 'id'
  const DISABLED = options?.disabled ?? false
  const FILTER = options?.filter ?? true

  // 父节点不满足条件 子节点满足 是否要计入有效
  const filterContainChildable = options.filterContainChildable ?? true

  const POS = options.pos || []
  const PARENT_KEYS = options.parent_keys || []
  let _level = LEVEL
  if (_level > 0) {
    _level--
    data.forEach((item: { [x: string]: any }, index: any) => {
      const _filter =
        typeof FILTER === 'function'
          ? FILTER(item, index, { parent_id: PARENT_ID })
          : FILTER
      const _params =
        typeof PARAMS === 'function'
          ? PARAMS(item, index, { parent_id: PARENT_ID })
          : typeof PARAMS === 'object'
            ? PARAMS
            : {}

      const _pos = [...POS]
      // eslint-disable-next-line camelcase
      const _parent_keys = [...PARENT_KEYS]
      _pos.push(index)
      _parent_keys.push(item.key || _params.key)
      const obj = {
        ...item,
        disabled:
          typeof DISABLED === 'function'
            ? DISABLED(item, index, { parent_id: PARENT_ID })
            : DISABLED,
        ..._params,
        _pos: _pos,
        _parent_keys: _parent_keys,
      }

      const _children = typeof CHILDREN === 'function' ? CHILDREN(item, index, { parent_id: PARENT_ID }) : CHILDREN

      if (item?.[_children]?.length) {
        const childrenList = useTreeData(item[_children], {
          parent_id: item[KEY],
          level: _level,
          disabled: DISABLED,
          filter: FILTER,
          params: PARAMS,
          alias: ALIAS,
          pos: _pos,
          parent_keys: _parent_keys,
          filterContainChildable: filterContainChildable,
        })
        if (childrenList?.length) {
          obj.children = childrenList
        } else {
          obj.children = []
        }

        // 父节点不满足条件 子节点也忽略
        if (!filterContainChildable) {
          _filter && _list.push(obj)
        } else {
          // 父节点不满足 但是子节点满足可以计入有效
          if (_filter || childrenList?.length) {
            _list.push(obj)
          }
        }
      } else {
        if (_filter && obj.key) {
          _list.push(obj)
        }
      }
    })
  }
  return _list
}
interface IMap {
  [key: string]: any
}

/**
 * 将树结构转化为map
 * @param list 树
 * @returns map
 */
const useTreeMap = (list: any[]) => {
  const map:IMap = {}
  list.forEach(item => {
    if (item?.children?.length) {
      const _map = useTreeMap(item.children)
      Object.assign(map, _map)
    }
    map[item.key] = item
  })
  return map
}

// 设置深层数组内部值
const setDeepVal = (list: (string|number)[], t: any, _item:any) => {
  const [f, ...o] = list
  if (o?.length) {
    t[f] = t[f] || []
    setDeepVal(o, t[f], _item)
  } else {
    t[f] = _item
  }
}
const formatDeepVal = (list:any) => {
  const t:any = []
  if (list.length) {
    list.forEach((item:any) => {
      const isParent = item?.children?.length
      if (isParent) {
        const obj:any = {}
        for (const i in item) {
          if (!(parseInt(i) > -1)) {
            obj[i] = item[i]
          }
        }
        t.push(obj)
      } else {
        const _tt = formatDeepVal(item)
        t.push(_tt)
      }
    })
  } else {
    if (list.children?.length) {
      const obj:any = {}
      for (const i in list) {
        if (!(parseInt(i) > -1)) {
          obj[i] = list[i]
        }
      }
      t.push(obj)
    } else if (list?.key) {
      t.push(list)
    }
  }

  return t
}
// 获取原始树结构 [[], [[], []]] 多层结构 对应树
const useTreePosNodes = (posList: string[], tree: any) => {
  const _tree:any = []

  for (let i = 0; i < posList?.length; i++) {
    const list:any = posList[i]
    const __item = list.reduce((pre: { [x: string]: any; children: { [x: string]: any } }, nex: string | number) => {
      if (pre.children) {
        return pre.children[nex]
      }
      return pre[nex]
    }, tree)
    setDeepVal(list, _tree, __item)
  }
  const __tree = formatDeepVal(_tree)

  return __tree
}

const useAllChildKeys = (item: ITreeOptions) => {
  const t:string[] = []
  if (item?.children) {
    item.children.forEach((ii:ITreeOptions) => {
      const _t = useAllChildKeys(ii)
      t.push(..._t)
    })
  }
  t.push(item.key)

  return t
}

/**
 * 获取某项的最深的级别
 * @param item
 * @returns
 */
const useTreeLevel = (item: ITreeOptions) => {
  let t = 0
  if (item?.children?.length) {
    t++
    item.children.forEach((ii:ITreeOptions) => {
      const _t = useTreeLevel(ii)
      t = t + _t
    })
  }
  return t
}
export {
  useTreeData,
  useTreeMap,
  useTreePosNodes,
  useAllChildKeys,
  useTreeLevel,
}
