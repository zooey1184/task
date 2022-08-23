import { defineComponent, reactive, watch } from "vue";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import uselayout from "./useLayout";

export default {
  components: {
    CaretDownOutlined,
    CaretRightOutlined,
  },
  props: {
    showHeaderTrigger: { type: Boolean, default: true },
    showSiderTrigger: { type: Boolean, default: true },
    headerHeight: { type: Number, default: 60 },
    siderWidth: { type: Number, default: 200 },
  },
  setup(props, { emit, expose }) {
    const layout = uselayout(props, { emit, expose });
    return { ...layout };
  },
}