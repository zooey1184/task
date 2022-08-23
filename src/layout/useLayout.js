import {watch, reactive, computed, ref} from 'vue'

const useLayout = (props, {emit, expose}) => {
  const HEIGHT = props.headerHeight || 60
  const WIDTH = props.siderWidth || 200
  const state = reactive({
    height: HEIGHT,
    headerCollapse: false, // 是否折叠
    sider: WIDTH,
    siderCollapse: false, // 侧边栏折叠
  });

  const handleHeaderCollapse = () => {
    state.headerCollapse = !state.headerCollapse;
  };
  const handleSiderCollapse = () => {
    state.siderCollapse = !state.siderCollapse;
  };
  watch(
    () => state.headerCollapse,
    (n) => {
      if (n) {
        state.height = 0;
      } else {
        state.height = HEIGHT;
      }
    },
    {
      immediate: true,
    }
  );
  watch(
    () => state.siderCollapse,
    (n) => {
      if (n) {
        state.sider = 0;
      } else {
        state.sider = WIDTH;
      }
    },
    {
      immediate: true,
    }
  );

  return {
    state,
    handleHeaderCollapse,
    handleSiderCollapse,
  };
}

export default useLayout