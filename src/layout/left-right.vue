<template>
  <div class="pos-r">
    <!-- 顶部 header 的隐藏切换触发器 -->
    <div
      @click="handleHeaderCollapse"
      v-if="state.headerCollapse && showHeaderTrigger"
      class="headerCollapseIcon flex items-center justify-center"
    >
      <CaretDownOutlined />
    </div>

    <!-- 侧边栏 sider 隐藏切换触发器 -->
    <div
      @click="handleSiderCollapse"
      v-if="state.siderCollapse && showSiderTrigger && state.sider === 0"
      class="siderCollapseIcon flex items-center justify-center"
    >
      <CaretRightOutlined />
    </div>

    <div class="flex body">
      <article class="sider" :style="{ width: `${state.sider}px` }">
        <slot name="sider"></slot>
      </article>
      <section class="overflow-x-hidden overflow-y-auto scrollbar flex-1">
        <header
          class="header flex items-center"
          :style="{ height: `${state.height}px` }"
        >
          <div class="flex-1 h-100p">
            <slot name="header"></slot>
          </div>
          <div class="extraIcon flex-0">
            <slot name="headerExtra"></slot>
          </div>
        </header>
        <div
          class="trans"
          :style="{ height: `calc(100vh - ${state.height}px)` }"
        >
          <slot></slot>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import uselayout from "./useLayout";

export default defineComponent({
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
  },
  props: {
    showHeaderTrigger: {
      type: Boolean,
      default: true,
    },
    showSiderTrigger: {
      type: Boolean,
      default: true,
    },
    headerHeight: {
      type: Number,
      default: 60,
    },
    siderWidth: {
      type: Number,
      default: 200,
    },
  },
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

  background: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  transition: all 100ms linear;
  &:hover {
    color: #fff;
    background: #999;
  }
}
.headerCollapseIcon {
  .triggerIcon;
  width: 80px;
  height: 12px;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.siderCollapseIcon {
  .triggerIcon;
  width: 10px;
  height: 60px;
  border-bottom-left-radius: 0;
  border-top-right-radius: 4px;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
}
</style>
