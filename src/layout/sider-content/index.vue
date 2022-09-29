<template>
  <div
    class="flex h-100p pos-r"
    @mouseup="handleMouseUp"
    @mousemove="handleMouseMove"
  >
    <div
      class="left-pane flex-0 pos-r overflow-auto"
      :class="{ 'no-select': state.drag }"
      :style="{
        width: `${state.x}px`,
        minWidth: getWidth(minWidth),
        maxWidth: getWidth(maxWidth),
      }"
    >
      <slot name="sider"></slot>
    </div>
    <div
      class="middle-drag"
      @mousedown="handleMouseDown"
      :style="{ left: `${state.x - 2}px` }"
    ></div>
    <div
      class="flex-1 h-100p pos-r overflow-auto"
      :class="{ 'no-select': state.drag }"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, onUnmounted, reactive, watch } from "vue";

export default defineComponent({
  components: {},
  props: {
    width: {
      type: Number,
      default: 200,
    },
    minWidth: {
      type: [Number, String],
      default: 0,
    },
    maxWidth: {
      type: [Number, String],
      default: "100%",
    },
  },
  setup(props) {
    const state = reactive({
      drag: false,
      x: 200,
      middleX: 0,
      changeX: 0,
    });
    watch(
      () => props.width,
      (n) => {
        state.x = n;
      },
      {
        immediate: true,
      }
    );
    const getWidth = (t) => {
      if (typeof t === "number") {
        return `${t}px`;
      } else {
        return t;
      }
    };

    const handleMouseDown = (e) => {
      state.drag = true;
      state.middleX = e.clientX;
      state.changeX = state.x;
    };
    const handleMouseUp = () => {
      state.drag = false;
    };
    const handleMouseMove = (e) => {
      const x = state.changeX;
      if (state.drag) {
        const offsetX = e.clientX - state.middleX;
        state.x = offsetX + x;
      }
    };

    onMounted(() => {
      window.addEventListener("mouseup", (e) => {
        console.log("object");
        state.drag = false;
      });
    });

    onUnmounted(() => {});

    return {
      state,
      getWidth,
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
    };
  },
});
</script>

<style lang="less" scoped>
.left-pane {
  width: 200px;
  height: 100%;
  will-change: width;
}

.middle-drag {
  position: absolute;
  top: 0;
  left: calc(200px - 4px);
  height: 100%;
  z-index: 1;
  width: 3px;
  background: #eee;
  cursor: ew-resize;
  will-change: left;
  &:hover {
    background: #1890ff33;
  }
}
.right-pane {
  width: calc(100% - 200px);
}
.no-select {
  user-select: none;
}
</style>
