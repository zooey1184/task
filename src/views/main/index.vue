<template>
  <Layout :siderWidth="250" headerTheme="light" :collapsedWidth="0">
    <template #logo>
      <div
        class="p-16 color-white text-align-center font-weight-600 font-size-18"
      >
        ADMIN
      </div>
    </template>
    <template #header>
      <div class="h-100p">
        <Header />
      </div>
    </template>
    <template #sider="{ theme, bg, color }">
      <div>
        <Sider :theme="theme" :bg="bg" :color="color" />
      </div>
    </template>
    <div class="h-100p flex flex-col">
      <div class="flex-0">
        <Navs />
      </div>
      <div class="flex-1 h-100p overflow-auto">
        <router-view></router-view>
      </div>
    </div>
  </Layout>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Layout from "@/layout";
import Sider from "./sider.vue";
import Header from "./header.vue";
import Navs from "@/components/nav-tab";

export default defineComponent({
  components: {
    Layout,
    Sider,
    Header,
    Navs,
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
