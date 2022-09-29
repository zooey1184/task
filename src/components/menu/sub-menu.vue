<template>
  <a-sub-menu :key="menuInfo.key" v-bind="$props">
    <template #title>
      <div class="flex items-center">
        <Icon
          v-if="menuInfo.icon"
          :icon="menuInfo.icon"
          class="flex items-center"
        />
        <span>{{ menuInfo.title }}</span>
      </div>
    </template>
    <template v-for="item in menuInfo.children">
      <a-menu-item
        v-if="!item.children"
        :key="item.key"
        @click="tick(item.key)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon
              v-if="item.icon"
              :icon="item.icon"
              class="flex items-center"
            />
            <span>{{ item.title }}</span>
          </div>
        </div>
      </a-menu-item>
      <sub-menu
        v-else
        :key="item.key"
        :menu-info="item"
        @title-click="changeMenu"
      />
    </template>
  </a-sub-menu>
</template>
<script>
import { defineAsyncComponent } from "vue";
import { Menu } from "ant-design-vue";

const Icon = defineAsyncComponent(() => import("@/components/icon"));

export default {
  name: "SubMenu",
  isSubMenu: true,
  components: {
    "a-sub-menu": Menu.SubMenu,
    "a-menu-item": Menu.Item,
    Icon,
  },
  props: {
    ...Menu.SubMenu.props,
    menuInfo: {
      type: Object,
      default: () => ({}),
    },
    selectedKeys: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    // 点击子菜单标题
    changeMenu(menu) {
      this.$emit("titleClick", menu);
    },
    tick(id) {
      this.$emit("itemTick", id);
    },
    // 新开窗口
    handleOpenNewWindow(e) {
      window.open(e.path);
    },
  },
};
</script>
