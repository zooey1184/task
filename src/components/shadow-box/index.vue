<template>
  <div
    class="color-black p-8"
    :class="{ outsetBox: mode === 'outset', insetBox: mode === 'inset' }"
  >
    <slot></slot>
  </div>
</template>

<script>
import { computed, defineComponent, reactive } from "vue";
import { AppstoreOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    AppstoreOutlined,
  },
  props: {
    mode: {
      type: String,
      default: "inset", // 'outset'
    },
    bg: {
      type: String,
      default: "#ffffff",
    },
    shadow: {
      type: String,
      default: "#d9d9d9",
    },
  },
  setup(props) {
    const state = reactive({});
    const getShadow = computed(() => props.shadow);
    const getBg = computed(() => props.bg);

    return {
      state,
      getBg,
      getShadow,
    };
  },
});
</script>

<style lang="less" scoped>
.insetBox {
  border-radius: 5px;
  background: v-bind(getBg);
  box-shadow: inset 2px 2px 6px v-bind(getShadow),
    inset -2px -2px 6px v-bind(getBg);
}
.outsetBox {
  border-radius: 5px;
  background: v-bind(getBg);
  box-shadow: 2px 2px 6px v-bind(getShadow), -2px -2px 6px v-bind(getBg);
}
</style>
