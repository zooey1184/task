<template>
  <div class="pos-r mt-8 tabWrap primary-dark-bg m-8">
    <div class="flex items-center justify-around pb-8">
      <span
        href="javascript:;"
        @click="handleChangeBetType('single')"
        class="tabItem ff"
        :class="{ 'active-bg': getBetType === 'single' }"
        >SINGLE</span
      >
      <span
        href="javascript:;"
        @click="handleChangeBetType('combo')"
        class="tabItem ff"
        :class="{ 'active-bg': getBetType === 'combo' }"
        >COMBO</span
      >
      <div>
        <DeleteIcon
          v-if="getSportBetList?.length > 1"
          @click="handleDelete"
          class="hover_active icon-delete pos-a"
        />
      </div>
    </div>

    <div class="">
      <div style="height: calc(100vh - 475px); overflow: auto">
        <div class="" v-if="!getSportBetList?.length">
          <div class="flex flex-col items-center justify-center">
            <img src="../../images/zyq0425/kongL.png" style="width: 120px" />
            <p>Your betting unit is empty</p>
            <a href="javascript:;">Click on odds to add selection</a>
          </div>
        </div>
        <div v-else>
          <div class="betItem" v-for="item in getSportBetList">
            <BetItem
              :info="item"
              :showInput="getBetType !== 'combo'"
              v-model:value="item.betValue"
              @delete="handleDeleteItem(item)"
            ></BetItem>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="pos-r mt-8 py-16 px-8 primary-dark-bg m-8">
    <div class="active-color text-align-center font-size-12 mb-8">
      NOT ENOUGH BALANCE TO PLACE A BET.
    </div>
    <div v-if="getBetType === 'single' && getSportBetList?.length">
      <BetInput v-model:value="state.betSingleValue">
        <template #title>
          <div class="font-size-12">SINGLE SHARE:</div>
        </template>
      </BetInput>
      <div class="flex items-center mt-8 justify-between">
        <div class="font-size-12">TOTAL STAKE</div>
        <div>{{ getTotal }}</div>
      </div>
      <div class="flex items-center justify-between mt-8">
        <div class="active-color font-weight-600 font-size-12">
          POTENTIAL WIN:
        </div>
        <div class="font-weight-600 active-color flex items-center">
          <img
            src="../../images/v2/coin-icon-red.png"
            style="width: 12px"
            class="mr-8"
            alt=""
          />
          {{ getWin }}
        </div>
      </div>
    </div>

    <div v-if="getBetType === 'combo' && getSportBetList?.length">
      <BetInput v-model:value="state.betComboValue">
        <template #title>
          <div class="font-size-12">AMOUNT (REQUIRED):</div>
        </template>
      </BetInput>
      <div class="flex items-center justify-between mt-8">
        <div class="font-size-12">ODDS:</div>
        <div>{{ getOdds }}</div>
      </div>
      <div class="flex items-center justify-between mt-8">
        <div class="active-color font-weight-600 font-size-12">
          POTENTIAL WIN:
        </div>
        <div class="font-weight-600 active-color flex items-center">
          <img
            src="../../images/v2/coin-icon-red.png"
            style="width: 12px"
            class="mr-8"
            alt=""
          />
          {{ getWinCombo }}
        </div>
      </div>
    </div>

    <div class="bet-btn mt-8" href="javascript:;" @click="handleBet">
      {{ isLink ? "PLACE  BET" : "Login And Bet" }}
    </div>
  </div>
  <Mask v-model:visible="state.visible">
    <div>
      <Speed v-if="state.step === 'speed'" @ok="state.step = 'bet'" />
      <BetPane v-if="state.step === 'bet'" />
    </div>
  </Mask>
</template>

<script>
import { defineComponent, inject, ref, computed, watch, reactive } from "vue";
import BetItem from "../bet-item.vue";
import DeleteIcon from "./icon-delete-all.vue";
import BetInput from "../bet-input.vue";
import BetModal from "../transaction";
import Mask from "@/sport/components/mask";
import Speed from "@/sport/components/bet-modal/speed.vue";
import BetPane from "@/sport/components/bet-modal/bet.vue";
import { message } from "ant-design-vue";

