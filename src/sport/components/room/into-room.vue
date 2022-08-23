<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      CASINO INFORMATION
    </div>
    <div class="color-black text-align-center mt-16">
      AMOUNT OF THE USDT POOL
    </div>
    <div
      class="flex justify-center mt-8 font-weight-600 active-color"
      style="font-size: 48px"
    >
      $10000 USDT
    </div>

    <div class="mt-16">
      <div>CASINO CREATION TIME</div>
      <div class="input-item primary-bg">2022.7.21 5:00AM</div>
    </div>
    <div class="mt-16">
      <div>AMOUNT AT CREATION</div>
      <div class="input-item primary-bg">2022.7.21 5:00AM</div>
    </div>
    <div class="mt-16">
      <div>ADDRESS OF CREATOR</div>
      <div class="input-item primary-bg">2022.7.21 5:00AM</div>
    </div>

    <div class="confirmBtn active-bg mt-48 mb-8">INTO THE CASINO</div>
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
    const state = reactive({
      active: "0",
    });

    const handlePick = (e) => {
      state.active = e;
    };

    return {
      state,
      handlePick,
    };
  },
});
</script>

<style lang="less" scoped>
.confirmBtn {
  height: 42px;
  width: 100%;
  text-align: center;
  line-height: 42px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  color: #fff;
}
.input-item {
  height: 38px;
  text-align: center;
  line-height: 38px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 8px;
}
</style>
