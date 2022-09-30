<template>
  <div class="pos-r">
    <!-- 顶部 header 的隐藏切换触发器 -->
    <div
      v-if="showHeaderTrigger && showHeader"
      class="headerCollapseIcon flex items-center justify-center"
      @click="handleHeaderCollapse"
    >
      <CaretDownOutlined />
    </div>

    <div class="flex body">
      <a-layout-sider
        v-model:collapsed="state.siderCollapse"
        v-if="showSider"
        :class="{ [`siderPane-${getTheme}`]: true }"
        :theme="getTheme"
        :collapsedWidth="collapsedWidth"
        :trigger="null"
        collapsible
      >
        <slot
          name="logo"
          v-bind="{ collapsed: state.siderCollapse, theme: getTheme }"
        ></slot>
        <slot
          name="sider"
          v-bind="{
            collapsed: state.siderCollapse,
            theme: getSiderTheme,
            bg: getSiderBg,
            color: getSiderColor,
          }"
        ></slot>
        <!-- 侧边栏触发器 -->
        <div
          v-if="showSiderTrigger && showSider"
          class="siderCollapseIcon flex items-center justify-center"
          :class="{ [`collapseIcon-${getTheme}`]: true }"
          @click="handleSiderCollapse"
        >
          <CaretRightOutlined
            class="trans"
            :class="{ rotate: state.siderCollapse }"
          />
        </div>
      </a-layout-sider>
      <section class="overflow-hidden flex-1">
        <header
          class="header flex items-center"
          :class="{ [`headerPane-${getHeaderTheme}`]: true }"
          :style="{
            height: `${state.height}px`,
            background: getHeaderBg,
            color: getHeaderColor,
          }"
        >
          <div class="flex-1 h-100p">
            <slot name="header" v-bind="{ theme: getHeaderTheme }"></slot>
          </div>
          <div class="extraIcon flex-0">
            <slot name="headerExtra" v-bind="{ theme: getHeaderTheme }"></slot>
          </div>
        </header>
        <div
          class="trans bg-grey"
          :style="{ height: `calc(100vh - ${state.height}px)` }"
        >
          <slot></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
} from "@ant-design/icons-vue";
import uselayout from "./useLayout";
import CommonProps from "./commonProps";

export default defineComponent({
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
  },
  props: {
    ...CommonProps,
  },
  emits: ["update:siderCollapse", "update:headerCollapse"],
  setup(props, { emit, expose }) {
    const layout = uselayout(props, { emit, expose });
    return {
      ...layout,
    };
  },
});
</script>

<style lang="less" scoped>
@h: 64px;
.header {
  height: @h;
  transition: all 150ms linear;
  overflow: hidden;
}
.headerPane-light {
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px solid #eee;
}
.headerPane-dark {
  border-bottom: 1px solid #333;
  box-shadow: 0 1px solid #333;
}
.trans {
  transition: all 150ms linear;
}
.body {
  transition: all 150ms linear;
  height: 100vh;
}
.sider {
  transition: all 150ms linear;
  overflow: hidden;
}
.triggerIcon {
  position: absolute;
  // background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: all 100ms linear;
  // &:hover {
  //   color: #fff;
  //   background: #999;
  // }
}
.headerCollapseIcon {
  .triggerIcon;
  width: 40px;
  font-size: 12px;
  height: 12px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.siderCollapseIcon {
  .triggerIcon;
  width: 10px;
  height: 40px;
  right: -10px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  top: 50%;
  font-size: 12px;
  transform: translateY(-50%);
}
.commonSider {
  z-index: 1;
}
.siderPane-light {
  border-right: 1px solid #eee;
  box-shadow: 0 0 5px #eee;
  .commonSider;
}
.siderPane-dark {
  .commonSider;
  border-right: 1px solid #333;
  box-shadow: 0 0 5px #333;
}
.collapseIcon-dark {
  background: #333;
  color: #fff;
}
.collapseIcon-light {
  background: #fff;
  color: #333;
}
</style>
