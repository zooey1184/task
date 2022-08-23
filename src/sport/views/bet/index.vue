<template>
  <div class="imgBg"></div>
  <div class="py-16 px-24">
    <HeaderPane />
    <Content />
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import HeaderPane from "./header.vue";
import Content from "./content.vue";

export default defineComponent({
  components: {
    HeaderPane,
    Content,
  },
  props: {},
  setup(props) {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.imgBg {
  background: url("../../images/imgBg.png");
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}
</style>
