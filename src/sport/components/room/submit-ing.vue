<template>
  <div>
    <div class="active-color font-size-18 font-weight-600 text-align-center">
      SUBMITTING
    </div>
    <div class="mt-48 mb-32 flex justify-center">
      <img style="width: 150px" src="../../images/v2/room-up.png" />
    </div>
    <div class="text-align-center color-black">TRANSCATION SUBMITTED</div>
    <div class="text-align-center gray-link">VIEW ON ETHERSCAN</div>

    <div class="confirmBtn active-bg mt-48 mb-32" @click="handleClose">
      CLOSE
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
  emits: ["close"],
  setup(props, { emit }) {
    const state = reactive({});
    const handleClose = () => {
      emit("close");
    };
    return {
      state,
      handleClose,
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
.gray-link {
  color: #bbb;
  text-decoration: underline;
}
</style>
