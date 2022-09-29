<template>
  <ViewWrap title="dd" showHeader>
    <SiderContent>
      <template #sider>
        <div class="h-100p pos-a">
          <ul class="overflow-auto">
            <li v-for="item in 100">
              {{ item }}helo warningColordddddddddddddddddddddddddddddddddddd
            </li>
          </ul>
        </div>
      </template>
      <div>content</div>
    </SiderContent>
  </ViewWrap>
</template>

<script>
import { defineComponent, reactive } from "vue";
import ViewWrap from "@/components/view-wrap";
import SiderContent from "@/layout/sider-content";
export default defineComponent({
  components: {
    SiderContent,
    ViewWrap,
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
