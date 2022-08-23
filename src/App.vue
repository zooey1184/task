<template>
  <Layout :siderWidth="250">
    <template #header>
      <div class="h-100p bg-grey"></div>
    </template>
    <template #sider>
      <div class="h-100p color-black">
        <a-menu mode="inline" :inline-collapsed="true">
          <a-sub-menu key="sub1">
            <template #icon>
              <MailOutlined />
            </template>
            <template #title>Navigation One</template>
            <a-menu-item key="1">Option 1</a-menu-item>
            <a-menu-item key="2">Option 2</a-menu-item>
            <a-menu-item key="3">Option 3</a-menu-item>
            <a-menu-item key="4">Option 4</a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="sub2">
            <template #icon>
              <AppstoreOutlined />
            </template>
            <template #title> Navigation Two </template>
            <a-menu-item key="5">Option 5</a-menu-item>
            <a-menu-item key="6">Option 6</a-menu-item>
            <a-sub-menu key="sub3" title="Submenu">
              <a-menu-item key="7">Option 7</a-menu-item>
              <a-menu-item key="8">Option 8</a-menu-item>
            </a-sub-menu>
          </a-sub-menu>
          <a-sub-menu key="sub4">
            <template #icon>
              <SettingOutlined />
            </template>
            <template #title>Navigation Three</template>
            <a-menu-item key="9">Option 9</a-menu-item>
            <a-menu-item key="10">Option 10</a-menu-item>
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-menu>
      </div>
    </template>
    <div class="h-100p">
      <a-button @click="state.visible = true">open</a-button>
    </div>
  </Layout>

  <GameSelectorModal v-model:visible="state.visible" />
</template>

<script>
import { defineComponent, reactive } from "vue";
import Layout from "@/layout";
import GameSelectorModal from "@/components/game-selector";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    Layout,
    GameSelectorModal,
    MailOutlined,
    AppstoreOutlined,
    SettingOutlined,
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
