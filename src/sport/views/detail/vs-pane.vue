<template>
  <div class="pos-r vs-pane">
    <div class="text-align-center" v-if="showTime">
      <div class="countdown">开始倒数</div>
      <div class="flex items-center justify-center" style="margin-bottom: 24px">
        <img src="../../images/zyq0425/IconTime01.png" style="margin: 0 12px" />
        <div class="m-flex">
          <TimePane :time="timeState" v-if="time" />
        </div>
      </div>
    </div>

    <!-- pc -->
    <div class="flex items-center justify-between pc-pane">
      <div class="left flex items-center justify-between" style="width: 34%">
        <div class="logo"></div>
        <div>
          <div class="name" style="text-align: right">{{ homeInfo.name }}</div>
          <div
            style="float: right"
            class="bet-pane bg-item"
            @click="handlePickItem('home')"
            :class="{ active: getBetActive === 'home' }"
          >
            {{ homeInfo.odds }}
          </div>
        </div>
      </div>

      <div class="middle flex-0" v-if="showTime">
        <TimePane :time="timeState" v-if="time" />
      </div>
      <div
        class="right flex items-center justify-between flex-0"
        style="width: 34%"
      >
        <div>
          <div class="name">{{ awayInfo.name }}</div>
          <div
            class="bet-pane bg-item"
            @click="handlePickItem('away')"
            :class="{ active: getBetActive === 'away' }"
          >
            {{ awayInfo.odds }}
          </div>
        </div>
        <div class="logo"></div>
      </div>
    </div>

    <!-- mobile -->
    <div class="m-pane">
      <div class="left" style="width: 34%">
        <div class="flex justify-end">
          <div class="logo"></div>
        </div>
        <div>
          <div class="flex justify-end">
            <div class="name" style="text-align: right">
              {{ homeInfo.name }}
            </div>
          </div>
          <div class="flex justify-end">
            <div
              class="bet-pane bg-item"
              @click="handlePickItem('home')"
              :class="{ active: getBetActive === 'home' }"
            >
              {{ homeInfo.odds }}
            </div>
          </div>
        </div>
      </div>

      <div class="middle flex-0">vs</div>
      <div class="right" style="width: 34%">
        <div class="logo"></div>
        <div>
          <div class="name">{{ awayInfo.name }}</div>
          <div
            class="bet-pane bg-item"
            @click="handlePickItem('away')"
            :class="{ active: getBetActive === 'away' }"
          >
            {{ awayInfo.odds }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, onMounted } from "vue";
import TimePane from "./time-pane.vue";
import useActive from "@/sport/components/useHooks/use-active";
import useTime from "./use-time";

export default defineComponent({
  components: {
    TimePane,
  },
  props: {
    leftValue: {
      type: [String, Number],
      default: "1.72",
    },
    time: {
      type: [String, Number],
    },
    oddsId: {
      type: [String, Number],
    },
    homeInfo: {
      type: Object,
    },
    awayInfo: {
      type: Object,
    },
  },
  setup(props, { emit }) {
    const params = reactive({
      w: 1920,
      isMobile: false,
    });

    const { timeState, showTime } = useTime(props.time);

    const { getBetActive, state, setState } = useActive(
      props,
      { id: props.oddsId, homeInfo: props.homeInfo, awayInfo: props.awayInfo },
      {
        emit,
      }
    );
    const handlePickItem = (e) => {
      if (state.active === e) {
        // state.active = "";
        setState({ active: "" });
      } else {
        // state.active = e;
        setState({ active: e });
      }
    };
    onMounted(() => {
      const w = window.innerWidth;
      if (w >= 600) {
        params.isMobile = false;
      } else {
        params.isMobile = true;
      }
      console.log(w);
    });

    return {
      state,
      params,
      getBetActive,
      handlePickItem,
      timeState,
      showTime,
    };
  },
});
</script>

<style lang="less" scoped>
.vs-pane {
  margin: 0 auto;
  position: relative;
  padding: 0 32px;
  margin-top: 16px;
}
.logo {
  width: 10vw;
  height: 10vw;
  max-width: 160px;
  max-height: 160px;
  background: #0a0a1d;
  @media (max-width: 960px) {
    width: 80px;
    height: 80px;
  }
}
.name {
  height: 40px;
  font-size: 16px;
  line-height: 20px;
  width: 8vw;
  font-weight: 600;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
  -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
  -webkit-line-clamp: 2; /** 显示的行数 **/
  overflow: hidden; /** 隐藏超出的内容 **/
  @media (max-width: 960px) {
    width: 20vw;
  }
}

.middle {
  margin: 0 24px;
  @media (max-width: 1440px) {
    margin: 0 12px;
  }
}

.countdown {
  font-size: 18px;
  font-weight: 600;
  margin-top: 16px;
  margin-bottom: 8px;
}
.bet-pane {
  width: 82px;
  height: 34px;
  line-height: 34px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  border-radius: 6px;
  cursor: pointer;
  @media (max-width: 1440px) {
    width: 64px;
  }
}
.pc-pane {
  @media (max-width: 960px) {
    display: none;
  }
}
.m-pane {
  display: none;
  @media (max-width: 960px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
.m-flex {
  display: none;
  @media (max-width: 960px) {
    display: flex;
  }
}
</style>
