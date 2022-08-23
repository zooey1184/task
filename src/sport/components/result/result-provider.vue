<template>
  <slot></slot>
</template>

<script>
import {
  defineComponent,
  inject,
  reactive,
  provide,
  computed,
  watch,
} from "vue";
import { getBetList } from "@/sport/api/index";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      resultList: [],
      totalWin: 0,
      totalBet: 0,
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const walletAddress = computed(() => ACCOUNTS?.accounts?.value?.[0]);
    const handleGetBetList = () => {
      if (walletAddress?.value) {
        // const a = "0xF873Ad938E8041C9c39f8A8DFd3505528240C302";
        // const a = false;
        getBetList({ wallet: walletAddress.value }).then((res) => {
          state.resultList = res;
          const win = [];
          const bet = [];
          res?.forEach((item) => {
            if (item.win_amount > 0) {
              win.push(item.win_amount);
            }
            bet.push(item.bet_amount);
          });

          state.totalWin = win.reduce((pre, next) => pre + next, 0);
          state.totalBet = bet.reduce((pre, next) => pre + next, 0);
        });
      }
    };

    const handleInLoop = () => {
      handleGetBetList();
      setTimeout(() => {
        handleInLoop();
      }, 60 * 1000 * 10); // 10分钟轮询
    };

    watch(
      () => walletAddress.value,
      (n) => {
        if (n) {
          handleInLoop();
        }
      },
      {
        immediate: true,
      }
    );

    const getResultList = computed(() => state.resultList);
    const getTotalbet = computed(() => state.totalBet);
    const getTotalWin = computed(() => state.totalWin);
    const getWinRate = computed(() =>
      parseFloat((getTotalWin.value / getTotalbet.value)?.toFixed(2))
    );

    provide("RESULT", {
      resultList: getResultList,
      handleGetResultList: handleGetBetList,
      totalBet: getTotalbet,
      totalWin: getTotalWin,
      winRate: getWinRate,
    });
    return {
      state,
    };
  },
});
</script>
