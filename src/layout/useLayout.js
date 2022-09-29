import { watch, reactive, computed, ref, inject } from 'vue'

const useLayout = (props, { emit, expose }) => {
  const HEIGHT = props.headerHeight || 48
  const WIDTH = props.siderWidth || 200
  const state = reactive({
    height: HEIGHT,
    headerCollapse: false, // 是否折叠
    sider: WIDTH,
    siderCollapse: false, // 侧边栏折叠
  })

  const LAYOUT = inject('LAYOUT')
  const getTheme = computed(() => LAYOUT.theme.value)
  const getHeaderTheme = computed(() => props.headerTheme || getTheme.value)
  const getSiderTheme = computed(() => props.siderTheme || getTheme.value)
  // 互补色
  const handleChangeColor = (color) => {
    const colorPart = color.slice(1);
    const ind = parseInt(colorPart, 16);
    let iter = ((1 << 4 * colorPart.length) - 1 - ind).toString(16);
    while (iter.length < colorPart.length) {
        iter = '0' + iter;
    };
    return '#' + iter;
  }
  const getHeaderBg = computed(() => {
    if (props.headerBg) {
      return props.headerBg
    } else {
      return getHeaderTheme.value === 'dark' ? '#001529' : '#ffffff'
    }
  })

  const getSiderBg = computed(() => {
    if (props.siderBg) {
      return props.siderBg
    } else {
      return getSiderTheme.value === 'dark' ? '#001529' : '#ffffff'
    }
  })
  const getSiderColor = computed(() => {
    if (props.siderColor) {
      return props.siderColor
    } else {
      return handleChangeColor(getSiderBg.value)
    }
  })
  const getHeaderColor = computed(() => {
    if (props.headerColor) {
      return props.headerColor
    } else {
      return handleChangeColor(getHeaderBg.value)
    }
  })
  

  const handleHeaderCollapse = (flag) => {
    if (typeof flag !== 'undefined') {
      state.headerCollapse = !state.headerCollapse
    } else {
      state.headerCollapse = flag
    }
  }
  const handleSiderCollapse = (flag) => {
    if (typeof flag !== 'undefined') {
      state.siderCollapse = !state.siderCollapse
    } else {
      state.siderCollapse = flag
    }
  }

  watch(
    () => props.headerCollapse,
    n => {
      // @ts-ignore
      state.headerCollapse = n
    },
    {
      immediate: true
    }
  )
  watch(
    () => state.headerCollapse,
    
    n => {
      if (n) {
        state.height = 0
      } else {
        state.height = HEIGHT
      }
      emit(`update:headerCollapse`, n)
    }
  )
  
  watch(
    () => props.siderCollapse,
    n => {
      // @ts-ignore
      state.siderCollapse = n
    },
    {
      immediate: true
    }
  )
  watch(
    () => state.siderCollapse,
    n => {
      if (n) {
        state.sider = 0
      } else {
        state.sider = WIDTH
      }
      emit(`update:siderCollapse`, n)
    },
  )

  expose({
    handleSiderCollapse,
    handleHeaderCollapse,
    handleGetCollapse: () => {
      return {
        sider: state.siderCollapse,
        header: state.handleSiderCollapse
      }
    }
  })


  return {
    state,
    getTheme,
    getHeaderTheme,
    getHeaderBg,
    getHeaderColor,
    getSiderColor,
    getSiderTheme,
    getSiderBg,
    handleHeaderCollapse,
    handleSiderCollapse,
  }
}

export default useLayout
