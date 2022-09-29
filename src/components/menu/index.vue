<template>
  <a-menu
    v-model:selectedKeys="current"
    :theme="theme"
    :mode="mode"
    @select="handleChange"
    v-model:openKeys="state.openKeys"
    @click="handleClick"
  >
    <template v-for="item in menuList">
      <sub-menu
        v-if="item.children && item.children.length"
        :key="item.key"
        :menu-info="item"
      />
      <a-menu-item
        v-if="!(item.children && item.children.length)"
        :key="item.key"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <Icon
              v-if="item.icon"
              :icon="item.icon"
              class="flex items-center"
            />
            <span class="title">{{ item.title }}</span>
          </div>
        </div>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script>
import { defineAsyncComponent, reactive, ref, watch } from "vue";
import { Menu } from "ant-design-vue";
import SubMenu from "./sub-menu.vue";

const Icon = defineAsyncComponent(() => import("@/components/icon"));
export default {
  components: {
    "a-menu": Menu,
    "a-menu-item": Menu.Item,
    SubMenu,
    Icon,
  },
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    mode: {
      type: String,
      default: "horizontal",
    },
    theme: {
      type: String,
      default: "dark",
    },
    value: {
      type: Array,
      default: () => [],
    },
    openKeys: {
      type: Array,
    },
  },
  emits: ["update:value", "change", "select", "click", "update:openKeys"],
  setup(props, { emit }) {
    // const defaultValue = props.value?.length
    //   ? props.value
    //   : [props.menuList?.[0]?.key || '']

    // console.log(defaultValue)

    const getKey = (list, key, t = []) => {
      const _t = t;
      if (props.value?.length) {
        return props.value;
      }
      _t.push(key);
      const item = list.find((item) => item.key === key);
      if (item?.children?.length) {
        const _key = item.children[0].key;
        return getKey(item.children, _key, _t);
      }
      return _t;
    };
    const getInitValue = () => {
      if (props.value?.length) {
        return props.value;
      } else {
        const key = props?.menuList?.[0]?.key;
        return getKey(props.menuList, key, []);
      }
    };

    const current = ref(getInitValue());

    const state = reactive({
      openKeys: props.openKeys,
    });

    watch(
      () => props.openKeys,
      (n) => {
        state.openKeys = n;
      },
      {
        immediate: true,
      }
    );

    watch(
      () => state.openKeys,
      (n) => {
        emit("update:openKeys", n);
      }
    );
    watch(
      () => props.menuList,
      (e) => {
        current.value = getKey(e, e[0].key, []);
      }
    );

    watch(
      () => props.value,
      (n) => {
        current.value = n;
      }
    );

    const handleOpenNewWindow = (e) => {
      window.open(e.path);
      console.log(e);
    };
    const handleChange = (e, t) => {
      emit("update:value", [e.key]);
      emit("select", e, t);
    };

    watch(
      () => current.value,
      (e) => {
        emit("change", e);
      }
    );

    const handleClick = (e) => {
      emit("click", e);
    };
    return {
      current,
      handleChange,
      handleOpenNewWindow,
      handleClick,
      state,
    };
  },
};
</script>
