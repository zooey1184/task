<template>
  <div class="flex items-center mt-24">
    <div
      class="w-50p flex flex-col p-8 items-center justify-center left-tab"
      :class="{ 'active-bg': state.active === 'bet' }"
      @click="state.active = 'bet'"
    >
      <img
        src="../../images/v2/bet.png"
        style="height: 45px"
        v-if="state.active !== 'bet'"
        alt=""
      />
      <img
        src="../../images/v2/bet-white.png"
        style="height: 45px"
        v-if="state.active === 'bet'"
        alt=""
      />
      <div
        class="font-weight-600 mt-8 text-color"
        :class="{ 'color-white': state.active === 'bet' }"
      >
        BET SLIP
      </div>
    </div>
    <div
      class="w-50p flex flex-col p-8 items-center justify-center right-tab"
      :class="{ 'active-bg': state.active === 'mybet' }"
      @click="state.active = 'mybet'"
    >
      <img
        src="../../images/v2/my-bet.png"
        v-if="state.active !== 'mybet'"
        style="height: 45px"
        alt=""
      />
      <img
        src="../../images/v2/mybet-white.png"
        v-if="state.active === 'mybet'"
        style="height: 45px"
        alt=""
      />
      <div
        class="font-weight-600 mt-8 text-color pr-8"
        :class="{ 'color-white': state.active === 'mybet' }"
      >
        MY BET
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";

export default defineComponent({
  components: {},
  props: {
    active: {
      type: String,
    },
  },
  emits: ["update:active"],
  setup(props, { emit }) {
    const state = reactive({
      active: "bet",
    });
    watch(
      () => props.active,
      (n) => {
        state.active = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
      }
    );

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.left-tab {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
}
.right-tab {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
}
</style>
