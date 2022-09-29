<template>
  <ViewWrap title="tags" showHeader>
    <div>
      tags
      <ul>
        <li v-for="item in 100">{{ item }}</li>
      </ul>
    </div>
  </ViewWrap>
</template>

<script>
import { defineComponent, reactive } from "vue";
import ViewWrap from "@/components/view-wrap";
import NavTab from "@/components/nav-tab";

export default defineComponent({
  components: {
    ViewWrap,
    NavTab,
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
