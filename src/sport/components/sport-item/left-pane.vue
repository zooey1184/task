<template>
  <div class="pos-r">
    <div class="default_color leftInfoPane">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div class="scheduleTime">{{ time }}</div>
      </div>
      <div v-if="!!live" class="flex items-center">
        <VideoCameraOutlined class="color-blue mr-8 font-size-22" />
        LIVE
      </div>
    </div>

    <div class="default_color leftInfoPane2">
      <div class="flex items-center">
        <!-- <div class="scheduleIcon"></div> -->
        <div v-if="!!live" class="flex items-center">
          <VideoCameraOutlined class="color-blue mr-8 font-size-22" />
          LIVE
        </div>
        <div v-else style="height: 24px"></div>
      </div>
      <div class="scheduleTime2">{{ time }}</div>
    </div>

    <div class="default_color leftInfoPane3">
      <div class="flex items-center">
        <div class="scheduleIcon"></div>
        <div class="scheduleTime">
          <div v-if="!!live" class="flex items-center">
            <VideoCameraOutlined class="color-blue mr-8 font-size-22" />
            <div class="mr-16">LIVE</div>
            <div>
              {{ time }}
            </div>
          </div>
          <div v-else>{{ time }}</div>
        </div>
      </div>
    </div>
    <div class="itemarrow active-color" @click="handleDetail" v-if="count">
      +{{ count }}
    </div>
    <RightOutlined
      class="itemarrow"
      @click="handleDetail"
      style="padding-top: 12px"
      v-else
    />
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { RightOutlined, VideoCameraOutlined } from "@ant-design/icons-vue";
export default defineComponent({
  components: {
    RightOutlined,
    VideoCameraOutlined,
  },
  props: {
    time: {
      type: String,
    },
    name: {
      type: String,
    },
    count: Number,
    live: {
      type: [Boolean, Number],
    },
  },
  emits: ["detail"],
  setup(props, { emit }) {
    const handleDetail = () => {
      emit("detail");
    };
    return {
      handleDetail,
    };
  },
});
</script>

<style lang="less" scoped>
.leftInfoPane {
  position: absolute;
  display: block;
  @media screen and (max-width: 1400px) {
    display: none;
    overflow: hidden;
    position: relative;
  }
}
.leftInfoPane2 {
  display: none;
  @media (min-width: 800px) and (max-width: 1400px) {
    display: block;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
}

.leftInfoPane3 {
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
    margin-bottom: 8px;
  }
}
.scheduleIcon {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  margin-right: 8px;
  background: rgba(108, 130, 157, 0.4);
}
.scheduleTime {
  font-size: 12px;
}
.scheduleTime2 {
  position: absolute;
  width: 98%;
  text-align: center;
  top: 0;
  font-size: 12px;
}
.itemarrow {
  position: absolute;
  right: -12px;
  font-size: 18px;
  font-weight: 600;
  height: 34px;
  top: -12px;
  padding: 6px 12px 8px 8px;
  // top: 50%;
  // transform: translateY(-50%);
  cursor: pointer;
  transition: all 100ms linear;
  &:hover {
    opacity: 0.8;
    background-color: #222a33;
  }
  display: none;
  @media screen and (max-width: 1400px) {
    display: block;
  }
}
.item_arrow {
  position: absolute;
  right: 0;
  color: #1890ff;
  font-size: 18px;
  font-weight: 600;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  transition: all 100ms linear;
  &:hover {
    opacity: 0.8;
  }
  display: none;
  @media screen and (max-width: 1400px) {
    display: block;
  }
}
.color-blue {
  color: #1890ff;
}
</style>
