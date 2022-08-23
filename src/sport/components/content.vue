<template>
  <div>
    <slot name="headerExtra"></slot>
    <Swiper />

    <section class="zyqTD zyqTDall">
      <div class="zyqTit flexC fl-bet">
        <div class="zyqTitH">{{ getScheduleItem?.name || "ALL" }}</div>
        <div class="zyqTitR flexC">
          <div class="zyqTitRS flexC">
            <img src="../images/zyq0425/IconTime01.png" />
            <p>start time</p>
          </div>
          <div class="zyqTitRS flexC">
            <img src="../images/zyq0425/IconTime02.png" />
            <p>real time</p>
          </div>
          <div class="zyqsearch flexC fl-bet">
            <a href="javascript:;" class="zyqseaA"></a>
            <input
              type="text"
              placeholder="search for a game, team or event"
              class="zyqseaI Huans"
            />
          </div>
        </div>
      </div>
      <div class="zyqTis">即将开始</div>
      <ul class="zyqul">
        <sport-item v-for="item in getMatchList" :info="item"></sport-item>
      </ul>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref } from "vue";
import Swiper from "./swiper.vue";
import SportItem from "./sport-item/index.vue";

export default defineComponent({
  components: {
    Swiper,
    SportItem,
  },
  props: {},
  setup(props) {
    const SPORT_BET = inject("SPORT_BET");
    const SCHEDULE = inject("SCHEDULE");
    const getScheduleItem = computed(() => SCHEDULE.getScheduleItem.value);
    const getScheduleList = computed(() => SCHEDULE.getScheduleList.value);

    const MATCH_LIST = inject("MATCH_LIST", {
      value: [],
    });
    const getMatchList = computed(() => MATCH_LIST.value);
    const state = reactive({
      sportsList: [],
    });
    return {
      state,
      getScheduleItem,
      getScheduleList,
      getMatchList,
    };
  },
});
</script>
