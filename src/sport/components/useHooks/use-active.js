import {reactive, inject, watch, computed} from 'vue'

const useActive = (props, {id, homeInfo, awayInfo},  {emit}) => {
  const state = reactive({
    active: ''
  })

  watch(
    () => props.active,
    (n) => {
      state.active = n;
    },
    {
      immediate: true,
    }
  );
  watch(
    () => state.active,
    (n) => {
      emit("update:active", n);
    }
  );

  const SPORT_BET = inject("SPORT_BET");

  const getBetActive = computed(() => {
    const map = SPORT_BET.getBetMap.value;
    const item = map?.[id];
    if (item && item?.active) {
      return item.active;
    }
    return "";
  });

  watch(
    () => state.active,
    (n) => {
      SPORT_BET.setMap((map) => {
        const activeValue = n === 'home' ? homeInfo.odds : n=== 'away' ? awayInfo.odds : undefined
        if (map) {
          map[id] = {
            active: n,
            activeValue: activeValue,
            data: props.info,
            oddsId: id,
            homeInfo: homeInfo,
            awayInfo: awayInfo,
          };
        } else {
          map = {
            [id]: {
              active: n,
              oddsId: id,
              activeValue: activeValue,
              data: props.info,
              homeInfo: homeInfo,
            awayInfo: awayInfo,
            },
          };
        }
      });
    }
  );

  const setState = (obj) => {
    for(let i in obj) {
      state[i] = obj[i]
    }
    
  }

  return {
    getBetActive,
    state,
    setState
  }
}

export default useActive