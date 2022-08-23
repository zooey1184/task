<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      IDENTITY
      <div>CONFIRMATION REQUIRED</div>
    </div>
    <div class="mt-8 mb-16 flex justify-center">
      <img style="width: 200px" src="../../images/v2/room-wallet.png" />
    </div>
    <div class="text-align-center line-height-18">
      CREATING REQUIRES
      <div>YOU TO VERIFY AUTHENTICATION IN YOUR WALLET</div>
    </div>

    <div class="flex items-center justify-center m-24">
      <img
        class="spin"
        style="width: 50px"
        src="../../images/v2/room-loading.png"
      />
      <!-- <div class="font-size-18 font-weight-600 ml-16">签名请求</div> -->
    </div>
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
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0);
  }
}
</style>
