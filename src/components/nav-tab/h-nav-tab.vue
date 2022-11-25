<template>
  <div>
    <Menu :menuList="menuList" mode="inline" @select="handleMenuSelect" :value="[getActiveNav]" />
  </div>
</template>

<script>
  import { computed, defineComponent, reactive } from 'vue'
  import Menu from '@/components/Menus'
  import { FileTextOutlined } from '@ant-design/icons-vue'
  import useNav from './use-nav'

  export default defineComponent({
    components: {
      Menu,
      FileTextOutlined
    },
    props: {
      collapsed: Boolean
    },
    emits: ['select'],
    setup(props, { emit }) {
      const params = reactive({
        menu: []
      })
      const { state, handleDeleteItem, handleGoPage, getActiveNav, getRoutesTab, handleClickItem } = useNav(props)

      const menuList = computed(() => {
        const r = getRoutesTab.value
        /**
         * @type {any[]}
         */
        const t = []
        r?.forEach(item => {
          t.push({
            ...item,
            title: item?.meta?.title || item?.name,
            key: item?.name,
            icon: 'FileTextOutlined'
          })
        })
        return t
      })

      const handleMenuSelect = (/** @type {{ key: string; }} */ e) => {
        const item = menuList.value.find(ii => ii.name === e.key)
        handleGoPage(item)
      }

      return {
        state,
        handleDeleteItem,
        handleGoPage,
        getActiveNav,
        getRoutesTab,
        menuList,
        handleClickItem,
        params,
        handleMenuSelect
      }
    }
  })
</script>
