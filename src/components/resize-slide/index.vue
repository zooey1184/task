<template>
  <div class="slide-wrap flex">
    <div
      class="slide-pane bg-gold"
      :style="{ left: `${state.left}px`, width: `${state.width}px` }"
    >
      <div class="slide-content"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import interact from "interactjs";

const MIN = 24;
export default defineComponent({
  components: {},
  props: {},
  setup(props) {
    const state = reactive({
      width: 100,
      left: 100,
      x: 0,
      y: 0,
    });

    interact(".slide-pane").resizable({
      edges: { top: false, left: true, bottom: false, right: true },
      listeners: {
        move: function (event) {
          let { x, y } = event.target.dataset;

          x = (parseFloat(x) || 0) + event.deltaRect.left;
          y = (parseFloat(y) || 0) + event.deltaRect.top;
          const w = event.rect.width <= MIN ? MIN : event.rect.width;
          Object.assign(event.target.style, {
            width: `${w}px`,
            height: `${event.rect.height}px`,
            transform: `translate(${x}px, ${y}px)`,
          });

          Object.assign(event.target.dataset, { x, y });
        },
      },
    });
    interact(".slide-pane").draggable({
      listeners: {
        start(event) {
          console.log(event.type, event.target);
        },
        move(event) {
          state.x += event.dx;
          state.y += event.dy;

          event.target.style.transform = `translate(${state.x}px, ${state.y}px)`;
        },
      },
    });

    return {
      state,
    };
  },
});
</script>

<style lang="less" scoped>
.slide-pane {
  position: relative;
  height: 24px;
  border-radius: 4px;
}
</style>
