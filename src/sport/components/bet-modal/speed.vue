<template>
  <div>
    <div
      class="active-color mt-24 font-size-20 font-weight-600 text-align-center"
    >
      DEFAULT TRANSACTION SPEED
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="flex items-center justify-between mt-8">
      <div
        class="item"
        :class="{ 'item-active': state.speedValue === item.value }"
        v-for="item in state.speed"
        @click="handlePickSpeed(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div
      class="active-color font-size-20 font-weight-600 text-align-center mt-24"
    >
      SWAPS & LIQUIDITY
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="text-align-center">SLIPPAGE TOLERANCE</div>
    <div class="flex items-center justify-between mt-8">
      <div
        class="item"
        :class="{ 'item-active': state.toleranceValue === item.value }"
        v-for="item in state.tolerance"
        @click="handlePickTolerance(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div
      class="active-color font-size-20 font-weight-600 text-align-center mt-24"
    >
      TX DEADLINE (MINS)
      <QuestionCircleOutlined class="color-purple" />
    </div>
    <div class="flex items-center justify-between mt-8">
      <div
        class="item"
        :class="{ 'item-active': state.timeCutValue === item.value }"
        v-for="item in state.timeCut"
        @click="handlePickTimecut(item)"
      >
        {{ item.label }}
      </div>
    </div>

    <div class="confirmBtn" @click="handleConfirm">PLACE BET</div>
  </div>
</template>

<script>
import { defineComponent, inject, reactive } from "vue";
import { QuestionCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    QuestionCircleOutlined,
  },
  props: {},
  emits: ["ok"],
  setup(props, { emit }) {
    const state = reactive({
      // 响应速度
      speed: [
        {
          label: "STANDARD(5)",
          value: "5",
        },
        {
          label: "FAST(6)",
          vlaue: "6",
        },
        {
          label: "INSTANT(7)",
          value: "7",
        },
      ],
      speedValue: "5",
      // 滑动 =》 承受风险值
      tolerance: [
        {
          label: "5%",
          value: "5",
        },
        {
          label: "10%",
          value: "10",
        },
        {
          label: "20%",
          value: "20",
        },
      ],
      toleranceValue: "5",
      timeCut: [
        {
          label: "20",
          value: "20",
        },
      ],
      timeCutValue: "20",
    });

    const SPORT_BET = inject("SPORT_BET");
    const handlePickSpeed = (item) => {
      state.speedValue = item.value;
    };
    const handlePickTolerance = (item) => {
      state.toleranceValue = item.value;
    };
    const handlePickTimecut = (item) => {
      state.timeCutValue = item.value;
    };

    const handleConfirm = () => {
      SPORT_BET.setState({
        betConfig: {
          tolerance: state.toleranceValue,
          speed: state.speedValue,
          timeCut: state.timeCutValue,
        },
      });
      emit("ok");
    };

    return {
      state,
      handlePickSpeed,
      handlePickTolerance,
      handlePickTimecut,
      handleConfirm,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  width: 120px;
  height: 38px;
  line-height: 32px;
  font-weight: 600;
  text-align: center;
  color: var(--primary-main);
  border: 2px solid var(--primary-main);
  border-radius: 8px;
}
.item-active {
  background: var(--primary-main);
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
  &:active {
    opacity: 0.8;
  }
}
</style>
