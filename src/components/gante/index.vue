<template>
  <div>
    <div class="wrap flex">
      <div class="left">
        <div class="col bg-gray-50">helo</div>
      </div>
      <div class="right overflow-auto scrollbar">
        <div class="time flex items-center">
          <div v-for='item in 50' class="timeItem flex-0">{{item}}</div>
    
        </div>
        <div class="flex items-center" style="height: 26px">
          <div v-for='item in 50' class="timeItem flex-0 h-100p" style="border: 1px solid #ddd"></div>
        </div>
      </div>
    </div>

    <Slide />
  </div>
</template>

<script>
import {reactive, defineComponent} from 'vue'
import Slide from './slide.vue'

export default defineComponent({
  components: {
    Slide
  },
  setup() {
    const state = reactive({})

    return {
      state
    }
  }
})
</script>

<style lang="less" scoped>
.left {
  width: 120px;
  .col {
    height: 80px;
  }
}
.right {
  width: calc(100% - 120px);
  .timeItem {
    height: 24px;
    width: 24px;
  }
}
.g-scroll {
  background:
        linear-gradient(#fff, transparent 100%),
        linear-gradient(90deg, rgba(0, 0, 0, .3), transparent 100%);
    background-size: 5px 80px;
    background-repeat: no-repeat;
    background-attachment: local, scroll;
}
</style>