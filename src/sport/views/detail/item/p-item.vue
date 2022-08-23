<template>
  <div class="itemWrap">
    <div class="flex items-center">
      <div class="flex-1 sideItem flex items-center justify-between">
        <div class="logo"></div>
        <div class="flex-1">
          <div class="flex items-center justify-between flex-1 insideItem">
            <div class="name betNum ellipsis_2">
              {{ homeInfo.name }}
            </div>
            <div class="flex items-center">
              <div class="gray betNum">{{ homeInfo.handicap }}</div>
              <input
                type="text"
                :class="{ active: getBetActive === 'home' }"
                @click="handlePickItem('home')"
                :value="homeInfo.odds"
                class="zyqulNI"
                readonly
              />
            </div>
          </div>
        </div>
      </div>

      <!-- 中间说明 -->
      <div class="mid">
        {{ name }}
      </div>

      <div class="flex-1 sideItem flex items-center justify-between">
        <div class="flex-1">
          <div class="flex items-center justify-between flex-1 insideItem">
            <div class="flex items-center">
              <input
                type="text"
                :class="{ active: getBetActive === 'away' }"
                @click="handlePickItem('away')"
                :value="awayInfo.odds"
                class="zyqulNI"
                readonly
              />
              <div class="gray betNum">{{ awayInfo.handicap }}</div>
            </div>
            <div class="name betNum ellipsis_2">{{ awayInfo.name }}</div>
          </div>
        </div>
        <div class="logo"></div>
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
  padding: 12px 0;
  background-color: #1b222c;
  border: 2px solid #1b222c;
  border-radius: 8px;
  box-shadow: 12px 12px 10px 2px rgb(0 0 0 / 30%);
  min-height: 40px;
}
.mid {
  width: 220px;
  padding: 0 12px;
  text-align: center;
}
.sideItem {
  width: calc(50% - 110px);
}
.betNum {
  margin: 0 12px;
  font-size: 15px;
  color: #6c829d;
}
.logo {
  width: 36px;
  height: 36px;
  margin: 0 12px;
  background: #333;
}
.insideItem {
  margin: 4px 0;
}
</style>
