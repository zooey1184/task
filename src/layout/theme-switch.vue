<template>
  <div
    class="switch-wrap"
    :style="{ background: state.theme === 'dark' ? '#444' : '#e9e9e9' }"
    @click="handleChange"
  >
    <div
      class="container flex items-center justify-center"
      :style="{ left: state.theme === 'dark' ? '20px' : '2px' }"
    >
      <IconSun style="color: #333" v-if="state.theme === 'light'" />
      <IconMoon style="color: #333" v-if="state.theme === 'dark'" />
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent, watch } from "vue";
import IconSun from "./icon-sun.vue";
import IconMoon from "./icon-moon.vue";

export default defineComponent({
  components: {
    IconSun,
    IconMoon,
  },
  props: {
    theme: {
      type: String,
      default: "light",
    },
  },
  emits: ["update:theme"],
  setup(props, { emit }) {
    const state = reactive({
      theme: "light",
    });

    watch(
      () => props.theme,
      (n) => {
        // @ts-ignore
        state.theme = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.theme,
      (n) => {
        emit(`update:theme`, n);
      }
    );

    const handleChange = () => {
      state.theme = state.theme === "dark" ? "light" : "dark";
    };

    return {
      state,
      handleChange,
    };
  },
});
</script>

<style lang="less" scoped>
.switch-wrap {
  width: 40px;
  height: 21px;
  border-radius: 20px;
  background: #eee;
  position: relative;
  // border: 1px solid #999;
  padding: 1px;
  .container {
    width: 18px;
    height: 18px;
    border-radius: 18px;
    background: #fafafa;
    transition: all 100ms linear;
    position: absolute;
    left: 0;
  }
}
</style>
