<template>
  <div class="bet-wrap">
    <div class="bet-item-header flex items-center">
      <div class="betItemIcon">
        <div class="animat-circle"></div>
      </div>
      <div class="bet-item-title flex items-center">
        <div class="bet-item-left item" :title="HomeTeam">{{ HomeTeam }}</div>
        <span style="margin: 0 2px; line-height: 14px">vs</span>
        <div class="bet-item-right item" :title="AwayTeam">{{ AwayTeam }}</div>
      </div>
      <close-square-outlined
        style="font-size: 18px"
        @click="handleDelete"
        class="hover_active"
      />
    </div>
    <div>
      <div class="title">{{ getTitle }}</div>
      <div class="desc">{{ getDesc }}</div>
    </div>
    <div>
      <bet-input :showInput="showInput" v-model:value="state.value">
        <template #title>
          <div class="input-title flex items-center">
            <tag-outlined
              style="
                margin-right: 4px;
                margin-top: 4px;
                color: #6d819c;
                font-weight: 400;
              "
            />
            odds:
            {{ info.activeValue }}
          </div>
        </template>
      </bet-input>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, reactive, ref, watch } from "vue";
import betInput from "./bet-input.vue";
import { CloseSquareOutlined, TagOutlined } from "@ant-design/icons-vue";
// import useCompetitors from "./useHooks/use-competitors";

export default defineComponent({
  components: {
    betInput,
    TagOutlined,
    CloseSquareOutlined,
  },
  props: {
    value: {
      type: [String, Number],
    },
    left: {
      type: String,
    },
    right: {
      type: String,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    info: {
      type: Object,
    },
  },
  emits: ["update:value", "delete"],
  setup(props, { emit }) {
    const state = reactive({
      value: props.value,
    });
    watch(
      () => props.value,
      (n) => {
        state.value = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.value,
      (n) => {
        emit("update:value", n);
      }
    );
    const SelectionsMap = computed(() => {
      const map = {};
      props.info?.data.selections.forEach((item) => {
        map[item.type] = item;
      });
      return map;
    });

    // const getCompetitors = useCompetitors(props.info.data);
    const getLeftValue = computed(() => SelectionsMap.value["home"].odds);
    const getMiddleValue = computed(
      () => SelectionsMap.value["down"]?.odds || ""
    );
    const getRightValue = computed(() => SelectionsMap.value["away"].odds);
    const getCount = computed(() => props.info.data.detailCount);

    const HomeTeam = computed(() => props.info.homeInfo.name);
    const AwayTeam = computed(() => props.info.awayInfo.name);

    const getTitle = computed(() => {
      const info = props.info;
      if (info?.active === "home") {
        return HomeTeam.value;
      } else if (info?.active === "away") {
        return AwayTeam.value;
      } else if (info?.active === "middle") {
        return "Draw";
      }
    });
    const getDesc = computed(() =>
      props.info?.homeInfo?.handicap ? "Match Handicap" : "Match Winner"
    );

    const handleDelete = () => {
      emit("delete");
    };

    return {
      state,
      getDesc,
      getTitle,
      getLeftValue,
      getMiddleValue,
      getRightValue,
      HomeTeam,
      AwayTeam,
      // getCompetitors,
      handleDelete,
    };
  },
});
</script>

<style lang="less" scoped>
.animat-circle {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 10px;
  background: rgba(234, 54, 54, 0.329);
  border: 1px solid #c40404;
  animation: bonce 2s linear 100ms infinite;
  bottom: -2px;
  right: -2px;
}
@keyframes bonce {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
.bet-wrap {
  margin: 4px;
  background: #1b222c;
  padding: 8px;
  border-radius: 8px;
  color: #6d819c;
  font-size: 13px;
}
.betItemIcon {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  margin-right: 8px;
  background: #303b47;
  position: relative;
}
.bet-item-title {
  width: 76%;
}
.title {
  font-size: 14px;
  margin-top: 4px;
  color: #fff;
}
.desc {
  font-size: 13px;
}
.item {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  line-height: 14px;
  width: 60px;
  font-size: 12px;
}
.input-title {
  color: #16bdf9;
  font-size: 14px;
  font-weight: 600;
}
</style>
