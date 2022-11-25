<template>
  <a-card hoverable class="mb-16" size='small'>
    <div class="flex items-center justify-between">
      最高在线用户数
      <div>
        <a-space>
          <span class="mr-8">表格</span>
          <span class="mr-8">变化</span>
          <span>趋势</span>
        </a-space>
      </div>
    </div>
    <div class="my-8 color-gray">
      2022-11-22 ~ 2022-11-24 | 过去3天 更新于2022-11-24 00:58:50
    </div>

    <slot>
      <Chart :data='state.data' :chartType='chartType' :height='250' position='Date*Close' />
    </slot>
  </a-card>
</template>

<script>
import {reactive, defineComponent, onMounted} from 'vue'
import Chart from '@/components/chart'

export default defineComponent({
  components: {
    Chart
  },
  props: {
    chartType: {
      type: String
    }
  },
  setup() {
    const state = reactive({
      data: []
    })

    onMounted(() => {
      fetch('./mock.json').then(res => res.json()).then((data) => {
        state.data = data
      })
    })

    return {
      state
    }
  }
})
</script>