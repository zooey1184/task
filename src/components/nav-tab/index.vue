<template>
  <div class="wrap scrollbar">
    <NavTab
      :options="getRoutesTab"
      v-model:active="state.active"
      @change="handleGoPage"
      @delete="handleDeleteItem"
    />
  </div>
</template>

<script>
import {
  reactive,
  defineComponent,
  computed,
  onMounted,
  watch,
  nextTick,
} from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { CloseOutlined } from "@ant-design/icons-vue";
import NavTab from "./tab.vue";

export default defineComponent({
  components: {
    CloseOutlined,
    NavTab,
  },
  setup() {
    const state = reactive({
      active: "",
    });
    const store = useStore();
    const router = useRouter();

    const getRoutesTab = computed(() => {
      const list = store.state.routes;
      const _l = [];
      for (let i in list) {
        _l.push({
          ...list[i],
        });
      }
      return _l;
    });

    const getActiveNav = computed(() => {
      const name = router.currentRoute.value.name;
      return name;
    });

    watch(
      () => getActiveNav.value,
      (n) => {
        // @ts-ignore
        state.active = n;
      },
      {
        immediate: true,
      }
    );

    const handleGoPage = (/** @type {any} */ item) => {
      // @ts-ignore
      const t = item?.path?.split("/")?.filter((ii) => !!ii)?.[0];
      store.commit("SET_DATA", {
        app: t,
      });
      router.push(item.fullPath);
    };

    const handleDeleteItem = (/** @type {{ name: any; }} */ item) => {
      const name = item.name;
      const list = store.state.routes;
      const _map = {};
      const index = getRoutesTab.value.findIndex((ii) => ii.name === name);

      for (let i in list) {
        if (list[i].name !== name) {
          // @ts-ignore
          _map[i] = list[i];
        }
      }
      store.commit("SET_DATA", {
        routes: _map,
      });
      setTimeout(() => {
        if (index > 0) {
          const _item = getRoutesTab.value[index - 1];
          state.active = _item.name;
          handleGoPage(_item);
        } else {
          state.active = getRoutesTab.value[0].name;
          handleGoPage(getRoutesTab.value[0]);
        }
      }, 20);
    };

    onMounted(() => {
      // @ts-ignore
      state.active = router.currentRoute.value.name;
    });

    return {
      state,
      handleGoPage,
      getActiveNav,
      handleDeleteItem,
      getRoutesTab,
    };
  },
});
</script>

<style lang="less" scoped>
.wrap {
  overflow-x: auto;
  overflow-y: hidden;
  --scrollbar-height: 1px;
  // background: #fff;
}
.tabItem {
  max-width: 120px;
  padding: 4px 6px;
  margin-bottom: -1px;
  // border: 1px solid #eee;
  border-bottom: none;
  background: #fff;
  border-radius: 6px;
  font-size: 12px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  transition: all 100ms linear;
  // transition: all linear 300ms;
  will-change: padding-right;
  position: relative;
  cursor: pointer;
  &:hover {
    // color: #fff;
    opacity: 0.8;
  }
}
.radiusSide {
  box-shadow: 6px 18px 0 0 #1890ff, -6px 18px 0 0 #1890ff;
  &:before {
    content: "";
    position: absolute;
    left: -11px;
    bottom: 0;
    width: 11px;
    height: 10px;
    background: #fff;
    border-radius: 0 0 20px 0;
  }
  &:after {
    content: "";
    position: absolute;
    right: -11px;
    bottom: 0;
    width: 11px;
    height: 10px;
    background: #fff;
    border-radius: 0 0 0 20px;
  }
}
.tabAct {
  background: #1890ff;
  z-index: 1;
  color: #fff;
}
.closeIcon {
  transition: all 200ms linear;
  &:hover {
    transform: rotate(180deg);
  }
}
</style>
