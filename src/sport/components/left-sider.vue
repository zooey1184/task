<template>
  <article class="LeftCn Huans" :class="{ LeftCO: !state.visible }">
    <ul
      class="LeftUl content"
      :style="{
        height: state.height,
        position: state.visible ? 'relative' : 'absolute',
      }"
    >
      <li
        v-for="(item, index) in options"
        class="leftItem"
        @click="handlePickItem(item)"
      >
        <a
          href="javascript:;"
          class="LeftUla flexC"
          :class="{ on: state.active === item.value }"
        >
          <i class="LeftI" :class="item.icon"></i>
          <p :title="item.label">{{ item.label }}</p>
          <span>{{ item.count || 0 }}</span>
        </a>
      </li>
    </ul>

    <div class="LeftF flexC fl-bet">
      <!-- 多语言 -->
      <a-tooltip placement="right">
        <template #title>Language: English</template>
        <a href="javascript:;" class="LeftFQ flexC fl-cen"
          ><img class="i18n-icon" src="../images/zyq0425/qi01.png"
        /></a>
      </a-tooltip>
      <!-- qa -->
      <div class="LeftW"><img src="../images/icon03.png" /></div>
      <!-- 展开 -->
      <a href="javascript:;" @click="handleToggleVisible" class="LeftRe"></a>
    </div>
  </article>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import { Tooltip } from "ant-design-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    "a-tooltip": Tooltip,
  },
  props: {
    active: {
      type: [String, Number],
    },
    options: {
      type: Array,
    },
  },
  emits: ["update:active"],
  setup(props, { emit }) {
    const router = useRouter();
    const state = reactive({
      active: props.active,
      posIndex: 0,
      visible: false,
      list: [
        // {
        //   label: 'Bundesliga',
        //   value: 'Bundesliga',
        //   count: 23,
        //   icon: 'LeftI1',
        // },
      ],
      height: "calc(100vh - 160px)",
    });

    watch(
      () => props.active,
      (n) => {
        state.active = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
      }
    );

    // 点击展开 收缩
    const handleToggleVisible = () => {
      state.visible = !state.visible;
      if (state.visible) {
        state.height = "calc(100vh - 120px)";
      } else {
        state.height = "calc(100vh - 160px)";
      }
    };

    const handlePickItem = (item) => {
      state.active = item.value;
      const _router = router.currentRoute.value;
      console.log(_router);
      if (_router.name !== "main") {
        router.push({
          name: "main",
        });
      }
    };

    return {
      state,
      handlePickItem,
      handleToggleVisible,
    };
  },
});
</script>

<style lang="less" scoped>
.btm {
  position: fixed;
  bottom: 0;
  left: 0;
}
.content {
  height: calc(100vh - 185px);
  overflow-y: auto;
  overflow-x: hidden;
  position: absolute;
}
.on {
  background: #212a33;
  position: relative;
  color: #64a0fa;
  &:before {
    position: absolute;
    left: 0;
    height: 100%;
    width: 2px;
    background: #336efc;
    content: "";
  }
}
.i18n-icon {
  width: 50%;
  border-radius: 4px;
}
.leftItem {
  &:hover {
    color: #336efc;
    background: #21242c;
  }
  p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
