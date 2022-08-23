<template>
  <div class="wrap">
    <left-pane
      :name="info?.venue?.name"
      :live="info.isLive"
      :time="getScheduleTime"
      @detail="handleGoDetail"
      :count="getCount"
    ></left-pane>

    <div class="flex items-center pc-item">
      <!-- left -->
      <div class="left flex items-center justify-end">
        <div class="leftTitle">
          {{ HomeTeam }}
        </div>
        <div class="flex items-center leftIcon">
          <div class="icon"></div>
          <input
            type="text"
            :value="getLeftValue"
            @click="handlePick('home')"
            class="zyqulNI"
            :class="{ active: getBetActive === 'home' }"
            readonly
          />
        </div>
      </div>
      <!-- middle -->
      <div class="mid" v-if="!getMiddleValue">vs</div>
      <div class="mid" v-else>
        <input
          type="text"
          :value="getMiddleValue"
          @click="handlePick('middle')"
          class="zyqulNI"
          :class="{ active: getBetActive === 'middle' }"
          readonly
        />
      </div>
      <!-- right -->
      <div class="right flex items-center">
        <div class="flex items-center rightIcon">
          <input
            type="text"
            :value="getRightValue"
            @click="handlePick('away')"
            class="zyqulNI"
            :class="{ active: getBetActive === 'away' }"
            readonly
          />
          <div class="icon"></div>
        </div>
        <div class="rightTitle">
          {{ AwayTeam }}
        </div>
      </div>
      <div class="itemarrow" @click="handleGoDetail">
        <template v-if="count">{{ count }}</template>
        <RightOutlined v-else class="" />
      </div>
    </div>
    <div class="m-item">
      <MItem
        v-model:active="state.active"
        :leftTitle="HomeTeam"
        :leftValue="getLeftValue"
        :middleValue="getMiddleValue"
        :rightTitle="AwayTeam"
        :rightValue="getRightValue"
      />
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, inject, reactive, ref, watch } from "vue";
import LeftPane from "./left-pane.vue";
import MItem from "./m-item.vue";
import dayjs from "dayjs";
// import useCompetitors from "../useHooks/use-competitors";
import { RightOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

export default defineComponent({
  components: {
    LeftPane,
    MItem,
    RightOutlined,
  },
  props: {
    active: {
      type: [String, Number],
      default: "0",
    },
    info: {
      type: Object,
    },
    count: {
      type: Number,
    },
  },
  emits: ["update:active", "change"],
  setup(props, { emit }) {
    const router = useRouter();
    const state = reactive({
      active: props.active,
    });
    const SPORT_BET = inject("SPORT_BET");
    watch(
      () => props.active,
      (n) => {
        state.active = n;
      },
      {
        immediate: true,
      }
    );
    watch(
      () => state.active,
      (n) => {
        emit("update:active", n);
      }
    );

    const getBetActive = computed(() => {
      const id = props.info.oddsId;
      const map = SPORT_BET.getBetMap.value;
      const item = map?.[id];
      if (item && item?.active) {
        return item.active;
      }
      return "";
    });

    const getScheduleTime = computed(() => {
      const time = props.info.startTime;
      const d = time ? dayjs(time).format("MM-DD hh:mm") : "--";
      return d;
    });
    // const getCompetitors = useCompetitors(props.info);

    const SelectionsMap = computed(() => {
      const map = {};
      props.info?.selections?.forEach((item) => {
        map[item.type] = item;
      });
      return map;
    });

    const getLeftValue = computed(() => SelectionsMap.value["home"]?.odds);
    const getMiddleValue = computed(
      () => SelectionsMap.value["down"]?.odds || ""
    );
    const getRightValue = computed(() => SelectionsMap.value["away"]?.odds);
    const getCount = computed(() => props.info.detailCount);

    const HomeTeam = computed(() => props.info.team_home_name);
    const AwayTeam = computed(() => props.info.team_away_name);
    const handlePick = (e) => {
      if (state.active === e) {
        state.active = "";
      } else {
        state.active = e;
      }
      emit("change", props.info);
    };

    watch(
      () => state.active,
      (n) => {
        SPORT_BET.setMap((map) => {
          const obj = {
            home: getLeftValue,
            away: getRightValue,
            middle: getMiddleValue,
          };
          if (map) {
            map[props.info.oddsId] = {
              active: n,
              activeValue: n ? obj?.[n] || undefined : undefined,
              data: props.info,
              oddsId: props.info?.oddsId,
              homeInfo: props.info?.selections?.find(item => item.type === 'home'),
              awayInfo: props.info?.selections?.find(item => item.type === 'away'),
            };
          } else {
            map = {
              [props.info.oddsId]: {
                active: n,
                activeValue: n ? obj?.[n] || undefined : undefined,
                data: props.info,
                oddsId: props.info?.oddsId,
                homeInfo: props.info?.selections?.find(item => item.type === 'home'),
                awayInfo: props.info?.selections?.find(item => item.type === 'away'),
              },
            };
          }
        });
      }
    );

    const handleGoDetail = () => {
      router.push({
        name: "detail",
        query: {
          id: props.info.id,
        },
      });
      window.sessionStorage.setItem("sportDetail", JSON.stringify(props.info));
    };

    return {
      handlePick,
      state,
      // getCompetitors,
      getScheduleTime,
      getLeftValue,
      getMiddleValue,
      getRightValue,
      getBetActive,
      handleGoDetail,
      SelectionsMap,
      getCount,
      HomeTeam,
      AwayTeam,
    };
  },
});
</script>
<style lang="less" scoped>
.wrap {
  padding: 12px;
  margin-bottom: 8px;
  border-radius: 8px;
  overflow: hidden;
  background: #16162f;
  position: relative;
  padding-bottom: 16px;
  @media screen and (max-width: 1000px) {
    padding-bottom: 12px;
  }
}

.left {
  width: calc(50% - 38px);
  text-align: right;
}
.right {
  width: calc(50% - 38px);
}
.mid {
  margin: 0 4px;
  width: 68px;
  text-align: center;
}
.icon {
  width: 32px;
  height: 32px;
  border-radius: 4px;
  background-color: rgba(108, 130, 157, 0.4);
  border: 1px solid transparent;
  margin: 0 8px;
}
.leftIcon {
  @media screen and (max-width: 800px) {
    width: 100%;
    text-align: right;
    display: flex;
    justify-content: end;
    align-items: center;
    flex-shrink: 0;
  }
}
.leftTitle {
  color: #becde3;
}
.rightIcon {
  @media screen and (max-width: 800px) {
    width: 100%;
    text-align: left;
    flex-shrink: 0;
  }
}
.rightTitle {
  color: #becde3;
}
.pc-item {
  @media screen and (max-width: 800px) {
    display: none;
  }
}
.m-item {
  display: none;
  @media screen and (max-width: 800px) {
    display: block;
  }
}
.itemarrow {
  position: absolute;
  right: 16px;
  color: #1890ff;
  font-size: 18px;
  font-weight: 600;
  top: 0;
  // top: 50%;
  // transform: translateY(-50%);
  height: 100%;
  right: -12px;
  transition: all 100ms linear;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 30px 0 16px;
  &:hover {
    opacity: 0.8;
    background-color: #222a33;
  }
  @media screen and (max-width: 1400px) {
    display: none;
  }
}
</style>
