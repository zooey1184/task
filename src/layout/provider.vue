<template>
  <div @click.meta="handleKeyPress">
    <component
      v-bind="$attrs"
      :siderCollapse="siderCollapse"
      :is="state.layout"
      ref="layoutRef"
    >
      <template #header="{ collapsed, theme }">
        <slot
          name="header"
          v-bind="{ collapsed, theme, layout: state.layout }"
        ></slot>
      </template>
      <template #logo="{ collapsed, theme }">
        <slot
          name="logo"
          v-bind="{ collapsed, theme, layout: state.layout }"
        ></slot>
      </template>
      <template #headerExtra>
        <slot
          name="headerExtra"
          v-bind="{ theme: state.theme, layout: state.layout }"
        ></slot>
      </template>
      <template #sider="{ collapsed, theme }">
        <slot
          name="sider"
          v-bind="{ collapsed, theme, layout: state.layout }"
        ></slot>
      </template>
      <template #default>
        <slot></slot>
      </template>
    </component>

    <Drawer
      v-model:visible="state.visible"
      :layout="state.layout"
      @ok="handleConfirmDrawer"
    >
      <div class="pr-8">
        系统主题色
        <ThemeSwitch v-model:theme="state.theme" />
      </div>
    </Drawer>
  </div>
</template>

<script>
import { ref, defineComponent, reactive, provide, computed, watch } from "vue";
import { SettingOutlined } from "@ant-design/icons-vue";
import TopBottomLayout from "./top-bottom.vue";
import LeftRightLayout from "./left-right.vue";
import Drawer from "./drawer.vue";
import ThemeSwitch from "./theme-switch.vue";

export default defineComponent({
  components: {
    tb: TopBottomLayout,
    lr: LeftRightLayout,
    Drawer,
    SettingOutlined,
    ThemeSwitch,
  },
  props: {
    showConfig: {
      type: Boolean,
    },
    siderCollapse: {
      type: Boolean,
    },
  },
  emits: ["update:siderCollapse"],
  setup(props, { emit, expose }) {
    const layoutRef = ref();
    const state = reactive({
      layout: "lr", // tb 上下布局  lr 左右布局
      visible: false,
      theme: "dark",
      siderCollapse: false,
    });
    const handleOpenDrawer = () => {
      state.visible = true;
    };
    const handleConfirmDrawer = (/** @type {{ layout: string; }} */ e) => {
      state.layout = e.layout;
    };

    // watch(
    //   () => props.siderCollapse,
    //   n => {
    //     // @ts-ignore
    //     state.siderCollapse = n
    //   },
    //   {
    //     immediate: true
    //   }
    // )
    // watch(
    //   () => state.siderCollapse,
    //   n => {
    //     emit(`update:siderCollapse`, n)
    //   }
    // )

    const getTheme = computed(() => state.theme);

    // const colorState = reactive({
    //   primaryColor: '#1890ff',
    //   errorColor: '#ff4d4f',
    //   warningColor: '#faad14',
    //   successColor: '#52c41a',
    //   infoColor: '#1890ff'
    // })

    // const onColorChange = (type: string, e: any) => {
    //   Object.assign(colorState, { [type]: e.target.value })
    //   ConfigProvider.config({
    //     theme: colorState
    //   })
    // }

    provide("LAYOUT", {
      theme: getTheme,
      changeTheme: (/** @type {string} */ e) => {
        state.theme = e;
      },
      handleHeaderCollapse: layoutRef.value?.handleHeaderCollapse,
      handleSiderCollapse: () => {
        const l = layoutRef.value;
        l?.handleSiderCollapse();
      },
      handleGetCollapse: layoutRef.value?.handleGetCollapse,
    });

    const handleKeyPress = (/** @type {any} */ e) => {
      state.visible = !state.visible;
    };
    return {
      state,
      handleOpenDrawer,
      handleConfirmDrawer,
      layoutRef,
      handleKeyPress,
    };
  },
});
</script>
