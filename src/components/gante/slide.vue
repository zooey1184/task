<template>
  <div class="wrap" ref='wrap'>
    <div class="slide flex items-center" ref='slide' :style="{left: `${state.x}px`, width: `${state.width}px`}">
    <div class="drag" @mousedown="handleMouseDown" >
      <IconDrag />
    </div>
    helo
  </div>
  </div>
</template>

<script>
import {ref, reactive, defineComponent, onMounted} from 'vue'
import IconDrag from './icon-drag.vue'

export default defineComponent({
  components: {
    IconDrag
  },
  setup() {
    const slide = ref()
    const wrap = ref()
    const state = reactive({
      x: 100,
      initX: 0,
      width: 100,
      isDrag: false,
      rect: {},
      slideRect: {}
    })

    const handleMouseDown = (e) => {
      state.initX = e.x
      state.isDrag = true
      state.slideRect = slide.value.getBoundingClientRect()
    }

    const handleMouse = (e) => {
      if (state.isDrag) {
        console.log(e)
        
      }
    }

    onMounted(() => {
      window.addEventListener('mouseup', (e) => {
        state.isDrag = false
      })
      window.addEventListener('mousemove', (e) => {
        if (state.isDrag) {
          const offset = e.x - state.rect.x
          state.x = offset - 10 >=0 ? offset-10 : -0
        }
      })
      const rect = wrap.value.getBoundingClientRect()
      state.rect = rect
    })
    return {
      state,
      wrap,
      slide,
      handleMouseDown,
      handleMouse
    }
  }
})
</script>

<style lang="less" scoped>
.slide {
  height: 24px;
  position: relative;
  background: rgb(240, 81, 18);
  border-radius: 4px;
}
.drag {
  cursor: grab;
  user-select: none;
  &:active {
    cursor: grabbing;
  }
}
</style>