<template>
  <div class="wrap">
    <div
      class="pos-r overflow-hidden menu cursor-pointer"
      @click="state.value = !state.value"
    >
      <div class="more-line up" :class="{ menu_up: state.value }"></div>
      <div class="more-line mid" :class="{ menu_mid: state.value }"></div>
      <div class="more-line down" :class="{ menu_down: state.value }"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";

export default defineComponent({
  components: {},
  props: {
    value: {
      type: Boolean,
    },
  },
  emits: ["update:value"],
  setup(props, { emit }) {
    const state = reactive({
      value: props.value,
    });
    watch(
      () => props.value,
      (n) => (state.value = n)
    );
    watch(
      () => state.value,
      (n) => emit("update:value", n)
    );

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
@w: 24px;
@h: 2px;
.wrap {
  width: 30px;
  margin-left: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.menu {
  width: @w;
  height: @w;
  .more-line {
    width: @w;
    height: @h;
    border-radius: @h;
    background: #fff;
    transition: all 200ms linear;
    position: absolute;
    top: 0;
    left: 0;
  }
  .mid {
    top: calc(@w / 2 - @h);
  }
  .down {
    top: calc(@w - @h * 2);
  }

  &_up {
    transform: rotate(225deg);
    transform-origin: center center;
    top: calc(@w / 2 - @h) !important;
  }
  &_mid {
    transform: scale(0);
  }
  &_down {
    transform: rotate(135deg);
    transform-origin: center center;
    top: calc(@w / 2 - @h) !important;
  }
}
</style>
