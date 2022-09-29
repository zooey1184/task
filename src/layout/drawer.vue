<template>
  <a-drawer v-model:visible="state.visible" title="后台设置" :width="300">
    <div>
      <div>布局</div>
      <div class="flex justify-between">
        <div
          class="item"
          :class="{ activeItem: state.layout === 'tb' }"
          @click="handleSelectLayout('tb')"
        >
          <div class="bg-blue-50 h-15"></div>
          <div class="flex">
            <div
              class="sider w-20 flex-0 bg-gray"
              style="height: 85px; background: #001529"
            ></div>
            <div
              class="content bg-grey h-100p w-100p"
              style="height: 85px"
            ></div>
          </div>
        </div>

        <div
          class="flex item"
          :class="{ activeItem: state.layout === 'lr' }"
          @click="handleSelectLayout('lr')"
        >
          <div
            class="sider w-20 bg-gray"
            style="height: 100px; background: #001529"
          ></div>
          <div class="flex-1">
            <div class="bg-grey h-15"></div>
            <div
              class="content bg-blue-30 w-100p"
              style="height: calc(100% - 15px)"
            ></div>
          </div>
        </div>
      </div>

      <slot></slot>

      <div class="footer flex items-center justify-between">
        <a-button @click="state.visible = false">取消</a-button>
        <a-button type="primary" @click="handleConfirm">确定</a-button>
      </div>
    </div>
  </a-drawer>
</template>

<script>
import { defineComponent, reactive, watch } from "vue";
export default defineComponent({
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: "tb",
    },
  },
  emits: ["update:visible", "ok"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      layout: "tb",
    });
    watch(
      () => props.visible,
      (n) => {
        state.visible = n;
        if (n) {
          state.layout = props.layout;
        }
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.visible,
      (n) => {
        emit("update:visible", n);
      }
    );
    const handleSelectLayout = (/** @type {string} */ e) => {
      state.layout = e;
    };
    const handleConfirm = () => {
      state.visible = false;
      emit("ok", {
        layout: state.layout,
      });
    };
    return {
      state,
      handleConfirm,
      handleSelectLayout,
    };
  },
});
</script>

<style lang="less" scoped>
.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 42px;
  background: #fff;
  padding: 0 16px;
  left: 0;
}
.item {
  padding: 8px;
  width: 48%;
  border: 1px solid #fff;
  &:hover {
    background: #188fff0d;
  }
}
.activeItem {
  border: 1px solid #1890ff;
}
</style>
