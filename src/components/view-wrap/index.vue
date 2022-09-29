<template>
  <div class="h-100p flex flex-col w-100p overflow-auto">
    <PageHeader
      :breadcrumb="getBreadCrumb"
      v-if="showHeader"
      style="background: #fff; padding: 8px 24px"
      class="top-0"
    >
      <template #title>
        <div class="flex items-center">
          <span
            v-if="showBack"
            @click="handleBack"
            class="font-size-14 font-weight-400 cursor-pointer hover-color-blue color-gray pr-16"
          >
            <LeftOutlined />
            {{ backText }}
          </span>
          <slot name="title">
            <div class="font-size-18 font-weight-600 mb-0">
              {{ title }}
            </div>
          </slot>
        </div>
      </template>
      <template #subTitle>
        <slot name="subTitle">
          {{ subTitle }}
        </slot>
      </template>
      <template #extra><slot name="extra"></slot></template>
      <template #tag><slot name="tag"></slot></template>
      <slot name="headerContent" v-if="$slots.headerContent"></slot>
      <template #footer><slot name="footer"></slot></template>
    </PageHeader>
    <div :class="wrapClass" class="flex-1" :style="wrapStyle">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { PageHeader } from "ant-design-vue";
import { LeftOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default {
  props: {
    showHeader: Boolean,
    title: {
      type: String,
      default: "",
    },
    subTitle: {
      type: String,
      default: "",
    },
    breadcrumb: {
      type: Array,
      default: () => [],
    },
    wrapStyle: {
      type: Object,
      default: () => ({}),
    },
    wrapClass: {
      type: [String, Array, Object],
      default: () => "",
    },
    backText: {
      type: String,
      default: "返回",
    },
    showBack: {
      type: Boolean,
    },
    onBack: {
      type: Function,
      default: undefined,
    },
  },
  components: {
    PageHeader,
    LeftOutlined,
  },
  setup(props, { emit }) {
    const router = useRouter();

    const handleBack = () => {
      if (props.onBack && typeof props.onBack === "function") {
        props.onBack();
      } else {
        router.back();
      }
    };
    const getBreadCrumb = computed(() => {
      if (props.breadcrumb?.length) {
        const list = props.breadcrumb;
        const _breadcrumb = [];
        list.forEach((item) => {
          _breadcrumb.push({
            path: item.path,
            breadcrumbName: item.breadcrumbName || item.name,
          });
        });
        return { props: { routes: _breadcrumb } };
      } else {
        return undefined;
      }
    });

    return {
      getBreadCrumb,
      handleBack,
    };
  },
};
</script>

<style lang="less" scoped>
.viewWrap {
  padding: 12px 24px;
}
</style>
