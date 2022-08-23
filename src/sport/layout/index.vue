<template>
  <div>
    <div class="layout_header primary-bg flex items-center justify-between">
      <div class="flex items-center">
        <div class="mx-lg-show mr-16">
          <!-- <CloseOutlined
            v-if="state.visibleNav"
            class="color-white mr-8 font-size-24"
            @click="state.visibleNav = false"
          />
          <MenuOutlined
            v-else
            @click="handleShowNavmask"
            class="color-white mr-8 font-size-24"
          /> -->
          <MenuIcon v-model:value="state.visibleNav" />
        </div>
        <img
          src="../images/zyq0425/logo.png"
          style="height: 40px; margin-right: 50px"
        />
        <div class="flex items-center lg-show">
          <div
            class="flex flex-col items-center justify-center header_active_item active-bg"
          >
            <img src="../images/v2/esport.png" style="height: 40px" alt="" />
            ELECTRONICS
          </div>
          <div
            class="flex flex-col items-center justify-center header_active_item"
          >
            <img
              src="../images/v2/basketball.png"
              style="height: 40px"
              alt=""
            />
            <p class="font-weight-400 text-color">Basketball</p>
          </div>
          <div
            class="flex flex-col items-center justify-center header_active_item"
          >
            <img src="../images/v2/football.png" style="height: 40px" alt="" />
            <p class="font-weight-400 text-color">Football</p>
          </div>
        </div>
        <!-- <div class="start ml-24">START THE GAME</div> -->
        <RoomBtn />
      </div>
      <div class="flex items-center sm-show">
        <div v-if="isLink">
          <Info
            :address="getAccounts"
            @info="state.infoVisible = !state.infoVisible"
          />
        </div>
        <div v-else class="items-center sellBtn active-color ml-24">
          <CloudUploadOutlined class="mr-8" />
          Wallet
        </div>
      </div>
    </div>

    <div class="body flex">
      <!-- >1560px 出现 表示弹性 -->
      <div
        class="sider flex-0 primary-bg"
        :style="{ width: state.collapse ? '60px' : '250px' }"
      ></div>
      <div class="sider-real-sm flex-0" style="width: 60px"></div>

      <!-- 真实侧边栏 -->
      <div
        class="sider-real primary-bg"
        :style="{ width: state.collapse ? '60px' : '250px' }"
      >
        <Sider :collapse="state.collapse" :options="slideOptions" />
        <div class="sider-bottom">
          <RightOutlined @click="handleToggleCollapse" />
        </div>
      </div>

      <!-- 内容区 -->
      <div class="content flex-1" :class="{ 'bg-blur': !state.collapse }">
        <div class="w-100p color-white">
          <slot></slot>
        </div>

        <div style="height: 60px" class="btm-pane"></div>
      </div>
      <div class="right-sider pos-r primary-bg flex-0">
        <slot name="bet"></slot>
        <div
          class="mine-pane primary-bg"
          :style="{ right: !state.infoVisible ? '-100%' : 0 }"
        >
          <div class="mine-pane">
            <InfoPane />
          </div>
        </div>
      </div>

      <div class="btm-nav color-black flex items-center justify-around">
        <div>电竞</div>
        <div>投注</div>
        <div>我的</div>
      </div>

      <transition name="slide-fade">
        <div class="slide-mask" v-if="state.visible">
          <div @click="handleCloseMask">close</div>
        </div>
      </transition>

      <!-- 导航条的内容区域 -->
      <transition name="slide-down">
        <div class="slide-mask" v-if="state.visibleNav">
          <div style="height: 120px"></div>
          <div>电竞</div>
          <div>足球</div>
          <div>篮球</div>
          <div>info</div>
          <div>set your art</div>
          <div @click="handleCloseNavMask">close</div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, inject, computed } from "vue";
