<template>
  <a-card hoverable class="mb-8" size='small'>
    <div>{{ title }}</div>
    <div class="color-gray font-size-12">
      {{ subTitle }}
    </div>
    <div>
      {{ desc }}
    </div>
    <div>
      <a-statistic :value="count" :value-style="{ fontSize: '32px' }">
        <template #suffix>
          <div class="font-size-14">{{unit}}</div>
        </template>
      </a-statistic>
    </div>
    <div class="flex items-center">
      <Rate label="同比" class="mr-16" :status="ringRatioStatus">
        {{ ringRatio }}
      </Rate>
      <Rate label="环比" :status="yoyStatus">
        {{ yoy }}
      </Rate>
    </div>
  </a-card>
</template>

<script>
  import { reactive, defineComponent } from 'vue'
  import Rate from './rate.vue'

  export default defineComponent({
    components: {
      Rate
    },
    props: {
      title: {
        type: String
      },
      subTitle: String,
      desc: String,
      ringRatio: [String, Number],
      yoy: [String, Number],
      ringRatioStatus: Number,
      yoyStatus: Number,
      unit: [String, Number],
      count: [String, Number]
    },
    setup() {
      const state = reactive({})

      return {
        state
      }
    }
  })
</script>
