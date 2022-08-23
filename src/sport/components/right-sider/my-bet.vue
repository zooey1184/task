<template>
  <div class="pos-r mt-8 tabWrap primary-dark-bg m-8">
    <div class="flex items-center justify-around pb-8">
      <span
        href="javascript:;"
        @click="handleChangeBetType('history')"
        class="tabItem ff"
        :class="{ 'active-bg': state.active === 'history' }"
        >HISTORY</span
      >
      <span
        href="javascript:;"
        @click="handleChangeBetType('pending')"
        class="tabItem ff"
        :class="{ 'active-bg': state.active === 'pending' }"
        >PENDING</span
      >
    </div>

    <div class="">
      <div style="height: calc(100vh - 270px); overflow: auto">
        <div class="" v-if="!getResultList?.length">
          <div class="flex flex-col items-center justify-center">
            <img
              src="../../images/zyq0425/kongL.png"
              style="width: 120px; margin-top: 100px"
            />
            <p class="mt-24 gray">Your betting list is empty</p>
          </div>
        </div>
        <div v-else>
          <div v-if="state.active === 'history'">
            <template v-if="getHistoryList?.length">
              <div
                v-for="(item, index) in getHistoryList"
                class="mb-16"
                :key="index"
              >
                <ResultItem :info="item" />
              </div>
            </template>
            <div class="flex flex-col items-center justify-center" v-else>
              <img
                src="../../images/zyq0425/kongL.png"
                style="width: 120px; margin-top: 100px"
              />
              <p class="mt-24 gray">Your betting list is empty</p>
            </div>
          </div>
          <div v-if="state.active === 'pending'">
            <template v-if="getPendingList?.length">
              <div
                v-for="(item, index) in getPendingList"
                class="mb-16"
                :key="index"
              >
                <ResultItem :info="item" />
              </div>
            </template>
            <div class="flex flex-col items-center justify-center" v-else>
              <img
                src="../../images/zyq0425/kongL.png"
                style="width: 120px; margin-top: 100px"
              />
              <p class="mt-24 gray">Your betting list is empty</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
import ResultItem from "@/sport/components/result/item.vue";

export default defineComponent({
  components: {
    BetItem,
    BetInput,
    DeleteIcon,
    BetModal,
    Mask,
    Speed,
    BetPane,
    ResultItem,
  },
  props: {},
  emits: ["bet"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      active: "history",
      betList: [],
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const SPORT_BET = inject("SPORT_BET");
    const RESULT = inject("RESULT");
    const getResultList = computed(() => {
      return RESULT.resultList.value;
    });
    // 已结算状态
    const getHistoryList = computed(() => {
      return RESULT.resultList.value?.filter((item) => item.isSettled);
    });
    // 未结算状态
    const getPendingList = computed(() => {
      return RESULT.resultList.value?.filter((item) => !item.isSettled);
    });

    const BET = inject("BET");

    const handleChangeBetType = (e) => {
      state.active = e;
    };
    const getBetType = computed(() => {
      return BET.value?.betType;
    });
    const isLink = computed(() => ACCOUNTS.isLink?.value);

    return {
      state,
      isLink,
      getResultList,
      getHistoryList,
      getPendingList,
      handleChangeBetType,
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
