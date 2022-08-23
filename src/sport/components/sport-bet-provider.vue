<template>
  <slot></slot>
</template>

<script>
import { computed, defineComponent, provide, reactive, ref } from "vue";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      betList: [],
      betMap: {},
      myBetInfo: undefined,
      betConfig: undefined,
    });

    const getBetList = computed(() => {
      const map = state.betMap;
      const list = [];
      // item => {active, activeValue, data}
      for (let i in map) {
        if (map[i]?.active) {
          list.push(map[i]);
        }
      }
      return list;
    });
    const getBetMap = computed(() => state.betMap);
    const handleDeleteItem = (item) => {
      const id = item?.oddsId;
      if (id && state.betMap?.[id]) {
        state.betMap[id] = undefined;
      }
    };

    const setState = (data) => {
      for (let i in data) {
        state[i] = data[i];
      }
    };
    const getMyBetInfo = computed(() => state.myBetInfo);
    const getBetConfig = computed(() => state.betConfig);

    provide("SPORT_BET", {
      getBetList: getBetList,
      getBetMap,
      getMyBetInfo,
      getBetConfig,
      setState,
      getMap: () => {
        return state.betMap;
      },
      setMap: (cb) => {
        cb && typeof cb === "function" && cb(state.betMap);
      },
      addItem: (item) => {
        state.betList.push(item);
      },
      clear: () => {
        state.betMap = {};
      },
      delete: (item) => {
        handleDeleteItem(item);
      },
    });
  },
});
</script>
