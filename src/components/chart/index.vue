<template>
  <div class="p-16">
    <div ref="chartRef"></div>
  </div>
</template>

<script>
  import { ref, defineComponent, onMounted, onUnmounted, computed, watch, nextTick } from 'vue'
  import useChart from './useChart/index.js'
  import useOptions from './useChart/useOptions'
import { Chart } from '@antv/g2';

  export default defineComponent({
    props: {
      position: {
        type: String
      },
      height: {
        type: Number,
        default: 350
      },
      data: {
        type: Array
      },
      isPercent: {
        type: Boolean
      },
      chartType: {
        type: String,
        default: 'line'
      },
      // 图例
      legend: {
        type: [Boolean, String],
        default: 'bottom'
      },
      labelOffset: {
        type: Number,
        default: -1
      },
      field: {
        type: String
      },
      crosshairs: {
        type: [Boolean, Object]
      },
      slider: {
        type: [Boolean, Object]
      },
      radius: {
        type: [Number, String]
      },
      xAsisTitle: {
        type: String
      },
      yAsisTitle: {
        type: String
      },
      labelType: {
        type: Array,
        default: () => ['value'] // [label, value, percent]
      },
      dataSetField: {
        // 数据类型转化的时候用别的key 替换当前 field
        type: String
      }
    },
    setup(props, { emit, expose }) {
      const chartRef = ref()
      const chart = ref()

      const getIsPercent = computed(() => props.isPercent)
      const { sourceData, position, getLabels } = useOptions(props, { emit })

      const render = () => {
        // @ts-ignore
        const _chart = chart.value
        _chart.clear()
        _chart.data(sourceData.value)

        if (getIsPercent.value) {
          _chart.scale({
            percent: {
              formatter: (/** @type {number} */ value) => {
                value = +value || 0
                value = +value * 100
                return `${value.toFixed(2)}%`
              },
              alias: 'percent(%)'
            }
          })
        }

        _chart.interaction('active-region')

        _chart.tooltip({
          showMarkers: false,
          shared: true,
          title: (/** @type {any} */ title, /** @type {{ [x: string]: any; }} */ datum) => {
            // console.log(datum[position.value.x], title, datum)
            return datum[position.value.x]
          },
          customItems: (/** @type {{ data: { field: any; }; name: any; }[]} */ items) => {
            // console.log(items)
            items.forEach((/** @type {{ data: { field: any; }; name: any; }} */ item) => {
              if (item.data?.field) {
                item.name = item.data?.field
              }
            })
            return items
          }
          // showCrosshairs: props.crosshairs ? true : false,
          // crosshairs: props.crosshairs
        })
        if (props.slider) {
          const _slider = typeof props.slider === 'boolean' ? { height: 25 } : props.slider
          _chart.option('slider', _slider) // 开启缩略轴组件
        } else {
          _chart.option('slider', false)
        }

        if (props.xAsisTitle?.length) {
          _chart.axis(position.value.x, {
            // label: {
            //   autoRotate: true
            // },
            title:
              props.chartType === 'circle'
                ? null
                : {
                    text: props.xAsisTitle,
                    autoRotate: true
                  }
          })
        } else {
          _chart.axis(position.value.x, {
            title: {
              text: null,
              autoRotate: true
            }
            // label: {
            //   autoRotate: true
            // }
          })
        }

        // y轴标题
        if (props.yAsisTitle?.length) {
          const obj = {
            title: {
              text: props.yAsisTitle
            }
          }
          // 如果不禁用会显示堆叠刻度
          const yasix = props.chartType !== 'circle' ? obj : false
          _chart.axis(position.value.y, yasix)
        } else {
          const obj = {
            title: null
          }
          // 如果不禁用会显示堆叠刻度
          const yasix = props.chartType !== 'circle' ? obj : false
          _chart.axis(position.value.y, yasix)
        }

        if (props.legend) {
          if (typeof props.legend === 'string') {
            _chart.legend({
              position: props.legend
            })
          } else {
            _chart.legend(true)
          }
        } else {
          _chart.legend(false)
        }

        const CHART = useChart(_chart, props.chartType, {
          position: `${position.value.x}*${position.value.y}`,
          field: props.field,
          data: sourceData.value,
          radius: props.radius
        })
        if (CHART) {
          // label 抽取样本
          if (props.labelOffset >= 0) {
            if (!(props.chartType === 'circle' && props.field)) {
              // @ts-ignore
              const c = parseInt(props.labelOffset) || 0
              const xlabel = getLabels(c, props.field)
              const POS = `${position.value.x}*${position.value.y}`
              CHART.label(POS, {
                content: (/** @type {{ [x: string]: any; percent: string; }} */ data) => {
                  if (xlabel.includes(data[position.value.x])) {
                    let str = ''
                    if (props.labelType.includes('label')) {
                      str += `${data[position.value.x]} `
                    }
                    if (props.labelType.includes('value')) {
                      str += props.chartType === 'circle' ? `【${data[position.value.y]}】` : data[position.value.y]
                    }
                    if (props.labelType.includes('percent')) {
                      const t = parseFloat(data.percent) || 0
                      str += `${parseFloat((t * 100).toFixed(2))}%`
                    }
                    return str
                  }
                  return null
                }
              })
            }
          }

          nextTick(() => {
            _chart.render()
          })
        }
      }

      watch(
        () => [
          sourceData.value,
          getIsPercent.value,
          props.chartType,
          props.legend,
          props.field,
          props.radius,
          props.slider,
          props.labelOffset,
          props.xAsisTitle,
          props.yAsisTitle,
          props.labelType,
          props.dataSetField
        ],
        () => {
          if (sourceData.value?.length && chart.value && chartRef.value) {
            render()
          }
        }
      )

      const initChart = () => {
        // @ts-ignore
        chart.value = new Chart({
          container: chartRef.value,
          autoFit: true,
          height: props.height,
          appendPadding: 25
          // padding: [80, 50, 20, 50]
        })

        nextTick(() => {
          render()
        })
      }

      expose({
        render,
        forceFit: () => {
          chart.value?.forceFit()
        }
      })

      onMounted(() => {
        if (!chart.value && chartRef.value) {
          setTimeout(() => {
            initChart()
          }, 200)
        }
      })

      onUnmounted(() => {
        // @ts-ignore
        chart.value?.destroy()
      })

      return {
        chartRef,
        sourceData,
        chart
      }
    }
  })
</script>
