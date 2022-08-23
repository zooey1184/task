<template>
  <div class="flex items-center">
    <div class="around" @click="handleShowInfo">
      <img style="width: 36px" src="../images/v2/coin-icon-gray.png" alt="" />
    </div>
    <div>
      <div>{{ address }}</div>
      <div class="progress primary-dark-bg">
        <div class="active-bg insetP">100/1000</div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
  props: {
    address: {
      type: String,
      default: "****",
    },
  },
  emits: ["info"],
  setup(props, { emit }) {
    const state = reactive({});

    const handleShowInfo = () => {
      emit("info");
    };
    return {
      state,
      handleShowInfo,
    };
  },
});
</script>

<style lang="less" scoped>
.around {
  padding: 4px;
  border-radius: 30px;
  background: #fff;
  margin-right: 8px;
}
.progress {
  width: 100px;
  height: 16px;
  border-radius: 10px;
  font-size: 12px;
  overflow: hidden;
  position: relative;
}
.insetP {
  position: absolute;
  height: 100%;
  line-height: 16px;
  border-radius: 10px;
  padding: 0 4px;
}
</style>
