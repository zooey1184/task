<template>
  <div
    :style="{
      overflow: 'auto',
      position: collapse ? 'absolute' : 'relative',
      height: 'calc(100vh - 120px)',
      overflowX: 'hidden',
      overflowY: 'auto',
    }"
  >
    <div
      class="leftItem flex items-center justify-between"
      v-for="(item, index) in options"
      :class="{ 'active-bg': state.active === item.value }"
      :style="{ width: collapse ? '40px' : '230px' }"
      @click="handlePick(item)"
    >
      <div class="flex items-center flex-1" style="max-width: 200px">
        <i class="leftIcon flex-0 LeftI2"></i>
        <p>{{ item.label }}</p>
      </div>
      <div class="count active-bg flex-0 flex items-center justify-center">
        {{ item.count }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";

export default defineComponent({
  components: {},
  props: {
    collapse: {
      type: Boolean,
    },
    options: {
      type: Array,
    },
  },
  setup(props) {
    const state = reactive({
      options: [],
      active: "",
    });

    const handlePick = (e) => {
      state.active = e.value;
    };

    return {
      state,
      handlePick,
    };
  },
});
</script>

<style lang="less" scoped>
.item {
  height: 42px;
  line-height: 42px;
  &:hover {
    width: 100%;
  }
}
.leftIcon {
  width: 28px;
  height: 28px;
  background-size: 28px;
  margin: 0 8px;
  background-repeat: no-repeat;
}
.leftItem {
  height: 38px;
  line-height: 38px;
  transition: all 200ms linear;
  overflow: hidden;
  border-radius: 10px;
  padding-right: 8px;
  position: relative;
  margin: 8px 0;
  padding-right: 8px;
  &:hover {
    background: #ff0083;
    width: 230px !important;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.count {
  border-radius: 20px;
  width: 20px;
  height: 20px;
}

.pane {
  position: absolute;
  left: 100px;
  width: 200px;
  height: 40px;
  background: #ff0083;
  color: #fff;
  top: 0;
}
</style>
