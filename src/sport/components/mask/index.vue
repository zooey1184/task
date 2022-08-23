<template>
  <div>
    <Transition name="fade">
      <div
        class="mark--full"
        v-if="state.visible"
        :style="{ background: 'rgba(0, 0, 0, 0.5)' }"
      ></div>
    </Transition>
    <Transition name="slide-fade">
      <div class="alert__content" v-if="state.visible">
        <div class="content" @click.stop>
          <slot></slot>
          <div class="close-icon" @click="handleClose">
            <close-circle-outlined style="font-size: 24px" />
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from "vue";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    CloseCircleOutlined,
  },
  props: {
    visible: {
      type: Boolean,
    },
  },
  emits: ["update:visible"],
  setup(props, { emit }) {
    const state = reactive({
      visible: false,
      test: false,
    });

    watch(
      () => props.visible,
      (n) => {
        state.visible = n;
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

    const handleClose = () => {
      state.visible = false;
    };

    return {
      state,
      handleClose,
    };
  },
});
</script>

<style scoped lang="less">
.flex {
  display: flex;
}
.flex_1 {
  flex-grow: 1;
}
.flex_0 {
  flex-shrink: 0;
}
.fade-enter-active {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.fade-leave-active {
  -webkit-transition: all 0.2s linear;
  transition: all 0.2s linear;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: scaleY(0.6) translateY(120px);
  opacity: 0;
}

.full {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.mark--full {
  .full;
  z-index: 99;
  background: rgba(255, 255, 255, 0.5);
}
.noSelect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Chrome/Safari/Opera */
  -khtml-user-select: none; /* Konqueror */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currentlynot supported by any browser */
}
.lastBtn {
  position: relative;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 1px;
    height: 100%;
    background: #ddd;
    transform: scaleX(0.5);
    transform-origin: 0 0;
    content: "";
  }
}
.alert__content {
  z-index: 99;
  .full;
  .content {
    width: 90%;
    max-width: 450px;
    display: block;
    margin: 0 auto;
    background: #fff;
    position: relative;
    border-radius: 12px;
    top: 45%;
    transform: translateY(-50%);
    padding: 16px 24px;
    min-height: 100px;
    color: #333;
  }
}
.close-icon {
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  &:hover {
    color: var(--primary-main);
  }
}
</style>
