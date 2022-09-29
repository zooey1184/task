<template>
  <!-- <div class="flex items-center wrap scrollbar">
    <div class="flex items-center pos-r">
      <div class="bottomBar"></div>
      <div
        v-for="(item, index) in getRoutesTab"
        :key="index"
        class="pos-r flex flex-0"
      >
        <div
          class="tabItem"
          :class="{
            tabAct: getActiveNav === index,
            actPre: getActiveNav - 1 === index,
            actNext: getActiveNav + 1 === index,
          }"
        >
          {{ item.title }}
          <close-outlined
            class="closeIcon font-weight-600"
            v-if="getActiveNav === index && getRoutesTab.length > 1"
          />
        </div>
      </div>
    </div>
  </div> -->

  <div>
    <ul class="container">
      <li>
        <img src="https://jestjs.io/img/favicon/favicon.ico" alt="" />
        <span>The Jest Object</span>
        <close-outlined
          class="close flex items-center justify-center font-weight-600"
        />
        <div class="line"></div>
      </li>
      <li class="">
        <span>ChromeTab分栏实现</span>
        <close-outlined
          class="close flex items-center justify-center font-weight-600"
        />
        <div class="line"></div>
      </li>
      <li class="activeTab">
        <img src="https://github.com/fluidicon.png" alt="" />
        <span>chokcoco（Coco）</span>
        <!-- <span class="close flex items-center justify-center">+</span> -->
        <close-outlined
          class="close flex items-center justify-center font-weight-600"
        />
        <div class="line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, defineComponent, computed } from "vue";
import { useRouter } from "vue-router";
// import { useStore } from "vuex";
import { useNavStore } from "@/store/routes";
import { CloseOutlined } from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    CloseOutlined,
  },
  setup() {
    const state = reactive({});
    // const store = useStore();
    const navStore = useNavStore();
    const router = useRouter();

    const getRoutesTab = computed(() => {
      // const list = store.state.routes;
      const navs = navStore.routes;
      console.log(navs.value);
      // const _l = [];
      // for (let i in list) {
      //   _l.push({
      //     ...list[i],
      //   });
      // }
      // return _l;
      return [
        {
          title: "标签管理",
        },
        {
          title: "项目管理",
        },
        {
          title: "任务管理",
        },
      ];
    });

    const getActiveNav = computed(() => {
      // const name = router.currentRoute.value.fullPath;
      // return name;
      return 1;
    });

    const handleGoPage = (/** @type {any} */ item) => {
      // @ts-ignore
      const t = item?.path?.split("/")?.filter((ii) => !!ii)?.[0];
      store.commit("SET_DATA", {
        app: t,
      });
      router.push(item.fullPath);
    };

    const handleDelete = (item) => {
      const name = item.name;
      const list = store.state.routes;
      const _map = {};
      for (let i in list) {
        if (list[i].name !== name) {
          _map[i] = list[i];
        }
      }
      // store.commit("SET_DATA", {
      //   routes: _map,
      // });
    };

    return {
      state,
      handleGoPage,
      getActiveNav,
      handleDelete,
      getRoutesTab,
    };
  },
});
</script>

<style lang="less" scoped>
// .wrap {
//   // border-bottom: 1px solid #ccc;
//   overflow-x: auto;
//   overflow-y: hidden;
//   --scrollbar-height: 1px;
//   // background: #fff;
//   padding-top: 4px;
//   padding-left: 8px;
// }
// .tabItem {
//   max-width: 120px;
//   padding: 4px 6px;
//   margin-bottom: -1px;
//   // border: 1px solid #eee;
//   border-bottom: none;
//   background: #fff;
//   // border-radius: 6px;
//   font-size: 12px;
//   border-bottom-left-radius: 0;
//   border-bottom-right-radius: 0;
//   transition: all 100ms linear;
//   // transition: all linear 300ms;
//   will-change: padding-right;
//   position: relative;
//   cursor: pointer;
//   &:hover {
//     // color: #fff;
//     // opacity: 0.8;
//     background: #036dd0;
//   }
// }
// .radiusSide {
//   box-shadow: 6px 18px 0 0 #1890ff, -6px 18px 0 0 #1890ff;
//   &:before {
//     content: "";
//     position: absolute;
//     left: -11px;
//     bottom: 0;
//     width: 11px;
//     height: 10px;
//     background: #fff;
//     border-radius: 0 0 20px 0;
//   }
//   &:after {
//     content: "";
//     position: absolute;
//     right: -11px;
//     bottom: 0;
//     width: 11px;
//     height: 10px;
//     background: #fff;
//     border-radius: 0 0 0 20px;
//   }
// }
// .tabAct {
//   background: #1890ff;
//   z-index: 1;
//   color: #fff;
//   border-top-left-radius: 5px;
//   border-top-right-radius: 5px;
// }
// .closeIcon {
//   transition: all 200ms linear;
//   &:hover {
//     transform: rotate(180deg);
//   }
// }
// .actPre {
//   border-bottom-right-radius: 6px;
// }
// .actNext {
//   border-bottom-left-radius: 6px;
// }
// .bottomBar {
//   background: #1890ff;
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   width: 100%;
//   height: 5px;
// }

.container {
  background: #dfe1e5;
  height: 40px;
  // margin: 20px auto;
  padding: 8px 8px 0;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  overflow: hidden;
}
ul {
  margin: 0;
}
li {
  position: relative;
  font-size: 12px;
  padding: 0 8px;
  border-radius: 10px 10px 0 0;
  flex-basis: 240px;
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: default;
  transition: 0.3s all;
  white-space: nowrap;

  img {
    width: 16px;
    height: 16px;
    margin-left: 10px;
    margin-right: 10px;
  }

  .line {
    display: none;
    left: -1px;
    top: 6px;
    position: absolute;
    width: 1px;
    height: 20px;
    background: #909090;
  }

  .close {
    right: 0;
    top: 6px;
    position: absolute;
    font-size: 12px;
    margin-right: 5px;
    // transform: rotate(45deg);
    border-radius: 40px;
    // width: 16px;
    // height: 16px;
    padding: 4px;
    transform: scale(0.8);
    background: #fff;

    cursor: pointer;
    // font-weight: bold;

    &:hover {
      background: #d8d8d8;
    }
  }
}

li.activeTab {
  background: #fff;
  z-index: 2;

  &::before,
  &::after {
    border-top: 5px solid #fff;
  }
}

li::before,
li::after {
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 5px solid transparent;
  transition: 0.3s all;
  //border-top: 5px solid #fff;
}

li::before {
  bottom: -5px;
  left: -15px;
  transform: rotate(135deg);
}

li::after {
  bottom: -5px;
  right: -15px;
  transform: rotate(205deg);
}

li + li:not(.activeTab) .line {
  display: block;
}

li:hover:not(.activeTab) {
  background: #f1f3f4;

  .line {
    display: none !important;
  }

  &::before,
  &::after {
    border-top: 5px solid #f1f3f4;
  }
}

li:hover + li {
  .line {
    display: none !important;
  }
}
</style>
