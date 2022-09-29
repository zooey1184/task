<template>
  <div class="flex items-center h-100p p-8 justify-between">
    <div>
      <SwitchApp />
    </div>
    <div>user</div>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import SwitchApp from "@/components/switch-app";

export default defineComponent({
  components: {
    SwitchApp,
  },
  props: {},
  setup(props) {
    const state = reactive({});

    return {
      state,
    };
  },
});
</script>
