import { computed } from 'vue'
import DataSet from '@antv/data-set';

const useOptions = (props, { emit }) => {
  const sourceData = computed(() => {
    // if (props.isPercent) {
    //   // eslint-disable-next-line no-undef
    //   const data = new DataSet.DataView().source(props.data)
    //   const params = {
    //     type: 'percent',
    //     field: getPosition.value.y,
    //     // dimension: 'name',
    //     // groupBy: ['base_time'],
    //     as: 'percent',
    //   }

    //   if (props.field) {
    //     params.dimension = props.field
    //     params.groupBy = [ getPosition.value.x]
    //   }
    //   data.transform(params)

    //   return data.rows
    // } else {
      
      
    //   return props.data
    // }
    const DATA = props.data?.map(item => {
      item.__value = item[getPosition.value.y]
      return item
    }) || []
    const data = new DataSet.DataView().source(DATA)
      const params = {
        type: 'percent',
        field: '__value',
        dimension: getPosition.value.x,
        as: 'percent',
      }

      if (props.field) {
        params.dimension = props.field
        params.groupBy = [getPosition.value.x]
        data.transform(params)
        return data.rows
      } else {
        data.transform(params)
        return data.rows
      }
  })

  const getPosition = computed(() => {
    const pos = props?.position?.split('*') || []
    return {
      x: pos[0],
      y: props.isPercent ? 'percent' : pos[1],
    }
  })

  // 获取x轴的坐标刻度
  const getXLabels = () => {
    const data = sourceData.value
    const x = getPosition.value.x
    const labels = []
    data.forEach((item) => {
      labels.push(item[x])
    })
    return [...new Set(labels)]
  }
  // 获取x轴样本
  const getLabels = (offset = 0, field) => {
    const list = getXLabels()
    // if (field) {
    //   list = getFieldList(sourceData.value, field)
    // }

    if (offset === 0) {
      return list
    } else {
      const a = []
      list.forEach((item, index) => {
        if (index % (offset + 1) === 0) {
          a.push(item)
        }
      })
      return a
    }
  }
  // 获取分组x轴样本
  const getFieldList = (data, field) => {
    const _arr = []
    data.forEach(item => {
      _arr.push(item[field])
    })
    return [...new Set(_arr)]
  }

  return {
    sourceData,
    position: getPosition,
    getFieldList,
    getLabels,
  }
}

export default useOptions
