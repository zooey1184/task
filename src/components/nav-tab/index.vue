<template>
  <div class="wrap scrollbar pos-r">
    <NavTab
      :class="{ 'ml-24': showConfig }"
      :options="getRoutesTab"
      v-model:active="state.active"
      @change="handleGoPage"
      @delete="handleDeleteItem"
    />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import { CloseOutlined, SwapOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons-vue'
  import NavTab from './tabs-nav.vue'
  import IconLayout from './icon-layout.vue'
  import useNav from './use-nav'

  export default defineComponent({
    components: {
      CloseOutlined,
      NavTab,
      IconLayout,
      SwapOutlined,
      DeleteOutlined,
      StarOutlined
    },
    props: {
      showConfig: {
        type: Boolean,
        default: false
      }
    },
    setup(props, { expose }) {
      const { state, handleGoPage, getActiveNav, handleDeleteItem, getRoutesTab, handleClose } =
        useNav()

      expose({
        handleClose
      })

      return {
        state,
        handleGoPage,
        getActiveNav,
        handleDeleteItem,
        getRoutesTab,
      }
    }
  })
</script>

<style lang="less" scoped>
  .wrap {
    overflow-x: auto;
    overflow-y: hidden;
    --scrollbar-height: 1px;
    box-shadow: 0 2px 5px #ddd;
    z-index: 5;
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
      content: '';
      position: absolute;
      left: -11px;
      bottom: 0;
      width: 11px;
      height: 10px;
      background: #fff;
      border-radius: 0 0 20px 0;
    }
    &:after {
      content: '';
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
  .moreIcon {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 32px;
    width: 28px;
    // background: #fff;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
