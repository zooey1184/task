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
import { getMenu } from "@/api/menu";
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

    onBeforeMount(() => {
      // getMenu().then((res) => {
      //   state.menuList = res;
      //   state.active = [res[0].children[0].key];
      // });
      state.menuList = [
        {
          title: "用户",
          key: "user",
        },
      ];
    });

    return {
      state,
      menuList,
      getSiderStyle,
      handleChangeMenu,
    };
  },
});
</script>
