<template>
  <div>
    <component v-bind="$attrs" :is="state.layout">
      <template #header>
        <slot name="header"></slot>
      </template>
      <template #headerExtra>
        <setting-outlined v-if="showConfig" @click="handleOpenDrawer" />
        <slot name="headerExtra"></slot>
      </template>
      <template #sider>
        <slot name="sider"></slot>
      </template>
      <template #default>
        <slot></slot>
      </template>
    </component>

    <Drawer
      v-model:visible="state.visible"
      :layout="state.layout"
      @ok="handleConfirmDrawer"
    />
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import TopBottomLayout from "./top-bottom.vue";
import LeftRightLayout from "./left-right.vue";
import Drawer from "./drawer.vue";
import { SettingOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    tb: TopBottomLayout,
    lr: LeftRightLayout,
    Drawer,
    SettingOutlined,
  },
  props: {
    showConfig: {
      type: Boolean,
    },
  },
  setup(props) {
    const state = reactive({
      layout: "tb", // tb 上下布局  lr 左右布局
      visible: false,
    });

    const handleOpenDrawer = () => {
      state.visible = true;
    };

    const handleConfirmDrawer = (e) => {
      state.layout = e.layout;
    };

    return {
      state,
      handleOpenDrawer,
      handleConfirmDrawer,
    };
  },
});
</script>
