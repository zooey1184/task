<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      AWAITING CONFIRMATION
    </div>
    <div class="mt-48 mb-16 flex justify-center">
      <img style="width: 150px" src="../../images/v2/room-money.png" />
    </div>
    <div class="text-align-center line-height-18 color-black">
      CASINO WILL NO LONGER ACCEPT BETS
    </div>
    <div class="text-align-center line-height-18 color-black">
      THE USDT POOL CAN BE WITHDRAWN AT THE
    </div>
    <div class="text-align-center line-height-18 color-black">
      END OF ALL TOURNAMENTS
    </div>

    <div class="confirmBtn active-bg mt-48 mb-32">CONFIRM</div>
  </div>
</template>

<script>
import { reactive, defineComponent } from "vue";
import { QuestionCircleOutlined, LoadingOutlined } from "@ant-design/icons-vue";
import Circle from "./circle.vue";

export default defineComponent({
  components: {
    QuestionCircleOutlined,
    LoadingOutlined,
    Circle,
  },
  setup() {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.spin {
  animation: loading 3s linear infinite;
}
@keyframes loading {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
.confirmBtn {
  height: 42px;
  width: 100%;
  text-align: center;
  line-height: 42px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
}
</style>
