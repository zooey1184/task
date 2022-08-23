<template>
  <div>
    <div
      class="active-color mt-24 f4 font-size-20 font-weight-600 text-align-center"
    >
      PLACE BET
    </div>
    <div class="text-align-center f3 my-16">BET</div>
    <div
      class="active-color flex ff items-center justify-center font-weight-600"
      style="font-size: 48px"
    >
      <div class="mr-24">$1000</div>
      <div class="ml-24">USDT</div>
    </div>
    <div class="active-color mt-8" v-for="item in getBetList">
      <div class="line-height-16">
        {{ item.homeInfo.handicap ? "Match Handicap" : "Match Winner" }}
      </div>
      <div
        class="font-size-32 font-weight-600 line-height-32 flex items-center"
      >
        {{ getActiveInfo(item).name }}
        <span class="flex items-center ml-24">
          <img
            style="width: 14px"
            src="../../images/v2/coin-icon-red.png"
            alt=""
          />
          {{ getActiveInfo(item).odds }}
        </span>
      </div>
      <div class="line-height-16">
        {{ item.homeInfo.name }} VS {{ item.awayInfo.name }}
      </div>
    </div>
    <div class="bet-pane primary-bg mt-8">
      <div class="flex items-center justify-between mb-8">
        <div>YOUR BET</div>
        <div>${{ getBetInfo.stake }}</div>
      </div>
      <div
        class="flex items-center justify-between mb-8"
        v-if="getBetInfo.type === 'combo'"
      >
        <div>POTENTIAL ODDS</div>
        <div>{{ getBetInfo.odds }}</div>
      </div>
      <div class="flex items-center justify-between">
        <div>POTENTIAL WIN</div>
        <div class="active-color">{{ getBetInfo.win }}</div>
      </div>
    </div>
    <div class="mt-16 font-size-12 line-height-16">
      THE ODDS WILL BE ESTIMATED AND YOU WILL PLACE BETS WITH A MINIMUM OF
      {{ getMinMax.min }}% (RELATED TO SLIPPAGE) AND A MAXIMUM OF
      {{ getMinMax.max }}%. MINIMUM WIN IS {{ getMinMax.minValue }}, MAXIMUM WIN
      IS {{ getMinMax.maxValue }}. THE BET WILL AUTOMATICALLY BE CANCELED IF
      SLIPPAGE BEYOND ITS RANGE
    </div>
    <div class="confirmBtn" @click="handleBetFn">PLACE BET</div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive } from "vue";
import { preCheck } from "@/sport/api/index";
import { useBet } from "@/sport/hooks/use-methods";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({});
    const CONTRACT = inject("CONTRACT");
    const SPORT_BET = inject("SPORT_BET");
    const ROOM = inject("ROOM");

    const getBetInfo = computed(() => SPORT_BET.getMyBetInfo?.value);
    const getBetList = computed(() => getBetInfo?.value?.data);

    const handleGetParams = () => {
      const getMyBetInfo = getBetInfo.value;
      const list = getMyBetInfo.data?.filter(
        (item) => item.active && item.betValue
      );
      const _list = [];
      list.forEach((item) => {
        const AMOUNT = web3.utils.toWei(`${item.betValue}`, "mwei");
        console.log(ROOM?.roomAddress?.value);
        _list.push({
          marketId: item.oddsId,
          tenant: ROOM?.code?.value,
          amount: AMOUNT,
          betSide: item.active === "home" ? 0 : item.active === "away" ? 1 : 2,
          minOdds: item.activeValue * (100 - 20), // (当前赔率*(100-滑点))
        });
      });
      return _list;
    };
    const getBetConfig = computed(() => {
      return SPORT_BET.getBetConfig.value;
    });

    const getMinMax = computed(() => {
      const t = getBetConfig.value.tolerance;
      const min = 100 - parseInt(t);
      const max = 100 + parseInt(t);
      const minV = parseFloat((getBetInfo.value.win * (min / 100)).toFixed(2));
      const maxV = parseFloat((getBetInfo.value.win * (max / 100)).toFixed(2));
      return {
        min,
        max,
        minValue: minV,
        maxValue: maxV,
      };
    });

    const getActiveInfo = (item) => {
      if (item.active === "home") {
        return item.homeInfo;
      } else if (item.active === "away") {
        return item.awayInfo;
      }
    };
    const { handleBet } = useBet();

    const handleBetFn = () => {
      const list = handleGetParams();
      const params = list[0];
      // preCheck(params).then((res) => {
      //   if (res) {
      //     console.log("通过");
      //   } else {
      //     console.log("不通过");
      //     console.log(CONTRACT.value.football_contract?.methods);
      //     handleBet(params, (h, r, e) => {
      //       if (r) {
      //         message.success("下注成功");
      //       }
      //     });
      //   }
      // });
      handleBet(params, (h, r, e) => {
        if (r) {
          message.success("下注成功");
        }
      });
    };

    return {
      state,
      handleBetFn,
      getBetList,
      getBetInfo,
      getActiveInfo,
      getMinMax,
    };
  },
});
</script>

<style lang="less" scoped>
.bet-pane {
  border-radius: 8px;
  padding: 8px 16px;
  color: #fff;
}
.confirmBtn {
  font-size: 16px;
  font-weight: 600;
  height: 38px;
  line-height: 38px;
  background: var(--primary-main);
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  margin-top: 24px;
  color: #fff;
  margin-bottom: 16px;
  &:active {
    opacity: 0.8;
  }
}
</style>
