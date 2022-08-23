<template>
  <div class="itemWrap">
    <div class="title">{{ name }}</div>

    <div class="flex items-center justify-between">
      <div class="flex items-center sideItem">
        <div class="logo" style="margin-right: 6px"></div>
        <div class="flex justify-end flex-1" style="width: calc(50% - 55px)">
          <div class="betNum ellipsis_2">{{ homeInfo.name }}</div>
        </div>
      </div>
      <div class="flex items-center sideItem">
        <div class="flex flex-1" style="width: calc(50% - 55px)">
          <div class="betNum">{{ awayInfo.name }}</div>
        </div>
        <div class="logo" style="margin-left: 6px"></div>
      </div>
    </div>

    <div class="flex items-center justify-between" style="margin-top: 8px">
      <div class="flex items-center sideItem justify-end">
        <div class="betNum" style="margin-right: 8px">
          {{ homeInfo.handicap }}
        </div>
        <input
          type="text"
          :value="homeInfo.odds"
          :class="{ active: getBetActive === 'home' }"
          @click="handlePickItem('home')"
          class="zyqulNI"
          readonly
        />
      </div>

      <div class="flex items-center sideItem">
        <input
          type="text"
          :value="awayInfo.odds"
          class="zyqulNI"
          :class="{ active: getBetActive === 'away' }"
          @click="handlePickItem('away')"
          readonly
        />
        <div class="betNum" style="margin-left: 8px">
          {{ awayInfo.handicap }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import useActive from "@/sport/components/useHooks/use-active";

export default defineComponent({
  components: {},
  props: {
    name: {
      type: String,
    },
    homeInfo: {
      type: Object,
    },
    awayInfo: {
      type: Object,
    },
    oddsId: {
      type: [String, Number],
    },
    active: {
      type: String,
    },
  },
  setup(props, { emit }) {
    const { getBetActive, state, setState } = useActive(
      props,
      { id: props.oddsId, homeInfo: props.homeInfo, awayInfo: props.awayInfo },
      {
        emit,
      }
    );
    const handlePickItem = (e) => {
      if (e === state.active) {
        state.active = "";
      } else {
        state.active = e;
      }
    };

    return {
      state,
      getBetActive,
      handlePickItem,
    };
  },
});
</script>

<style lang="less" scoped>
.itemWrap {
  color: #fff;
  padding: 12px;
  background-color: #1b222c;
  border: 2px solid #1b222c;
  border-radius: 8px;
  box-shadow: 12px 12px 10px 2px rgb(0 0 0 / 30%);
  min-height: 40px;
}

.title {
  text-align: center;
  font-size: 15px;
  margin-bottom: 8px;
}
.betNum {
  font-size: 15px;
  color: #6c829d;
  line-height: 24px;
}
.pane1 {
  width: 45%;
}
.pane2 {
  width: 55%;
}
.sideItem {
  width: calc(50% - 20px);
}
.logo {
  width: 24px;
  height: 24px;
  background: #fff;
}
</style>
