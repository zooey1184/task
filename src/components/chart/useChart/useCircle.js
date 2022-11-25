import useColors from './useColors'
import DataSet from '@antv/data-set';

const useCircleMulti = (chart, { position, field, data, radius }) => {
  // eslint-disable-next-line no-undef
  const ds = new DataSet()
  const dv = ds.createView()
  const [x, y] = position.split('*')

  // 是否按真实比例展示，此场景下，会变更x的命名 且不会被groupBy
  const isField = true
  data.map((item, i) => {
    item[x] = isField ? `${item[x]}_${i}` : item[x]
    return item
  })
  dv.source(data).transform({
    type: 'percent',
    field: y,
    dimension: field,
    as: 'percent',
  })
  const getFieldList = (data, field) => {
    const _arr = []
    data.forEach(item => {
      _arr.push(item[field])
    })
    return [...new Set(_arr)]
  }
  const colorMap = {}
  const fieldList = getFieldList(data, field)
  const len = fieldList.length
  const colors = useColors(len)
  fieldList.forEach((item, index) => {
    colorMap[item] = colors[index]
  })
  chart.data(dv.rows)

  chart.coordinate('theta', {
    radius: 0.5,
    innerRadius: 0.3,
  })

  chart.tooltip({
    showMarkers: false,
    shared: true,
  })
  chart.legend(false)

  chart.interval().position('percent').adjust('stack').color(field, (val) => colorMap[val])
    .style({
      stroke: 'white',
      lineWidth: 1,
    })
    .label(field, {
      offset: -5,
      style: {
        fill: 'white',
        shadowBlur: 2,
        shadowColor: 'rgba(0, 0, 0, .45)',
      },
    })

  // eslint-disable-next-line no-undef
  const ds2 = new DataSet()
  const dv2 = ds2.createView()
  dv2.source(data).transform({
    type: 'percent',
    field: y,
    dimension: x,
    groupBy: isField ? [] : [field],
    as: 'percent',
  })
  const outterView = chart.createView()

  outterView.data(dv2.rows)
  outterView.coordinate('theta', {
    innerRadius: 0.5 / 0.8,
    radius: 0.8,
  })
  outterView
    .interval()
    .adjust('stack')
    .position('percent')
    .color(`${field}*${x}`, (type, name) => colorMap[type])
    .style({
      stroke: 'white',
      lineWidth: 1,
    })
    // .label(x, {
    //   offset: -10,
    //   style: {
    //     fill: "white",
    //     shadowBlur: 2,
    //     shadowColor: "rgba(0, 0, 0, .45)",
    //   },
    // });

  return chart
}

const useCircle = (chart, { position, field, data, radius }) => {
  if (field) {
    return useCircleMulti(chart, { position, field, data })
  }
  const [x, y] = position.split('*')
  chart.coordinate('theta', {
    radius: 1,
    // radius: 0.75,
    innerRadius: radius,
  })
  const CHART = chart.interval().position('percent').color(x).adjust('stack')
  chart.tooltip({
    showTitle: false,
    showMarkers: false,
    customItems: (items) => {
      const newItems = items.map(e => {
        return {
            ...e,
            value: ((+e.value) * 100).toFixed(2) + '%'
        }
      })
      return newItems
    }
  })
  chart.interaction('element-active')
  return CHART
}

export default useCircle
