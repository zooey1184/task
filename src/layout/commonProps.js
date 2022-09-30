export default {
  /**
   * header
   */
  showHeaderTrigger: {
    type: Boolean,
    // default: true
  },
  headerCollapse: {
    type: Boolean,
  },
  headerHeight: {
    type: Number,
    default: 48
  },
  showHeader: {
    type: Boolean,
    default: true,
  },
  headerTheme: {
    type: String,
  },
  headerColor: {
    type: String
  },
  headerStyle: {
    type: Object,
    default: () => ({})
  },
  headerBg: {
    type: String
  },

  /**
   * sider
   */
  showSiderTrigger: {
    type: Boolean,
    // default: true
  },
  showSider: {
    type: Boolean,
    default: true
  },
  siderCollapse: {
    type: Boolean,
    default: false
  },
  siderWidth: {
    type: Number,
    default: 200
  },
  siderTheme: {
    type: String,
  },
  siderBg: {
    type: String
  },
  siderStyle: {
    type: Object,
    default: () => ({})
  },
  collapsedWidth: {
    type: Number,
    default: 80
  }
}