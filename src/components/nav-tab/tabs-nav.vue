<template>
  <div class="pos-r navTabs mt-8">
    <a-tabs type="editable-card" hide-add :activeKey="state.active" @edit="handleEdit" @change="handleClickItem">
      <a-tab-pane
        v-for="item in options"
        :tabBarStyle="{ margin: 0 }"
        :closable="options.length > 1"
        :tab="item?.meta?.title || item.name"
        :key="item.name"
      ></a-tab-pane>
    </a-tabs>
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
        state.active = e
        // @ts-ignore
        const item = props.options?.find(ii => ii.name === e)

        emit('change', item)
      }

      const handleDeleteItem = (/** @type {any} */ e) => {
        emit('delete', e)
      }

      const handleEdit = (/** @type {any} */ e) => {
        // @ts-ignore
        const item = props.options?.find(ii => ii.name === e)
        emit('delete', item)
      }

      return {
        state,
        handleDeleteItem,
        handleClickItem,
        handleEdit
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
  .navTabs {
    :deep(.ant-tabs-nav) {
      margin: 0;
    }
  }
</style>
