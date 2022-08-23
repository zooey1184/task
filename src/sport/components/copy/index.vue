<template>
  <div :id="getId" @click="handleCopy" class="flex items-center">
    <slot></slot>
    <img
      src="../../images/icons/doc.png"
      style="width: 12px; margin-left: 4px"
      v-if="!state.copyStatus"
      alt=""
    />
    <!-- <CopyOutlined style="margin-left: 4px" /> -->
    <CheckOutlined style="margin-left: 4px" v-else />
  </div>
</template>

<script>
import { computed, defineComponent, reactive, onMounted } from "vue";
import { CopyOutlined, CheckOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
export default defineComponent({
  components: {
    CopyOutlined,
    CheckOutlined,
  },
  props: {
    text: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  emits: ["copy"],
  setup(props, { emit }) {
    const state = reactive({
      clipboard: undefined,
      copyStatus: false,
    });
    const getId = computed(() => {
      return props.id || `copy_${+new Date()}`;
    });
    const handleCopy = () => {
      state.clipboard = new Clipboard(`#${getId.value}`, {
        text: () => props.text,
      });
      state.clipboard.on("success", (e) => {
        state.copyStatus = true;
        message.success("复制成功");
        emit("copy");
        setTimeout(() => {
          state.copyStatus = false;
        }, 2500);
      });
      setTimeout(() => state.clipboard.destroy());
    };

    return {
      state,
      getId,
      handleCopy,
    };
  },
});
</script>
