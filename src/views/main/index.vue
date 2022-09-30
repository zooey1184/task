<template>
  <Layout :siderWidth="250" headerTheme="light">
    <template #logo="{ collapsed }">
      <div class="color-white logoWrap">
        <img src="@/images/logo.svg" class="logo" alt="" />
        <div class="ml-16 adminTip" v-if="!collapsed">后台管理系统</div>
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

<style lang="less" scoped>
.adminTip {
  white-space: nowrap;
}
.logo {
  width: 28px;
  transition: all 100ms linear;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 120ms ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.logoWrap {
  padding: 16px;
  display: flex;
  margin-left: 8px;
  align-items: center;
  // justify-content: center;
  font-size: 18px;
  font-weight: 600;
  transition: all 100ms linear;
}
</style>
