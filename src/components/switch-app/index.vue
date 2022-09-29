<template>
  <ShadowBox mode="inset">
    <div class="flex items-center h-100p">
      <AppstoreOutlined class="font-size-16 mr-8" />
      <div>用户画像</div>
    </div>
  </ShadowBox>
</template>

<script>
import { defineComponent, reactive } from "vue";
import ShadowBox from "@/components/shadow-box";
import { AppstoreOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    AppstoreOutlined,
    ShadowBox,
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
.shadowBox {
  border-radius: 5px;
  height: 35px;
  min-width: 100px;
  background: #ffffff;
  box-shadow: inset 2px 2px 6px #d9d9d9, inset -2px -2px 6px #ffffff;
}
</style>
