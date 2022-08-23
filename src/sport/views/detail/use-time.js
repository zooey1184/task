import dayjs from "dayjs";
import { computed, reactive, onMounted, onUnmounted } from "vue";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const useTime = (time) => {
  const timeState = reactive({
    d: -1,
    m: -1,
    h: -1,
    timer: undefined,
  });

  const getTime = () => {
    const D = dayjs(time).diff(dayjs(+new Date()), "day");
    const H = dayjs(time).diff(
      dayjs(+new Date() + D * 24 * 3600 * 1000),
      "hour"
    );
    const offsetM = D * 24 * 3600 * 1000 + H * 3600 * 1000;
    const m = dayjs(time).diff(dayjs(+new Date() + offsetM), "minute");
    return {
      d: D,
      h: H,
      m: m,
    };
  };
  const loop = () => {
    timeState.timer = setTimeout(() => {
      const t = getTime();
      timeState.d = t.d;
      timeState.m = t.m;
      timeState.h = t.h;
      if (t.d >= 0 && t.m >= 0 && t.h >= 0) {
        loop();
      } else {
        clearTimeout(timeState.timer);
        timeState.timer = null;
      }
    }, 1000 * 30);
  };

  const showTime = computed(() => {
    return timeState.d>=0 && timeState.m>=0 && timeState.h>=0
  })

  onMounted(() => {
    const t = getTime();
    timeState.d = t.d;
    timeState.m = t.m;
    timeState.h = t.h;
    loop();
  });

  onUnmounted(() => {
    clearTimeout(timeState.timer);
    timeState.timer = null;
  });

  return {
    timeState,
    showTime,
  }
}

export default useTime