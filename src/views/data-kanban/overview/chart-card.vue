<template>
  <a-card hoverable class="mb-16" size='small' style="min-height: 300px">
    <div class="flex items-center justify-between">
      最高在线用户数
      <div>
        <a-space v-if='tabs?.length'>
          <span class="mr-8" :class="{'color-blur': item.key === state.activeKey}" @click='handleClick(item)' v-for='item in tabs' :key='item.key'>{{item.tab}}</span>
        </a-space>
      </div>
    </div>
    <div class="my-8 color-gray">
      2022-11-22 ~ 2022-11-24 | 过去3天 更新于2022-11-24 00:58:50
    </div>

    <slot v-if='!tabs?.length'>
      <Chart :height='200' :data='state.data' :chartType='chartType' position='Date*Close' />
    </slot>
    <template v-for='item in tabs'>
      <slot :name='item.key'></slot>
    </template>
  </a-card>
</template>

<script>
import {reactive, defineComponent, onMounted, watch} from 'vue'
import Chart from '@/components/chart'

export default defineComponent({
  components: {
    Chart
  },
  props: {
    chartType: {
      type: String
    },
    tabs: {
      type: Array
    },
    activeKey: {
      type: String
    }
  },
  emits: ['update:activeKey'],
  setup(props, {emit}) {
    const state = reactive({
      data: [],
      activeKey: props?.options?.[0]?.key
    })
    watch(
      () => props.activeKey,
      n => {
        // @ts-ignore
        state.activeKey = n
      },
      {
        immediate: true
      }
    )
    watch(
      () => state.activeKey,
      n => {
        emit(`update:activeKey`, n)
      }
    )

    const handleClick = (item) => {
      state.activeKey = item.value
    }

    onMounted(() => {
      fetch('./mock.json').then(res => res.json()).then((data) => {
        state.data = data
      })
    })

    return {
      state,
      handleClick
    }
  }
})
</script>