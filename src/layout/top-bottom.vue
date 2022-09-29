<template>
  <div class="pos-r">
    <!-- 顶部 header 的隐藏切换触发器 -->
    <div
      v-if="showHeaderTrigger && showHeader"
      class="headerCollapseIcon flex items-center justify-center"
      @click="handleHeaderCollapse"
    >
      <CaretUpOutlined
        class="trans"
        :class="{ rotate: state.headerCollapse }"
      />
    </div>

    <header
      class="header flex items-center justify-between"
      :class="{ [`headerPane-${getTheme}`]: true }"
      :style="{
        height: `${state.height}px`,
        background: getTheme === 'light' ? '#fff' : '#001529',
        color: getTheme === 'light' ? '#333' : '#fff',
      }"
    >
      <slot
        name="logo"
        v-bind="{ collapsed: state.headerCollapse, theme: getTheme }"
      ></slot>
      <div class="h-100p flex-1">
        <slot name="header" v-bind="{ theme: getTheme }"></slot>
      </div>
      <div class="extraIcon flex-0">
        <slot name="headerExtra" v-bind="{ theme: getTheme }"></slot>
      </div>
    </header>
    <div
      class="flex body"
      :style="{
        height: `calc(100vh - ${state.height}px)`,
      }"
    >
      <a-layout-sider
        v-model:collapsed="state.siderCollapse"
        class="color-black"
        :class="{ [`siderPane-${getTheme}`]: true }"
        :theme="getTheme"
        v-if="showSider"
        :collapsedWidth="collapsedWidth"
        :trigger="null"
        collapsible
      >
        <div class="h-100p overflow-auto scrollbar">
          <slot
            name="sider"
            v-bind="{ collapsed: state.siderCollapse, theme: getTheme }"
          ></slot>
        </div>
        <!-- 侧边栏 sider 隐藏切换触发器 -->
        <div
          v-if="showSiderTrigger && showSider"
          class="siderCollapseIcon flex items-center justify-center"
          :class="{ [`collapseIcon-${getTheme}`]: true }"
          @click="handleSiderCollapse"
        >
          <CaretLeftOutlined
            class="trans"
            :class="{ rotate: state.siderCollapse }"
          />
        </div>
      </a-layout-sider>
      <div class="overflow-x-hidden overflow-y-auto scrollbar flex-1 bg-grey">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import {
  CaretDownOutlined,
  CaretRightOutlined,
  CaretUpOutlined,
  CaretLeftOutlined,
} from "@ant-design/icons-vue";
import uselayout from "./useLayout";
import CommonProps from "./commonProps";

export default defineComponent({
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
    CaretUpOutlined,
    CaretLeftOutlined,
  },
  props: {
    ...CommonProps,
  },
  emits: ["udpate:siderCollapse", "update:headerCollapse"],
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
  box-shadow: 0 0 5px #eee;
}
.headerPane-light {
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px solid #eee;
}
.headerPane-dark {
  border-bottom: 1px solid #333;
  box-shadow: 0 1px solid #333;
}
.body {
  transition: all 150ms linear;
}
.sider {
  transition: all 150ms linear;
  overflow: hidden;
}
.triggerIcon {
  position: absolute;
  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: all 100ms linear;
  z-index: 99;
  &:hover {
    color: #fff;
    background: #999;
  }
}
.headerCollapseIcon {
  .triggerIcon;
  width: 40px;
  font-size: 12px;
  height: 12px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #999;
}
.siderCollapseIcon {
  .triggerIcon;
  width: 10px;
  height: 40px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  font-size: 12px;
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
}
.trans {
  transition: all 100ms linear;
}
.rotate {
  transform: rotate(180deg);
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
  border-right: 1px solid rgb(0, 21, 41);
  box-shadow: 0 0 5px rgba(0, 21, 41, 0.555);
}
.collapseIcon-dark {
  background: rgb(0, 21, 41);
  color: #fff;
}
.collapseIcon-light {
  background: #fff;
  color: #333;
}
</style>
