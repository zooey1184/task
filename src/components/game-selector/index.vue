<template>
  <a-modal v-model:visible="state.visible" width="80%" :closable="false">
    <template #title>
      <Header />
    </template>
    <div style="max-height: 50vh" class="overflow-hidden pos-r">
      <Content :options="state.data" />
    </div>

    <template #footer>
      <Footer />
    </template>
  </a-modal>
</template>

<script>
import { defineComponent, onMounted, reactive, watch } from "vue";
import Header from "./header.vue";
import Content from "./content.vue";
import Footer from "./footer.vue";
import getData from "./data-mock";

export default defineComponent({
  components: {
    Header,
    Content,
    Footer,
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
      data: [],
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

    const handleGetData = () => {
      getData().then((res) => {
        console.log(res);
        state.data = res;
      });
    };

    onMounted(() => {
      handleGetData();
    });

    return {
      state,
    };
  },
});
</script>