import RoomBtn from "../components/room/room-btn.vue";
import Sider from "./sider.vue";
import {
  RightOutlined,
  CloudUploadOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons-vue";
import Info from "./info-btn.vue";
import MenuIcon from "./menu-icon.vue";
import InfoPane from "./info-pane.vue";

export default defineComponent({
  components: {
    Sider,
    Info,
    RoomBtn,
    RightOutlined,
    CloudUploadOutlined,
    MenuOutlined,
    CloseOutlined,
    MenuIcon,
    InfoPane,
  },
  props: {
    slideOptions: {
      type: Array,
    },
  },
  setup(props) {
    const state = reactive({
      collapse: true,
      visible: false,
      visibleNav: false,
      infoVisible: false,
      height: "calc(100vh - 160px)",
      options: [
        {
          label: "dsdsd",
          value: "dsffdf",
          count: 11,
        },
        {
          label: "dsdsd",
          value: "dsffdf",
          count: 11,
        },
      ],
    });
    const ACCOUNTS = inject("ACCOUNTS");
    const getAccounts = computed(() => ACCOUNTS.accountHide.value);
    const isLink = computed(() => {
      return ACCOUNTS.isLink.value;
    });
    const COMPETITION_NAME = inject("COMPETITION_NAME", {
      value: [],
    });
    const getCompetitionName = computed(() => COMPETITION_NAME.value);

    const handleToggleCollapse = () => {
      console.log("object");
      state.collapse = !state.collapse;
    };
    const handleShowMask = () => {
      state.visible = true;
    };
    const handleCloseMask = () => {
      state.visible = false;
    };
    const handleShowNavmask = () => {
      state.visibleNav = true;
    };
    const handleCloseNavMask = () => {
      state.visibleNav = false;
    };

    return {
      state,
      getCompetitionName,
      handleToggleCollapse,
      handleShowMask,
      handleCloseMask,
      handleShowNavmask,
      handleCloseNavMask,
      getAccounts,
      isLink,
    };
  },
});
</script>

<style lang="less" scoped>
@h: 80px;
@sider: 260px;
.layout_header {
  height: @h;
  width: 100%;
  position: relative;
  padding: 0 24px;
  box-shadow: 0 0 4px 4px rgba(0, 0, 0, 0.3);
  z-index: 19;
}
.body {
  height: calc(100vh - @h);
  position: absolute;
  width: 100%;
  top: @h;
  left: 0;
  overflow: hidden;
  .sider {
    width: @sider;
    height: 100%;
    transition: all 250ms linear;
    position: relative;
    @media screen and (max-width: 1560px) {
      display: none;
    }
  }
  .sider-real-sm {
    display: none;
    @media (min-width: 1200px) and (max-width: 1560px) {
      display: block;
    }
  }
  .content {
    height: 100%;
    position: relative;
    overflow-y: auto;
  }
  .right-sider {
    width: 300px;
    height: 100%;
    overflow-y: auto;
    @media screen and (max-width: 700px) {
      display: none;
    }
  }
  .sider-bottom {
    position: absolute;
    z-index: 9;
    width: 90%;
    height: 40px;
    border-radius: 8px;
    padding: 8px;
    background: #fff;
    color: #333;
    bottom: 10px;
    left: 5%;
  }
  .sider-real {
    position: fixed;
    top: @h;
    left: 0;
    width: 250px;
    height: calc(100vh - @h);
    padding: 8px;
    padding-bottom: 0;
    transition: all 200ms linear;
    z-index: 5;

    @media screen and (max-width: 1200px) {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  }
  .bg-blur {
    @media (min-width: 1200px) and (max-width: 1560px) {
      filter: blur(10px);
    }
  }
  .logo {
    width: 60px;
    height: 60px;
    border-radius: 40px;
  }
  .slide-h {
    width: 100%;
    overflow: auto;
    padding: 0 16px;
    padding-top: 16px;
    display: none;
    @media screen and (max-width: 1200px) {
      display: flex;
    }
  }
  .slider-h-wrap {
    width: 100px;
  }
  .btm-nav {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    left: 0;
    color: #fff;
    background: #2a333f;
    @media screen and (min-width: 700px) {
      display: none;
    }
  }
  .btm-pane {
    display: block;
    @media screen and (min-width: 700px) {
      display: none;
    }
  }
  .slide-mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 9;
    background: #000001;
  }
  .slide-fade-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(100vh);
    // opacity: 0.6;
  }
  .slide-down-enter-active {
    transition: all 0.3s ease-out;
  }

  .slide-down-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-down-enter-from,
  .slide-down-leave-to {
    transform: translateY(-100vh);
    // opacity: 0.6;
  }
}
.lg-show {
  display: none;
  @media screen and (min-width: 1200px) {
    display: flex;
  }
}
.md-show {
  display: none;
  @media screen and (min-width: 800px) {
    display: flex;
  }
}
.sm-show {
  display: none;
  @media screen and (min-width: 700px) {
    display: flex;
  }
}
.mx-lg-show {
  display: block;
  @media screen and (min-width: 1200px) {
    display: none;
  }
}

.header_active_item {
  padding: 10px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  font-weight: 600;
  margin: 0 8px;
}
.start {
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 600;
  box-shadow: 0 0 10px #ff0083;
  background-color: #ff008479;
  border-color: #ff0083 !important;
  border: 1px solid;
  color: #fff;
  animation: shane 2000ms linear infinite;
  &:hover {
    cursor: pointer;
    background: #ff0083 !important;
  }
}
@keyframes shane {
  0% {
    box-shadow: 0 0 10px #ff0083;
    opacity: 0.8;
  }
  50% {
    box-shadow: 0 0 15px #ff319c;
    opacity: 1;
  }
  100% {
    box-shadow: 0 0 10px #ff0083;
    opacity: 0.8;
  }
}
.sellBtn {
  padding: 4px 12px;
  background: #fff;
  border-radius: 12px;
}
.mine-pane {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 8;
  transition: all 200ms linear;
  overflow: hidden;
  top: 0;
}
</style>
