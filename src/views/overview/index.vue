<template>
  <view-wrap>
    <div class="p-16">
      <!-- <a-breadcrumb class="mb-8">
        <a-breadcrumb-item href="">
          <home-outlined />
          <span>数据看板</span>
        </a-breadcrumb-item>
        <a-breadcrumb-item href="">
          <DashboardOutlined />
          <span>实时概览</span>
        </a-breadcrumb-item>
      </a-breadcrumb> -->
      <div class="p-16 bg-white">
        <div class="flex items-center justify-between  mb-16">
          <div class="color-blue font-size-12">注: 当前游戏服务器位于西五区, 东八区(中国)查看存在12个小时时差</div>
          <div>
            最后接收事件时间
            <a-range-picker />
            <a-button>
              <template #icon><SearchOutlined /></template>
            </a-button>
            <a-button>
              <template #icon><ReloadOutlined /></template>
            </a-button>
          </div>
        </div>
        <a-row :gutter='16'>
          <a-col :xxxl='6' :xxl='6' :xl='6' :lg='12' :md='24' v-for='item in state.titleOptions'>
            <TitleCard v-bind='item' />
          </a-col>
        </a-row>
        <a-row class="mt-8" :gutter='16'>
          <a-col :xxxl='12' :xxl='12' :xl='12' :lg='24' :md='24'>
            <ChartCard />
          </a-col>
          <a-col :xxxl='12' :xxl='12' :xl='12' :lg='24' :md='24'>
            <ChartCard chartType='bar' />
          </a-col>
          <a-col :xxxl='12' :xxl='12' :xl='12' :lg='24' :md='24'>
            <ChartCard />
          </a-col>
          <a-col :xxxl='12' :xxl='12' :xl='12' :lg='24' :md='24'>
            <ChartCard />
          </a-col>
        </a-row>
      </div>
    </div>
  </view-wrap>
</template>

<script>
import {reactive, defineComponent, onMounted} from 'vue'
import TitleCard from './title-card.vue'
import ChartCard from './chart-card.vue'
import { SearchOutlined, ReloadOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    TitleCard,
    ChartCard,
    SearchOutlined,
    DashboardOutlined, HomeOutlined,
    ReloadOutlined
  },
  setup() {
    const state = reactive({
      titleOptions: [
        {
          title: '当前日活',
          subTitle: '2022-11-24 ~ 2022-11-24  更新于 2022-11-24 00:58:50',
          desc: '今天 00:59 (星期四)',
          count: '945',
          unit: '人',
          ringRatio: '13.14%',
          ringRatioStatus: -1,
          yoy: '40.42%',
          yoyStatus: 1
        },
        {
          title: '当前注册',
          subTitle: '2022-11-24 ~ 2022-11-24  更新于 2022-11-24 00:58:50',
          desc: '今天 00:59 (星期四)',
          count: '121',
          unit: '人',
          ringRatio: '20.95%',
          ringRatioStatus: -1,
          yoy: '40.42%',
          yoyStatus: 1
        },
        {
          title: '当前注册',
          subTitle: '2022-11-24 ~ 2022-11-24  更新于 2022-11-24 00:58:50',
          desc: '今天 00:59 (星期四)',
          count: '121',
          unit: '人',
          ringRatio: '20.95%',
          ringRatioStatus: -1,
          yoy: '40.42%',
          yoyStatus: 1
        },
        {
          title: '今日总收入',
          subTitle: '2022-11-24 ~ 2022-11-24  更新于 2022-11-24 00:58:50',
          desc: '今天 00:59 (星期四)',
          count: '186.88',
          unit: '美元',
          ringRatio: '253.07',
          ringRatioStatus: 1,
          yoy: '40.42%',
          yoyStatus: 1
        }
      ]
    })

    

    return {
      state
    }
  }
})
</script>