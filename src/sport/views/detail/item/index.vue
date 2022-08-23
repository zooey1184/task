<template>
  <div class="m-item">
    <m-item v-bind="$props"></m-item>
  </div>
  <div class="p-item">
    <p-item v-bind="$props"></p-item>
  </div>
</template>

<script>
import { ref, defineComponent } from "vue";
import MItem from "./m-item.vue";
import PItem from "./p-item.vue";

export default defineComponent({
  components: {
    "m-item": MItem,
    "p-item": PItem,
  },
  props: {
    name: {
      type: String,
    },
    homeInfo: {
      type: Object,
    },
    awayInfo: {
      type: Object,
    },
    oddsId: {
      type: [String, Number],
    },
  },
  setup() {},
});
</script>

<style lang="less" scoped>
.p-item {
  display: block;
  @media (max-width: 1360px) {
    display: none;
  }
}

.m-item {
  display: none;
  @media (max-width: 1360px) {
    display: block;
  }
}
</style>
