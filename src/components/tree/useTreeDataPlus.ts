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

const useTreeDataPlus = (
  data: any,
  options: ITreeOptions = { level: 100, parent_id: 0 },
  callback?: any
) => {
  const _list:any = []
  const PARENT_ID = options?.parent_id ?? 0
  const LEVEL = options?.level ?? 4
  const PARAMS = options.params
  const ALIAS = options?.alias || {}
  const CHILDREN = ALIAS?.children ?? 'children'
  const KEY = ALIAS?.key ?? 'key'
  const DISABLED = options?.disabled ?? false
  const FILTER = options?.filter ?? true
  const isCollectIncludesSelf = options.isCollectIncludesSelf ?? true // 从下往上计算是否需要包含本身

  const EXTRA: any = []
  // 从上级往下级传递
  const handleParent = options?.handleParent ?? false
  const from_parent_params:any = options?.from_parent_params ?? []

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


      
      
      // 通用字段
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

      let _from_parent_params:any = []
      // 从上级往下级追溯字段
      if (handleParent && typeof handleParent === 'function') {
        const _parentParam = handleParent(item, index)
        _from_parent_params = [...from_parent_params, _parentParam]
        obj._fromParentParams = _from_parent_params
      }


      const _children = typeof CHILDREN === 'function' ? CHILDREN(item, index, { parent_id: PARENT_ID }) : CHILDREN
      console.log(item[_children])
      if (item?.[_children]?.length) {
        const [childrenList, extra]= useTreeDataPlus(item[_children], {
          parent_id: item[KEY],
          level: _level,
          disabled: DISABLED,
          filter: FILTER,
          params: PARAMS,
          alias: ALIAS,
          pos: _pos,
          parent_keys: _parent_keys,
          filterContainChildable: filterContainChildable,
          from_parent_params: _from_parent_params,
          handleParent
        }, callback)
        console.log('childrenList', childrenList)
        if (childrenList?.length) {
          obj.children = childrenList
        } else {
          obj.children = []
        }

        let _fromChildParamsObj = undefined
        // 是否计算包含自身
        if (isCollectIncludesSelf && callback && typeof callback === 'function') {
          _fromChildParamsObj = callback(item)
          obj._fromChildParams = _fromChildParamsObj ? [_fromChildParamsObj, ...extra] : [...extra]
        } else {
          obj._fromChildParams = [...extra]
        }
        EXTRA.push(...obj._fromChildParams)
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
        if (callback && typeof callback === 'function') {
          const _fromChildParams = callback(item)
          EXTRA.push(_fromChildParams)
          obj._fromChildParams = [_fromChildParams]
        }
        console.log(obj)
        if (_filter && obj.key) {
          _list.push(obj)
        }
      }
    })
  }
  return [_list, EXTRA]
}

const useTreeData = (tree: any, options: ITreeOptions | undefined, callback?: any) => {
  const [list, extra] = useTreeDataPlus(tree, options, callback)
  // if (!(callback && typeof callback === 'function')) {
  //   return list
  // }
  // return [list, extra]
  return list
}
export default useTreeData