export default defineComponent({
  components: {
    BetItem,
    BetInput,
    DeleteIcon,
    BetModal,
    Mask,
    Speed,
    BetPane,
  },
  props: {},
  emits: ["bet"],
  setup(props, { emit }) {
    const state = reactive({
      betSingleValue: undefined,
      betComboValue: undefined,
      visible: false,
      step: "speed",
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const SPORT_BET = inject("SPORT_BET");

    const BET = inject("BET");

    const handleChangeBetType = (e) => {
      BET.value?.changeBetType(e);
    };
    const getBetType = computed(() => {
      return BET.value?.betType;
    });
    const getSportBetList = computed(() => {
      return SPORT_BET.getBetList.value;
    });
    const isLink = computed(() => ACCOUNTS.isLink?.value);
    const getTotal = computed(() => {
      const list = getSportBetList.value;
      let s = 0;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const val = +(item.betValue || 0);
        s += val;
      }
      return s;
    });

    const getWin = computed(() => {
      const list = getSportBetList.value;
      let s = 0;
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const val = +(item.betValue || 0) * item.activeValue;
        s += val;
      }
      return parseFloat(s?.toFixed(2));
    });
    const getOdds = computed(() => {
      const list = getSportBetList.value;
      let s = 0;
      const arr = [];
      for (let i = 0; i < list.length; i++) {
        const item = list[i];
        const val = +(item.activeValue || 0);
        arr.push(val);
      }
      s = arr.reduce((p, n) => p * n, 1);
      return parseFloat(s.toFixed(2));
    });
    const getWinCombo = computed(() => {
      const val = state.betComboValue || 0;
      const odds = getOdds.value;
      return parseFloat((val * odds).toFixed(2));
    });
    const handleBet = () => {
      if (isLink.value) {
        const params = handleGetBetInfo();
        SPORT_BET.setState({
          myBetInfo: params,
        });
        if (params?.data?.length && params.stake > 0) {
          console.log(params);
        } else {
          message.warning("请先下注");
          return;
        }
        emit("bet");
        state.visible = true;
      } else {
        ACCOUNTS.link();
      }
    };
    const handleDelete = () => {
      SPORT_BET.clear();
    };

    // 获取投注信息
    const handleGetBetInfo = () => {
      return {
        type: getBetType.value, // single combo
        stake: getTotal.value,
        odds: getBetType.value === "single" ? undefined : getOdds.value,
        win: getBetType.value === "single" ? getWin.value : getWinCombo.value,
        data: getSportBetList.value,
      };
    };

    const handleDeleteItem = (item) => {
      SPORT_BET.delete(item);
    };
    watch(
      () => state.betSingleValue,
      (n) => {
        const list = getSportBetList.value;
        list.forEach((item) => {
          item.betValue = n;
        });
      }
    );
    return {
      state,
      isLink,
      getTotal,
      handleBet,
      getWin,
      getSportBetList,
      getBetType,
      handleDelete,
      handleChangeBetType,
      handleDeleteItem,
      getOdds,
      getWinCombo,
    };
  },
});
</script>

<style lang="less" scoped>
.betItem {
  position: relative;
  font-size: 16px;
  margin-bottom: 8px;
}
.RighNTita {
  line-height: 28px !important;
}
.icon-delete {
  top: 4px;
  right: 4px;
  font-size: 18px;
  color: #6d819c;
}
.tabWrap {
  padding: 8px;
}
.tabItem {
  width: 40%;
  text-align: center;
  border-radius: 12px;
  padding: 4px;
  cursor: pointer;
}
.bet-btn {
  height: 38px;
  text-align: center;
  background: #fff;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 38px;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    // background: var(--primary-main);
    color: var(--primary-main);
    // color: #fff;
  }
}
</style>
