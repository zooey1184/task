<template>
  <Menu
    :menuList="menuList"
    mode="inline"
    :theme="theme"
    :style="getSiderStyle"
    v-model:value="state.active"
  />
</template>

<script>
import { computed, defineComponent, onBeforeMount, reactive, watch } from "vue";
import { CrownOutlined } from "@ant-design/icons-vue";
import Menu from "@/components/menu";
import { useRouter } from "vue-router";
import { systemMenu } from "@/router/routes";

export default defineComponent({
  components: {
    CrownOutlined,
    Menu,
  },
  props: {
    theme: {
      type: String,
    },
    bg: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  setup(props) {
    const state = reactive({
      menuList: [],
      active: [],
    });
    const getSiderStyle = computed(() => {
      return {
        background: props.bg ?? undefined,
        color: props.color ?? undefined,
      };
    });
    const router = useRouter();

    const menuList = computed(() =>
      // @ts-ignore
      systemMenu
        .map((item) => {
          return item.options;
        })
        .flat()
    );

    const handleChangeMenu = (e) => {
      router.push({
        name: e[0],
      });
    };

    watch(
      () => state.active,
      (e) => {
        router.push({
          name: e[0],
        });
      },
      {
        immediate: true,
      }
    );

    return {
      state,
      menuList,
      getSiderStyle,
      handleChangeMenu,
    };
  },
});
</script>
