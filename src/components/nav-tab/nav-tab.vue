<template>
  <div class="pos-r">
    <ul class="container scrollbar overflow-x-auto overflow-y-hidden">
      <li
        v-for="item in options"
        :key="item.fullPath"
        @click="handleClickItem(item)"
        class="li"
        :title="item?.meta?.title || item.name"
        :class="{ activeTab: state.active === item.name }"
      >
        <img :src="item.img" v-if="item.img" alt="" />
        <FileTextOutlined v-else class="mr-8" />
        <span>{{ item?.meta?.title || item.name }}</span>
        <close-outlined
          v-if="state.active === item.name && options.length > 1"
          @click="handleDeleteItem(item)"
          class="close flex items-center justify-center font-weight-600"
        />
        <div class="line"></div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { reactive, defineComponent, watch } from 'vue'
  import { CloseOutlined, FileTextOutlined, SwapOutlined, DeleteOutlined, StarOutlined } from '@ant-design/icons-vue'
  import IconLayout from './icon-layout.vue'

  export default defineComponent({
    components: {
      CloseOutlined,
      FileTextOutlined,
      SwapOutlined,
      DeleteOutlined,
      StarOutlined,
      IconLayout
    },
    props: {
      options: {
        type: Array
      },
      active: {
        type: [String, Number]
      }
    },
    emits: ['update:active', 'change', 'delete'],
    setup(props, { emit }) {
      const state = reactive({
        active: undefined
      })
      watch(
        () => props.active,
        n => {
          // @ts-ignore
          state.active = n
        },
        {
          immediate: true
        }
      )
      watch(
        () => state.active,
        n => {
          emit(`update:active`, n)
        }
      )

      const handleClickItem = (/** @type {any} */ e) => {
        state.active = e.name
        emit('change', e)
      }

      const handleDeleteItem = (/** @type {any} */ e) => {
        emit('delete', e)
      }

      return {
        state,
        handleDeleteItem,
        handleClickItem
      }
    }
  })
</script>

<style lang="less" scoped>
  .container {
    height: 40px;
    padding: 8px 8px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
  }
  ul {
    margin: 0;
  }
  .li {
    position: relative;
    font-size: 12px;
    padding: 0 8px;
    // border-radius: 10px 10px 0 0;
    flex-basis: 180px;
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
      margin-right: 4px;
      border-radius: 40px;
      padding: 4px;
      transform: scale(0.8);
      background: #fff;
      cursor: pointer;
      &:hover {
        background: #d8d8d8;
      }
    }
  }

  .li.activeTab {
    background: #fff;
    z-index: 2;
    &::before,
    &::after {
      border-top: 5px solid #fff;
    }
  }

  // .li::before,
  // .li::after {
  //   position: absolute;
  //   content: '';
  //   width: 20px;
  //   height: 20px;
  //   border-radius: 50%;
  //   border: 5px solid transparent;
  //   transition: 0.3s all;
  // }

  // .li::before {
  //   bottom: -5px;
  //   left: -15px;
  //   transform: rotate(135deg);
  // }

  // .li::after {
  //   bottom: -5px;
  //   right: -15px;
  //   transform: rotate(205deg);
  // }

  .li + .li:not(.activeTab) .line {
    display: block;
  }

  .li:hover:not(.activeTab) {
    background: #f1f3f4;

    .line {
      display: none !important;
    }

    &::before,
    &::after {
      border-top: 5px solid #f1f3f4;
    }
  }

  .li:hover + li {
    .line {
      display: none !important;
    }
  }
  .moreIcon {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 32px;
    width: 28px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
